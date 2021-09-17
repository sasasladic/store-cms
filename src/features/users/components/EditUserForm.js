import { useState, useRef } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Card, CardContent, CardHeader, Grid } from "@material-ui/core";

const EditUserForm = (props) => {
  const [selectedRole, setSelectedRole] = useState(props.data.role.id);
  const [isActive, setIsActive] = useState(props.data.active);

  const nameInputRef = useRef();
  const emailInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    const userData = {
      name: enteredName,
      email: enteredEmail,
      role_id: selectedRole,
      active: isActive,
    };

    props.onEditUser(userData);
  }

  return (
    <form onSubmit={submitHandler}>
      <Card>
        <CardHeader subheader="Update user information" title="Profile" />
        {/* <Divider /> */}
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
                  defaultValue={props.data.name}
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
                  defaultValue={props.data.email ?? ""}
                  variant="outlined"
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
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  disabled
                  label="Updated At"
                  name="updated_at"
                  required
                  value={props.data.updated_at}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  disabled
                  label="Updated By"
                  name="updated_by"
                  required
                  value={props.data.updated_by}
                  variant="outlined"
                />
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

export default EditUserForm;
