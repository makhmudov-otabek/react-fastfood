import "./orderModal.css";

import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Fragment } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";

import { useContext, useState } from "react";
import ApiContext from "../../../context/context";
import { Typography } from "@mui/material";
import { BiTrash } from "react-icons/bi";
import { orderesData } from "../../../data/ordersData";

import { useEffect } from "react";

const ShowProducts = ({
  categoryId,
  collectAddButtonIds,
  decrementProduct,
  incrementProduct,
  orderProducts,
}) => {
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
          const productId = product.id;
          return (
            <Grid
              key={product.productName}
              xs={6}
              sx={{
                padding: "10px",
              }}
            >
              <Box
                sx={{
                  boxShadow: "0px 2px 2px 0px #AEB0B550",
                  borderRadius: "5px",
                  overflow: "hidden",
                  height: "100%",
                  "&:hover": {
                    boxShadow: "0px 20px 25px 0px rgba(176, 177, 181, 0.43)",
                  },
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
                      mb: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      {product.price}{" "}
                      <span style={{ fontWeight: "lighter" }}>UZS</span>
                    </Typography>

                    {orderProducts[productId]?.count > 0 ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #EDEFF3",
                          borderRadius: "5px",
                        }}
                      >
                        <Button
                          onClick={() => {
                            decrementProduct(productId);
                          }}
                          sx={{
                            p: 0,
                            minWidth: "40px",
                            height: "24px",
                            color: "black",
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                            "&:active": {
                              opacity: "0.7",
                            },
                          }}
                        >
                          <RemoveIcon sx={{ fontSize: "20px" }} />
                        </Button>

                        <Typography sx={{ px: "10px" }}>
                          {orderProducts[productId]?.count}
                        </Typography>
                        <Button
                          onClick={() => {
                            incrementProduct(productId);
                          }}
                          sx={{
                            p: 0,
                            minWidth: "40px",
                            height: "24px",
                            color: "black",
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                            "&:active": {
                              opacity: "0.7",
                            },
                          }}
                        >
                          <AddIcon sx={{ fontSize: "20px" }} />
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{
                          fontSize: "11px",
                          px: "7px",
                          backgroundColor: "#20D472",
                          "&:hover": {
                            backgroundColor: "#20D472",
                          },
                        }}
                        onClick={() => {
                          collectAddButtonIds(product.id);
                        }}
                      >
                        <AddIcon /> Qo'shish
                      </Button>
                    )}
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

