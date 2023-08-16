import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const ShowCustomers = () => {
  return (
    <>
      <Typography>Here show customer</Typography>
      <Outlet />
    </>
  );
};

export default ShowCustomers;
