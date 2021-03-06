import React, { useState, useEffect } from "react";
import UserList from "../components/UsersList";
import api from "../../../services/api";
import { useHistory } from "react-router";
import TableButtons from "../../../components/Elements/Table/TableButtons";

const AllUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUsers, setLoadedUsers] = useState([]);
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
    const getUsers = async () => {
      showLoader();

      try {
        const response = await api(history)(
          `/user?filter[name]=${pageSearch.searchTerm}&page=${pageSearch.page}`
        );
        if (response && response.data) {
          setLoadedUsers(response.data.data);
          setMetaData(response.data.meta);
          const currentPage = response.data.meta.current_page - 1;
          setCurrentTablePage(currentPage);
        }
      } catch (error) {
        alert(error.response?.data?.message);
      }
      hideLoader();
    };

    getUsers();
    window.scrollTo(0, 0);
  }, [history, pageSearch]);

  const deleteUserHandler = async (id) => {
    try {
      const response = await api()("/user/" + id, {
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

  return (
    <div>
      <TableButtons searchChangeHandler={searchChangeHandler} addNewLink={"/user/create"}/>
      <UserList
        users={loadedUsers}
        loading={isLoading}
        metaData={metaData}
        currentTablePage={currentTablePage}
        pageChangeHandler={pageChangeHandler}
        deleteUserHandler={deleteUserHandler}
      />
    </div>
  );
};

export default AllUsers;
