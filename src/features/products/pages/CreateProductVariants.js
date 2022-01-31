import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import CreateProductVariantForm from "../components/CreateProductVariantForm";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CreateProductVariants = (props) => {
  const params = useParams();
  const [productAttributes, setProductAttributes] = useState([]);
  const [productId, setProductId] = useState(props.productId ?? params.id);

  const history = useHistory();

  function submitProductVariantsHandler(productAttributes) {
    const saveProductAttributes = async (productAttributes) => {
      try {
        const response = await api()(`/product/${productId}/variant/create`, {
          method: "post",
          data: productAttributes,
        });

        if (response.data.success === true) {
          alert("Successfully created product attributes");
          history.push(`/product/${productId}/variants`);
        } else {
          //Red alert
          alert(response.data.message);
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };

    saveProductAttributes(productAttributes);
  }

  useEffect(() => {
    const getProductAttributes = async () => {
      try {
        const response = await api()({ url: `/product/${productId}/option` });
        // console.log(response);
        setProductAttributes(response.data.data);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    
    //ukoliko bude zabolo prosledi odavde props.productId
    getProductAttributes();
  }, [productId]);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#3f51b5" }} />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{ backgroundColor: "#f2f2f2" }}
      >
        <Typography>Configurable Attributes</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box mt={8}>
          <CreateProductVariantForm
            attributes={productAttributes}
            onSubmitAttributesHandler={submitProductVariantsHandler}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default CreateProductVariants;
