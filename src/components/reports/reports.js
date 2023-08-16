import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const ShowReports = () => {
  return (
    <>
      <Typography>Here show reports</Typography>
      <Outlet />
    </>
  );
};

export default ShowReports;
