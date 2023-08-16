import { createContext } from "react";

const ApiContext = createContext({
  orders: [],
  setOrders: (orders) => {},
  categories: [],
  setCategories: (products) => {},
  products: [],
  setProducts: (products) => {},
});

export default ApiContext;
