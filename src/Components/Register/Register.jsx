import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// import { mockRegister } from "../../api/mockApiRegister";
import axios from "axios";
import { userContext } from "../Context/UserContext";

export default function Register() {
  const theme = useTheme();
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let { setUserToken } = useContext(userContext);

  // function handleClick() {
  //   setLoading(true);
  // }

  /**
   * @param {any} values
   */
  async function register(values) {
    try {
      setLoading(true);

      // const { data } = await mockRegister(values);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values,
      );

      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/home");
    } catch (err) {
      console.log(err);
      setLoading(false);
      // @ts-ignore
      setApiError(err.response.data.message);
      // @ts-ignore
      if (err.message === "Network Error") {
        console.log("Server is not available");
      } else {
        // @ts-ignore
        console.log(err.response?.data);
      }
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),

    phone: Yup.string()
      .matches(/^01[0-9]{9}$/, "Invalid phone number")
      .required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: register,
  });

  return (
    <>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
            width: { xs: "100%", sm: "70%", md: "50%" },
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
          <Typography sx={{ fontSize: "24px" }}>Register Now:</Typography>
          <TextField
            id="outlined-error-helper-text"
            label="Your Name"
            variant="outlined"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
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
            id="outlined-basic"
            label="Your Email"
            variant="outlined"
            type="email"
            fullWidth
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
            id="outlined-basic"
            type="password"
            label="rePassword"
            variant="outlined"
            fullWidth
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.rePassword && Boolean(formik.errors.rePassword)
            }
            helperText={formik.touched.rePassword && formik.errors.rePassword}
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
            id="outlined-basic"
            type="tel"
            label="phone"
            variant="outlined"
            fullWidth
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
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
          {loading ? (
            <Button
              size="small"
              // onClick={handleClick}
              loading={loading}
              loadingIndicator="Loading…"
              variant="outlined"
              sx={{ p: 3 }}
            ></Button>
          ) : (
            <Button variant="contained" type="submit">
              Register
            </Button>
          )}
        </Stack>
      </Container>
    </>
  );
}
