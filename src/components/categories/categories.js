import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

// const ShowCategories = () => {
//   return (
//     <>
//       <Typography>Here show categories</Typography>
//       <Outlet />
//     </>
//   );
// };

// export default ShowCategories;

import {
  AppBar,
  Avatar,
  Button,
  TextField,
  appBarClasses,
} from "@mui/material";
import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import CategoryModal from "./categoryModal/categoryModal";
import { CiSearch } from "react-icons/ci";
import ApiContext from "../../context/context";
import { useContext, useEffect, useState } from "react";

import { RxPencil1 } from "react-icons/rx";
import { BiTrash } from "react-icons/bi";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";

const ShowCategories = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open, id) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const { categories, setCategories, rootCategories } = useContext(ApiContext);

  const [searchValue, setSearchValue] = useState("");

  const [activeEditingCategoryId, setActiveEditingCategoryId] = useState(1);

  const [editCategory, setEditCategory] = useState({
    rootCategoryId: 0,
    id: 0,
    categoryName: "",
    categoryNameRu: "",
  });

  const [originalCategoryData, setOriginalCategoryData] = useState(categories);

  const searchProduct = (e) => {
    setSearchValue(e.target.value);

    if (e.target.value.trim() !== "") {
      const updatedData = categories.filter((category) =>
        category.categoryName
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );

      setCategories(updatedData);
    } else if (e.target.value.trim() === "") {
      setCategories(originalCategoryData);
    }
  };

  const changeActiveId = (id) => {
    setActiveEditingCategoryId(id);
  };

  useEffect(() => {
    setEditCategory(categories[activeEditingCategoryId - 1]);
  }, [activeEditingCategoryId]);

  const feedbackInfo = () =>
    toast.info("🎉Muvaffaqiyatli o'zgartirildi!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const feedbackWarning = () =>
    toast.warning("Kategoriya o'chirildi!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const editCategoryOnChange = (e) => {
    setEditCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    console.log(editCategory);
  };

  const submitEditedCategory = () => {
    const updatedCategoriesData = categories;

    updatedCategoriesData[editCategory.id - 1] = editCategory;

    setCategories(updatedCategoriesData);

    feedbackInfo();

    toggleDrawer("right", false)();
  };

  const deleteCategory = (id) => {
    const updatedCategory = categories.filter((category) => category.id !== id);

    setCategories(updatedCategory);

    feedbackWarning();
  };

  const list = (anchor) => {
    return (
      <Box
        sx={{
          width: anchor === "top" || anchor === "bottom" ? "auto" : 400,
          padding: "20px 30px",
        }}
        role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
      >
        <Typography>Kategoriyani tahrirlash</Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ paddingTop: 7 }}
        >
          <label htmlFor="categoryName">Kategoriya nomi uz</label>
          <TextField
            sx={{
              width: "100%",
              marginTop: "7px",
              marginBottom: "15px",
              "& #categoryName": { padding: "7px 12px" },
            }}
            id="categoryName"
            name="categoryName"
            value={editCategory.categoryName}
            onChange={editCategoryOnChange}
          />
          <label htmlFor="categoryNameRu">Kategoriya nomi ru</label>
          <TextField
            name="categoryNameRu"
            sx={{
              marginTop: "7px",
              width: "100%",
              "& #categoryNameRu": { padding: "7px 12px" },
            }}
            id="categoryNameRu"
            onChange={editCategoryOnChange}
            value={editCategory.categoryNameRu}
          />
        </Box>

        <Button
          variant="contained"
          sx={{
            background: "#20D472",
            mt: "25px",
            "&:hover": {
              backgroundColor: "#18A659",
            },
          }}
          onClick={submitEditedCategory}
        >
          Saqlash
        </Button>
      </Box>
    );
  };

  return (
    <Box>
      {/* Appbar */}
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
                <CategoryModal></CategoryModal>
              </Box>
              <Box
                sx={{
                  backgroundColor: "white",
                  flex: 4,
                  py: "11px",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <Box
                  component="form"
                  sx={{
                    marginLeft: 9,
                    paddingY: "5px",
                    paddingX: "20px",
                    borderRadius: "50px",
                    backgroundColor: "#EDEFF3",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "350px",
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TextField
                    placeholder="Qidiruv"
                    sx={{
                      width: "100%",

                      "& fieldset": {
                        display: "none",
                      },

                      "& .MuiInputBase-input": {
                        px: 0,
                        pt: 1,
                        pb: 0,
                      },
                    }}
                    onChange={(e) => {
                      searchProduct(e);
                    }}
                  />

                  <Button
                    sx={{
                      background: "none",
                      minWidth: "35px",
                      minHeight: "35px",
                      borderRadius: "50%",
                      p: 0,
                      "&:hover": {
                        background: "none",
                      },
                    }}
                  >
                    <CiSearch style={{ fontSize: "26px", color: "#8D9BA8" }} />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {/* Appbar */}

      {/* category content */}
      <Box
        sx={{
          px: 6,
          py: 1,
          my: 3,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Box
          sx={{
            textTransform: "uppercase",
            fontSize: "13px",
            fontWeight: "bold",
          }}
        >
          <Typography
            sx={{ fontSize: "13px", fontWeight: "bold", paddingLeft: "20px" }}
          >
            Kategoriya (UZ)
          </Typography>
        </Box>
        <Box
          sx={{
            borderLeft: "1px solid #8D9BA8",
            pl: 2,
            textTransform: "uppercase",
            fontSize: "13px",
            fontWeight: "bold",
            marginLeft: "auto",
          }}
        >
          <Typography sx={{ fontSize: "13px", fontWeight: "bold" }}>
            Kategoriya(RU)
          </Typography>
        </Box>
        <Box
          sx={{
            borderLeft: "1px solid #8D9BA8",
            pl: 2,
            textTransform: "uppercase",
            fontSize: "13px",
            fontWeight: "bold",
            marginLeft: "auto",
          }}
        >
          <Typography sx={{ fontSize: "13px", fontWeight: "bold" }}>
            Bosh kategoriya
          </Typography>
        </Box>

        <Box
          sx={{
            borderLeft: "1px solid #8D9BA8",
            pl: 2,
            textTransform: "uppercase",
            margin: "auto",
          }}
        >
          <Typography sx={{ fontSize: "13px", fontWeight: "bold" }}>
            ACTION
          </Typography>
        </Box>
      </Box>

      <Box sx={{ paddingX: "40px", height: "78vh" }}>
        {/* {searchedData.length > 0 ? (
          ""
        ) : (
          <Typography>Hech qanday kategoriya yo'q __(-_-)__</Typography>
        )} */}

        {categories.map((category) => {
          if (categories.length === 0) {
            return (
              <Typography>Hech qanday kategoriya yo'q __(-_-)__</Typography>
            );
          }
          return (
            <Box
              key={category.id}
              sx={{
                px: 2,
                py: 1,
                my: 2,
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: " 0px 2px 2px 0px #AEB0B550",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: "0px 20px 25px 0px #B0B1B56E",
                },
              }}
            >
              <Fragment key={"right"}>
                <Box
                  sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <Typography sx={{ width: "298px", wordWrap: "break-word" }}>
                    {category.categoryName}
                  </Typography>
                  <Typography sx={{ width: "286px", wordWrap: "break-word" }}>
                    {category.categoryNameRu}
                  </Typography>
                  <Typography sx={{ width: "294px", wordWrap: "break-word" }}>
                    {
                      rootCategories[category.rootCategoryId - 1]
                        .rootCategoryName
                    }
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: "15px",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      onClick={() => {
                        toggleDrawer("right", true)();
                        changeActiveId(category.id);
                      }}
                      sx={{
                        minWidth: "40px",
                        minHeight: "40px",
                        borderRadius: "50%",
                        border: "3px solid #EDEFF3",
                      }}
                    >
                      <RxPencil1
                        style={{ fontSize: "20px", color: "#2D3A45" }}
                      />
                    </Button>
                    <Button
                      sx={{
                        minWidth: "40px",
                        minHeight: "40px",
                        borderRadius: "50%",
                        border: "3px solid #EDEFF3",
                      }}
                      onClick={() => {
                        deleteCategory(category.id);
                      }}
                    >
                      <BiTrash style={{ fontSize: "20px", color: "#2D3A45" }} />
                    </Button>
                  </Box>
                </Box>

                <SwipeableDrawer
                  sx={{
                    "& .MuiBackdrop-root": {
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    },
                    "& .MuiDrawer-paper": {
                      boxShadow: "none",
                    },
                  }}
                  anchor={"right"}
                  open={state["right"]}
                  onClose={toggleDrawer("right", false)}
                  onOpen={toggleDrawer("right", true)}
                >
                  {categories.length === 0 ? (
                    <Typography>
                      Hech qanday kategoriya yo'q __(-_-)__
                    </Typography>
                  ) : (
                    list("right")
                  )}
                </SwipeableDrawer>
              </Fragment>
            </Box>
          );
        })}

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
      </Box>
    </Box>
  );
};

export default ShowCategories;
