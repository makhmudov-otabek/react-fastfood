import { Typography } from "@mui/material";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useContext } from "react";
import { TbLayoutList } from "react-icons/tb";
import { TbLayoutCards } from "react-icons/tb";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ApiContext from "../../context/context";
import SwipeableTemporaryDrawer from "./orderModal/orderModal";

const OredersHorizontalLayout = ({ filterIndex }) => {
  const [filterType, setFilterType] = useState("new");

  const { orders, setOrders } = useContext(ApiContext);

  const [filteredData, setFilteredData] = useState(
    orders.filter((order) => {
      return order.status === filterType;
    })
  );

  const [reverseFilteredData, setReverseFilteredData] = useState(
    filteredData.reduceRight((accumlator, element) => {
      return [...accumlator, element];
    }, [])
  );

  useEffect(() => {
    setFilteredData(
      orders.filter((order) => {
        return order.status === filterType;
      })
    );
  }, [orders]);

  useEffect(() => {
    setReverseFilteredData(
      filteredData.reduceRight((accumlator, element) => {
        return [...accumlator, element];
      }, [])
    );
  }, [filteredData]);

  useEffect(() => {
    if (filterIndex === 1) {
      setFilterType("new");
    } else if (filterIndex === 2) {
      setFilterType("accepted");
    } else if (filterIndex === 3) {
      setFilterType("delivered");
    } else if (filterIndex === 4) {
      setFilterType("closed");
    } else if (filterIndex === 5) {
      setFilterType("canceled");
    }
  }, [filterIndex]);

  useEffect(() => {
    // filterType o'zgarishi uchun filter qilishni bajarish
    const filteredData = orders.filter((order) => {
      return order.status === filterType;
    });

    // Yangilangan ma'lumotlarni setReverseFilteredData orqali saqlash
    setReverseFilteredData(filteredData.reverse());
  }, [filterType]);

  const changeStatus = (id, status) => {
    // filteredData ni yangilash uchun yangi bir massiv tuzamiz
    // const changingOrder = orders.find((order) => order.id === id);
    // const changingOrderIndex = orders.findIndex((order) => order.id === id);
    // if (changingOrder.status === "new") {
    //   changingOrder.status = "accepted";
    // } else if (changingOrder.status === "accepted") {
    //   changingOrder.status = "delivired";
    // } else if (changingOrder.status === "delivired") {
    //   changingOrder.status = "closed";
    // } else if (changingOrder.status === "closed") {
    //   changingOrder.status = "canceled";
    // }
    // const updatedOrders = orders;
    // updatedOrders[changingOrderIndex] = changingOrder;
    // setOrders(updatedOrders);
    // setFilteredData(
    //   updatedOrders.filter((order) => {
    //     return order.status === filterType;
    //   })
    // );
    // setReverseFilteredData(filteredData);
    // Yangilangan ma'lumotlarni saqlash
  };

  // const changeStatus = (id, status) => {
  //   const changingOrder = orders.find((order) => order.id === id);

  //   if (changingOrder.status === "new") {
  //     changingOrder.status = "accepted";
  //   } else if (changingOrder.status === "accepted") {
  //     changingOrder.status = "delivired";
  //   } else if (changingOrder.status === "delivired") {
  //     changingOrder.status = "closed";
  //   } else if (changingOrder.status === "closed") {
  //     changingOrder.status = "canceled";
  //   }
  // };

  return reverseFilteredData.map((order) => {
    return (
      <Box
        key={order.id}
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          gap: "3px",
          boxShadow: "rgba(174, 176, 181, 0.1)",
        }}
      >
        <Box
          sx={{
            flex: 1,
            padding: "28px 20px",
            backgroundColor: "white",
            borderTopLeftRadius: "5px",
            borderBottomLeftRadius: "5px",
          }}
        >
          <Box sx={{ paddingLeft: "20px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "start",
                gap: "25px",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Typography
                  sx={{
                    padding: "3px 25px",
                    borderRadius: "50px",
                    backgroundColor: "rgba(32, 212, 114, 1)",
                    color: "white",
                  }}
                >
                  {order.id}
                </Typography>
                <TurnedInNotIcon
                  sx={{
                    background: "rgba(237, 239, 243, 1)",
                    width: "30px",
                    height: "30px",
                    padding: "5px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    color: "rgba(45, 58, 69, 0.6)",
                  }}
                ></TurnedInNotIcon>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "17px",
                }}
              >
                <AccessTimeIcon
                  sx={{ color: "rgba(45, 58, 69, 0.6)" }}
                ></AccessTimeIcon>
                <Typography>{order.time}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1.8,
            padding: "28px 20px",
            backgroundColor: "white",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "10px",
              }}
            >
              <PersonOutlineOutlinedIcon
                sx={{ color: "rgba(45, 58, 69, 0.7)" }}
              />
              <Typography sx={{ fontSize: "20px" }}>{order.name}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "10px",
                marginTop: "30px",
              }}
            >
              <LocalPhoneOutlinedIcon sx={{ color: "rgba(45, 58, 69, 0.7)" }} />
              <Typography>{order.phone}</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1.5,
            padding: "28px 20px",
            backgroundColor: "white",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "start", gap: "40px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <ContentPasteOutlinedIcon
                sx={{ color: " rgba(45, 58, 69, 0.7)", fontSize: "20px" }}
              />
              <Typography>{order.productsPrice.toLocaleString()}</Typography>
            </Box>
            <Typography>Payme</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              mt: "18px ",
            }}
          >
            <LocalShippingOutlinedIcon
              sx={{ color: "rgba(45, 58, 69, 0.7)" }}
            />
            <Typography>
              {order.delivery === true ? "5000 uzs" : "-"}
            </Typography>
          </Box>

          <Box sx={{ marginTop: "17px" }}>
            <Typography
              sx={{ fontSize: "11px", color: "rgba(45, 58, 69, 0.7)" }}
            >
              Umumiy summa
            </Typography>

            <Typography sx={{ fontSize: "20px" }}>
              <span style={{ fontWeight: "bolder" }}>
                {order.delivery === true
                  ? (order.productsPrice + 5000).toLocaleString()
                  : order.productsPrice}
              </span>{" "}
              UZS
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            padding: "28px 20px",
            backgroundColor: "white",
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
            position: "relative",
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: "11px", color: "rgba(45, 58, 69, 0.7)" }}
            >
              Operator:
            </Typography>

            <Typography sx={{ fontSize: "16px", fontWeight: "bolder" }}>
              {order.operator}
            </Typography>
          </Box>

          <Box sx={{ marginTop: "18px" }}>
            <Typography
              sx={{ fontSize: "11px", color: "rgba(45, 58, 69, 0.7)" }}
            >
              Flial:
            </Typography>

            <Typography sx={{ fontSize: "16px", fontWeight: "bolder" }}>
              {order.flial}
            </Typography>
          </Box>

          <Box
            sx={{
              position: "absolute",
              right: "-19px",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              disabled={true}
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                minWidth: "auto",
                color: "black",
                border: "3px solid rgba(237, 239, 243, 1)",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "#f2f2f2",
                  border: "3px solid rgba(255, 255, 255, 0.7)",
                },
              }}
            >
              <ClearOutlinedIcon />
            </Button>
            <Button
              disabled={true}
              onClick={() => {
                changeStatus(order.id, order.status);
              }}
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                color: "black",
                minWidth: "auto",
                border: "3px solid rgba(237, 239, 243, 1)",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "#f2f2f2",
                  border: "3px solid rgba(255, 255, 255, 0.7)",
                },
              }}
            >
              <CheckOutlinedIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    );
  });
};

