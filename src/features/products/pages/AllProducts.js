import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductsList";
import api from "../../../services/api";
import { useHistory } from "react-router";
import TableButtons from "../../../components/Elements/Table/TableButtons";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [metaData, setMetaData] = useState([]);
  const history = useHistory();

  const [pageSearch, setPageSearch] = useState({ page: 1, searchTerm: "" });
  const [searchPerformed, setSearchPerformed] = useState(true);
  const [currentTablePage, setCurrentTablePage] = useState(0);

  const showLoader = () => {
    setIsLoading(true);
  };
  const hideLoader = () => {
    setIsLoading(false);
  };

  const searchChangeHandler = (e) => {
    setPageSearch((prevState) => ({
      page: e.target.value === "" ? 1 : searchPerformed ? prevState.page : 1,
      searchTerm: e.target.value,
    }));

    setSearchPerformed(true);
  };

  const pageChangeHandler = (pageId) => {
    //Need to be here
    if (pageSearch.searchTerm === "") {
      setSearchPerformed(false);
    }

    setPageSearch((prevState) => ({
      ...prevState,
      page: pageId,
    }));
  };

  useEffect(() => {
    const getProducts = async () => {
      showLoader();
      try {
        const response = await api(history)(
          `/product?filter[searchTerm]=${pageSearch.searchTerm}&page=${pageSearch.page}`
        );
        if (response && response.data) {
          setProducts(response.data.data);
          setMetaData(response.data.meta);
          const currentPage = response.data.meta.current_page - 1;
          setCurrentTablePage(currentPage);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
      hideLoader();
    };

    getProducts();
  }, [history, pageSearch]);
  

  return (
    <div>
      <TableButtons searchChangeHandler={searchChangeHandler} addNewLink={"/product/create"}/>
      <ProductList
        products={products}
        loading={isLoading}
        metaData={metaData}
        currentTablePage={currentTablePage}
        pageChangeHandler={pageChangeHandler}
      />
    </div>
  );
};

export default AllProducts;
