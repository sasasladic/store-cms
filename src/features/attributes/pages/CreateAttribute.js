import React from "react";
import CreateAttributeForm from "../components/CreateAttributeForm";
import api from "../../../services/api";
import { useHistory } from "react-router";

const CreateAttribute = () => {

    const history = useHistory();


    function submitAttributesHandler(attributeData) {
        const saveAttributes = async (attributeData) => {
          try {
            const response = await api()("/option", {
              method: "post",
              data: attributeData,
            });
    
            console.log(response);
            if (response.data.success === true) {
              alert("Successfully created attribute");
              history.goBack();
            } else {
              //Red alert
              alert(response.data.message);
            }
          } catch (err) {
            // Handle Error Here
            console.error(err);
          }
        };
    
        saveAttributes(attributeData);
      }

    return (
        <CreateAttributeForm onSubmitAttributesHandler={submitAttributesHandler}/>
    );
}

export default CreateAttribute;