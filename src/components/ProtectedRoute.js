// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to. (possibily determine roles)

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, { useContext } from "react";
import AuthContext from "../store/auth-context";

import { Redirect, Route } from "react-router-dom";
import Layout from "./Layout/Layout";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  const authCtx = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        authCtx.isLoggedIn ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;