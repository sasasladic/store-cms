import React, { useState, useEffect } from "react";
import UserList from "../components/UsersList";
import api from "../../../services/api";
import { useHistory } from "react-router";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

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
      <Box sx={{ py: 4, px: 4 }}>
        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item xs={9}></Grid>
          <Grid item xs={2}>
            <TextField
              id="input-with-icon-textfield"
              placeholder="Search...."
              size="small"
              onChange={searchChangeHandler}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <Button
              variant="contained"
              color="success"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => history.push("/user/create")}
            >
              Add new
            </Button>
          </Grid>
        </Grid>
      </Box>
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
