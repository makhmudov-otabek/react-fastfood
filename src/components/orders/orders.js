import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Typography } from "@mui/material";
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
import { useLocalStorageState } from "ahooks";

const OredersHorizontalLayout = ({ filterIndex }) => {
  const [filterType, setFilterType] = useState("new");

  const { orders, setOrders } = useContext(ApiContext);

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

  const changeStatusSuccess = (id) => {
    const updatedOrdersData = [...orders];

    console.log(id);

    const updatedOrders = updatedOrdersData.map((order, i) => {
      if (order.id === id && order.status === "new") {
        console.log("new");
        return { ...order, status: "accepted" };
      } else if (order.id === id && order.status === "accepted") {
        return { ...order, status: "delivered" };
      } else if (order.id === id && order.status === "delivered") {
        return { ...order, status: "closed" };
      } else if (order.id === id && order.status === "closed") {
        return { ...order, status: "canceled" };
      }

      return order;
    });
    setOrders(updatedOrders);
  };
  const changeStatusFail = (id) => {
    const updatedOrdersData = [...orders];

    const updatedOrders = updatedOrdersData.map((order, i) => {
      if (order.id === id && order.status === "accepted") {
        return { ...order, status: "new" };
      } else if (order.id === id && order.status === "delivered") {
        return { ...order, status: "accepted" };
      } else if (order.id === id && order.status === "closed") {
        return { ...order, status: "delivered" };
      } else if (order.id === id && order.status === "canceled") {
        return { ...order, status: "closed" };
      }
      return order;
    });

    setOrders(updatedOrders);
  };

  return orders
    .filter((order, orderIndex) => order.status === filterType)
    .map((order, orderIndex) => {
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
                <LocalPhoneOutlinedIcon
                  sx={{ color: "rgba(45, 58, 69, 0.7)" }}
                />
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
                disabled={order.status === "new" ? true : false}
                onClick={() => {
                  changeStatusFail(order.id);
                }}
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
                disabled={order.status === "canceled" ? true : false}
                onClick={() => {
                  changeStatusSuccess(order.id);
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

const OredersVerticalLayout = () => {
  const { orders, setOrders } = useContext(ApiContext);

  const changeStatusSuccess = (id) => {
    const updatedOrdersData = [...orders];

    const updatedOrders = updatedOrdersData.map((order, i) => {
      if (order.id === id && order.status === "new") {
        console.log("vertical success");
        return { ...order, status: "accepted" };
      } else if (order.id === id && order.status === "accepted") {
        return { ...order, status: "delivered" };
      } else if (order.id === id && order.status === "delivered") {
        return { ...order, status: "closed" };
      } else if (order.id === id && order.status === "closed") {
        return { ...order, status: "canceled" };
      }

      return order;
    });
    setOrders(updatedOrders);
  };
  const changeStatusFail = (id) => {
    const updatedOrdersData = [...orders];

    const updatedOrders = updatedOrdersData.map((order, i) => {
      if (order.id === id && order.status === "accepted") {
        return { ...order, status: "new" };
      } else if (order.id === id && order.status === "delivered") {
        return { ...order, status: "accepted" };
      } else if (order.id === id && order.status === "closed") {
        return { ...order, status: "delivered" };
      } else if (order.id === id && order.status === "canceled") {
        return { ...order, status: "closed" };
      }
      return order;
    });

    setOrders(updatedOrders);
  };

  return (
    <Box
      sx={{ display: "flex", gap: "15px", flexWrap: "nowrap", width: "100%" }}
    >
      <Box
        sx={{
          width: "300px",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <Box>
          <Box
            sx={{
              width: "210px",
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "16px", color: "#666666" }}>
              Yangi
            </Typography>
            <span
              className="spanN"
              style={{
                padding: "3px 15px",
                fontSize: "16px",
                color: "#666666",
                backgroundColor: "#FFFFFF",
                borderRadius: "5px",
              }}
            >
              {orders.filter((order) => order.status === "new").length}
            </span>
          </Box>
          <Box
            sx={{
              width: "100%",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              mt: 1,
              py: 1,
              px: 2,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z"
                fill="#20D472"
              />
            </svg>
            {/* <span>{allSumAccepted} UZS</span> */}

            <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
              {orders
                .filter((order) => order.status === "new")
                .reduce((accumlator, element) => {
                  return accumlator + element.totalSum;
                }, 0)
                .toLocaleString()}

              <span style={{ marginLeft: "10px" }}>UZS</span>
            </Typography>
          </Box>
        </Box>
        {orders
          .filter((i) => i.status === "new")
          .map((item, orderIndex) => {
            return (
              <Box key={item.id}>
                <Box
                  sx={{
                    width: "100%",
                    background: "#fff",
                    p: 2,
                    borderRadius: "10px",
                    "&:hover": {
                      boxShadow: "0px 2px 26px 1px rgba(34, 60, 80, 0.2)",
                      transform: "scale(1.01)",
                      transition: ".4s",
                    },
                    minHeight: "370px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      borderBottom: "2px solid #979797",
                      pb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          background: "#20D472",
                          color: "#fff",
                          borderRadius: "18px",
                          p: "3px 10px",
                          fontSize: "14px",
                          mr: 1,
                        }}
                      >
                        {item.id}
                      </Typography>
                      <Box
                        sx={{
                          background: "#EDEFF3",
                          borderRadius: "18px",
                          width: "35px",
                          height: "35px",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          width="13"
                          height="16"
                          viewBox="0 0 13 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 15.1429L6.5 11.2143L1 15.1429V2.57143C1 1.70355 1.70355 1 2.57143 1H10.4286C11.2964 1 12 1.70355 12 2.57143V15.1429Z"
                              stroke="#2D3A45"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                        </svg>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        gap: "5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AccessTimeIcon />
                      <Typography sx={{ fontSize: "14px" }}>
                        {item.time}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      gap: "20px",
                      mt: 3,
                      cursor: "pointer",
                    }}
                    onClick={() => {}}
                  >
                    <PersonOutlineOutlinedIcon />
                    <Box sx={{ marginTop: "-5px" }}>
                      <Typography
                        sx={{
                          textAlign: "start",
                          color: "#2D3A45",
                          fontSize: "14px",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#2D3A45",
                          fontSize: "13px",
                          opacity: "0.3",
                        }}
                      >
                        {item.phone}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      mt: 4,
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "space-between",
                      borderBottom: "2px solid #979797",
                      pb: 1,
                      mb: 2,
                    }}
                  >
                    <Box sx={{ marginTop: "" }}>
                      <Typography
                        sx={{
                          color: "#8D9BA8",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        Umumiy summa
                      </Typography>
                      <Typography sx={{ fontSize: "20px" }}>
                        <span style={{ fontWeight: "700" }}>
                          {item.productsPrice}
                          {/* {item.orders.map((or) => or.price)} */}
                        </span>{" "}
                        UZS
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ textAlign: "start" }}>
                      <Box sx={{ mb: 2 }}>
                        <Typography sx={{ color: "#8D9BA8", fontSize: "12px" }}>
                          Operator:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontFamily: "SFProDisplay",
                            color: "#2D3A45",
                            fontWeight: "600",
                            fontStyle: "normal",
                            lineHeight: "18px",
                            letterSpacing: "0.467px",
                          }}
                        >
                          {item.operator}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ color: "#8D9BA8", fontSize: "12px" }}>
                          Filial:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontFamily: "SFProDisplay",
                            color: "#2D3A45",
                            fontWeight: "600",
                            fontStyle: "normal",
                            lineHeight: "18px",
                            letterSpacing: "0.467px",
                            width: "120px",
                          }}
                        >
                          {item.flial}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        disabled={item.status === "new" ? true : false}
                        onClick={() => {
                          changeStatusFail(item.id);
                        }}
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
                        disabled={item.status === "canceled" ? true : false}
                        onClick={() => {
                          changeStatusSuccess(item.id);
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
              </Box>
            );
          })}
      </Box>

      <Box
        sx={{
          width: "300px",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <Box>
          <Box
            sx={{
              width: "210px",
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "16px", color: "#666666" }}>
              Qabul qilingan
            </Typography>
            <span
              className="spanN"
              style={{
                padding: "3px 15px",
                fontSize: "16px",
                color: "#666666",
                backgroundColor: "#FFFFFF",
                borderRadius: "5px",
              }}
            >
              {orders.filter((order) => order.status === "accepted").length}
            </span>
          </Box>
          <Box
            sx={{
              width: "100%",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              mt: 1,
              py: 1,
              px: 2,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z"
                fill="#11ACFD"
              />
            </svg>
            {/* <span>{allSumAccepted} UZS</span> */}

            <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
              {orders
                .filter((order) => order.status === "accepted")
                .reduce((accumlator, element) => {
                  return accumlator + element.totalSum;
                }, 0)
                .toLocaleString()}

              <span style={{ marginLeft: "10px" }}>UZS</span>
            </Typography>
          </Box>
        </Box>
        {orders
          .filter((i) => i.status === "accepted")
          .map((item) => {
            return (
              <>
                <Box
                  sx={{
                    width: "100%",
                    background: "#fff",
                    p: 2,
                    borderRadius: "10px",
                    "&:hover": {
                      boxShadow: "0px 2px 26px 1px rgba(34, 60, 80, 0.2)",
                      transform: "scale(1.01)",
                      transition: ".4s",
                    },
                    minHeight: "370px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      borderBottom: "2px solid #979797",
                      pb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          background: "#20D472",
                          color: "#fff",
                          borderRadius: "18px",
                          p: "3px 10px",
                          fontSize: "14px",
                          mr: 1,
                        }}
                      >
                        {item.id}
                      </Typography>
                      <Box
                        sx={{
                          background: "#EDEFF3",
                          borderRadius: "18px",
                          width: "35px",
                          height: "35px",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          width="13"
                          height="16"
                          viewBox="0 0 13 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 15.1429L6.5 11.2143L1 15.1429V2.57143C1 1.70355 1.70355 1 2.57143 1H10.4286C11.2964 1 12 1.70355 12 2.57143V15.1429Z"
                              stroke="#2D3A45"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                        </svg>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        gap: "5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AccessTimeIcon />
                      <Typography sx={{ fontSize: "14px" }}>
                        {item.time}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      gap: "20px",
                      mt: 3,
                      cursor: "pointer",
                    }}
                    onClick={() => {}}
                  >
                    <PersonOutlineOutlinedIcon />
                    <Box sx={{ marginTop: "-5px" }}>
                      <Typography
                        sx={{
                          textAlign: "start",
                          color: "#2D3A45",
                          fontSize: "14px",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#2D3A45",
                          fontSize: "13px",
                          opacity: "0.3",
                        }}
                      >
                        {item.phone}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      mt: 4,
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "space-between",
                      borderBottom: "2px solid #979797",
                      pb: 1,
                      mb: 2,
                    }}
                  >
                    <Box sx={{ marginTop: "" }}>
                      <Typography
                        sx={{
                          color: "#8D9BA8",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        Umumiy summa
                      </Typography>
                      <Typography sx={{ fontSize: "20px" }}>
                        <span style={{ fontWeight: "700" }}>
                          {item.productsPrice}
                          {/* {item.orders.map((or) => or.price)} */}
                        </span>{" "}
                        UZS
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ textAlign: "start" }}>
                      <Box sx={{ mb: 2 }}>
                        <Typography sx={{ color: "#8D9BA8", fontSize: "12px" }}>
                          Operator:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontFamily: "SFProDisplay",
                            color: "#2D3A45",
                            fontWeight: "600",
                            fontStyle: "normal",
                            lineHeight: "18px",
                            letterSpacing: "0.467px",
                          }}
                        >
                          {item.operator}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ color: "#8D9BA8", fontSize: "12px" }}>
                          Filial:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontFamily: "SFProDisplay",
                            color: "#2D3A45",
                            fontWeight: "600",
                            fontStyle: "normal",
                            lineHeight: "18px",
                            letterSpacing: "0.467px",
                            width: "120px",
                          }}
                        >
                          {item.flial}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        disabled={item.status === "new" ? true : false}
                        onClick={() => {
                          changeStatusFail(item.id);
                        }}
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
                        disabled={item.status === "canceled" ? true : false}
                        onClick={() => {
                          changeStatusSuccess(item.id);
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
              </>
            );
          })}
      </Box>

      <Box
        sx={{
          width: "300px",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <Box>
          <Box
            sx={{
              width: "210px",
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "16px", color: "#666666" }}>
              Jo'natilgan
            </Typography>
            <span
              className="spanN"
              style={{
                padding: "3px 15px",
                fontSize: "16px",
                color: "#666666",
                backgroundColor: "#FFFFFF",
                borderRadius: "5px",
              }}
            >
              {orders.filter((order) => order.status === "delivered").length}
            </span>
          </Box>
          <Box
            sx={{
              width: "100%",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              mt: 1,
              py: 1,
              px: 2,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z"
                fill="#FCB600"
              />
            </svg>

            <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
              {orders
                .filter((order) => order.status === "delivered")
                .reduce((accumlator, element) => {
                  return accumlator + element.totalSum;
                }, 0)
                .toLocaleString()}

              <span style={{ marginLeft: "10px" }}>UZS</span>
            </Typography>
          </Box>
        </Box>
        {orders
          .filter((i) => i.status === "delivered")
          .map((item) => {
            return (
              <>
                <Box
                  sx={{
                    width: "100%",
                    background: "#fff",
                    p: 2,
                    borderRadius: "10px",
                    "&:hover": {
                      boxShadow: "0px 2px 26px 1px rgba(34, 60, 80, 0.2)",
                      transform: "scale(1.01)",
                      transition: ".4s",
                    },
                    minHeight: "370px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      borderBottom: "2px solid #979797",
                      pb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          background: "#20D472",
                          color: "#fff",
                          borderRadius: "18px",
                          p: "3px 10px",
                          fontSize: "14px",
                          mr: 1,
                        }}
                      >
                        {item.id}
                      </Typography>
                      <Box
                        sx={{
                          background: "#EDEFF3",
                          borderRadius: "18px",
                          width: "35px",
                          height: "35px",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          width="13"
                          height="16"
                          viewBox="0 0 13 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 15.1429L6.5 11.2143L1 15.1429V2.57143C1 1.70355 1.70355 1 2.57143 1H10.4286C11.2964 1 12 1.70355 12 2.57143V15.1429Z"
                              stroke="#2D3A45"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                        </svg>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        gap: "5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AccessTimeIcon />
                      <Typography sx={{ fontSize: "14px" }}>
                        {item.time}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      gap: "20px",
                      mt: 3,
                      cursor: "pointer",
                    }}
                    onClick={() => {}}
                  >
                    <PersonOutlineOutlinedIcon />
                    <Box sx={{ marginTop: "-5px" }}>
                      <Typography
                        sx={{
                          textAlign: "start",
                          color: "#2D3A45",
                          fontSize: "14px",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#2D3A45",
                          fontSize: "13px",
                          opacity: "0.3",
                        }}
                      >
                        {item.phone}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      mt: 4,
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "space-between",
                      borderBottom: "2px solid #979797",
                      pb: 1,
                      mb: 2,
                    }}
                  >
                    <Box sx={{ marginTop: "" }}>
                      <Typography
                        sx={{
                          color: "#8D9BA8",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        Umumiy summa
                      </Typography>
                      <Typography sx={{ fontSize: "20px" }}>
                        <span style={{ fontWeight: "700" }}>
                          {item.productsPrice}
                          {/* {item.orders.map((or) => or.price)} */}
                        </span>{" "}
                        UZS
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ textAlign: "start" }}>
                      <Box sx={{ mb: 2 }}>
                        <Typography sx={{ color: "#8D9BA8", fontSize: "12px" }}>
                          Operator:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontFamily: "SFProDisplay",
                            color: "#2D3A45",
                            fontWeight: "600",
                            fontStyle: "normal",
                            lineHeight: "18px",
                            letterSpacing: "0.467px",
                          }}
                        >
                          {item.operator}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ color: "#8D9BA8", fontSize: "12px" }}>
                          Filial:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontFamily: "SFProDisplay",
                            color: "#2D3A45",
                            fontWeight: "600",
                            fontStyle: "normal",
                            lineHeight: "18px",
                            letterSpacing: "0.467px",
                            width: "120px",
                          }}
                        >
                          {item.flial}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        disabled={item.status === "new" ? true : false}
                        onClick={() => {
                          changeStatusFail(item.id);
                        }}
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
                        disabled={item.status === "canceled" ? true : false}
                        onClick={() => {
                          changeStatusSuccess(item.id);
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
              </>
            );
          })}
      </Box>

      <Box
        sx={{
          width: "300px",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <Box>
          <Box
            sx={{
              width: "210px",
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "16px", color: "#666666" }}>
              Yopilgan
            </Typography>
            <span
              className="spanN"
              style={{
                padding: "3px 15px",
                fontSize: "16px",
                color: "#666666",
                backgroundColor: "#FFFFFF",
                borderRadius: "5px",
              }}
            >
              {orders.filter((order) => order.status === "closed").length}
            </span>
          </Box>
          <Box
            sx={{
              width: "100%",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              mt: 1,
              py: 1,
              px: 2,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z"
                fill="#8E007E"
              />
            </svg>

            <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
              {orders
                .filter((order) => order.status === "closed")
                .reduce((accumlator, element) => {
                  return accumlator + element.totalSum;
                }, 0)
                .toLocaleString()}

              <span style={{ marginLeft: "10px" }}>UZS</span>
            </Typography>
          </Box>
        </Box>
        {orders
          .filter((i) => i.status === "closed")
          .map((item) => {
            return (
              <>
                <Box
                  sx={{
                    width: "100%",
                    background: "#fff",
                    p: 2,
                    borderRadius: "10px",
                    "&:hover": {
                      boxShadow: "0px 2px 26px 1px rgba(34, 60, 80, 0.2)",
                      transform: "scale(1.01)",
                      transition: ".4s",
                    },
                    minHeight: "370px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      borderBottom: "2px solid #979797",
                      pb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          background: "#20D472",
                          color: "#fff",
                          borderRadius: "18px",
                          p: "3px 10px",
                          fontSize: "14px",
                          mr: 1,
                        }}
                      >
                        {item.id}
                      </Typography>
                      <Box
                        sx={{
                          background: "#EDEFF3",
                          borderRadius: "18px",
                          width: "35px",
                          height: "35px",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          width="13"
                          height="16"
                          viewBox="0 0 13 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 15.1429L6.5 11.2143L1 15.1429V2.57143C1 1.70355 1.70355 1 2.57143 1H10.4286C11.2964 1 12 1.70355 12 2.57143V15.1429Z"
                              stroke="#2D3A45"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                        </svg>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        gap: "5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AccessTimeIcon />
                      <Typography sx={{ fontSize: "14px" }}>
                        {item.time}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      gap: "20px",
                      mt: 3,
                      cursor: "pointer",
                    }}
                    onClick={() => {}}
                  >
                    <PersonOutlineOutlinedIcon />
                    <Box sx={{ marginTop: "-5px" }}>
                      <Typography
                        sx={{
                          textAlign: "start",
                          color: "#2D3A45",
                          fontSize: "14px",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#2D3A45",
                          fontSize: "13px",
                          opacity: "0.3",
                        }}
                      >
                        {item.phone}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      mt: 4,
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "space-between",
                      borderBottom: "2px solid #979797",
                      pb: 1,
                      mb: 2,
                    }}
                  >
                    <Box sx={{ marginTop: "" }}>
                      <Typography
                        sx={{
                          color: "#8D9BA8",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        Umumiy summa
                      </Typography>
                      <Typography sx={{ fontSize: "20px" }}>
                        <span style={{ fontWeight: "700" }}>
                          {item.productsPrice}
                          {/* {item.orders.map((or) => or.price)} */}
                        </span>{" "}
                        UZS
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ textAlign: "start" }}>
                      <Box sx={{ mb: 2 }}>
                        <Typography sx={{ color: "#8D9BA8", fontSize: "12px" }}>
                          Operator:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontFamily: "SFProDisplay",
                            color: "#2D3A45",
                            fontWeight: "600",
                            fontStyle: "normal",
                            lineHeight: "18px",
                            letterSpacing: "0.467px",
                          }}
                        >
                          {item.operator}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ color: "#8D9BA8", fontSize: "12px" }}>
                          Filial:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontFamily: "SFProDisplay",
                            color: "#2D3A45",
                            fontWeight: "600",
                            fontStyle: "normal",
                            lineHeight: "18px",
                            letterSpacing: "0.467px",
                            width: "120px",
                          }}
                        >
                          {item.flial}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        disabled={item.status === "new" ? true : false}
                        onClick={() => {
                          changeStatusFail(item.id);
                        }}
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
                        disabled={item.status === "canceled" ? true : false}
                        onClick={() => {
                          changeStatusSuccess(item.id);
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
              </>
            );
          })}
      </Box>

      <Box
        sx={{
          width: "300px",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <Box>
          <Box
            sx={{
              width: "210px",
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "16px", color: "#666666" }}>
              Bekor qilingan
            </Typography>
            <span
              className="spanN"
              style={{
                padding: "3px 15px",
                fontSize: "16px",
                color: "#666666",
                backgroundColor: "#FFFFFF",
                borderRadius: "5px",
              }}
            >
              {orders.filter((order) => order.status === "canceled").length}
            </span>
          </Box>
          <Box
            sx={{
              width: "100%",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              mt: 1,
              py: 1,
              px: 2,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z"
                fill="#E94A47"
              />
            </svg>

            <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
              {orders
                .filter((order) => order.status === "canceled")
                .reduce((accumlator, element) => {
                  return accumlator + element.totalSum;
                }, 0)
                .toLocaleString()}

              <span style={{ marginLeft: "10px" }}>UZS</span>
            </Typography>
          </Box>
        </Box>
        {orders
          .filter((i) => i.status === "canceled")
          .map((item) => {
            return (
              <>
                <Box
                  sx={{
                    width: "100%",
                    background: "#fff",
                    p: 2,
                    borderRadius: "10px",
                    "&:hover": {
                      boxShadow: "0px 2px 26px 1px rgba(34, 60, 80, 0.2)",
                      transform: "scale(1.01)",
                      transition: ".4s",
                    },
                    minHeight: "370px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      borderBottom: "2px solid #979797",
                      pb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          background: "#20D472",
                          color: "#fff",
                          borderRadius: "18px",
                          p: "3px 10px",
                          fontSize: "14px",
                          mr: 1,
                        }}
                      >
                        {item.id}
                      </Typography>
                      <Box
                        sx={{
                          background: "#EDEFF3",
                          borderRadius: "18px",
                          width: "35px",
                          height: "35px",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          width="13"
                          height="16"
                          viewBox="0 0 13 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 15.1429L6.5 11.2143L1 15.1429V2.57143C1 1.70355 1.70355 1 2.57143 1H10.4286C11.2964 1 12 1.70355 12 2.57143V15.1429Z"
                              stroke="#2D3A45"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                        </svg>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        gap: "5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AccessTimeIcon />
                      <Typography sx={{ fontSize: "14px" }}>
                        {item.time}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "start",
                      gap: "20px",
                      mt: 3,
                      cursor: "pointer",
                    }}
                    onClick={() => {}}
                  >
                    <PersonOutlineOutlinedIcon />
                    <Box sx={{ marginTop: "-5px" }}>
                      <Typography
                        sx={{
                          textAlign: "start",
                          color: "#2D3A45",
                          fontSize: "14px",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#2D3A45",
                          fontSize: "13px",
                          opacity: "0.3",
                        }}
                      >
                        {item.phone}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      mt: 4,
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "space-between",
                      borderBottom: "2px solid #979797",
                      pb: 1,
                      mb: 2,
                    }}
                  >
                    <Box sx={{ marginTop: "" }}>
                      <Typography
                        sx={{
                          color: "#8D9BA8",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        Umumiy summa
                      </Typography>
                      <Typography sx={{ fontSize: "20px" }}>
                        <span style={{ fontWeight: "700" }}>
                          {item.productsPrice}
                          {/* {item.orders.map((or) => or.price)} */}
                        </span>{" "}
                        UZS
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ textAlign: "start" }}>
                      <Box sx={{ mb: 2 }}>
                        <Typography sx={{ color: "#8D9BA8", fontSize: "12px" }}>
                          Operator:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontFamily: "SFProDisplay",
                            color: "#2D3A45",
                            fontWeight: "600",
                            fontStyle: "normal",
                            lineHeight: "18px",
                            letterSpacing: "0.467px",
                          }}
                        >
                          {item.operator}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ color: "#8D9BA8", fontSize: "12px" }}>
                          Filial:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontFamily: "SFProDisplay",
                            color: "#2D3A45",
                            fontWeight: "600",
                            fontStyle: "normal",
                            lineHeight: "18px",
                            letterSpacing: "0.467px",
                            width: "120px",
                          }}
                        >
                          {item.flial}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        disabled={item.status === "new" ? true : false}
                        onClick={() => {
                          changeStatusFail(item.id);
                        }}
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
                        disabled={item.status === "canceled" ? true : false}
                        onClick={() => {
                          changeStatusSuccess(item.id);
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
              </>
            );
          })}
      </Box>
    </Box>
  );
};

const ShowOrders = () => {
  const [activatedButton, setActivatedButton] = useState(1);

  const handleButtonClick = (index) => {
    setActivatedButton(index);
  };

  const [activeLayout, setActiveLayout] = useLocalStorageState(1);

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
                    disabled={activeLayout === 2 ? true : false}
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
                    disabled={activeLayout === 2 ? true : false}
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
                    disabled={activeLayout === 2 ? true : false}
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
                    disabled={activeLayout === 2 ? true : false}
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
                    disabled={activeLayout === 2 ? true : false}
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
          {activeLayout === 1 ? (
            <OredersHorizontalLayout
              filterIndex={filterIndex}
            ></OredersHorizontalLayout>
          ) : (
            <OredersVerticalLayout>123</OredersVerticalLayout>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ShowOrders;
