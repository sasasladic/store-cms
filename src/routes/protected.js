import DashboardComponent from "../features/dashboard/components/Dashboard";
import EditUserComponent from "../features/users/pages/EditUser";
import CreateUserComponent from "../features/users/pages/CreateUser";
import AllUsersComponent from "../features/users/pages/AllUsers";
import AllProductsComponent from "../features/products/pages/AllProducts";

const protectedRoutes = [
  {
    path: "/",
    component: DashboardComponent,
    title: "Dashboard",
  },
  {
    path: "/users",
    component: AllUsersComponent,
    title: "Users",
  },
  {
    path: "/user/create",
    component: CreateUserComponent,
    title: "Create User",
  },
  {
    path: "/user/:id",
    component: EditUserComponent,
    title: "Edit User",
  },
  {
    path: "/products",
    component: AllProductsComponent,
    title: "Products",
  }
];

export default protectedRoutes;
