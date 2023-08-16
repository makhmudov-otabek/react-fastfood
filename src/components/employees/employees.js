import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const ShowEmployees = () => {
  return (
    <>
      <Typography>Here show employees</Typography>
      <Outlet />
    </>
  );
};

export default ShowEmployees;
