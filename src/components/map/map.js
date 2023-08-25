import * as React from "react";
import { Box } from "@mui/material";

function _Location(props) {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          flex: 1,
          padding: "20px 50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      ></Box>

      <Box sx={{ padding: "30px" }}>
        <iframe
          title="Bu yerda xarita"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2555394.8632514393!2d64.2585413633476!3d40.60090606014855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2s!4v1692778597203!5m2!1sru!2s"
          style={{
            width: "100%",
            height: "85vh",
            border: "8px solid #FFF",
          }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
    </>
  );
}

export default _Location;
