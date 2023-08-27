import { Typography } from "@mui/material";
import { AppBar, Button, TextField } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { CiLocationOn } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import ApiContext from "../../context/context";
import { useContext, useEffect, useState } from "react";
import { RxPencil1 } from "react-icons/rx";
import { BiTrash } from "react-icons/bi";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import FlialModal from "./flialsModal/flialsModal";

const ShowFlials = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open, id) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const { flials, setFlials, rootCategories } = useContext(ApiContext);

  const [sliceNumber, setSliceNumber] = useState(5);

  const [searchValue, setSearchValue] = useState("");

  const [activeEditingFlialId, setActiveEditingFlialId] = useState(1);

  const reverse = flials.reduceRight((accumlator, element) => {
    return [...accumlator, element];
  }, []);

  const [searchedData, setSearchedData] = useState(reverse);

  const [editFlial, setEditFlial] = useState({
    flialId: 1,
    flialNameUz: "Xadra",
    flialNameRu: "Xadra(ru)",
    workTimeStart: "09-00",
    workTimeEnd: "22-00",
    target: "Royson dom",
    flialLocation: "https://goo.gl/maps/16PnRiNn5qGM7bgY6",
    flialIframeLocation:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.190116400739!2d69.22590977572126!3d41.326479099771404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bb7a0ebbae3%3A0xf9e01b5d45fc68cd!2sPDP%20Academy!5e0!3m2!1sen!2s!4v1692743768084!5m2!1sen!2s",
  });

  const [originalFlials, setOriginalFlials] = useState(flials);

  const searchProduct = (e) => {
    setSearchValue(e.target.value);

    if (e.target.value.trim() !== "") {
      const updatedData = flials.filter((flial) =>
        flial.flialNameUz.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setFlials(updatedData);
    } else if (e.target.value.trim() === "") {
      setFlials(originalFlials);
    }
  };

  const changeActiveId = (id) => {
    setActiveEditingFlialId(id);
  };

  useEffect(() => {
    setEditFlial(flials[activeEditingFlialId]);
  }, [activeEditingFlialId]);

  useEffect(() => {
    setSearchedData(
      flials.reduceRight((accumlator, element) => {
        return [...accumlator, element];
      }, [])
    );
  }, [flials]);

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
    setEditFlial((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitEditedFlial = () => {
    const updatedFlialsData = flials;

    updatedFlialsData[editFlial.id - 1] = editFlial;

    setFlials(updatedFlialsData);

    feedbackInfo();

    toggleDrawer("right", false)();
  };

  const deleteFlial = (id) => {
    const updatedCategory = flials.filter((category, index) => index !== id);

    setFlials(updatedCategory);

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
        <Typography>Flialni tahrirlash</Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ paddingTop: 5 }}
        >
          <label htmlFor="flialNameRu">Flial nomi uz</label>
          <TextField
            sx={{
              width: "100%",
              marginTop: "7px",
              marginBottom: "15px",
              "& #flialNameUz": { padding: "7px 12px" },
            }}
            id="flialNameUz"
            name="flialNameUz"
            value={editFlial.flialNameUz}
            onChange={editCategoryOnChange}
          />
          <label htmlFor="flialNameRu">Flial nomi ru</label>
          <TextField
            name="flialNameRu"
            sx={{
              marginTop: "7px",
              width: "100%",
              "& #flialNameRu": { padding: "7px 12px" },
            }}
            id="flialNameRu"
            onChange={editCategoryOnChange}
            value={editFlial.flialNameRu}
          />

          <label htmlFor="categoryNameRu">Ish vaqti</label>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
            }}
          >
            <TextField
              name="workTimeStart"
              type="time"
              sx={{
                marginTop: "7px",
                width: "100%",
                "& #workTimeStart": { padding: "7px 12px" },
              }}
              id="workTimeStart"
              onChange={editCategoryOnChange}
              value={editFlial.workTimeStart}
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
              onChange={editCategoryOnChange}
              value={editFlial.workTimeEnd}
            />
          </Box>
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
          onClick={() => {
            submitEditedFlial();
          }}
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
                <FlialModal></FlialModal>
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
            Filial nomi (UZ)
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
            Filial nomi (Ru)
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
            Mo'ljal
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
            Ish vaqti
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

        {flials.map((searchedFlial, flialIndex) => {
          if (flials.length === 0) {
            return (
              <Typography>Hech qanday kategoriya yo'q __(-_-)__</Typography>
            );
          }
          return (
            <Box
              key={searchedFlial.id}
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
                  <Typography sx={{ width: "259px", wordWrap: "break-word" }}>
                    {searchedFlial.flialNameUz}
                  </Typography>
                  <Typography sx={{ width: "248px", wordWrap: "break-word" }}>
                    {searchedFlial.flialNameRu}
                  </Typography>
                  <Typography sx={{ width: "195px", wordWrap: "break-word" }}>
                    {searchedFlial.target}
                  </Typography>
                  <Typography
                    sx={{
                      width: "195px",
                      marginLeft: "5px",
                      wordWrap: "break-word",
                    }}
                  >
                    {`${searchedFlial.workTimeStart} - ${searchedFlial.workTimeEnd}`}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: "15px",
                      alignItems: "center",
                    }}
                  >
                    <a
                      rel="noreferrer"
                      href={searchedFlial.flialLocation}
                      target="_blank"
                      style={{
                        minWidth: "40px",
                        minHeight: "40px",
                        borderRadius: "50%",
                        border: "3px solid #EDEFF3",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CiLocationOn
                        style={{ fontSize: "22px", color: "#2D3A45" }}
                      />
                    </a>
                    <Button
                      onClick={() => {
                        toggleDrawer("right", true)();
                        changeActiveId(flialIndex);
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
                        deleteFlial(flialIndex);
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
                  {flials.length === 0 ? (
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

export default ShowFlials;