const SwipeableTemporaryDrawer = ({
  notifySuccess,
  notifyDelete,
  notifyWarning,
}) => {
  const [state, setState] = React.useState({
    right: false,
  });

  const [activatedButton, setActivatedButton] = useState(0);

  const [filterIndex, setFilterIndex] = useState(1);

  const [currentTime, setCurrentTime] = useState("");

  const { products } = useContext(ApiContext);

  const [orderProducts, setOrderProducts] = useState({});

  const { categories } = useContext(ApiContext);

  const { setOrders } = useContext(ApiContext);

  const [newUserInfo, setNewUserInfo] = useState({
    name: "",
    phone: "",
    address:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.190116400739!2d69.22590977572126!3d41.326479099771404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bb7a0ebbae3%3A0xf9e01b5d45fc68cd!2sPDP%20Academy!5e0!3m2!1sen!2s!4v1692376026597!5m2!1sen!2s",
  });

  let totalSum = 0;

  const takeUserInfoOnChange = (name, value) => {
    setNewUserInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const collectAddButtonIds = (id) => {
    console.log(id);
    console.log(products[products.length - id]);

    setOrderProducts((prevState) => ({
      ...prevState,
      [id]: { count: 1, product: products[products.length - id] },
    }));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const time = `${hours}:${minutes}`;
      setCurrentTime(time);
    }, 1000); // Har 1 sekundda bir yangilaydi

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const decrementProduct = (id) => {
    let updatedProductOrderCount = orderProducts[id].count;

    if (updatedProductOrderCount.count < 0) return;

    updatedProductOrderCount -= 1;

    setOrderProducts((prevState) => ({
      ...prevState,
      [id]: {
        count: updatedProductOrderCount,
        product: products[products.length - id],
        totalSum: totalSum,
      },
    }));
  };

  const incrementProduct = (id) => {
    let updatedProductOrderCount = orderProducts[id].count;

    updatedProductOrderCount += 1;

    setOrderProducts((prevState) => ({
      ...prevState,
      [id]: {
        count: updatedProductOrderCount,
        product: products[products.length - id],
      },
    }));
  };

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

  const addToOrders = () => {
    if (
      newUserInfo.address.trim().length === 0 ||
      newUserInfo.name.trim().length === 0 ||
      newUserInfo.phone.trim().length === 0
    ) {
      notifyWarning();
      return;
    }

    toggleDrawer("right", false)();

    const updatedOrders = Object.values(orderProducts).filter((order) => {
      return {
        productName: order.product.productName,
        price: order.product.price,
        count: order.count,
      };
    });

    const newId = orderesData.reduce((accumlator, element) => {
      return Math.max(accumlator, element.id);
    }, 0);

    const newOrder = {
      id: newId + 1,
      ...newUserInfo,
      time: currentTime,
      productsPrice: totalSum,
      delivery: false,
      totalSum: totalSum,
      operator: "Shaoxrux M",
      flial: "Fast Food Maksim Gorkiy",
      status: "new",
      orders: [...updatedOrders],
    };

    setOrders((prevState) => [newOrder, ...prevState]);

    setNewUserInfo({
      name: "",
      phone: "",
      address:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.190116400739!2d69.22590977572126!3d41.326479099771404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bb7a0ebbae3%3A0xf9e01b5d45fc68cd!2sPDP%20Academy!5e0!3m2!1sen!2s!4v1692376026597!5m2!1sen!2s",
    });

    setOrderProducts({});

    notifySuccess();
  };

  const canselOrder = () => {
    setOrderProducts({});
    setNewUserInfo({
      name: "",
      phone: "",
      address:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.190116400739!2d69.22590977572126!3d41.326479099771404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bb7a0ebbae3%3A0xf9e01b5d45fc68cd!2sPDP%20Academy!5e0!3m2!1sen!2s!4v1692376026597!5m2!1sen!2s",
    });

    notifyDelete();
  };

  const list = (anchor) => (
    <Box
      sx={{ paddingX: "40px", paddingY: "20px", width: "1030px" }}
      role="presentation"
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            width: "62%",
            py: "11px",
          }}
        >
          <Typography
            sx={{ px: "8px", mb: "20px", fontWeight: "bold" }}
            onClick={() => {
              console.log(newUserInfo);
            }}
          >
            Yangi buyurtma qo'shish
          </Typography>
          <Box
            sx={{
              px: "8px",
              py: "8px",
              width: "590px",
              overflowX: "auto",
              display: "flex",
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
          <ShowProducts
            orderProducts={orderProducts}
            setOrderProducts={setOrderProducts}
            collectAddButtonIds={collectAddButtonIds}
            decrementProduct={decrementProduct}
            incrementProduct={incrementProduct}
            categoryId={filterIndex}
          ></ShowProducts>
        </Box>

        <Box sx={{ width: "35%" }}>
          {Object.keys(orderProducts).length > 0 ? (
            <>
              {" "}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>Buyurtma ro’yxati</Typography>
                <Button
                  sx={{
                    minWidth: "35px",
                    minHeight: "35px",
                    borderRadius: "50%",
                    backgroundColor: "#EDEFF3",
                    color: "black",
                    p: 0,
                  }}
                  onClick={() => {
                    toggleDrawer("right", false)();
                    canselOrder();
                  }}
                >
                  <BiTrash style={{ fontSize: "19px" }} />
                </Button>
              </Box>
              <Box
                sx={{
                  mt: 3,
                  border: "1px solid #EDEFF3",
                  borderRadius: "5px",
                  padding: "15px 12px",
                }}
              >
                {Object.values(orderProducts).map((order, orderIndex) => {
                  totalSum += order.count * order.product.price;

                  return (
                    <Box
                      key={orderIndex}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginY: "8px",
                      }}
                    >
                      <Typography>{order.product.productName}</Typography>
                      <Typography>{`${order.count}*${order.product.price}`}</Typography>
                    </Box>
                  );
                })}

                <Box
                  sx={{
                    backgroundColor: "#EDEFF3",
                    borderRadius: "5px",
                    padding: "7px 15px",
                    mt: 7,
                  }}
                >
                  <Typography sx={{ fontSize: "13px", color: "#8D9BA8" }}>
                    Umumiy summa
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      {totalSum.toLocaleString()}
                    </Typography>
                    <Typography>UZS</Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                component="form"
                sx={{
                  my: 3,
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
                  label="Mijoz ismi"
                  variant="outlined"
                  value={newUserInfo.name}
                  name="name"
                  type="text"
                  required
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
                    takeUserInfoOnChange(e.target.name, e.target.value);
                  }}
                />

                <TextField
                  id="outlined-basic"
                  label="Telefon raqam"
                  variant="outlined"
                  value={newUserInfo.phone}
                  name="phone"
                  type="tel"
                  required
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
                    takeUserInfoOnChange(e.target.name, e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Manzil"
                  variant="outlined"
                  name="address"
                  type="address"
                  required
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
                    takeUserInfoOnChange(e.target.name, e.target.value);
                  }}
                />
              </Box>
              <iframe
                src={newUserInfo.address}
                style={{
                  border: 0,
                  borderRadius: "5px",
                  height: "150px",
                  width: "100%",
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google maps here"
              >
                Manzil topilmadi
              </iframe>
              <Box sx={{ mt: 2 }}>
                <Button
                  onClick={() => {
                    addToOrders();
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
            </>
          ) : null}
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <Box
          onClick={toggleDrawer("right", true)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            cursor: "pointer",
            "&:hover p": {
              opacity: "0.7",
            },
          }}
        >
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
          >
            <AddIcon></AddIcon>
          </Button>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            {" "}
            Yangi buyurtma <br /> qo'shish
          </Typography>
        </Box>
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
