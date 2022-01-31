import React, { useState, useEffect } from "react";
import CreateUserForm from "../components/CreateUserForm";
import api from "../../../services/api";
import { useHistory } from "react-router";
import {Backdrop, CircularProgress} from "@mui/material";


const CreateUser = () => {
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();


    const showLoader = () => {
        setIsLoading(true);
      };
    const hideLoader = () => {
      setIsLoading(false);
    };


    useEffect(() => {
        const getData = async () => {
          showLoader();
          try {
            const response = await api(history)({ url: "/user/create"});
            setRoles(response.data.data);
          } catch (error) {
            alert(error.response.data.message);
          }
          hideLoader();
        };
    
        getData();
      }, [history]);

      function createUserHandler(userData) {
    
        const sendPostRequest = async (userData) => {
          try {
            const response = await api()("/user", {
              method: "post",
              data: userData,
            });
    
            if (response.data.success === true) {
              alert(response.data.message);
    
              history.replace('/users');
            } else {
              //Red alert
              alert(response.data.message);
            }
          } catch (err) {
            // Handle Error Here
            console.error(err);
          }
        };
    
        sendPostRequest(userData);
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

    return (
        <CreateUserForm roles={roles} onSubmitHandler={createUserHandler} />
    );  

};

export default CreateUser;