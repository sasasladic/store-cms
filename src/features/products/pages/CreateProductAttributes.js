import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddProductAttributes from "../components/AddProductAttributes";

const CreateProductAttributes = (props) => {

  const [allAttributes, setAllAttributes] = useState([]);

  function submitAttributesHandler(productOptions) {
    const saveProductOptions = async (productOptions) => {
      try {
        const response = await api()(`/product/${props.productId}/option/create`, {
          method: "post",
          data: productOptions,
        });

        console.log(response);
        if (response.data.success === true) {
          // alert(
          //   "Successfully created product with id: " +
          //     response.data.data.product_id
          // );
          props.setDisabledAttributes(false);
        } else {
          //Red alert
          alert(response.data.message);
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };

    saveProductOptions(productOptions);
  }

  useEffect(() => {
    const getAllAttributes = async () => {
      // showLoader();
      try {
        const response = await api()({ url: "/option/select" });
        setAllAttributes(response.data.data);
      } catch (error) {
        alert(error.response.data.message);
      }
      // hideLoader();
    };

    getAllAttributes();
  }, []);

  return (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#3f51b5" }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{ backgroundColor: "#f2f2f2" }}
          >
            <Typography>Set Attributes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddProductAttributes
              attributes={allAttributes}
              onSubmitOptionsHandler={submitAttributesHandler}
            />
          </AccordionDetails>
        </Accordion>
  );
};

export default CreateProductAttributes;
