import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";

import horizontalIcon from "./icons/horizontal.png";
import verticalIcon from "./icons/vertical.png";
import ApiContext from "../../context/context";
import SwipeableTemporaryDrawer from "./orderModal/orderModal";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

// const SearchAppBar = () => {
//   const [activatedButton, setActivatedButton] = useState(1);

//   const handleButtonClick = (index) => {
//     setActivatedButton(index);
//   };

//   const [activeLayout, setActiveLayout] = useState(1);

//   const handleChangeLayout = (index) => {
//     setActiveLayout(index);
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar
//         position="static"
//         sx={{
//           backgroundColor: "transparent",
//           color: "black",
//           minHeight: "auto",
//           boxShadow: "none",
//           "& .MuiToolbar-gutters": {
//             minHeight: "auto",
//             p: 0,
//           },
//         }}
//       >
//         <Toolbar>
//           <Box
//             sx={{
//               width: "100%",
//               display: "flex",
//               justifyContent: "space-around",
//               gap: "3px",
//             }}
//           >
//             <Box
//               sx={{
//                 backgroundColor: "white",
//                 flex: 1.2,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 py: "11px",
//                 gap: "10px",
//               }}
//             >
//               <Button
//                 variant="contained"
//                 sx={{
//                   p: 0,
//                   width: "40px",
//                   height: "40px",
//                   borderRadius: "50%",
//                   minWidth: "auto",
//                   backgroundColor: "rgba(32, 212, 114, 1)",
//                   boxShadow: "none",
//                   "&:hover": {
//                     backgroundColor: "rgb(27, 172, 93)",
//                   },
//                 }}
//               >
//                 +
//               </Button>
//               <Typography sx={{ fontSize: "13px", fontWeight: "bold" }}>
//                 Yangi buyurtma <br /> qo’shish
//               </Typography>
//             </Box>
//             <Box
//               sx={{
//                 backgroundColor: "white",
//                 flex: 4,
//                 py: "11px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Box
//                 sx={{
//                   px: "20px",
//                   py: "8px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   gap: "7px",
//                   backgroundColor: "rgba(237, 239, 243, 1)",
//                   borderRadius: "50px",
//                 }}
//               >
//                 <Button
//                   variant="contained"
//                   sx={{
//                     p: "5px 35px",
//                     borderRadius: "50px",
//                     minWidth: "auto",
//                     backgroundColor:
//                       activatedButton === 1 ? "white" : "transparent",
//                     color:
//                       activatedButton === 1
//                         ? "rgba(45, 58, 69, 1)"
//                         : "rgba(45, 58, 69, 0.7)",
//                     boxShadow: "none",
//                     "&:hover": {
//                       backgroundColor: "white",
//                     },
//                     "&:focus": {
//                       boxShadow:
//                         "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
//                     },
//                   }}
//                   onClick={() => {
//                     handleButtonClick(1);
//                     filterIndex = 1;
//                   }}
//                 >
//                   Yangi
//                 </Button>
//                 <Button
//                   variant="contained"
//                   sx={{
//                     p: "5px 35px",
//                     borderRadius: "50px",
//                     minWidth: "auto",
//                     backgroundColor:
//                       activatedButton === 2 ? "white" : "transparent",
//                     color:
//                       activatedButton === 2
//                         ? "rgba(45, 58, 69, 1)"
//                         : "rgba(45, 58, 69, 0.7)",
//                     boxShadow: "none",
//                     "&:hover": {
//                       backgroundColor: "white",
//                     },
//                     "&:focus": {
//                       boxShadow:
//                         "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
//                     },
//                   }}
//                   onClick={() => {
//                     handleButtonClick(2);
//                     filterIndex = 2;
//                   }}
//                 >
//                   Qabul qilingan
//                 </Button>
//                 <Button
//                   variant="contained"
//                   sx={{
//                     p: "5px 35px",
//                     borderRadius: "50px",
//                     minWidth: "auto",
//                     backgroundColor:
//                       activatedButton === 3 ? "white" : "transparent",
//                     color:
//                       activatedButton === 3
//                         ? "rgba(45, 58, 69, 1)"
//                         : "rgba(45, 58, 69, 0.7)",
//                     boxShadow: "none",
//                     "&:hover": {
//                       backgroundColor: "white",
//                     },
//                     "&:focus": {
//                       boxShadow:
//                         "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
//                     },
//                   }}
//                   onClick={() => {
//                     handleButtonClick(3);
//                     filterIndex = 3;
//                   }}
//                 >
//                   Jo’natilgan
//                 </Button>
//                 <Button
//                   variant="contained"
//                   sx={{
//                     p: "5px 35px",
//                     borderRadius: "50px",
//                     minWidth: "auto",
//                     backgroundColor:
//                       activatedButton === 4 ? "white" : "transparent",
//                     color:
//                       activatedButton === 4
//                         ? "rgba(45, 58, 69, 1)"
//                         : "rgba(45, 58, 69, 0.7)",
//                     boxShadow: "none",
//                     "&:hover": {
//                       backgroundColor: "white",
//                     },
//                     "&:focus": {
//                       boxShadow:
//                         "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
//                     },
//                   }}
//                   onClick={() => {
//                     handleButtonClick(4);
//                     filterIndex = 4;
//                   }}
//                 >
//                   Yopilgan
//                 </Button>
//               </Box>
//             </Box>
//             <Box
//               sx={{
//                 backgroundColor: "white",
//                 flex: 1,
//                 py: "11px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Box
//                 sx={{
//                   px: "10px",
//                   py: "8px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   gap: "7px",
//                   backgroundColor: "rgba(237, 239, 243, 1)",
//                   borderRadius: "50px",
//                 }}
//               >
//                 <Button
//                   variant="contained"
//                   sx={{
//                     width: "30px",
//                     height: "30px",
//                     borderRadius: "50%",
//                     minWidth: "auto",
//                     backgroundColor:
//                       activeLayout === 1 ? "white" : "transparent",
//                     color:
//                       activeLayout === 1
//                         ? "rgba(45, 58, 69, 1)"
//                         : "rgba(45, 58, 69, 0.7)",
//                     boxShadow: "none",
//                     "&:hover": {
//                       backgroundColor: "white",
//                     },
//                     "&:focus": {
//                       boxShadow:
//                         "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
//                     },
//                   }}
//                   onClick={() => {
//                     handleChangeLayout(1);
//                   }}
//                 >
//                   <img src={horizontalIcon} alt="" />
//                 </Button>
//                 <Button
//                   variant="contained"
//                   sx={{
//                     width: "30px",
//                     height: "30px",
//                     borderRadius: "50%",
//                     minWidth: "auto",
//                     backgroundColor:
//                       activeLayout === 2 ? "white" : "transparent",
//                     color:
//                       activeLayout === 2
//                         ? "rgba(45, 58, 69, 1)"
//                         : "rgba(45, 58, 69, 0.7)",
//                     boxShadow: "none",
//                     "&:hover": {
//                       backgroundColor: "white",
//                     },
//                     "&:focus": {
//                       boxShadow:
//                         "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
//                     },
//                   }}
//                   onClick={() => {
//                     handleChangeLayout(2);
//                   }}
//                 >
//                   <img src={verticalIcon} alt="" />
//                 </Button>
//               </Box>
//             </Box>
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };

