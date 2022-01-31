import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import ProductVariantsList from "../components/ProductVariantsList";
import TableButtons from "../../../components/Elements/Table/TableButtons";

const AllProductVariants = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const [attributes, setAttributes] = useState([]);

  const [pageSearch, setPageSearch] = useState({ page: 1, searchTerm: "" });
  const [searchPerformed, setSearchPerformed] = useState(true);
  const [currentTablePage, setCurrentTablePage] = useState(0);

  const backButton = { url: '/products', label: "All products" };


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
    console.log(pageId);
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
    const getProductVariants = async () => {
      showLoader();
      try {
        const response = await api(history)(
          `/product/${id}/variant?filter[optionValues.value]=${pageSearch.searchTerm}&page=${pageSearch.page}`
        );
        console.log(response);
        if (response && response.data) {
          setData(response.data.data);
          setAttributes(response.data.attributes);
          setMetaData(response.data.meta);
          const currentPage = response.data.meta.current_page - 1;
          setCurrentTablePage(currentPage);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
      hideLoader();
    };

    getProductVariants();
  }, [history, pageSearch, id]);

  return (
    <div>
      <TableButtons
        backButton={backButton}
        searchChangeHandler={searchChangeHandler}
        addNewLink={`/product/${id}/variants/create`}
      />
      <ProductVariantsList
        loading={isLoading}
        attributes={attributes}
        productVariants={data}
        currentTablePage={currentTablePage}
        metaData={metaData}
        pageChangeHandler={pageChangeHandler}
      />
    </div>
  );
};

export default AllProductVariants;
