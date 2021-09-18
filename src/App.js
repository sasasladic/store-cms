import React from "react";
import { Route, Switch } from "react-router";
import LoginPage from "./features/auth/pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import protectedRoutes from "./routes/protected";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        {protectedRoutes.map((route, index) => (
          <PrivateRoute
            key={index}
            path={route.path}
            exact
            component={route.component}
          ></PrivateRoute>
        ))}

        {/* <PrivateRoute path="/" exact component={Dashboard} />
        <PrivateRoute path="/users" exact component={AllUsers} />
        <PrivateRoute path="/products" exact component={AllProducts} />
        <PrivateRoute path="/user/:id" exact component={EditUser} /> */}
      </Switch>
    </div>
  );
}

export default App;
