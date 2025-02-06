import { Routes, Route } from "react-router";
import Landing from "../pages/Landing";
import Product from "../pages/Product";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import UsersList from "../pages/dashboard/UsersList";
import PATHS from "./paths";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Cart from "../pages/Cart";

const Router = () => {
  return (
    <Routes>
      <Route path={PATHS.landing} element={<Landing />} />
      <Route path={PATHS.products} element={<Product />} />
      <Route path={PATHS.login} element={<Login />} />
      <Route path={PATHS.cart} element={<Cart />} />
      <Route element={<PrivateRoute />}>
        <Route path={PATHS.dashboard.index} element={<DashboardIndex />} />
        <Route path={PATHS.dashboard.usersList} element={<UsersList />} />
      </Route>
    </Routes>
  );
};

export default Router;
