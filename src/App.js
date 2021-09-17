import { Route, Switch } from "react-router";
import LoginPage from "./features/auth/pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./features/dashboard/components/Dashboard";
import EditUser from "./features/users/pages/EditUser";
import AllUsers from "./features/users/pages/AllUsers";
import AllProducts from "./features/products/pages/AllProducts.";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <PrivateRoute path="/" exact component={Dashboard} />
        <PrivateRoute path="/users" exact component={AllUsers} />
        <PrivateRoute path="/products" exact component={AllProducts} />
        <PrivateRoute path="/user/:id" exact component={EditUser} />

      </Switch>
    </div>
  );
}

export default App;
