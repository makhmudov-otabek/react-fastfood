import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const ShowProducts = () => {
  return (
    <>
      <Typography>Here show products</Typography>
      <Outlet />
    </>
  );
};

export default ShowProducts;
