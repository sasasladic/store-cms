
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://material-ui.com/">
            Store App
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      );
};

export default Copyright;