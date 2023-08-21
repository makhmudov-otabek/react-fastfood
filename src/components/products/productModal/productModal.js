import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Fragment } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useCallback } from "react";

import { useContext, useState } from "react";
import ApiContext from "../../../context/context";
import { InputLabel, Typography } from "@mui/material";
import { BiTrash } from "react-icons/bi";

import { useEffect } from "react";
import { borderRadius } from "@mui/system";

import { useDropzone } from "react-dropzone";

const ShowProducts = () => {
  return (
    <Box sx={{ flexGrow: 1, px: "10px" }}>
      <Grid
        container
        spacing={3}
        sx={{
          py: "30px",
        }}
      >
        1
      </Grid>
    </Box>
  );
};

function ImageUpload() {
  const onDrop = useCallback((acceptedFiles) => {
    // acceptedFiles ichidagi faylni olish va kerakli amallarni bajarish
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataURL = e.target.result;
        // Rasmni foydalanuvchiga ko'rsatish yoki yuklash uchun ishlatish
        console.log("Rasm ma'lumotlari:", imageDataURL);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // faqat rasm fayllarni qabul qilish
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Rasmni tanlash yoki bu yerga yuklang</p>
      </div>
    </div>
  );
}

const dropzoneStyles = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const AddProductModal = () => {
  const [state, setState] = React.useState({
    right: false,
  });

  const { products, setProducts } = useContext(ApiContext);

  const [age, setAge] = React.useState("");

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

  const [newProduct, setNewProduct] = useState({
    categoryId: 0,
    id: 0,
    productName: "",
    price: 0,
    extra: "",
    productImage: null,
  });

  const updateNewProductInfo = (name, value) => {
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const selectCategory = (value) => {
    const valueToNumber = parseInt(value);

    setNewProduct((prev) => ({ ...prev, categoryId: valueToNumber }));
  };

  const handleImageUpload = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);

    if (file) {
      setNewProduct((prev) => ({ ...prev, ...newProduct, productImage: file }));
    }
  };

  const submitNewProduct = () => {
    const length = products.length + 1;

    setNewProduct((prev) => ({ ...prev, id: length }));

    setProducts((prev) => [...prev, newProduct]);
  };

  const list = (anchor) => (
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
          Yangi maxsulot qo'shish
        </Typography>

        <Box
          sx={{
            width: "100%",
          }}
        >
          <TextField
            placeholder="Maxsulot nomi"
            type="text"
            name="productName"
            sx={{
              width: "100%",
              my: 1,
              "& .MuiOutlinedInput-input ": {
                paddingX: 2,
                paddingY: "7px",
              },
            }}
            onChange={(e) => {
              updateNewProductInfo(e.target.name, e.target.value);
            }}
          />

          <select
            style={{
              width: "100%",
              padding: "8px 16px",
              backgroundColor: "transparent",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <option>Kategoriga nomi</option>
            <option
              name="categoryId"
              value="1"
              onClick={(e) => {
                selectCategory(e.target.value);
              }}
            >
              Burger
            </option>
            <option
              name="categoryId"
              value="2"
              onClick={(e) => {
                selectCategory(e.target.value);
              }}
            >
              Lavash
            </option>
            <option
              name="categoryId"
              value="3"
              onClick={(e) => {
                selectCategory(e.target.value);
              }}
            >
              Garniyer
            </option>
            <option
              name="categoryId"
              value="4"
              onClick={(e) => {
                selectCategory(e.target.value);
              }}
            >
              Salatlar
            </option>
            <option
              name="categoryId"
              value="5"
              onClick={(e) => {
                selectCategory(e.target.value);
              }}
            >
              Sendvich
            </option>
            <option
              name="categoryId"
              value="6"
              onClick={(e) => {
                selectCategory(e.target.value);
              }}
            >
              Sous
            </option>
          </select>

          <TextField
            placeholder="Narxi"
            type="text"
            name="price"
            sx={{
              width: "100%",
              my: 1,
              "& .MuiOutlinedInput-input ": {
                paddingX: 2,
                paddingY: "7px",
              },
            }}
            onChange={(e) => {
              updateNewProductInfo(e.target.name, e.target.value);
            }}
          />
          <TextField
            placeholder="Extra"
            type="text"
            name="extra"
            sx={{
              width: "100%",
              my: 1,
              "& .MuiOutlinedInput-input ": {
                paddingX: 2,
                paddingY: "7px",
              },
            }}
            onChange={(e) => {
              updateNewProductInfo(e.target.name, e.target.value);
            }}
          />

          {newProduct.productImage !== null ? (
            <img
              src={newProduct.productImage}
              alt="Bu yerda rasm"
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
            />
          ) : null}

          <Box sx={{ margin: "10px 0" }}>
            <input
              type="file"
              accept="image/*" // Rasm fayllarni qabul qilish
              onChange={handleImageUpload}
            />
          </Box>
        </Box>

        <Button
          onClick={() => {
            submitNewProduct();
          }}
          sx={{
            ml: "auto",
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
            Yangi maxsulot <br /> qo'shish
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

export default AddProductModal;
