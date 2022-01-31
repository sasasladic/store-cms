import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import {
  Button,
  TextField,
  IconButton,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  InputAdornment,
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
  const [variants, setVariants] = useState([
    {
      id: uuidv4(),
      variant_data: { sku: "", price: 0, in_stock: 0 },
      variant_values: [{ id: uuidv4(), option_id: "", value: "" }],
    },
  ]);

  const [selectedAttributeId, setSelectedAttributeId] = useState(null);
  const [attributeValues, setAttributeValues] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      variants: variants
    };
    console.log(productData);
    props.onSubmitAttributesHandler(productData);
  };

  const handleChangeVariant = (variantId, event) => {
    const newVariants = variants.map((variant) => {
      if (variantId === variant.id) {
        if (event.target.valueAsNumber) {
          variant.variant_data[event.target.name] = event.target.valueAsNumber;
        } else {
          variant.variant_data[event.target.name] = event.target.value;
        }
      }
      return variant;
    });
    setVariants(newVariants);
  };

  useEffect(() => {
    const getAttributeValues = async () => {
      try {
        const response = await api()({ url: `/option/values/select?filter[option.id]=${selectedAttributeId}`});
        setAttributeValues(response.data.data);
        console.log(response);
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    if(selectedAttributeId) {
      getAttributeValues();
    }
  }, [selectedAttributeId]);

  const handleChangeVariantValues = (
    variantId,
    variantValueId,
    event,
    value,
    fieldName
  ) => {

    const newVariants = variants.map((variant) => {
      if (variantId === variant.id) {
        variant.variant_values.map((variantValue) => {
          if (variantValueId === variantValue.id) {
            if (fieldName === 'option_id') {
              variantValue[fieldName] = value ? value.id : null; //don't know the way how to put name
              // if(!value) {
              //   setSelectedAttributeId(null);
              // }
              setSelectedAttributeId(value?.id);
              if(!value) {
                setAttributeValues([]);
              }
            } else {
              variantValue[fieldName] = value ? value.value : null;
            }
          }

          return variantValue;
        });
      }
      return variant;
    });

    setVariants(newVariants);
  };

  const handleAddVariants = () => {
    setVariants([
      ...variants,
      {
        id: uuidv4(),
        variant_data: { sku: "", price: 0, in_stock: 0 },
        variant_values: [{ id: uuidv4(), option_id: "", value: "" }],
      },
    ]);
  };

  const handleAddVariantValues = (variantId) => {
    const values = [...variants];

    values.map((variant) => {
      if (variant.id === variantId) {
        variant.variant_values.push({ id: uuidv4(), option_id: "", value: "" });
      }
      return variant;
    });
    setVariants(values);
  };

  const handleRemoveVariantValues = (variantId, variantValueId) => {
    const newVariants = [...variants];
    newVariants.map((variant) => {
      if (variant.id === variantId) {
        variant.variant_values.splice(
          variant.variant_values.findIndex(
            (value) => value.id === variantValueId
          ),
          1
        );
      }
      return variant;
    });

    setVariants(newVariants);
  };

  const handleRemoveVariant = (variantId) => {
    const newVariants = [...variants];
    newVariants.splice(
      newVariants.findIndex((variant) => variant.id === variantId),
      1
    );

    setVariants(newVariants);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={10}>
        {variants.map((variant) => (
          <Grid item md={5} xs={12} key={variant.id}>
            <Card variant="outlined">
              <CardHeader
                subheader="Configure attributes"
                title="Product variant"
                sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
              />
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                  key={variant.id}
                >
                  <Box>
                    <Grid container rowSpacing={4}>
                      <Grid container item>
                        <TextField
                          label="SKU"
                          name="sku"
                          required
                          variant="outlined"
                          size="small"
                          onChange={(event) =>
                            handleChangeVariant(variant.id, event)
                          }
                        />
                      </Grid>
                      <Grid item md={5} xs={12}>
                        <TextField
                          label="In Stock"
                          name="in_stock"
                          required
                          type="number"
                          variant="outlined"
                          size="small"
                          onChange={(event) =>
                            handleChangeVariant(variant.id, event)
                          }
                        />
                      </Grid>

                      <Grid item md={5} xs={12}>
                        <TextField
                          label="Price"
                          name="price"
                          required
                          type="number"
                          inputProps={{
                            step: ".1",
                          }}
                          variant="outlined"
                          size="small"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">€</InputAdornment>
                            ),
                          }}
                          onChange={(event) =>
                            handleChangeVariant(variant.id, event)
                          }
                        />
                      </Grid>

                      {variant.variant_values.map((variantValue) => (
                        <Grid container item key={variantValue.id}>
                          <Grid item md={5} xs={12}>
                            <Autocomplete
                              options={props.attributes}
                              getOptionLabel={(option) =>
                                capitalizeFirstLetter(option.name)
                              }
                              isOptionEqualToValue={(option, value) => option.id === value.id}
                              onChange={(event, value) =>
                                handleChangeVariantValues(
                                  variant.id,
                                  variantValue.id,
                                  event,
                                  value,
                                  'option_id'
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
                          <Grid item md={5} xs={12}>
                          <Autocomplete
                              options={attributeValues}
                              getOptionLabel={(option) =>
                                option.value
                              }
                              //isOptionEqualToValue={(option, value) => option.id === value.id} -- ne pije vodu
                              disabled={attributeValues.length === 0 }
                              onChange={(event, value) =>
                                handleChangeVariantValues(
                                  variant.id,
                                  variantValue.id,
                                  event,
                                  value,
                                  'value'
                                )
                              }
                              filterSelectedOptions
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Attribute value"
                                  size="small"
                                  required
                                />
                              )}
                            />
                          </Grid>
                          <Grid item>
                            <IconButton
                              disabled={variant.variant_values.length === 1}
                              onClick={() =>
                                handleRemoveVariantValues(
                                  variant.id,
                                  variantValue.id
                                )
                              }
                            >
                              <RemoveIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleAddVariantValues(variant.id)}
                            >
                              <AddIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Box>
                    <IconButton
                      disabled={variants.length === 1}
                      onClick={() => handleRemoveVariant(variant.id)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton onClick={handleAddVariants}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
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
