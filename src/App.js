import React from "react";
import { Route, Switch } from "react-router";
import LoginPage from "./features/auth/pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import protectedRoutes from "./routes/protected";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        {protectedRoutes.map((route, index) => (
          <ProtectedRoute
            key={index}
            path={route.path}
            exact
            component={route.component}
            title={route.title}
          ></ProtectedRoute>
        ))}
      </Switch>
    </div>
  );
}

export default App;
