import { useContext, useState } from "react";
import ApiContext from "../../context/context";
import { Box, display } from "@mui/system";
import { Typography, TextField, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import loginImg from "./imgs/login.png";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = ({ setAdminActivated }) => {
  const { orders } = useContext(ApiContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let changeLogin = (name, value) => {
    if (name === "password") {
      setPassword(value);
    }

    if (name === "email") {
      setEmail(value);
    }
  };

  const submitLogin = () => {
    if (password === "12345" && email.slice(email.length - 4) === ".com")
      setAdminActivated(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#EDEFF3",
      }}
    >
      <Box
        sx={{
          flex: "1.5",
          height: "100vh",
          backgroundImage: `url(${loginImg})`,
          backgroundSize: "cover",
          backgroundPosition: "40% 40%",
        }}
      ></Box>
      <Box
        sx={{
          flex: "1",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "350px", marginBottom: "20px" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Tizimga xush kelibsiz !
          </Typography>
          <Typography sx={{ color: "#8D9BA8" }}>
            Tizimga kirish uchun, login va parol orqali autentifikatsiya
            jarayonidan o'ting
          </Typography>
        </Box>
        <Box sx={{ marginTop: "20px" }}>
          <Box
            component="form"
            sx={{
              backgroundColor: "white",
              boxShadow: "0 0 10px rgba(176, 177, 181, 0.19)",
              borderRadius: "5px",
              padding: "5px 0",
              "& > :not(style)": { m: 1, width: "25ch" },
              "& .MuiFormControl-root ": {
                display: "block",
                width: "350px",
                "& #outlined-basic": {
                  width: "320px",
                  "&:focus": {
                    borderLeft: "3.5px solid rgba(252, 182, 0, 1)",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="example@gmail.com"
              variant="outlined"
              name="email"
              sx={{
                paddingBottom: "7px",
                borderBottom: "1px solid #ccc",
                "& .MuiInputLabel-shrink": {
                  display: "none",
                },
                "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                  {
                    color: "rgba(47, 47, 47, 0.8)",
                  },
              }}
              onChange={(e) => changeLogin(e.target.name, e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password : 12345"
              variant="outlined"
              name="password"
              sx={{
                "& .MuiInputLabel-shrink": {
                  display: "none",
                },
                "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                  {
                    color: "rgba(47, 47, 47, 0.8)",
                  },
              }}
              onChange={(e) => changeLogin(e.target.name, e.target.value)}
            />
          </Box>
          <Button
            onClick={submitLogin}
            sx={{
              marginTop: "15px",
              paddingY: "17px",
              width: "100%",
              backgroundColor: "rgba(45, 58, 69, 0.8)",
              boxShadow: "rgba(174, 176, 181, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(45, 58, 69, 1)",
              },
            }}
            variant="contained"
            // onClick={() => {
            //   setAdminActivated(true);
            // }}
          >
            Tizimga kirish
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
