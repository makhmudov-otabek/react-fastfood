import "./orderModal.css";

import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Fragment } from "react";
import Grid from "@mui/material/Unstable_Grid2";

import { useContext, useState } from "react";
import ApiContext from "../../../context/context";
import { Typography } from "@mui/material";

const ShowProducts = ({ categoryId }) => {
  const { categories } = useContext(ApiContext);
  const { products } = useContext(ApiContext);

  const filteredProducts = products.filter(
    (product) => product.categoryId === categoryId
  );

  return (
    <Box sx={{ flexGrow: 1, px: "10px" }}>
      <Grid
        container
        spacing={3}
        sx={{
          py: "30px",
        }}
      >
        {filteredProducts.map((product) => {
          return (
            <Grid
              key={product.productName}
              xs={6}
              sx={{
                padding: " 10px",
              }}
            >
              <Box
                sx={{
                  boxShadow: "0px 20px 25px 0px rgba(176, 177, 181, 0.43)",
                  borderRadius: "5px",
                  overflow: "hidden",
                }}
              >
                <Box sx={{ widht: "100%" }}>
                  <img
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                    }}
                    src={product.productImage}
                    alt=""
                  />
                </Box>
                <Box sx={{ padding: "7px 12px" }}>
                  <Typography>{product.productName}</Typography>
                  <Typography sx={{ fontSize: "13px", color: "#8D9BA8" }}>
                    {" "}
                    {product.extra}
                  </Typography>

                  <Box
                    sx={{
                      mt: "15px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      5,000 <Typography sx>UZS</Typography>
                    </Typography>
                    <Button variant="contained" sx={{}}>
                      + Qo'shish
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

const SwipeableTemporaryDrawer = () => {
  const [state, setState] = React.useState({
    right: false,
  });

  const { categories } = useContext(ApiContext);

  const [activatedButton, setActivatedButton] = useState(1);
  const [filterIndex, setFilterIndex] = useState(1);

  const handleButtonClick = (index) => {
    setActivatedButton(index);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ padding: "40px", width: "1100px" }}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            flex: 1,
            py: "11px",
          }}
        >
          <Typography sx={{ px: "8px", mb: "20px", fontWeight: "bold" }}>
            Yangi buyurtma qo’shish
          </Typography>
          <Box
            sx={{
              px: "8px",
              py: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "7px",
              backgroundColor: "rgba(237, 239, 243, 1)",
              borderRadius: "50px",
            }}
          >
            {categories.map((category, categoryId) => {
              return (
                <Fragment key={category.categoryName}>
                  <Button
                    variant="contained"
                    className={
                      activatedButton === categoryId
                        ? "orederButtonFocused"
                        : "orderButtonUnFocused"
                    }
                    sx={{
                      p: "5px 20px",
                      borderRadius: "50px",
                      minWidth: "auto",
                      textTransform: "capitalize",
                      boxShadow: "none",
                    }}
                    onClick={() => {
                      handleButtonClick(categoryId);
                      setFilterIndex(categoryId + 1);
                    }}
                  >
                    {category.categoryName}
                  </Button>
                </Fragment>
              );
            })}
          </Box>
          <ShowProducts categoryId={filterIndex}></ShowProducts>
        </Box>
        <Box sx={{ flex: 3 }}>Orders Data</Box>
      </Box>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <Button
          sx={{
            p: 0,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            color: "white",
            minWidth: "auto",
            backgroundColor: "rgba(32, 212, 114, 1)",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "rgb(27, 172, 93)",
            },
          }}
          onClick={toggleDrawer("right", true)}
        >
          <AddIcon></AddIcon>
        </Button>
        <SwipeableDrawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          {list("right")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default SwipeableTemporaryDrawer;
