import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

import { useContext, useState } from "react";
import ApiContext from "../../../context/context";
import { Typography } from "@mui/material";

import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { borderRadius } from "@mui/system";

const FlialModal = () => {
  const [state, setState] = React.useState({
    right: false,
  });

  const { flials, setFlials } = useContext(ApiContext);

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

  const [newFlial, setNewFlial] = useState({
    id: 0,
    flialNameUz: "",
    flialNameRu: "",
    workTimeStart: "",
    workTimeEnd: "",
    target: "",
    flialLocation: "",
    flialIframeLocation:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.641636856582!2d69.24590917572071!3d41.316659000379794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b40d847941d%3A0x5765a18b352df71e!2sTashkent%20City%20Park!5e0!3m2!1sen!2s!4v1692749896965!5m2!1sen!2s",
  });

  const [newId, setNewId] = useState(0);

  const getNewCategoryInfo = (e) => {
    setNewFlial((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectCategory = (e) => {
    console.log(e.target.value);
    setNewFlial((prev) => ({ ...prev, rootCategoryId: e.target.value }));
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

  const addToFlials = () => {
    if (
      newFlial.flialNameUz.trim().length === 0 ||
      newFlial.flialNameRu.trim().length === 0 ||
      newFlial.flialLocation.trim().length === 0 ||
      newFlial.flialIframeLocation.trim().length === 0 ||
      newFlial.workTimeStart.trim().length === 0 ||
      newFlial.workTimeEnd.trim().length === 0 ||
      newFlial.target.trim().length === 0 ||
      newFlial.flialLocation.trim().length === 0 ||
      newFlial.flialIframeLocation.trim().length === 0
    ) {
      feedbackError();
      return;
    }

    const newId = flials.reduce((accumlator, element) => {
      return Math.max(accumlator, element.id);
    }, 0);

    const updatedNewFlial = { ...newFlial, id: newId + 1 };

    setFlials((prev) => [updatedNewFlial, ...prev]);

    feedbackSuccess();

    toggleDrawer("right", false)();

    setNewFlial({
      id: 0,
      flialNameUz: "",
      flialNameRu: "",
      workTimeStart: "",
      workTimeEnd: "",
      target: "",
      flialLocation: "",
      flialIframeLocation:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.641636856582!2d69.24590917572071!3d41.316659000379794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b40d847941d%3A0x5765a18b352df71e!2sTashkent%20City%20Park!5e0!3m2!1sen!2s!4v1692749896965!5m2!1sen!2s",
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
          Yangi flial qo'shish
        </Typography>

        <Box component="form" sx={{}} noValidate autoComplete="off">
          <label
            htmlFor="flialNameUz"
            style={{
              cursor: "pointer",
              color: "#999",
              fontSize: "15px",
            }}
          >
            Filial nomi uz
          </label>
          <TextField
            id="flialNameUz"
            name="flialNameUz"
            value={newFlial.flialNameUz}
            sx={{
              marginBottom: "15px",
              minWidth: "100%",
              boxSizing: "border-box",
              "& #flialNameUz": { padding: "7px 12px" },
            }}
            onChange={getNewCategoryInfo}
          />

          <label
            htmlFor="flialNameRu"
            style={{
              cursor: "pointer",
              color: "#999",
              fontSize: "15px",
            }}
          >
            Filial nomi ru
          </label>
          <TextField
            id="flialNameRu"
            name="flialNameRu"
            value={newFlial.flialNameRu}
            sx={{
              marginBottom: "15px",
              minWidth: "100%",
              boxSizing: "border-box",
              "& #flialNameRu": { padding: "7px 12px" },
            }}
            onChange={getNewCategoryInfo}
          />

          <label
            htmlFor=""
            style={{
              cursor: "pointer",
              color: "#999",
              fontSize: "15px",
            }}
          >
            Ish vaqti
          </label>

          <Box sx={{ marginBottom: "15px", display: "flex", gap: "15px" }}>
            <TextField
              name="workTimeStart"
              type="time"
              sx={{
                marginTop: "7px",
                width: "100%",
                "& #workTimeStart": { padding: "7px 12px" },
              }}
              id="workTimeStart"
              onChange={getNewCategoryInfo}
              value={newFlial.workTimeStart}
            />
            <TextField
              name="workTimeEnd"
              type="time"
              sx={{
                marginTop: "7px",
                width: "100%",
                "& #workTimeEnd": { padding: "7px 12px" },
              }}
              id="workTimeEnd"
              onChange={getNewCategoryInfo}
              value={newFlial.workTimeEnd}
            />
          </Box>

          <label
            htmlFor="target"
            style={{
              cursor: "pointer",
              color: "#999",
              fontSize: "15px",
            }}
          >
            Filial mo'ljal
          </label>
          <TextField
            id="target"
            name="target"
            value={newFlial.target}
            sx={{
              marginBottom: "15px",
              minWidth: "100%",
              boxSizing: "border-box",
              "& #target": { padding: "7px 12px" },
            }}
            onChange={getNewCategoryInfo}
          />

          <label
            htmlFor="flialLocation"
            style={{
              cursor: "pointer",
              color: "#999",
              fontSize: "15px",
            }}
          >
            Filial manzil
          </label>
          <TextField
            id="flialLocation"
            name="flialLocation"
            value={newFlial.flialLocation}
            sx={{
              marginBottom: "15px",
              minWidth: "100%",
              boxSizing: "border-box",
              "& #flialLocation": { padding: "7px 12px" },
            }}
            onChange={getNewCategoryInfo}
          />

          <label
            htmlFor="flialIframeLocation"
            style={{
              cursor: "pointer",
              color: "#999",
              fontSize: "15px",
            }}
          >
            Filial iframe manzil
          </label>
          <TextField
            id="flialIframeLocation"
            name="flialIframeLocation"
            value={newFlial.flialIframeLocation}
            sx={{
              marginBottom: "15px",
              minWidth: "100%",
              boxSizing: "border-box",
              "& #flialIframeLocation": { padding: "7px 12px" },
            }}
            onChange={getNewCategoryInfo}
          />
        </Box>

        <iframe
          src={newFlial.flialIframeLocation}
          title="Bu yerda lokatsiya"
          frameBorder="0"
          style={{
            width: "100%",
            height: "150px",
            borderRadius: "5px",
          }}
        ></iframe>

        <Button
          variant="contained"
          sx={{
            background: "#20D472",
            "&:hover": {
              backgroundColor: "#18A659",
            },
          }}
          onClick={addToFlials}
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
            Yangi filial qo'shish
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

export default FlialModal;
