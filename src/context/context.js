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
});

export default ApiContext;
