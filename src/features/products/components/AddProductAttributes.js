import React, { useState } from "react";
import {
  Button,
  TextField,
  IconButton,
  Box,
  Grid,
  Stack,
  Divider,
  Autocomplete,
} from "@mui/material";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const CreateProductVariantForm = (props) => {

  const [attributes, setAttributes] = useState([
    {
      id: uuidv4(),
      attributes_data: { id: "", name: ""},
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(attributes);

    const productAttributes = {
      attributes: attributes
    };
    console.log(productAttributes);
    props.onSubmitOptionsHandler(productAttributes);
  };

  const handleChangeAttribute = (attributeId, value) => {
    const newAttributes = attributes.map((attribute) => {
      if (attributeId === attribute.id) {
        attribute.attributes_data = value;
      }
      return attribute;
    });
    setAttributes(newAttributes);
    // const changedAttributes = offeredAttributes.filter(function( obj ) {
    //   return obj.id !== attributeId;
    // });
    // setOfferedAttributes(changedAttributes);
  };

  const handleAddAttributes = () => {
    setAttributes([
      ...attributes,
      {
        id: uuidv4(),
        attributes_data: { id: "", name: ""},
      },
    ]);
  }

  const handleRemoveAttributes = (attributeId) => {
    const newAttributes = [...attributes];
    newAttributes.splice(
      newAttributes.findIndex((attribute) => attribute.id === attributeId),
      1
    );

    setAttributes(newAttributes);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "35px" }}>
      <Grid container>
        {attributes.map((attribute) => (
          <Grid item md={3} xs={12} key={attribute.id} mb={5}>  
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={1}
                  // key={attribute.id}
                >
                      <Grid item md={5} xs={12}>
                            <Autocomplete
                            fullWidth
                              options={props.attributes}
                              getOptionLabel={(option) =>
                                capitalizeFirstLetter(option.name)
                              }
                              isOptionEqualToValue={(option, value) => option.id === value.id}
                              onChange={(event, value) =>
                                handleChangeAttribute(
                                  attribute.id,
                                  value
                                )
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Attribute"
                                  size="small"
                                  required
                                />
                              )}
                            />
                      </Grid>
                  <Box>
                    <IconButton
                      disabled={attribute.length === 1}
                      onClick={() => handleRemoveAttributes(attribute.id)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton onClick={handleAddAttributes}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Stack>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 3,
        }}
      >
        <Button type="submit" color="success" variant="contained">
          Save attributes
        </Button>
      </Box>
    </form>
  );
};

export default CreateProductVariantForm;
