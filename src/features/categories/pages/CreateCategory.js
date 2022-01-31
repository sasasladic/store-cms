import React, { useEffect, useState } from "react";
import CreateCategoryForm from "../components/CreateCategoryForm";
import api from "../../../services/api";
import { Backdrop, CircularProgress } from "@mui/material";
import { useHistory } from "react-router";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const showLoader = () => {
    setIsLoading(true);
  };
  const hideLoader = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const getCategories = async () => {
      showLoader();
      try {
        const response = await api()({ url: "/category/create" });
        console.log(response.data.data.categories)
        setCategories(response.data.data.categories);
      } catch (error) {
        alert(error.response.data.message);
      }
      hideLoader();
    };

    getCategories();
  }, []);

  function onSubmitHandler(categoryData) {
    const saveCategoryDetails = async (categoryData) => {
      try {
        const response = await api()("/category/create", {
          method: "post",
          data: categoryData,
        });

        console.log(response);
        if (response.data.success === true) {
            alert(response.data.message);
    
            history.replace('/categories');
        } else {
          //Red alert
          alert(response.data.message);
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
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

  return <CreateCategoryForm categories={categories} onSubmitHandler={onSubmitHandler}/>;
};

export default CreateCategory;
