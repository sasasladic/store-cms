import DashboardComponent from "../features/dashboard/components/Dashboard";
import EditUserComponent from "../features/users/pages/EditUser";
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
    path: "/products",
    component: AllProductsComponent,
    title: "Products",
  },
  {
    path: "/user/:id",
    component: EditUserComponent,
    title: "Edit User",
  },
];

export default protectedRoutes;
