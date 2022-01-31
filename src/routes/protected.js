import DashboardComponent from "../features/dashboard/components/Dashboard";
import EditUserComponent from "../features/users/pages/EditUser";
import CreateUserComponent from "../features/users/pages/CreateUser";
import CreateCategoryComponent from "../features/categories/pages/CreateCategory";
import EditCategoryComponent from "../features/categories/pages/UpdateCategory";
import AllUsersComponent from "../features/users/pages/AllUsers";
import ShowUserComponent from "../features/users/pages/ShowUser";
import AllProductsComponent from "../features/products/pages/AllProducts";
import CreateProductComponent from "../features/products/pages/CreateProduct";
import EditProductComponent from "../features/products/pages/EditProduct";
import AllProductVariantsComponent from "../features/products/pages/AllProductVariants";
import CreateProductVariantsComponent from "../features/products/pages/CreateProductVariants";
import EditProductVariantComponent from "../features/products/pages/EditProductVariant";
import AllCategoriesComponent from "../features/categories/pages/AllCategories";
import AllAttributesComponent from "../features/attributes/pages/AllAttributes";
import CreateAttributeComponent from "../features/attributes/pages/CreateAttribute";
import EditAttributeComponent from "../features/attributes/pages/EditAttribute";


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
    path: "/user/:id/show",
    component: ShowUserComponent,
    title: "Show User",
  },
  {
    path: "/products",
    component: AllProductsComponent,
    title: "Products",
  },
  {
    path: "/product/create",
    component: CreateProductComponent,
    title: "Create product",
  },
  {
    path: "/product/:id",
    component: EditProductComponent,
    title: "Edit product",
  },
  {
    path: "/product/:id/variants",
    component: AllProductVariantsComponent,
    title: "Product variants",
  },
  {
    path: "/product/:id/variants/create",
    component: CreateProductVariantsComponent,
    title: "Product variant create",
  },
  {
    path: "/product/:productId/variant/:id",
    component: EditProductVariantComponent,
    title: "Product variant edit",
  },
  {
    path: "/categories",
    component: AllCategoriesComponent,
    title: "All Categories",
  },
  {
    path: "/category/create",
    component: CreateCategoryComponent,
    title: "Create category",
  },
  {
    path: "/category/:id",
    component: EditCategoryComponent,
    title: "Edit category",
  },
  {
    path: "/attributes",
    component: AllAttributesComponent,
    title: "All Attributes",
  },
  {
    path: "/attribute/:id",
    component: EditAttributeComponent,
    title: "Edit Attribute",
  },
  {
    path: "/attribute/create",
    component: CreateAttributeComponent,
    title: "Create Attribute",
  },
];

export default protectedRoutes;
