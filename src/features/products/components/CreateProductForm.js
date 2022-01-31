import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Switch,
  Box,
  Grid,
  Stack,
  Autocomplete,
} from "@mui/material";

const CreateProductForm = (props) => {
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    name: "",
  });
  const [isActive, setIsActive] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [female, setFemale] = useState(false);
  const [male, setMale] = useState(false);
  const [categories, setCategories] = useState(props.categories);
  const allCategories = props.categories;
  const nameInputRef = useRef();
  const descInputRef = useRef();

  const handleChangeStatus = (event) => {
    setIsActive(event.target.checked);
  };

  const handleChangeMale = () => {
    setMale(!male);
  };

  const handleChangeFemale = () => {
    setFemale(!female);
  };

  
  useEffect(() => {
    let newCategories = [...allCategories];
    if (male && !female) {
      newCategories = newCategories.filter((category) => {
        // if (category.gender === 1 || category.gender === 3) {
        //   return category;
        // }

        //odkomentarisi ovo gore ako ne radi
        return category.gender === 1 || category.gender === 3
      }
      );
    }

    if (!male && female) {
      newCategories = newCategories.filter((category) => {
        // if (category.gender === 2 || category.gender === 3) {
        //   return category;
        // }

        //odkomentarisi ovo gore ako ne radi
        return category.gender === 2 || category.gender === 3
      });
    }

    setCategories(newCategories);
  }, [male, female, allCategories]);

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
    setPreviewImages(newFiles);
    // setPreviewImages(URL.createObjectURL(event.target.files[0]));
  };

  function submitHandler(event) {
    event.preventDefault();

    let gender = 3;
    if(male && !female) {
       gender = 1;
    }
    if(!male && female) {
      gender = 2;
    }

    const formData = new FormData();

    const enteredName = nameInputRef.current.value;
    const enteredStatus = isActive ? 1 : 0;
    const enteredDes = descInputRef.current.value;
    const enteredCategory = selectedCategory.id;
    console.log(enteredName);
    formData.append("name[en]", enteredName);
    formData.append("active", enteredStatus);
    formData.append("description[en]", enteredDes);
    formData.append("category_id", enteredCategory);
    formData.append("gender", gender);
    for (const file of selectedImages) {
      formData.append("images[]", file);
    }

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // console.log(formData);
    props.onSubmitDetailsHandler(formData,event);
  }

  return (
    <form onSubmit={submitHandler} encType="multipart/form-data">
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              inputRef={nameInputRef}
              label="Name"
              name="name"
              required
              variant="outlined"
              disabled={props.disabledDetails}
            />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              // rowsMax={10}
              // rows={5}
              inputRef={descInputRef}
              multiline
              label="Description"
              name="description"
              required
              variant="outlined"
              disabled={props.disabledDetails}
            />
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            {/* <FormLabel component="legend">Gender</FormLabel> */}
            <FormGroup row spacing={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={gilad}
                    onChange={handleChangeMale}
                    name="male"
                  />
                }
                label="Male"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={gilad}
                    onChange={handleChangeFemale}
                    name="female"
                  />
                }
                label="Female"
              />
              <Autocomplete
                style={{ width: "78%" }}
                options={categories}
                getOptionLabel={(option) => option.name}
                onChange={handleCategoryChange}
                renderInput={(params) => (
                  <TextField {...params} label="Categories" />
                )}
              />
            </FormGroup>
          </FormControl>
        </Grid>
        {/* <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <Autocomplete
              disabled={props.disabledDetails}
              options={props.categories}
              getOptionLabel={(option) => option.name}
              onChange={handleCategoryChange}
              renderInput={(params) => (
                <TextField {...params} label="Categories" />
              )}
            />
          </FormControl>
        </Grid> */}
        <Grid item md={6} xs={12} alignItems="flex-start">
          <FormControlLabel
            required
            size="medium"
            labelPlacement="start"
            value="top"
            disabled={props.disabledDetails}
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
        <Grid item md={12} xs={12}>
          <input
            type="file"
            name="image"
            multiple
            onChange={onChangeImageHandler}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={4}
            sx={{ width: 256, height: 256 }}
          >
            {previewImages.map((imageSrc) => {
              return (
                <img
                  alt='product'
                  src={imageSrc}
                  style={{ width: "100%", maxHeight: "338px" }}
                  key={imageSrc}
                />
              );
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
        <Button
          type="submit"
          disabled={props.disabledDetails}
          color="success"
          variant="contained"
        >
          Save details
        </Button>
      </Box>
    </form>
  );
};

export default CreateProductForm;
