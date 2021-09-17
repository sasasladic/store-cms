import { useRef, useContext, useState } from "react";
import clsx from "clsx";
import { useHistory } from "react-router";
import api from "../../../services/api";
import AuthContext from "../../../store/auth-context";
import { green, red } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../../../components/Footer/Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: red[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}));

const LoginForm = () => {
  const history = useHistory();
  const classes = useStyles();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const sendPostRequest = async () => {
      
      try {
        setIsLoading(true);
        setSuccess(false);
        const response = await api("/admin-api/login", {
          method: "post",
          data: { email: enteredEmail, password: enteredPassword},
        });

        if (response.data.success === true) {
          setSuccess(true);
          authCtx.login(response.data.data.token);
          history.replace("/");

          //   Maybe history.replace('/users');
        }
      } catch (error) {
        // Handle Error Here
        console.log(error);
      }
      setIsLoading(false);
    };

    sendPostRequest();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailInputRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordInputRef}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <div className={classes.wrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              className={buttonClassname}
            >
              Sign In
            </Button>
            {isLoading && (
              <CircularProgress size={28} className={classes.buttonProgress} />
            )}
          </div>

          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default LoginForm;
