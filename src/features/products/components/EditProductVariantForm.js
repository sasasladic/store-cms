import React, { useRef } from "react";
import {
  TextField,
  Card,
  CardHeader,
  CardContent,
  Stack,
  InputLabel,
  InputAdornment,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { grey } from "@mui/material/colors";
import { useHistory } from "react-router";

const EditProductVariantForm = (props) => {
  console.log(props);

  const skuInputRef = useRef();
  const priceInputRef = useRef();
  const inStockInputRef = useRef();
  const arrowColor = grey["A700"]; // #e040fb
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredSku = skuInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredInStock = inStockInputRef.current.value;

    const variantData = {
      variant_data: {
        id: props.data.id,
        sku: enteredSku,
        price: enteredPrice,
        in_stock: enteredInStock,
      },
      variant_values: props.data.option_values,
    };
    props.onSubmitHandler(variantData);
  };
  return (
    <Card>
      <Button
        sx={{ color: arrowColor, backgroundColor: "transparent" }}
        onClick={() => history.goBack()}
        startIcon={<ArrowBackIcon />}
      />
      <CardHeader title="Edit product variant"></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            ml={10}
            mt={5}
          >
            <Stack direction="row" alignItems="center" spacing={4}>
              <InputLabel style={{ minWidth: "60px" }}> SKU </InputLabel>
              <TextField
                size="small"
                defaultValue={props.data.sku}
                style={{ minWidth: "227px" }}
                inputRef={skuInputRef}
              />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={4}>
              <InputLabel style={{ minWidth: "60px" }}> Price </InputLabel>
              <TextField
                type="number"
                inputProps={{
                  step: ".1",
                }}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">€</InputAdornment>
                  ),
                }}
                inputRef={priceInputRef}
                defaultValue={props.data.price}
              />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={4}>
              <InputLabel style={{ minWidth: "60px" }}> InStock </InputLabel>
              <TextField
                size="small"
                defaultValue={props.data.in_stock}
                style={{ minWidth: "227px" }}
                inputRef={inStockInputRef}
              />
            </Stack>
            <Button type="submit" color="success" variant="contained" mt={5}>
              Update
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};
export default EditProductVariantForm;
