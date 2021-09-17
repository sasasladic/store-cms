import React, { useState, useEffect } from "react";
import UserList from "../components/UsersList";
import api from "../../../services/api";

const AllUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUsers, setLoadedUsers] = useState([]);

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
        const response = await api("/admin-api/user");
        setLoadedUsers(response.data.data);
      } catch (error) {
        alert(error.response.data.message);
      }
      hideLoader();
    };

    getUsers();
  }, []);

  return (
    <div style={{ height: 400, width: "100%", backgroundColor: "#fff" }}>
      <UserList users={loadedUsers} loading={isLoading} />
    </div>
  );
};

export default AllUsers;
