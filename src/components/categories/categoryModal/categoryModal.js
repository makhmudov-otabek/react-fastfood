import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import ApiContext from "../../../context/context";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";

const CategoryModal = () => {
  const [state, setState] = React.useState({
    right: false,
  });

  const { categories, setCategories, rootCategories } = useContext(ApiContext);

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

  const [newCategory, setNewCategory] = useState({
    rootCategoryId: 1,
    id: 0,
    categoryName: "",
    categoryNameRu: "",
  });

  const getNewCategoryInfo = (e) => {
    setNewCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectCategory = (e) => {
    setNewCategory((prev) => ({ ...prev, rootCategoryId: e.target.value }));
  };

  const feedbackWarning = () =>
    toast.warn("Iltimos malumotlarni to'ldiring", {
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
    toast.success("🎉Muvaffaqiyatli qo'shildi", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const addToCategories = () => {
    if (
      newCategory.categoryName.trim().length === 0 ||
      newCategory.categoryNameRu.trim().length === 0
    ) {
      feedbackWarning();
      return;
    }

    const newId = categories.reduce((accumlator, element) => {
      return Math.max(accumlator, element.id);
    }, 0);

    const updateNewCategory = { ...newCategory, id: newId + 1 };

    setCategories((prev) => [updateNewCategory, ...prev]);

    feedbackSuccess();

    toggleDrawer("right", false)();

    setNewCategory({
      rootCategoryId: 1,
      id: 0,
      categoryName: "",
      categoryNameRu: "",
    });
  };

  const list = () => (
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
        <Typography sx={{ px: "8px", mb: "20px", fontWeight: "bold" }}>
          Yangi kategoriya qo'shish
        </Typography>

        <Box component="form" sx={{}} noValidate autoComplete="off">
          <label
            htmlFor="categoryName"
            style={{
              cursor: "pointer",
              color: "#999",
              fontSize: "15px",
            }}
          >
            Kategoriya nomi uz
          </label>
          <TextField
            id="categoryName"
            name="categoryName"
            value={newCategory.categoryName}
            sx={{
              marginBottom: "15px",
              minWidth: "100%",
              boxSizing: "border-box",
              "& #categoryName": { padding: "7px 12px" },
            }}
            onChange={getNewCategoryInfo}
          />

          <label
            htmlFor="categoryName"
            style={{
              cursor: "pointer",
              color: "#999",
              fontSize: "15px",
            }}
          >
            Kategoriya nomi ru
          </label>
          <TextField
            id="categoryNameRu"
            name="categoryNameRu"
            value={newCategory.categoryNameRu}
            sx={{
              marginBottom: "15px",
              minWidth: "100%",
              boxSizing: "border-box",
              "& #categoryNameRu": { padding: "7px 12px" },
            }}
            onChange={getNewCategoryInfo}
          />

          <label
            htmlFor="boshKategoriya"
            style={{
              cursor: "pointer",
              color: "#999",
              fontSize: "15px",
            }}
          >
            Bosh kategoriyaga biriktirish
          </label>

          <select
            id="boshKategoriya"
            style={{
              padding: "10px 12px",
              width: "100%",
              backgroundColor: "transparent",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {rootCategories.map((rootCategory) => {
              return (
                <option
                  key={rootCategory.id}
                  onClick={selectCategory}
                  value={rootCategory.id}
                >
                  {rootCategory.rootCategoryName}
                </option>
              );
            })}
          </select>
        </Box>

        <Button
          variant="contained"
          sx={{
            background: "#20D472",
            "&:hover": {
              backgroundColor: "#18A659",
            },
          }}
          onClick={addToCategories}
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
            Yangi kategoriya <br /> qo'shish
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

export default CategoryModal;
