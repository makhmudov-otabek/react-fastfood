import "./sidebarStyle.css";

import { Box } from "@mui/system";

import avatar from "./imgs/Bitmap.png";
import { Typography } from "@mui/material";

import * as React from "react";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const drawerWidth = "20%";

const PermanentDrawerLeft = () => {
  const navigate = useNavigate();

  const [activatedButton, setActivatedButton] = useState(1);

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
              sx={{
                color: "rgba(45, 58, 69, 0.7)",
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
          >
            <ListItemButton
              className={
                activatedButton === 1 ? "buttonFocused" : "buttonUnFocused"
              }
              sx={{
                borderLeft: "5px solid rgba(252, 182, 0, 1)",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
                "&:hover": {
                  backgroundColor: "rgba(252, 182, 0, 0.9)",
                  color: "white",
                },

                "& .css-cveggr-MuiListItemIcon-root": {
                  minWidth: "35px",
                },
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
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
          >
            <ListItemButton
              className={
                activatedButton === 2 ? "buttonFocused" : "buttonUnFocused"
              }
              sx={{
                borderLeft: "5px solid rgba(252, 182, 0, 1)",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
                "&:hover": {
                  backgroundColor: "rgba(252, 182, 0, 0.9)",
                  color: "white",
                },

                "& .css-cveggr-MuiListItemIcon-root": {
                  minWidth: "35px",
                },
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Maxsulotlar"} />
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
          >
            <ListItemButton
              className={
                activatedButton === 3 ? "buttonFocused" : "buttonUnFocused"
              }
              sx={{
                borderLeft: "5px solid rgba(252, 182, 0, 1)",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
                "&:hover": {
                  backgroundColor: "rgba(252, 182, 0, 0.9)",
                  color: "white",
                },
                "& .css-cveggr-MuiListItemIcon-root": {
                  minWidth: "35px",
                },
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
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
                "&:hover": {
                  backgroundColor: "rgba(252, 182, 0, 0.9)",
                  color: "white",
                },
                "& .css-cveggr-MuiListItemIcon-root": {
                  minWidth: "35px",
                },
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Filiallar"} />
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
                "&:hover": {
                  backgroundColor: "rgba(252, 182, 0, 0.9)",
                  color: "white",
                },

                "& .css-cveggr-MuiListItemIcon-root": {
                  minWidth: "35px",
                },
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
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
                "&:hover": {
                  backgroundColor: "rgba(252, 182, 0, 0.9)",
                  color: "white",
                },
                "& .css-cveggr-MuiListItemIcon-root": {
                  minWidth: "35px",
                },
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
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
              navigate("/employees");
            }}
          >
            <ListItemButton
              className={
                activatedButton === 7 ? "buttonFocused" : "buttonUnFocused"
              }
              sx={{
                borderLeft: "5px solid rgba(252, 182, 0, 1)",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
                "&:hover": {
                  backgroundColor: "rgba(252, 182, 0, 0.9)",
                  color: "white",
                },
                "& .css-cveggr-MuiListItemIcon-root": {
                  minWidth: "35px",
                },
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Hodimlar"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              width: "85%",
            }}
            onClick={() => {
              handleButtonClick(8);
              navigate("/catalog");
            }}
          >
            <ListItemButton
              className={
                activatedButton === 8 ? "buttonFocused" : "buttonUnFocused"
              }
              sx={{
                borderLeft: "5px solid rgba(252, 182, 0, 1)",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
                "&:hover": {
                  backgroundColor: "rgba(252, 182, 0, 0.9)",
                  color: "white",
                },
                "& .css-cveggr-MuiListItemIcon-root": {
                  minWidth: "35px",
                },
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Katalog"} />
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
