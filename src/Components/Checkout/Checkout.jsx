import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { cartContext } from "../Context/CartContext";

export default function Checkout() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const {cart} = useContext(cartContext);

  // @ts-ignore
  async function login(shippingAddress) {
    try {
      setLoading(true);
    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:3000`, shippingAddress, {
        headers: {
            token: localStorage.getItem("userToken")
        }
    });
    console.log(data);
    location.href = data.session.url

    } catch (err) {
      console.log(err);
      // @ts-ignore
      toast.error(err.message)
      // @ts-ignore
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
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
          <Typography sx={{ fontSize: "24px" }}>Your Info:</Typography>
          <TextField
            id="outlined-basic"
            label="details"
            variant="outlined"
            fullWidth
            name="details"
            value={formik.values.details}
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
            label="city"
            type="city"
            autoComplete="current-city"
            fullWidth
            name="city"
            value={formik.values.city}
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
            label="phone"
            type="phone"
            autoComplete="current-phone"
            fullWidth
            name="phone"
            value={formik.values.phone}
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
            Supmit
          </Button>}
        </Stack>
      </Container>
    </>
  );
}
