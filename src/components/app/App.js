import "./App.css";
import { useEffect, useState } from "react";
import { useLocalStorageState } from "ahooks";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { orderesData } from "../../data/ordersData";

import ApiContext from "../../context/context";
import LoginPage from "../login/login";

import Layout from "../layout/layout";
import { Box } from "@mui/system";

import ShowOrders from "../orders/orders";
import ShowProducts from "../products/products";
import ShowCategories from "../categories/categories";
import ShowFlials from "../flials/flials";
import ShowCustomers from "../customers/customers";
import ShowReports from "../reports/reports";
import ShowEmployees from "../employees/employees";
import ShowCatalog from "../catalog/catalog";
import categoriesData from "../../data/categoryData";
import productsData from "../../data/productsData";
import rootCategoriesData from "../../data/rootCategory";
import flialsData from "../../data/fliallar";
import { customersData } from "../../data/customersData";
import _Location from "../map/map";

function App() {
  const [orders, setOrders] = useState([...orderesData]);
  const [categories, setCategories] = useState([...categoriesData]);
  const [rootCategories, setRootCategories] = useState([...rootCategoriesData]);
  const [flials, setFlials] = useState([...flialsData]);
  const [customers, setCustomers] = useState([...customersData]);

  const [products, setProducts] = useState([...productsData]);

  const [adminActivated, setAdminActivated] = useLocalStorageState("logged", {
    defaultValue: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

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
          rootCategories,
          setRootCategories,
          products,
          setProducts,
          flials,
          setFlials,
          customers,
          setCustomers,
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
            <Route path="/location" element={<_Location />} />
          </Route>
        </Routes>
      </ApiContext.Provider>
    </Box>
  );
}

export default App;
