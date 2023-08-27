import "./customerModal.css";

import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import ApiContext from "../../../context/context";
import { TextField, Typography } from "@mui/material";

import { toast } from "react-toastify";

const CustomerModal = () => {
  const [state, setState] = React.useState({
    right: false,
  });

  const { customers, setCustomers } = useContext(ApiContext);

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

  const [newCustomer, setNewCustomer] = useState({
    id: 1,
    phone: "",
    name: "",
    orderCount: 0,
    isActive: false,
  });

  const getNewCustomerInfo = (e) => {
    setNewCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changeIsActive = () => {
    setNewCustomer((prev) => ({ ...prev, isActive: !prev.isActive }));
  };

  const feedbackError = () =>
    toast.error("Iltimos malumotlarni to'ldiring", {
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
    toast.success("🎉Flial muvaffaqiyatli qo'shildi", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const addToCustomers = () => {
    if (
      newCustomer.name.trim().length === 0 ||
      newCustomer.phone.trim().length === 0
    ) {
      feedbackError();
      return;
    }

    const newId = customers.reduce((accumlator, element) => {
      return Math.max(accumlator, element.id);
    }, 0);

    const updatedNewCustomer = { ...newCustomer, id: newId + 1 };

    setCustomers((prev) => [...prev, updatedNewCustomer]);

    feedbackSuccess();

    toggleDrawer("right", false)();

    setNewCustomer({
      id: 1,
      phone: "",
      name: "",
      orderCount: 0,
      isActive: false,
    });
  };

  const list = () => (
    <Box
      sx={{ paddingX: "20px", paddingY: "25px", width: "410px" }}
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
        <Typography sx={{ mb: "15px", fontWeight: "bold" }}>
          Yangi mijoz qo'shish
        </Typography>

        <Box component="form" sx={{}} noValidate autoComplete="off">
          <label
            htmlFor="name"
            style={{
              cursor: "pointer",
              color: "#999",
              fontSize: "15px",
            }}
          >
            Mijoz nomi uz
          </label>
          <TextField
            id="name"
            name="name"
            value={newCustomer.name}
            sx={{
              marginBottom: "15px",
              minWidth: "100%",
              boxSizing: "border-box",
              "& #name": { padding: "7px 12px" },
            }}
            onChange={getNewCustomerInfo}
          />

          <label
            htmlFor="flialNameRu"
            style={{
              cursor: "pointer",
              color: "#999",
              fontSize: "15px",
            }}
          >
            Telefon raqami
          </label>
          <TextField
            id="phone"
            name="phone"
            value={newCustomer.phone}
            sx={{
              marginBottom: "15px",
              minWidth: "100%",
              boxSizing: "border-box",
              "& #phone": { padding: "7px 12px" },
            }}
            onChange={getNewCustomerInfo}
          />

          <label
            htmlFor="orderCount"
            style={{
              cursor: "pointer",
              color: "#999",
              fontSize: "15px",
            }}
          >
            Buyurtma soni
          </label>

          <TextField
            name="orderCount"
            type="number"
            sx={{
              marginTop: "7px",
              width: "100%",
              "& #orderCount": { padding: "7px 12px" },
            }}
            id="orderCount"
            onChange={getNewCustomerInfo}
            value={newCustomer.workTimeStart}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              mt: "15px",
            }}
          >
            <input
              type="checkbox"
              className="isActiveCheckBox"
              id="isActive"
              name="isActive"
              style={{ width: "18px", height: "18px", background: "yellow" }}
              onChange={changeIsActive}
            />
            <label htmlFor="isActive" style={{ color: "rgb(153, 153, 153)" }}>
              Blocklangan mijoz
            </label>
          </Box>
        </Box>

        <Button
          variant="contained"
          sx={{
            background: "#20D472",
            "&:hover": {
              backgroundColor: "#18A659",
            },
          }}
          onClick={addToCustomers}
        >
          Saqlash
        </Button>
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
            Yangi mijoz qo'shish
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

export default CustomerModal;
