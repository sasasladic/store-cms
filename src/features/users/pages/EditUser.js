import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditUserForm from "../components/EditUserForm";
import api from "../../../services/api";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const EditUser = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const showLoader = () => {
    setIsLoading(true);
  };
  const hideLoader = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const getUserDetails = async () => {
      showLoader();
      try {
        const response = await api()({ url: "/user/" + id + "/edit" });
        setData(response.data.data);
        setRoles(response.data.role);
      } catch (error) {
        alert(error.response.data.message);
      }
      hideLoader();
    };

    getUserDetails();
  }, [id]);

  function updateUserHandler(userData) {
    
    const sendPostRequest = async (userData) => {
      try {
        const response = await api()("/user/" + id, {
          method: "patch",
          data: userData,
        });

        if (response.data.success === true) {
          alert(response.data.message);

          //   Maybe history.replace('/users');
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
    <EditUserForm data={data} roles={roles} onEditUser={updateUserHandler} />
  );
};

export default EditUser;
