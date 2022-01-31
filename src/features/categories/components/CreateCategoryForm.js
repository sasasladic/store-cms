import { useEffect, useRef } from "react";
import {
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Box,
  Grid,
  Autocomplete,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  Select,
  InputLabel
} from "@mui/material";
import { useState } from "react";

const CreateCategoryForm = (props) => {
    const [selectedCategory, setSelectedCategory] = useState({
        id: props.category?.parent?.id ?? "",
        name: props.category?.parent?.name ?? "",
      });
  const [male, setMale] = useState(props.category ? (props.category.gender==1 || props.category.gender==3) : false);
  const [female, setFemale] = useState(props.category ? props.category.gender>=2 : false);
  const [categories, setCategories] = useState(props.categories);
  const allCategories = props.categories;
  const [isActive, setIsActive] = useState(props.category ? props.category.active : 1);
  const [categoryName, setCategoryName] = useState(props.category ? props.category.name.en : "");
  const [categoryDesc, setCategoryDesc] = useState(props.category ? props.category.description.en : "");
  const nameInputRef = useRef();
  const descInputRef = useRef();

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

        //odkomentarisi ovo ako ne radi 
        return category.gender === 1 || category.gender === 3;
      });
    }

    if (!male && female) {
      newCategories = newCategories.filter((category) => {
        // if (category.gender === 2 || category.gender === 3) {
        //   return category;
        // }

        //odkomentarisi ovo ako ne radi 
        return category.gender === 2 || category.gender === 3;
      });
    }

    setCategories(newCategories);
  }, [male, female, allCategories]);

  const handleCategoryChange = (event, value) => {
      console.log(value);
      if(!value) {
        setSelectedCategory({ id: "", name: "" });
      }else{
        setSelectedCategory({ id: value.id, name: value.name });
      }
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
    const enteredActive = isActive ? 1 : 0;
    const enteredDesc = descInputRef.current.value;
    const enteredParentCategory = selectedCategory.id;

    formData.append("name[en]", enteredName);
    formData.append("active", enteredActive);
    formData.append("description[en]", enteredDesc);
    formData.append("parent_id", enteredParentCategory);
    formData.append("gender_id", gender);

    for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
    props.onSubmitHandler(formData);
  }

  return (
    <form onSubmit={submitHandler}>
      <Card>
        <CardHeader subheader="Create category" title="Category" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <TextField
                  inputRef={nameInputRef}
                  fullWidth
                  label="Name"
                  name="name"
                  required
                  defaultValue={categoryName}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <TextField
                  inputRef={descInputRef}
                  fullWidth
                  label="Description"
                  name="description"
                  required
                  defaultValue={categoryDesc}
                  variant="outlined"
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
                        checked={male}
                        onChange={handleChangeMale}
                        name="male"
                      />
                    }
                    label="Male"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={female}
                        onChange={handleChangeFemale}
                        name="female"
                      />
                    }
                    label="Female"
                  />
                  <Autocomplete
                    style={{ width: "78%" }}
                    value={selectedCategory}
                    options={categories}
                    getOptionLabel={(option) => option.name ? option.name: ''}
                    onChange={handleCategoryChange}
                    renderInput={(params) => (
                      <TextField {...params} label="Parent category" />
                    )}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-status">Status</InputLabel>
                <Select
                  labelId="select-status"
                  id="active"
                  value={isActive || isActive === 0 ? isActive : " "}
                  label="Status"
                  onChange={(event) => {
                    setIsActive(event.target.value);
                  }}
                >
                  <MenuItem key={1} value={1}>
                    Active
                  </MenuItem>
                  <MenuItem key={0} value={0}>
                    Blocked
                  </MenuItem>
                </Select>
              </FormControl>
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
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default CreateCategoryForm;
