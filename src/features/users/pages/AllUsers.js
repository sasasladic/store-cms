import React, { useState, useEffect } from "react";
import UserList from "../components/UsersList";
import api from "../../../services/api";
import { useHistory } from "react-router";


const AllUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUsers, setLoadedUsers] = useState([]);
  const history = useHistory();

  const showLoader = () => {
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const getUsers = async () => {
      showLoader();
      try {
        const response = await api(history)("/user");
        if(response && response.data){
          setLoadedUsers(response.data.data);
        }
      } catch (error) {
        console.log(error);
        alert(error.response?.data?.message);
      }
      hideLoader();
    };

    getUsers();
  }, [history]);

  return (
    <div style={{ height: 400, width: "100%", backgroundColor: "#fff" }}>
      <UserList users={loadedUsers} loading={isLoading} />
    </div>
  );
};

export default AllUsers;
