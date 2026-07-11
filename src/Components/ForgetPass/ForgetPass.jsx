// @ts-nocheck

import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";

export default function ForgetPass() {
  const navigate = useNavigate();
  const [loading, setLoading] =useState(false)
  const [apiError, setApiError] =useState(null)

  async function forget(values) {
    try {
        setLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );

      console.log(data);

      navigate("/verifyCode", {
        state: {
          email: values.email,
        },
      });
    } catch (err) {
        setLoading(false);
      console.log(err);
      setApiError(err.response.data.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: forget,
  });

  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Blur */}

      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Stack spacing={4} width="100%" alignItems="center">

          <Paper
            elevation={4}
            sx={{
              width: "100%",
              p: 5,
              borderRadius: 4,
            }}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/signin")}
              sx={{
                mb: 3,
                textTransform: "none",
                color: theme.palette.text.secondary,
              }}
            >
              Back to Login
            </Button>

            <Typography
              variant="h5"
              fontWeight={700}
              color="#333"
              gutterBottom
            >
              Forgot Password?
            </Typography>

            <Typography
              variant="body2"
              color="#666"
              sx={{
                mb: 4,
                lineHeight: 1.8,
              }}
            >
              Enter your email address and we'll send you instructions to
              reset your password.
            </Typography>
               {apiError && (
          <Alert
            variant="outlined"
            sx={{ width: { xs: "100%", sm: "70%", md: "50%" } }}
            severity="error"
          >
            {apiError}
          </Alert>
        )}
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
            >
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "transparent",
                    borderRadius: 2,
                  },
                }}
              />
              {loading? <Button
          size="small"
          // onClick={handleClick}
          loading={loading}
          loadingIndicator="Loading…"
          variant="outlined"
          sx={{p: 3, width: '100%', borderRadius: 3}}
        ></Button> : <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  bgcolor: theme.palette.mainColor.main,
                  color: theme.palette.text.secondary,
                  textTransform: "none",
                  fontSize: 16,
                  "&:hover": {
                    bgcolor: "#2B3445",
                  },
                }}
              >
                Send Reset Link
              </Button>}
            </Box>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
