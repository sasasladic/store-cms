import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  FormControl,
  IconButton,
  ListItem,
  Chip,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const CreateAttributeForm = (props) => {
  console.log({ props });
  const [attributeValues, setAttributeValues] = useState([
    {
      id: uuidv4(),
      value: "",
    },
  ]);

  const [name, setName] = useState(
    props.attributes ? props.attributes.name : ""
  );

  useEffect(() => {
    if (props.attributes && props.attributes.values.length > 0) {
      let attrs = props.attributes.values.map((item) => ({
        id: item.id,
        value: item.value,
      }));
      setAttributeValues(attrs);
    }
  }, []);

  const handleAddAttributeValues = () => {
    setAttributeValues([
      ...attributeValues,
      {
        id: uuidv4(),
        value: "sasa",
      },
    ]);
  };

  const handleRemoveAttributeValues = (attributeValueId) => {
    setAttributeValues(
      attributeValues.filter((item) => {
        return item.id !== attributeValueId;
      })
    );
  };

  function handleSubmit(e) {
    e.preventDefault();

    const attributesData = {
      name: name,
      values: attributeValues.map((i) => ({
        value: i.value,
      })),
    };

    props.onSubmitAttributesHandler(attributesData);
  }

  function handleChangeAttributeValue(valueId, event) {
    const newAttributeValues = attributeValues.map((value) => {
      if (valueId === value.id) {
        value.value = event.target.value;
      }
      return value;
    });

    setAttributeValues(newAttributeValues);
  }

  function handleAddNewInput(event) {
    if (event.key === "Enter") {
      handleAddAttributeValues();
    }
  }

  function handleChangeName(name) {
    setName(name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Create attribute" title="Attribute" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={2} xs={12}>
              <FormControl fullWidth>
                <TextField
                  // inputRef={nameInputRef}
                  fullWidth
                  label="Name"
                  name="name"
                  required
                  defaultValue={name}
                  variant="outlined"
                  onChange={(e) => handleChangeName(e.target.value)}
                  // size="small"
                />
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <Card variant="outlined">
                <CardHeader
                  subheader="Add values"
                  //   title="Values"
                  sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
                />
                <CardContent>
                  {attributeValues.map((value) => (
                    <Grid
                      container
                      mb={2}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      key={value.id}
                    >
                      <Grid item md={6}>
                        <FormControl fullWidth>
                          <TextField
                            // inputRef={nameInputRef}
                            fullWidth
                            label="Value"
                            // name="name"
                            required
                            variant="outlined"
                            defaultValue={value.value}
                            onKeyPress={handleAddNewInput}
                            onChange={(event) =>
                              handleChangeAttributeValue(value.id, event)
                            }
                            // size="small"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item md={2}>
                        <IconButton
                          disabled={attributeValues.length === 1}
                          onClick={() => handleRemoveAttributeValues(value.id)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <IconButton onClick={() => handleAddAttributeValues()}>
                          <AddIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
        {/* <Divider spacing={3}/> */}
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
      </Card>
    </form>
  );
};

export default CreateAttributeForm;
