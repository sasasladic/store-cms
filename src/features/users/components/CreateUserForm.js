import { useState, useRef } from "react";

import {Button, TextField, Select, InputLabel, MenuItem, FormControl, Box, Card, CardContent, CardHeader, Grid  } from "@mui/material";

const CreateUserForm = (props) => {
  const [selectedRole, setSelectedRole] = useState(1);
  const [isActive, setIsActive] = useState(1);

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passInputRef.current.value;


    const userData = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      role_id: selectedRole,
      active: isActive,
    };

    props.onSubmitHandler(userData);
  }

  return (
    <form onSubmit={submitHandler}>
      <Card>
        <CardHeader subheader="Create user" title="Profile" />
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
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <TextField
                  inputRef={emailInputRef}
                  fullWidth
                  label="Email Address"
                  name="email"
                  required
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <TextField
                  inputRef={passInputRef}
                  fullWidth
                  label="Password"
                  name="password"
                  required
                  variant="outlined"
                  type="password"
                />
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
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-name-label">Role</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="role"
                  value={selectedRole ? selectedRole : " "}
                  label="Role"
                  // input={<OutlinedInput label="Name" />}
                  onChange={(event) => {
                    setSelectedRole(event.target.value);
                  }}
                >
                  {props.roles.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
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

export default CreateUserForm;
