import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const ShowCategories = () => {
  return (
    <>
      <Typography>Here show categories</Typography>
      <Outlet />
    </>
  );
};

export default ShowCategories;
