import "./App.css";
import { useEffect, useState } from "react";
import { useLocalStorageState } from "ahooks";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Location } from "react-router-dom";
import { orderesData } from "../../data/ordersData";

import ApiContext from "../../context/context";
import LoginPage from "../login/login";

import { Typography } from "@mui/material";
import Layout from "../layout/layout";
import { Box } from "@mui/system";

import ShowOrders from "../orders/orders";
import ShowProducts from "../products/products";
import ShowCategories from "../categories/categories";
import ShowFlials from "../flials/flials";
import ShowCustomers from "../customers/customer";
import ShowReports from "../reports/reports";
import ShowEmployees from "../employees/employees";
import ShowCatalog from "../catalog/catalog";
import categoriesData from "../../data/categoryData";
import productsData from "../../data/productsData";

function App() {
  const [orders, setOrders] = useState([...orderesData]);
  const [categories, setCategories] = useState([...categoriesData]);
  const [products, setProducts] = useState([...productsData]);

  const [adminActivated, setAdminActivated] = useLocalStorageState("logged", {
    defaultValue: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  console.log("");

  useEffect(() => {
    if (adminActivated && location.pathname === "/login") navigate("/");
    else if (!adminActivated) navigate("/login");
  }, [adminActivated]);

  return (
    <Box>
      <ApiContext.Provider
        value={{
          orders,
          setOrders,
          categories,
          setCategories,
          products,
          setProducts,
        }}
      >
        <Routes>
          <Route
            path="/login"
            element={<LoginPage setAdminActivated={setAdminActivated} />}
          ></Route>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<ShowOrders />} />
            <Route path="/products" element={<ShowProducts />} />
            <Route path="/categories" element={<ShowCategories />} />
            <Route path="/flials" element={<ShowFlials />} />
            <Route path="/customers" element={<ShowCustomers />} />
            <Route path="/reports" element={<ShowReports />} />
            <Route path="/employees" element={<ShowEmployees />} />
            <Route path="/catalog" element={<ShowCatalog />} />
          </Route>
        </Routes>
      </ApiContext.Provider>
    </Box>
  );
}

export default App;
