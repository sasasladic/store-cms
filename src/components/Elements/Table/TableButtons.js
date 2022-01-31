import React from "react";
import {
  TextField,
  Grid,
  Button,
  InputAdornment,
} from "@mui/material";
import { useHistory } from "react-router";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { grey } from "@mui/material/colors";

const TableButtons = (props) => {
  const history = useHistory();
  const arrowColor = grey["A700"]; // #e040fb

  return (
    // <Box sx={{ py: 4, px: 4 }}>
      <Grid container py={4} px={4} rowSpacing={1} >
        {props.backButton && (
          <Grid item md={12}>
            <Button
              sx={{ color: arrowColor, backgroundColor: "transparent" }}
              onClick={() => history.push(props.backButton.url)}
              startIcon={<ArrowBackIcon />}
            >
              {props.backButton.label}
            </Button>
          </Grid>
        )}

        <Grid
          container
          item
          justifyContent="flex-end"
          spacing={2}
          height="auto"
        >
          <Grid item>
            <TextField
              id="search"
              placeholder="Search...."
              size="small"
              onChange={props.searchChangeHandler}
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
          <Grid item>
            <Button
              variant="contained"
              color="success"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => history.push(props.addNewLink)}
            >
              Add new
            </Button>
          </Grid>
        </Grid>
      </Grid>
    // </Box>
  );
};

export default TableButtons;
