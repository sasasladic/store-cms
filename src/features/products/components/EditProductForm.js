import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import {
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Switch,
  Box,
  Grid,
  Stack,
  Autocomplete,
  Typography,
} from "@mui/material";

const EditProductForm = (props) => {
  const [isActive, setIsActive] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [oldImages, setOldImages] = useState(props.data.images ?? []);
  const [selectedCategory, setSelectedCategory] = useState(props.data.category);

  const handleChangeStatus = (event) => {
    setIsActive(event.target.checked);
  };

  const handleCategoryChange = (event, value) => {
    setSelectedCategory({ id: value.id, name: value.name });
  };

  const onChangeImageHandler = (event) => {
    setSelectedImages(event.target.files);
    const files = Array.from(event.target.files);
    console.log(files);
    const newFiles = [];
    files.map((file) => {
      return newFiles.push(URL.createObjectURL(file));
    });
    // setPreviewImages(newFiles);
    // setPreviewImages(URL.createObjectURL(event.target.files[0]));
  };

  const deleteImageHandler = (imageId) => {
    console.log(imageId);
  }

  return (
    <form encType="multipart/form-data">
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              //   inputRef={nameInputRef}
              label="Name"
              name="name"
              required
              variant="outlined"
              defaultValue={props.data.name}
            />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              // rowsMax={10}
              // rows={5}
              // inputRef={descInputRef}
              multiline
              label="Description"
              name="description"
              required
              variant="outlined"
              defaultValue={props.data.description}
            />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <Autocomplete
              value={selectedCategory}
              options={props.categories}
              getOptionLabel={(option) => option.name}
              onChange={handleCategoryChange}
              renderInput={(params) => (
                <TextField {...params} label="Categories" />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12} alignItems="flex-start">
          <FormControlLabel
            required
            size="medium"
            labelPlacement="start"
            value="top"
            control={
              <Switch
                checked={isActive}
                onChange={handleChangeStatus}
                ml={2}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Active"
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <Stack direction="column" alignItems="start" spacing={4}>
            <label htmlFor="image">New images</label>
            <input
              type="file"
              name="image"
              multiple
              onChange={onChangeImageHandler}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={4}
            sx={{ width: 256, height: 256 }}
          >
            {/* {oldImages.map((image) => {
              return [
                <span>x</span>,
                <img
                  src={image.src}
                  style={{
                    width: "100%",
                    height: "auto",
                    border: "1px solid",
                  }}
                />,
              ];
            })} */}
          </Stack>
        </Grid>

        <Grid item md={6} xs={12}>
        <Typography>Existing images</Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={4}
            sx={{ width: 256, height: 256 }}
          >
            {oldImages.map((image) => {
              return [
                <img
                alt='product'
                  src={image.src}
                  style={{
                    width: "100%",
                    height: "auto",
                    border: "1px solid",
                  }}
                />,
                <Button variant="text" size="small" onClick={() => deleteImageHandler(image.id)} sx={{ml: '0 !important'}}>x</Button>
              ];
            })}
          </Stack>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 3,
        }}
      >
        <Button type="submit" color="success" variant="contained">
          Update details
        </Button>
      </Box>
    </form>
  );
};

export default EditProductForm;
