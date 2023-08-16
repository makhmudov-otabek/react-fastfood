import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const ShowFlials = () => {
  return (
    <>
      <Typography>Here show flials</Typography>
      <Outlet />
    </>
  );
};

export default ShowFlials;