const ShowOrders = () => {
  const [activatedButton, setActivatedButton] = useState(1);

  const handleButtonClick = (index) => {
    setActivatedButton(index);
  };

  const [activeLayout, setActiveLayout] = useState(1);

  const handleChangeLayout = (index) => {
    setActiveLayout(index);
  };

  const [filterIndex, setFilterIndex] = useState(1);

  const notifySuccess = () =>
    toast("🦄 Yangi buyurtma qo'shildi!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyDelete = () =>
    toast.error("🗑️ Buyurtma o'chirildi!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyWarning = () =>
    toast.warning("Malumotlarni to'ldiring!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <Box>
      {/* <SearchAppBar></SearchAppBar> */}

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
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  py: "11px",
                  gap: "10px",
                }}
              >
                <SwipeableTemporaryDrawer
                  notifySuccess={notifySuccess}
                  notifyDelete={notifyDelete}
                  notifyWarning={notifyWarning}
                ></SwipeableTemporaryDrawer>
              </Box>
              <Box
                sx={{
                  backgroundColor: "white",
                  flex: 4,
                  py: "11px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    px: "11px",
                    py: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "7px",
                    backgroundColor: "rgba(237, 239, 243, 1)",
                    borderRadius: "50px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      p: "5px 20px",
                      borderRadius: "50px",
                      minWidth: "auto",
                      backgroundColor:
                        activatedButton === 1 ? "white" : "transparent",
                      color:
                        activatedButton === 1
                          ? "rgba(45, 58, 69, 1)"
                          : "rgba(45, 58, 69, 0.5)",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                      "&:focus": {
                        boxShadow:
                          "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
                      },
                    }}
                    onClick={() => {
                      handleButtonClick(1);
                      setFilterIndex(1);
                    }}
                  >
                    Yangi
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      p: "5px 35px",
                      borderRadius: "50px",
                      minWidth: "auto",
                      backgroundColor:
                        activatedButton === 2 ? "white" : "transparent",
                      color:
                        activatedButton === 2
                          ? "rgba(45, 58, 69, 1)"
                          : "rgba(45, 58, 69, 0.5)",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                      "&:focus": {
                        boxShadow:
                          "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
                      },
                    }}
                    onClick={() => {
                      handleButtonClick(2);
                      setFilterIndex(2);
                    }}
                  >
                    Qabul qilingan
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      p: "5px 20px",
                      borderRadius: "50px",
                      minWidth: "auto",
                      backgroundColor:
                        activatedButton === 3 ? "white" : "transparent",
                      color:
                        activatedButton === 3
                          ? "rgba(45, 58, 69, 1)"
                          : "rgba(45, 58, 69, 0.5)",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                      "&:focus": {
                        boxShadow:
                          "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
                      },
                    }}
                    onClick={() => {
                      handleButtonClick(3);
                      setFilterIndex(3);
                    }}
                  >
                    Jo'natilgan
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      p: "5px 20px",
                      borderRadius: "50px",
                      minWidth: "auto",
                      backgroundColor:
                        activatedButton === 4 ? "white" : "transparent",
                      color:
                        activatedButton === 4
                          ? "rgba(45, 58, 69, 1)"
                          : "rgba(45, 58, 69, 0.5)",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                      "&:focus": {
                        boxShadow:
                          "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
                      },
                    }}
                    onClick={() => {
                      handleButtonClick(4);
                      setFilterIndex(4);
                    }}
                  >
                    Yopilgan
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      p: "5px 10px",
                      borderRadius: "50px",
                      minWidth: "auto",
                      backgroundColor:
                        activatedButton === 5 ? "white" : "transparent",
                      color:
                        activatedButton === 5
                          ? "rgba(45, 58, 69, 1)"
                          : "rgba(45, 58, 69, 0.5)",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                      "&:focus": {
                        boxShadow:
                          "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
                      },
                    }}
                    onClick={() => {
                      handleButtonClick(5);
                      setFilterIndex(5);
                    }}
                  >
                    Bekor qilingan
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  backgroundColor: "white",
                  flex: 1,
                  py: "11px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    px: "10px",
                    py: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "7px",
                    backgroundColor: "rgba(237, 239, 243, 1)",
                    borderRadius: "50px",
                  }}
                >
                  <Button
                    disabled={true}
                    variant="contained"
                    sx={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      minWidth: "auto",
                      backgroundColor:
                        activeLayout === 1 ? "white" : "transparent",
                      color:
                        activeLayout === 1
                          ? "rgba(45, 58, 69, 1)"
                          : "rgba(45, 58, 69, 0.7)",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                      "&:focus": {
                        boxShadow:
                          "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
                      },
                    }}
                    onClick={() => {
                      handleChangeLayout(1);
                    }}
                  >
                    {activeLayout === 1 ? (
                      <TbLayoutList
                        style={{
                          fill: "rgb(141, 155, 168)",
                          color: "#8D9BA8",
                          fontSize: "20px",
                          minWidth: "20px",
                        }}
                      />
                    ) : (
                      <TbLayoutList
                        style={{
                          color: "#8D9BA8",
                          fontSize: "20px",
                          minWidth: "20px",
                        }}
                      />
                    )}
                  </Button>
                  <Button
                    disabled={true}
                    variant="contained"
                    sx={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      minWidth: "auto",
                      backgroundColor:
                        activeLayout === 2 ? "white" : "transparent",
                      color:
                        activeLayout === 2
                          ? "rgba(45, 58, 69, 1)"
                          : "rgba(45, 58, 69, 0.7)",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                      "&:focus": {
                        boxShadow:
                          "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
                      },
                    }}
                    onClick={() => {
                      handleChangeLayout(2);
                    }}
                  >
                    {activeLayout === 2 ? (
                      <TbLayoutCards
                        style={{
                          fill: "rgb(141, 155, 168)",
                          color: "#8D9BA8",
                          fontSize: "20px",
                          minWidth: "20px",
                        }}
                      />
                    ) : (
                      <TbLayoutCards
                        style={{
                          color: "#8D9BA8",
                          fontSize: "20px",
                          minWidth: "20px",
                        }}
                      />
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ padding: "35px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <OredersHorizontalLayout
            filterIndex={filterIndex}
          ></OredersHorizontalLayout>
        </Box>
      </Box>
    </Box>
  );
};

export default ShowOrders;
