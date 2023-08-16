import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const ShowCatalog = () => {
  return (
    <>
      <Typography>Here show catalog</Typography>
      <Outlet />
    </>
  );
};

export default ShowCatalog;
