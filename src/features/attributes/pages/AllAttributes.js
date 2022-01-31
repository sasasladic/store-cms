import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import api from "../../../services/api";
import TableButtons from "../../../components/Elements/Table/TableButtons";
import AttributesList from "../components/AttributesList";
import { Box } from "@mui/material";

const AllAttributes = () => {
  const [attributes, setAttributes] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const deleteAttributeHandler = async (id) => {
    try {
      const response = await api()("/option/" + id, {
        method: "delete",
      });

      if (response.data.success === true) {
        alert(response.data.message);
        window.location.reload();
      } else {
        //Red alert
        alert(response.data.message);
      }
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  useEffect(() => {
    const getAttributes = async () => {
      showLoader();
      try {
        const response = await api(history)(
          `/option?filter[name]=${pageSearch.searchTerm}&page=${pageSearch.page}`
        );
        console.log(response);
        if (response && response.data) {
          setAttributes(response.data.data);
          setMetaData(response.data.meta);
          //   setMetaData(response.data.meta);
          //   const currentPage = response.data.meta.current_page - 1;
          //   setCurrentTablePage(currentPage);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
      hideLoader();
    };

    getAttributes();
  }, [history, pageSearch]);

  return (
    <div>
      <TableButtons
        searchChangeHandler={searchChangeHandler}
        addNewLink={"/attribute/create"}
      />
        <AttributesList
        products={attributes}
        loading={isLoading}
        metaData={metaData}
        currentTablePage={currentTablePage}
        pageChangeHandler={pageChangeHandler}
        deleteAttributeHandler={deleteAttributeHandler}
      />
    </div>
  );
};

export default AllAttributes;
