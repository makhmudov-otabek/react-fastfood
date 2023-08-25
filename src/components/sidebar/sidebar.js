import "./sidebarStyle.css";
import * as React from "react";
import { Box } from "@mui/system";

import avatar from "./imgs/Bitmap.png";
import { Typography } from "@mui/material";

import { FiCheckCircle } from "react-icons/fi";
import { BsArchive } from "react-icons/bs";
import { BiLayer } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { FiBarChart2 } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { CiLocationArrow1 } from "react-icons/ci";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { useLocalStorageState } from "ahooks";

const drawerWidth = "20%";

const PermanentDrawerLeft = () => {
  const navigate = useNavigate();

  const [activatedButton, setActivatedButton] = useLocalStorageState(
    "activeSection",
    { defaultValue: 1 }
  );

  const handleButtonClick = (index) => {
    setActivatedButton(index);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            padding: "15px 20px",
            gap: "15px",
          }}
        >
          <Box>
            <img src={avatar} alt="" style={{ with: "60px", height: "60px" }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "bold" }}>Fast Food</Typography>
            <Typography
              className="text-sky-400"
              sx={{
                // color: "rgba(45, 58, 69, 0.7)",
                fontSize: "11px",
                fontWeight: "bold",
              }}
            >
              Online maxsulot sotuvi
            </Typography>
          </Box>
        </Box>
        <List sx={{ marginTop: "40px" }}>
          <ListItem
            disablePadding
            sx={{
              width: "85%",
            }}
            onClick={() => {
              handleButtonClick(1);
              navigate("/");
            }}
            className={
              activatedButton === 1 ? "buttonFocused" : "buttonUnFocused"
            }
          >
            <ListItemButton
              sx={{
                borderLeft: "5px solid rgba(252, 182, 0, 1)",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "15px",

                "& .orderButtonUnFocusedIcon": {
                  backgroundColor: "#f6f6f6;",
                },
                "&:hover": {
                  backgroundColor: "rgba(252, 182, 0, 0.9)",
                  color: "white",
                  "& .orderButtonUnFocusedIcon": {
                    color: "white",
                    background: "transparent",
                  },
                },
                "& .css-cveggr-MuiListItemIcon-root": {
                  minWidth: "35px",
                },
              }}
            >
              <FiCheckCircle
                className={
                  activatedButton === 1
                    ? "orderButtonFocusedIcon"
                    : "orderButtonUnFocusedIcon"
                }
              ></FiCheckCircle>

              <ListItemText primary={"Buyurtmalar"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              width: "85%",
            }}
            onClick={() => {
              handleButtonClick(2);
              navigate("/products");
            }}
            className={
              activatedButton === 2 ? "buttonFocused" : "buttonUnFocused"
            }
          >
            <ListItemButton
              sx={{
                borderLeft: "5px solid rgba(252, 182, 0, 1)",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",

                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "15px",

                "& .orderButtonUnFocusedIcon": {
                  backgroundColor: "#f6f6f6;",
                },
                "&:hover": {
                  backgroundColor: "rgba(252, 182, 0, 0.9)",
                  color: "white",
                  "& .orderButtonUnFocusedIcon": {
                    color: "white",
                    background: "transparent",
                  },
                },
                "& .css-cveggr-MuiListItemIcon-root": {
                  minWidth: "35px",
                },
              }}
            >
              <BsArchive
                className={
                  activatedButton === 2
                    ? "orderButtonFocusedIcon"
                    : "orderButtonUnFocusedIcon"
                }
              ></BsArchive>
              <ListItemText primary={"Mahsulotlar"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              width: "85%",
            }}
            onClick={() => {
              handleButtonClick(3);
              navigate("/categories");
            }}
            className={
              activatedButton === 3 ? "buttonFocused" : "buttonUnFocused"
            }
          >
            <ListItemButton
              sx={{
                borderLeft: "5px solid rgba(252, 182, 0, 1)",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",

                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "15px",

                "& .orderButtonUnFocusedIcon": {
                  backgroundColor: "#f6f6f6;",
                },
                "&:hover": {
                  backgroundColor: "rgba(252, 182, 0, 0.9)",
                  color: "white",
                  "& .orderButtonUnFocusedIcon": {
                    color: "white",
                    background: "transparent",
                  },
                },
                "& .css-cveggr-MuiListItemIcon-root": {
                  minWidth: "35px",
                },
              }}
            >
              <BiLayer
                className={
                  activatedButton === 3
                    ? "orderButtonFocusedIcon"
                    : "orderButtonUnFocusedIcon"
                }
              ></BiLayer>
              <ListItemText primary={"Kategoriyalar"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              width: "85%",
            }}
            onClick={() => {
              handleButtonClick(4);
              navigate("/flials");
            }}
            className={
              activatedButton === 4 ? "buttonFocused" : "buttonUnFocused"
            }
          >
            <ListItemButton
              sx={{
                borderLeft: "5px solid rgba(252, 182, 0, 1)",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "15px",

                "& .orderButtonUnFocusedIcon": {
                  backgroundColor: "#f6f6f6;",
                },
                "&:hover": {
                  backgroundColor: "rgba(252, 182, 0, 0.9)",
                  color: "white",
                  "& .orderButtonUnFocusedIcon": {
                    color: "white",
                    background: "transparent",
                  },
                },
                "& .css-cveggr-MuiListItemIcon-root": {
                  minWidth: "35px",
                },
              }}
            >
              <CiLocationOn
                className={
                  activatedButton === 4
                    ? "orderButtonFocusedIcon"
                    : "orderButtonUnFocusedIcon"
                }
              ></CiLocationOn>
              <ListItemText primary={"Fliallar"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              width: "85%",
            }}
            onClick={() => {
              handleButtonClick(5);
              navigate("/customers");
            }}
            className={
              activatedButton === 5 ? "buttonFocused" : "buttonUnFocused"
            }
          >
            <ListItemButton
              sx={{
                borderLeft: "5px solid rgba(252, 182, 0, 1)",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "15px",

                "& .orderButtonUnFocusedIcon": {
                  backgroundColor: "#f6f6f6;",
                },
                "&:hover": {
                  backgroundColor: "rgba(252, 182, 0, 0.9)",
                  color: "white",
                  "& .orderButtonUnFocusedIcon": {
                    color: "white",
                    background: "transparent",
                  },
                },
                "& .css-cveggr-MuiListItemIcon-root": {
                  minWidth: "35px",
                },
              }}
            >
              <FiUsers
                className={
                  activatedButton === 5
                    ? "orderButtonFocusedIcon"
                    : "orderButtonUnFocusedIcon"
                }
              ></FiUsers>
              <ListItemText primary={"Mijozlar"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              width: "85%",
            }}
            onClick={() => {
              handleButtonClick(6);
              navigate("/reports");
            }}
            className={
              activatedButton === 6 ? "buttonFocused" : "buttonUnFocused"
            }
          >
            <ListItemButton
              sx={{
                borderLeft: "5px solid rgba(252, 182, 0, 1)",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
                display: "none",
                justifyContent: "start",
                alignItems: "center",
                gap: "15px",

                "& .orderButtonUnFocusedIcon": {
                  backgroundColor: "#f6f6f6;",
                },
                "&:hover": {
                  backgroundColor: "rgba(252, 182, 0, 0.9)",
                  color: "white",
                  "& .orderButtonUnFocusedIcon": {
                    color: "white",
                    background: "transparent",
                  },
                },
                "& .css-cveggr-MuiListItemIcon-root": {
                  minWidth: "35px",
                },
              }}
            >
              <FiBarChart2
                className={
                  activatedButton === 6
                    ? "orderButtonFocusedIcon"
                    : "orderButtonUnFocusedIcon"
                }
              ></FiBarChart2>
              <ListItemText primary={"Xisobot"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              width: "85%",
            }}
            onClick={() => {
              handleButtonClick(7);
              navigate("/catalog");
            }}
            className={
              activatedButton === 7 ? "buttonFocused" : "buttonUnFocused"
            }
          >
            <ListItemButton
              sx={{
                display: "none",
                borderLeft: "5px solid rgba(252, 182, 0, 1)",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
                justifyContent: "start",
                alignItems: "center",
                gap: "15px",

                "& .orderButtonUnFocusedIcon": {
                  backgroundColor: "#f6f6f6;",
                },
                "&:hover": {
                  backgroundColor: "rgba(252, 182, 0, 0.9)",
                  color: "white",
                  "& .orderButtonUnFocusedIcon": {
                    color: "white",
                    background: "transparent",
                  },
                },
                "& .css-cveggr-MuiListItemIcon-root": {
                  minWidth: "35px",
                },
              }}
            >
              <FiSettings
                className={
                  activatedButton === 7
                    ? "orderButtonFocusedIcon"
                    : "orderButtonUnFocusedIcon"
                }
              ></FiSettings>
              <ListItemText primary={"Katalog"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              width: "85%",
            }}
            onClick={() => {
              handleButtonClick(8);
              navigate("/location");
            }}
            className={
              activatedButton === 8 ? "buttonFocused" : "buttonUnFocused"
            }
          >
            <ListItemButton
              sx={{
                borderLeft: "5px solid rgba(252, 182, 0, 1)",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "15px",

                "& .orderButtonUnFocusedIcon": {
                  backgroundColor: "#f6f6f6;",
                },
                "&:hover": {
                  backgroundColor: "rgba(252, 182, 0, 0.9)",
                  color: "white",
                  "& .orderButtonUnFocusedIcon": {
                    color: "white",
                    background: "transparent",
                  },
                },
                "& .css-cveggr-MuiListItemIcon-root": {
                  minWidth: "35px",
                },
              }}
            >
              <CiLocationArrow1
                className={
                  activatedButton === 8
                    ? "orderButtonFocusedIcon"
                    : "orderButtonUnFocusedIcon"
                }
              ></CiLocationArrow1>
              <ListItemText primary={"Xarita"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

const Sidebar = () => {
  return (
    <Box>
      <PermanentDrawerLeft></PermanentDrawerLeft>
    </Box>
  );
};

export default Sidebar;