const OredersHorizontalLayout = ({ filterIndex }) => {
  const params = useSearchParams();

  console.log("changed");

  // const [updatedFilterIndex, setupdatedFilterIndex] = useState(1);

  let filterType =
    filterIndex === 1
      ? "new"
      : filterIndex === 2
      ? "accepted"
      : filterIndex === 3
      ? "delivired"
      : filterIndex === 4
      ? "closed"
      : null;

  const { orders } = useContext(ApiContext);

  const filteredData = orders.filter((order) => {
    return order.status === filterType;
  });

  return filteredData.map((order) => {
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
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
              marginTop: "30px",
              paddingLeft: "23px",
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
              <Typography>35,400 UZS</Typography>
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
            <Typography>{order.delivery ? "5000 uzs" : "-"}</Typography>
          </Box>

          <Box sx={{ marginTop: "17px" }}>
            <Typography
              sx={{ fontSize: "11px", color: "rgba(45, 58, 69, 0.7)" }}
            >
              Umumiy summa
            </Typography>

            <Typography sx={{ fontSize: "20px" }}>
              <span style={{ fontWeight: "bolder" }}>40,400</span> UZS
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

  // let filterIndex = 1;

  const [filterIndex, setFilterIndex] = useState(1);

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
                  flex: 1.2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  py: "11px",
                  gap: "10px",
                }}
              >
                <SwipeableTemporaryDrawer></SwipeableTemporaryDrawer>

                <Typography sx={{ fontSize: "13px", fontWeight: "bold" }}>
                  Yangi buyurtma <br /> qo’shish
                </Typography>
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
                    px: "20px",
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
                      p: "5px 35px",
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
                      p: "5px 35px",
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
                    Jo’natilgan
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      p: "5px 35px",
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
                    <img src={horizontalIcon} alt="" />
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
                    <img src={verticalIcon} alt="" />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ padding: "35px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <OredersHorizontalLayout
            filterIndex={filterIndex}
          ></OredersHorizontalLayout>
          {/* <Box
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
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
                  8549
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
                  marginTop: "30px",
                  paddingLeft: "23px",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "17px",
                }}
              >
                <AccessTimeIcon
                  sx={{ color: "rgba(45, 58, 69, 0.6)" }}
                ></AccessTimeIcon>
                <Typography>00:50</Typography>
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
                  <Typography sx={{ fontSize: "20px" }}>
                    Muhammad Jumayev
                  </Typography>
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
                  <Typography>(+99 893) 461-41-88</Typography>
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
              <Box
                sx={{ display: "flex", justifyContent: "start", gap: "40px" }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <ContentPasteOutlinedIcon
                    sx={{ color: " rgba(45, 58, 69, 0.7)", fontSize: "20px" }}
                  />
                  <Typography>35,400 UZS</Typography>
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
                <Typography>5,000 UZS</Typography>
              </Box>

              <Box sx={{ marginTop: "17px" }}>
                <Typography
                  sx={{ fontSize: "11px", color: "rgba(45, 58, 69, 0.7)" }}
                >
                  Umumiy summa
                </Typography>

                <Typography sx={{ fontSize: "20px" }}>
                  <span style={{ fontWeight: "bolder" }}>40,400</span> UZS
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
                  Komilova M
                </Typography>
              </Box>

              <Box sx={{ marginTop: "18px" }}>
                <Typography
                  sx={{ fontSize: "11px", color: "rgba(45, 58, 69, 0.7)" }}
                >
                  Flial:
                </Typography>

                <Typography sx={{ fontSize: "16px", fontWeight: "bolder" }}>
                  Fast Food Maksim Gorkiy
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
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default ShowOrders;
