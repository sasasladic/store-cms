import React, { useState, useEffect } from "react";
import CreateProductForm from "../components/CreateProductForm";
import api from "../../../services/api";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CreateProductAttributes from "./CreateProductAttributes";
import CreateProductVariants from "./CreateProductVariants";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [productId, setProductId] = useState();
  const [disabledOptions, setDisabledOptions] = useState(true);
  const [disabledAttributes, setDisabledAttributes] = useState(true);

  const showLoader = () => {
    setIsLoading(true);
  };
  const hideLoader = () => {
    setIsLoading(false);
  };

  function submitDetailsHandler(productData) {
    const saveProductDetails = async (productData) => {
      try {
        const response = await api()("/product/create", {
          method: "post",
          data: productData,
        });

        console.log(response);
        if (response.data.success === true) {
          // alert(
          //   "Successfully created product with id: " +
          //     response.data.data.product_id
          // );
          setProductId(response.data.data.product_id);
          setDisabledOptions(false);
        } else {
          //Red alert
          alert(response.data.message);
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };

    saveProductDetails(productData);
  }

  useEffect(() => {
    const getGeneralDetailsData = async () => {
      showLoader();
      try {
        const response = await api()({ url: "/product/create" });
        setCategories(response.data.data.categories);
      } catch (error) {
        alert(error.response.data.message);
      }
      hideLoader();
    };

    getGeneralDetailsData();
  }, []);

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={hideLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#3f51b5" }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ backgroundColor: "#f2f2f2" }}
        >
          <Typography className=".css-1qvr50w-MuiTypography-root">
            General Details
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box mt={8}>
            <CreateProductForm
              categories={categories}
              onSubmitDetailsHandler={submitDetailsHandler}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      {!disabledOptions && (
        <CreateProductAttributes
          productId={productId}
          setDisabledAttributes={setDisabledAttributes}
        />
        )}
      {!disabledAttributes && (
        <CreateProductVariants 
          productId={productId}
        />
      )}
    </Box>
  );
};

export default CreateProduct;
