import { Typography } from "@mui/material";
import { AppBar, Button, TextField } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { MdDoDisturbAlt } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import ApiContext from "../../context/context";
import { useContext, useEffect, useState } from "react";
import { RxPencil1 } from "react-icons/rx";
import { BiTrash } from "react-icons/bi";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import CustomerModal from "./customerModal/customerModal";

const ShowCustomers = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open, id) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const { customers, setCustomers } = useContext(ApiContext);

  const [searchValue, setSearchValue] = useState("");

  const [activeEditingCustomerId, setActiveEditingCustomerId] = useState(0);

  const [editCustomer, setEditCustomer] = useState({
    id: 0,
    phone: "",
    name: "",
    orderCount: 0,
    isActive: true,
  });

  const [originalCustomersData, setOriginalCustomersData] = useState(customers);

  const searchCustomer = (e) => {
    setSearchValue(e.target.value);

    if (e.target.value.trim() !== "") {
      const updatedData = customers.filter((customer) =>
        customer.name.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setCustomers(updatedData);
    } else if (e.target.value.trim() === "") {
      setCustomers(originalCustomersData);
    }
  };

  const changeActiveId = (index) => {
    setActiveEditingCustomerId(index);
  };

  useEffect(() => {
    setEditCustomer(customers[activeEditingCustomerId]);
  }, [activeEditingCustomerId]);

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

  const editCustomerOnChange = (e) => {
    setEditCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitEditedCustomer = () => {
    const updatedCustomersData = customers;

    updatedCustomersData[editCustomer.id - 1] = editCustomer;

    setCustomers(updatedCustomersData);

    feedbackInfo();

    toggleDrawer("right", false)();
  };

  const deleteCustomer = (id) => {
    const updatedCustomers = customers.filter((customer) => customer.id !== id);

    setCustomers(updatedCustomers);

    feedbackWarning();
  };

  const changeStatus = (index) => {
    const updatedCustomersData = [...customers];

    const updatedCustomers = updatedCustomersData.map((customer, i) => {
      if (i === index) {
        return {
          ...customer,
          isActive: !customer.isActive,
        };
      }
      return customer;
    });

    setCustomers(updatedCustomers);
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
        <Typography>Mijozni malumotlarini tahrirlash</Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ paddingTop: 5 }}
        >
          <label htmlFor="name">Mijoz ismi</label>
          <TextField
            sx={{
              width: "100%",
              marginTop: "7px",
              marginBottom: "15px",
              "& #name": { padding: "7px 12px" },
            }}
            id="name"
            name="name"
            value={editCustomer.name}
            onChange={editCustomerOnChange}
          />

          <label htmlFor="phone">Mijoz telefon raqami</label>
          <TextField
            name="phone"
            sx={{
              marginTop: "7px",
              width: "100%",
              "& #phone": { padding: "7px 12px" },
            }}
            id="phone"
            onChange={editCustomerOnChange}
            value={editCustomer.phone}
          />

          <label htmlFor="orderCount">Buyurtmalar soni</label>
          <TextField
            name="orderCount"
            sx={{
              marginTop: "7px",
              width: "100%",
              "& #orderCount": { padding: "7px 12px" },
            }}
            id="orderCount"
            onChange={editCustomerOnChange}
            value={editCustomer.orderCount}
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
          onClick={() => {
            submitEditedCustomer();
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
                <CustomerModal></CustomerModal>
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
                      searchCustomer(e);
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

      {/* Customers content */}
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
            Mijoz ismi
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
            Telefon raqam
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
            Buyurtmalar soni
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
            Status
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

        {customers.map((customer, customerIndex) => {
          if (customers.length === 0) {
            return (
              <Typography>Hech qanday kategoriya yo'q __(-_-)__</Typography>
            );
          }
          return (
            <Box
              key={customer.id}
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
                    {customer.name}
                  </Typography>
                  <Typography sx={{ width: "248px", wordWrap: "break-word" }}>
                    {customer.phone}
                  </Typography>
                  <Typography sx={{ width: "195px", wordWrap: "break-word" }}>
                    {customer.orderCount}
                  </Typography>
                  <Typography
                    sx={{
                      width: "195px",
                      marginLeft: "5px",
                      wordWrap: "break-word",
                      color: customer.isActive === true ? "#20D472" : "#FA2738",
                    }}
                  >
                    {customer.isActive === true ? "Aktive" : "Block"}
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
                        changeStatus(customerIndex);
                      }}
                      sx={{
                        minWidth: "40px",
                        minHeight: "40px",
                        borderRadius: "50%",
                        border: "3px solid #EDEFF3",
                      }}
                    >
                      {customer.isActive === true ? (
                        <MdDoDisturbAlt
                          style={{ fontSize: "22px", color: "#2D3A45" }}
                        />
                      ) : (
                        <BsCheck2Circle
                          style={{ fontSize: "22px", color: "#2D3A45" }}
                        />
                      )}
                    </Button>

                    <Button
                      onClick={() => {
                        toggleDrawer("right", true)();
                        changeActiveId(customerIndex);
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
                        deleteCustomer(customer.id);
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
                  {customers.length === 0 ? (
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

export default ShowCustomers;
