import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditProductVariantForm from "../components/EditProductVariantForm";
import { Backdrop, CircularProgress } from "@mui/material";
import api from "../../../services/api";
import { useHistory } from "react-router";


const EditProductVariant = () => {
  const { productId, id } = useParams();

  const [variantData, setVariantData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();


  const showLoader = () => {
    setIsLoading(true);
  };
  const hideLoader = () => {
    setIsLoading(false);
  };

  function updateVariantHandler(variantData) {
    const sendUpdateRequest = async (variantData) => {
        try {
          const response = await api()(`/product/${productId}/variant/${id}/edit`, {
            method: "patch",
            data: variantData,
          });
  
          if (response.data.success === true) {
            alert(response.data.message);
  
            history.replace(`/product/${productId}/variants`);
          } else {
            //Red alert
            alert(response.data.message);
          }
        } catch (err) {
          // Handle Error Here
          console.error(err);
        }
      };
  
      sendUpdateRequest(variantData);
  }

  useEffect(() => {
    const getProductVariant = async () => {
      showLoader();
      try {
        const response = await api()(`/product/${productId}/variant/${id}`);
        if (response && response.data) {
          setVariantData(response.data.data);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
      hideLoader();
    };

    getProductVariant();
  }, [id, productId]);

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
    <EditProductVariantForm
      data={variantData}
      onSubmitHandler={updateVariantHandler}
    />
  );
};
export default EditProductVariant;
