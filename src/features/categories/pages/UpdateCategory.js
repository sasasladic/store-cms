import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import CreateCategoryForm from "../components/CreateCategoryForm";
import { Backdrop, CircularProgress } from "@mui/material";

const UpdateCategory = () => {
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const showLoader = () => {
    setIsLoading(true);
  };
  const hideLoader = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const getCategory = async () => {
      showLoader();
      try {
        const response = await api()({ url: `/category/${id}/edit` });
        setCategories(response.data.data.categories);
        setCategory(response.data.data);
      } catch (error) {
        alert(error.response?.data?.message);
      }
      hideLoader();
    };

    getCategory();
  }, [id]);

  function onSubmitHandler(categoryData) {
    const saveCategoryDetails = async (categoryData) => {
      console.log(categoryData, id)
    };

    saveCategoryDetails(categoryData);
  }

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

  return <CreateCategoryForm categories={category.categories} category={category} onSubmitHandler={onSubmitHandler}/>;
};

export default UpdateCategory;
