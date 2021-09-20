import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@material-ui/core/Container";
import Header from "../Header/Header";
import LeftSidebar from "../Sidebar/LeftSidebar";
import Copyright from "../Footer/Copyright";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    // backgroundColor: '#fff'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const MainNavigation = (props) => {
  const classes = useStyles();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDrawerOpen = () => {
    setSidebarOpen(true);
  };
  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };

  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header openedSidebar={sidebarOpen} openSidebar={handleDrawerOpen} />
      <LeftSidebar
        openedSidebar={sidebarOpen}
        closeSidebar={handleDrawerClose}
      />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#fff",
            }}
          >
            {props.children}
          </Box>

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default MainNavigation;
