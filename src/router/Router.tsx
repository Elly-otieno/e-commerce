import { Routes, Route } from "react-router";
import Landing from "../pages/Landing";
import Product from "../pages/Product";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import UsersList from "../pages/dashboard/UsersList";
import PATHS from "./paths";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";
import SingleProduct from "../pages/SingleProduct";
import AddProducts from "../pages/dashboard/AddProducts";
import ManageProducts from "../pages/dashboard/ManageProducts";
import ManageOrders from "../pages/dashboard/ManageOrders";

const Router = () => {
  return (
    <Routes>
      <Route path={PATHS.landing} element={<Landing />} />
      <Route path={PATHS.products.index} element={<Product />} />
      <Route path={PATHS.products.product} element={<SingleProduct />} />
      <Route path={PATHS.login} element={<Login />} />
      <Route path={PATHS.cart} element={<Cart />} />
      <Route path={PATHS.error} element={<NotFound />} />
      <Route element={<PrivateRoute />}>
        <Route path={PATHS.dashboard.index} element={<DashboardIndex />} />
        <Route path={PATHS.dashboard.usersList} element={<UsersList />} />
        <Route path={PATHS.dashboard.addProducts} element={<AddProducts />} />
        <Route path={PATHS.dashboard.manageProducts} element={<ManageProducts />} />
        <Route path={PATHS.dashboard.manageOrders} element={<ManageOrders />} />
      </Route>
    </Routes>
  );
};

export default Router;
