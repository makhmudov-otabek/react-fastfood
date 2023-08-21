import * as React from "react";
import {
  AppBar,
  Avatar,
  Button,
  TextField,
  Typography,
  appBarClasses,
} from "@mui/material";
import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import AddProductModal from "./productModal/productModal";
import SearchIcon from "@mui/icons-material/Search";
import { CiSearch } from "react-icons/ci";
import ApiContext from "../../context/context";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { RxPencil1 } from "react-icons/rx";
import { BiTrash } from "react-icons/bi";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Fragment } from "react";
import Grid from "@mui/material/Unstable_Grid2";

const EditProductsModal = ({ slicedData, setSliceNumber, sliceNumber }) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const { categories, products, setProducts } = useContext(ApiContext);

  const [resultData, setResultData] = useState(slicedData);

  const toggleDrawer = (anchor, open, id) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (product) => {
    return (
      <Box
        sx={{ paddingX: "20px", paddingY: "40px", width: "410px" }}
        role="presentation"
        //   onClick={toggleDrawer(anchor, false)}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "start",
            gap: "20px",
          }}
        >
          <Typography sx={{ px: "8px", mb: "10px", fontWeight: "bold" }}>
            Maxsulotni tahrirlash
          </Typography>

          <Box
            component="form"
            sx={{
              "& .MuiFormControl-root": { width: "100%" },
              "& #outlined-basic": { paddingY: "8px" },
              "& .MuiInputBase-root": {
                my: 1,
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Maxsulot nomi"
              variant="outlined"
              name="productName"
              defaultValue={product.productName}
              type="text"
              sx={{
                width: "100%",
                "& #outlined-basic-label": {
                  top: "0px",
                  "&.MuiInputLabel-shrink": {
                    top: "8px",
                  },
                },
              }}
              onChange={(e) => {}}
            />

            <TextField
              id="outlined-basic"
              label="Kategoriya"
              defaultValue={categories[product.categoryId - 1].categoryName}
              variant="outlined"
              name={categories[product.categoryId - 1].categoryName}
              type="text"
              sx={{
                width: "100%",
                "& #outlined-basic-label": {
                  top: "0px",
                  "&.MuiInputLabel-shrink": {
                    top: "8px",
                  },
                },
              }}
              onChange={(e) => {}}
            />
            <TextField
              id="outlined-basic"
              label="Narxi"
              defaultValue={product.price.toLocaleString()}
              variant="outlined"
              name="price"
              type="text"
              sx={{
                width: "100%",
                "& #outlined-basic-label": {
                  top: "0px",
                  "&.MuiInputLabel-shrink": {
                    top: "8px",
                  },
                },
              }}
              onChange={(e) => {}}
            />
            <TextField
              id="outlined-basic"
              label="Qo'shimcha ma'lumot"
              defaultValue={product.extra}
              variant="outlined"
              name="extra"
              type="text"
              sx={{
                width: "100%",
                "& #outlined-basic-label": {
                  top: "0px",
                  "&.MuiInputLabel-shrink": {
                    top: "8px",
                  },
                },
              }}
              onChange={(e) => {}}
            />
          </Box>
        </Box>
      </Box>
    );
  };

  const removeProduct = (id, index) => {
    const updatedData = products.filter((product) => product.id !== id);

    setProducts(updatedData);

    console.log(updatedData);
  };

  useEffect(() => {
    setResultData(products.slice(0, sliceNumber));
  }, [products]);

  useEffect(() => {
    setResultData(slicedData);
  }, [slicedData]);

  return (
    <>
      {resultData.map((product, productIndex) => (
        <Box
          key={product.id}
          sx={{
            px: 2,
            py: 1,
            my: 2,
            backgroundColor: "white",
            borderRadius: "5px",
            boxShadow: " 0px 2px 2px 0px #AEB0B550",
            cursor: "pointer",
            "&:hover": {
              boxShadow: "0px 20px 25px 0px #B0B1B56E",
            },
          }}
        >
          <React.Fragment key={"right"}>
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Avatar alt="Remy Sharp" src={product.productImage} />
              <Typography sx={{ width: "185px", wordWrap: "break-word" }}>
                {product.productName}
              </Typography>
              <Typography sx={{ width: "235px", wordWrap: "break-word" }}>
                {categories[product.categoryId - 1].categoryName}
              </Typography>
              <Typography sx={{ width: "189px", wordWrap: "break-word" }}>
                {product.price.toLocaleString()}
              </Typography>
              <Typography sx={{ width: "235px", wordWrap: "break-word" }}>
                {product.extra}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={toggleDrawer("right", true, productIndex + 1)}
                  sx={{
                    minWidth: "40px",
                    minHeight: "40px",
                    borderRadius: "50%",
                    border: "3px solid #EDEFF3",
                  }}
                >
                  <RxPencil1 style={{ fontSize: "20px", color: "#2D3A45" }} />
                </Button>
                <Button
                  sx={{
                    minWidth: "40px",
                    minHeight: "40px",
                    borderRadius: "50%",
                    border: "3px solid #EDEFF3",
                  }}
                  onClick={() => {
                    removeProduct(product.id, productIndex + 1);
                  }}
                >
                  <BiTrash style={{ fontSize: "20px", color: "#2D3A45" }} />
                </Button>
              </Box>
            </Box>
            <SwipeableDrawer
              anchor={"right"}
              open={state["right"]}
              onClose={toggleDrawer("right", false, productIndex + 1)}
              onOpen={toggleDrawer("right", true, productIndex + 1)}
              sx={{
                "& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                "& .css-1160xiw-MuiPaper-root-MuiDrawer-paper": {
                  boxShadow: "none",
                },
              }}
            >
              {list(product)}
            </SwipeableDrawer>
          </React.Fragment>
        </Box>
      ))}
      <Button
        variant="outlined"
        sx={{
          width: "100%",
          marginBottom: 3,
          borderColor: "#8D9BA84A",
          color: "#2D3A45",
        }}
        onClick={() => {
          setSliceNumber((prev) => prev + 8);
        }}
      >
        Yana yuklash
      </Button>
    </>
  );
};

