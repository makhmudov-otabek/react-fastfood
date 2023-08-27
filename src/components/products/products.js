import * as React from "react";
import { AppBar, Avatar, Button, TextField, Typography } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import AddProductModal from "./productModal/productModal";
import { CiSearch } from "react-icons/ci";
import ApiContext from "../../context/context";
import { useContext, useState } from "react";
import { RxPencil1 } from "react-icons/rx";
import { BiTrash } from "react-icons/bi";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { ToastContainer, toast } from "react-toastify";

const EditProductsModal = ({
  slicedData,
  setSliceNumber,
  sliceNumber,
  searchValue,
  setSlicedData,
}) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const feedbackWarning = () =>
    toast.warning("Mahsulot o'chirildi", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const feedbackSuccess = () =>
    toast.success("Mahsulot o'chirildi", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const { categories, products, setProducts } = useContext(ApiContext);

  const [activeEditingProductIndex, setActiveEditingProductIndex] = useState(0);

  const [activeProduct, setActiveProduct] = useState(
    products[activeEditingProductIndex]
  );

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const updatedActiveEditingProductId = (index) => {
    setActiveEditingProductIndex(index);
    setActiveProduct(products[index]);
  };

  const updateProductData = (e) => {
    setActiveProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitEditedProduct = () => {
    const updatedProducts = products;

    updatedProducts[activeEditingProductIndex] = activeProduct;

    setProducts(updatedProducts);

    toggleDrawer("right", false)();

    feedbackSuccess();
  };

  const removeProduct = (id, index) => {
    const updatedData = products.filter((product) => product.id !== id);

    setProducts(updatedData);

    feedbackWarning();
  };

  let isDisabled = false;

  if (searchValue === "") {
    isDisabled = false;
  } else {
    isDisabled = true;
  }

  if (searchValue === "" && sliceNumber >= products.length) {
    isDisabled = true;
  }

  const list = () => {
    return (
      <Box
        sx={{ paddingX: "20px", paddingY: "40px", width: "410px" }}
        role="presentation"
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
              value={activeProduct.productName}
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
              onChange={(e) => {
                updateProductData(e);
              }}
            />

            <TextField
              id="outlined-basic"
              label="Kategoriya"
              value={categories[activeProduct.categoryId - 1].categoryName}
              variant="outlined"
              name={categories[activeProduct.categoryId - 1].categoryName}
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
              onChange={(e) => {
                updateProductData(e);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Narxi"
              value={activeProduct.price.toLocaleString()}
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
              onChange={(e) => {
                updateProductData(e);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Qo'shimcha ma'lumot"
              value={activeProduct.extra}
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
              onChange={(e) => {
                updateProductData(e);
              }}
            />
          </Box>

          <Button
            onClick={() => {
              submitEditedProduct();
            }}
            sx={{
              backgroundColor: "#20D472",
              textTransform: "capitalize",
              px: 3,
              color: "#fff",
              "&:hover": {
                backgroundColor: "#21B665",
              },
            }}
          >
            Saqlash
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <>
      {products.slice(0, sliceNumber).map((product, productIndex) => (
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
                  onClick={() => {
                    toggleDrawer("right", true)();
                    updatedActiveEditingProductId(productIndex);
                  }}
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
                "& .MuiBackdrop-root": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                "& .MuiDrawer-paper": {
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
        disabled={isDisabled}
      >
        Yana yuklash
      </Button>
    </>
  );
};

const ShowProducts = () => {
  const { products, setProducts } = useContext(ApiContext);

  const [sliceNumber, setSliceNumber] = useState(5);

  const [originalProducts, setOriginalProducts] = useState(products);

  const [searchValue, setSearchValue] = useState("");

  const searchProduct = (e) => {
    setSearchValue(e.target.value);

    if (e.target.value.trim() !== "") {
      const updatedData = products.filter((product) =>
        product.productName.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setProducts(updatedData);
    } else if (e.target.value.trim().length === 0) {
      console.log("warning");
      setProducts(originalProducts);
    }
  };

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
                    placeholder="Qidiruv"
                    sx={{
                      width: "100%",

                      "& fieldset": {
                        display: "none",
                      },

                      "& .MuiInputBase-input": {
                        px: 0,
                        pt: 1,
                        pb: 0,
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
          searchValue={searchValue}
          setSliceNumber={setSliceNumber}
          sliceNumber={sliceNumber}
        ></EditProductsModal>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default ShowProducts;
