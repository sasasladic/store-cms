import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import CreateAttributeForm from "../components/CreateAttributeForm";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const EditAttribute = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const showLoader = () => {
    setIsLoading(true);
  };
  const hideLoader = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const getAttributeData = async () => {
      showLoader();
      try {
        const response = await api()({ url: `/option/${id}` });
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        alert(error.response.data.message);
      }
      hideLoader();
    };

    getAttributeData();
  }, [id]);

  function submitAttributesHandler(attributeData) {}

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
    <CreateAttributeForm
      attributes={data}
      onSubmitAttributesHandler={submitAttributesHandler}
    />
  );
};

export default EditAttribute;
