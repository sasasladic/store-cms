import React, { useState, useEffect }  from "react";
import ProductList from "../components/ProductsList";
import api from "../../../services/api";


const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const showLoader = () => {
    setIsLoading(true);
  };
  const hideLoader = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const getProducts = async () => {
      showLoader();
      try {
        const response = await api("/admin-api/product");
        setProducts(response.data.data);
      } catch (error) {
        alert(error.response.data.message);
      }
      hideLoader();
    };
    
    getProducts();
  }, []);

    return (
        <ProductList loading={isLoading} products={products} />
    );
};

export default AllProducts;