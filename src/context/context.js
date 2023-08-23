import { createContext } from "react";

const ApiContext = createContext({
  orders: [],
  setOrders: (orders) => {},
  categories: [],
  setCategories: (products) => {},
  products: [],
  setProducts: (products) => {},
  rootCategories: [],
  setRootCategories: (rootCategories) => {},
  flials: [],
  setFlials: (flials) => {},
  customers: [],
  setCustomers: (customers) => {},
});

export default ApiContext;
