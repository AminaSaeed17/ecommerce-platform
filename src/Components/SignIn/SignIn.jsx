import {
  Alert,
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
// import { mockLogin } from "../../api/mockApiLogin";
import axios from "axios";
import { userContext } from "../Context/UserContext";

export default function SignIn() {
  const theme = useTheme();
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
    let { setUserToken } = useContext(userContext);

  // @ts-ignore
  async function login(values) {
    try {
      setLoading(true);

    // const { data } = await mockLogin(values);
    const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);

    localStorage.setItem("userToken", data.token);
    setUserToken(data.token)

    navigate("/home");
    } catch (err) {
      console.log(err);
      // @ts-ignore
      setApiError(err.response.data.message);
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {apiError && (
          <Alert
            variant="outlined"
            sx={{ width: { xs: "100%", sm: "70%", md: "50%" } }}
            severity="error"
          >
            {apiError}
          </Alert>
        )}
        <Stack
          component={"form"}
          onSubmit={formik.handleSubmit}
          sx={{
            width: "50%",
            p: 8,
            gap: 2,
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor:
              theme.palette.mode === "dark"
                ? // @ts-ignore
                  theme.palette.bg.main
                : // @ts-ignore
                  theme.palette.bg.main,
          }}
        >
          <Typography sx={{ fontSize: "24px" }}>LogIn:</Typography>
          <TextField
            id="outlined-basic"
            label="email"
            variant="outlined"
            fullWidth
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: `0 0 0 100px ${
                    theme.palette.mode === "dark" ? "#252B32" : "#F6F9FC"
                  } inset`,
                  WebkitTextFillColor: theme.palette.text.primary,
                },
              },
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            fullWidth
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: `0 0 0 100px ${
                    theme.palette.mode === "dark" ? "#252B32" : "#F6F9FC"
                  } inset`,
                  WebkitTextFillColor: theme.palette.text.primary,
                },
              },
            }}
          />
          {loading? <Button
          size="small"
          // onClick={handleClick}
          loading={loading}
          loadingIndicator="Loading…"
          variant="outlined"
          sx={{p: 3}}
        ></Button> : <Button variant="contained" type="submit">
            LogIn
          </Button>}
          <Link
// @ts-ignore
          Link component={NavLink} to={'/forgetPass'} sx={{textDecoration: "none", textAlign: "center"}}>forget Password?</Link>
        </Stack>
      </Container>
    </>
  );
}