const ShowProducts = () => {
  const { products } = useContext(ApiContext);

  const [sliceNumber, setSliceNumber] = useState(5);

  const [slicedData, setSlicedData] = useState(products.slice(0, sliceNumber));

  useEffect(() => setSlicedData(products.slice(0, sliceNumber)), [sliceNumber]);

  const [searchValue, setSearchValue] = useState("");

  // const searchProduct = (e) => {
  //   setSearchValue(e.target.value);
  // };

  // useEffect(() => {
  //   if (searchValue.trim() !== "") {
  //     setSliceNumber(reverseData.length);

  //     const updatedData = resultData.filter((product) =>
  //       product.productName.toLowerCase().includes(searchValue.toLowerCase())
  //     );

  //     setResultData(updatedData);
  //   } else {
  //     setSliceNumber(5);
  //     setResultData(reverseData.slice(0, sliceNumber));
  //   }
  // }, [searchValue]);

  const searchProduct = (e) => {
    if (e.target.value.trim() !== "") {
      const updatedData = products.filter((product) =>
        product.productName.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setSlicedData(updatedData);
    } else if (e.target.value.trim() === "")
      setSlicedData(products.slice(0, sliceNumber));
  };

  useEffect(() => {}, [sliceNumber]);

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "transparent",
            color: "black",
            minHeight: "auto",
            boxShadow: "none",
            "& .MuiToolbar-gutters": {
              minHeight: "auto",
              p: 0,
            },
          }}
        >
          <Toolbar>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                gap: "3px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "white",
                  flex: 1.2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  py: "11px",
                  gap: "10px",
                }}
              >
                <AddProductModal></AddProductModal>
              </Box>
              <Box
                sx={{
                  backgroundColor: "white",
                  flex: 4,
                  py: "11px",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <Box
                  component="form"
                  sx={{
                    marginLeft: 9,
                    paddingY: "5px",
                    paddingX: "20px",
                    borderRadius: "50px",
                    backgroundColor: "#EDEFF3",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "350px",
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TextField
                    variant="standard"
                    placeholder="Qidiruv"
                    sx={{
                      width: "100%",
                      "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                        pt: 1,
                      },
                      "& .css-v4u5dn-MuiInputBase-root-MuiInput-root::before": {
                        border: "none",
                      },
                      "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error)::before":
                        {
                          border: "none",
                        },
                    }}
                    onChange={(e) => {
                      searchProduct(e);
                    }}
                  />

                  <Button
                    sx={{
                      background: "none",
                      minWidth: "35px",
                      minHeight: "35px",
                      borderRadius: "50%",
                      p: 0,
                      "&:hover": {
                        background: "none",
                      },
                    }}
                  >
                    <CiSearch style={{ fontSize: "26px", color: "#8D9BA8" }} />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          px: 6,
          py: 1,
          my: 3,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Box
          sx={{
            textTransform: "uppercase",
            fontSize: "13px",
            fontWeight: "bold",
          }}
        >
          <Typography
            sx={{ fontSize: "13px", fontWeight: "bold", paddingLeft: "20px" }}
          >
            Maxsulot
          </Typography>
        </Box>
        <Box
          sx={{
            borderLeft: "1px solid #8D9BA8",
            pl: 2,
            textTransform: "uppercase",
            fontSize: "13px",
            fontWeight: "bold",
            marginLeft: "auto",
          }}
        >
          <Typography sx={{ fontSize: "13px", fontWeight: "bold" }}>
            Kategoriya
          </Typography>
        </Box>
        <Box
          sx={{
            borderLeft: "1px solid #8D9BA8",
            pl: 2,
            textTransform: "uppercase",
            fontSize: "13px",
            fontWeight: "bold",
            marginLeft: "auto",
          }}
        >
          <Typography sx={{ fontSize: "13px", fontWeight: "bold" }}>
            Narxi
          </Typography>
        </Box>
        <Box
          sx={{
            borderLeft: "1px solid #8D9BA8",
            pl: 2,
            textTransform: "uppercase",
            marginLeft: "auto",
          }}
        >
          <Typography sx={{ fontSize: "13px", fontWeight: "bold" }}>
            Qo'shimcha
          </Typography>
        </Box>
        <Box
          sx={{
            borderLeft: "1px solid #8D9BA8",
            pl: 2,
            textTransform: "uppercase",
            margin: "auto",
          }}
        >
          <Typography sx={{ fontSize: "13px", fontWeight: "bold" }}>
            ACTION
          </Typography>
        </Box>
      </Box>

      <Box sx={{ paddingX: "40px", height: "78vh" }}>
        <EditProductsModal
          slicedData={slicedData}
          setSliceNumber={setSliceNumber}
          sliceNumber={sliceNumber}
        ></EditProductsModal>
      </Box>
    </Box>
  );
};

export default ShowProducts;
