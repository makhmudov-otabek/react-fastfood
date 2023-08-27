import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import ApiContext from "../../../context/context";
import { Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

const AddProductModal = () => {
  const [state, setState] = React.useState({
    right: false,
  });

  const { products, setProducts, categories } = useContext(ApiContext);

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
    categoryId: 1,
    id: 0,
    productName: "",
    price: 0,
    extra: "",
    productImage: null,
  });

  const feedbackSuccess = () =>
    toast.success("Maxsulot muvaffaqiyatli qo'shildi!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const feedbackError = () =>
    toast.error("Iltimos malumotlarni to'ldiring!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
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
    if (
      newProduct.extra.trim() === "" ||
      newProduct.productName.trim() === "" ||
      newProduct.productImage === null
    ) {
      feedbackError();
      return;
    }

    const newId = products.reduce((accumlator, element) => {
      return Math.max(accumlator, element.id);
    }, 0);

    const updatedNewProduct = newProduct;

    updatedNewProduct.id = newId + 1;

    setProducts((prev) => [updatedNewProduct, ...prev]);

    toggleDrawer("right", false)();

    feedbackSuccess();

    setNewProduct({
      categoryId: 1,
      id: 0,
      productName: "",
      price: 0,
      extra: "",
      productImage: null,
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
          Yangi maxsulot qo'shish
        </Typography>

        <Box
          sx={{
            width: "100%",
          }}
        >
          <label style={{ color: "#999" }} htmlFor="productName">
            Maxsulot nomi
          </label>

          <TextField
            placeholder="Maxsulot nomi"
            type="text"
            name="productName"
            id="productName"
            value={newProduct.productName}
            sx={{
              width: "100%",
              mb: "15px",
              "& .MuiOutlinedInput-input ": {
                paddingX: 2,
                paddingY: "7px",
              },
            }}
            onChange={(e) => {
              updateNewProductInfo(e.target.name, e.target.value);
            }}
          />

          <label style={{ color: "#999" }} htmlFor="price">
            Price
          </label>

          <TextField
            placeholder="Narxi"
            id="price"
            type="text"
            name="price"
            value={newProduct.price}
            sx={{
              width: "100%",
              mb: "15px",
              "& .MuiOutlinedInput-input ": {
                paddingX: 2,
                paddingY: "7px",
              },
            }}
            onChange={(e) => {
              updateNewProductInfo(e.target.name, e.target.value);
            }}
          />

          <label style={{ color: "#999" }} htmlFor="extra">
            Extra
          </label>
          <TextField
            id="extra"
            placeholder="Extra"
            type="text"
            name="extra"
            value={newProduct.extra}
            sx={{
              width: "100%",
              mb: "15px",
              "& .MuiOutlinedInput-input ": {
                paddingX: 2,
                paddingY: "7px",
              },
            }}
            onChange={(e) => {
              updateNewProductInfo(e.target.name, e.target.value);
            }}
          />

          <label style={{ color: "#999" }} htmlFor="categories">
            Kategoriya
          </label>

          <select
            id="categories"
            style={{
              width: "100%",
              padding: "8px 16px",
              backgroundColor: "transparent",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {categories.map((category) => (
              <option
                key={category.id}
                name="categoryId"
                value={category.id}
                onClick={(e) => {
                  selectCategory(e.target.value);
                }}
              >
                {category.categoryName}
              </option>
            ))}
          </select>

          {newProduct.productImage !== null ? (
            <img
              src={newProduct.productImage}
              alt="Bu yerda rasm"
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
            />
          ) : null}

          <Box sx={{ mt: "20px" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{
                width: "100%",
                border: "1px dashed #ccc",
                display: "inline-block",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>

        <Button
          onClick={() => {
            submitNewProduct();
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
        <ToastContainer />
      </React.Fragment>
    </div>
  );
};

export default AddProductModal;
