import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import EditProductForm from "../components/EditProductForm";
import api from "../../../services/api";
import { Backdrop, CircularProgress } from "@mui/material";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const EditProduct = () => {
  const { id } = useParams();

  const [productData, setProductData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const showLoader = () => {
    setIsLoading(true);
  };
  const hideLoader = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const getProduct = async () => {
      showLoader();
      try {
        const response = await api()(`/product/${id}`);
        if (response && response.data) {
          setProductData(response.data.data);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
      hideLoader();
    };

    const getCategoryOptions = async () => {
      showLoader();
      try {
        const response = await api()({ url: "/product/create" });
        setCategories(response.data.data.categories);
      } catch (error) {
        alert(error.response.data.message);
      }
      hideLoader();
    };

    getProduct();
    getCategoryOptions();
  }, [id]);

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
    <Accordion expanded={true}>
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
          <EditProductForm data={productData} categories={categories}/>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default EditProduct;
