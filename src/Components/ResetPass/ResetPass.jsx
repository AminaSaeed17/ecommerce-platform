// @ts-nocheck

import axios from "axios";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
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
import LockResetIcon from "@mui/icons-material/LockReset";
import { useState } from "react";

export default function ResetPassword() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  async function reset(values) {
    try {
      setLoading(true);

      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email,
          newPassword: values.newPassword,
        }
      );

      console.log(data);

      localStorage.setItem("userToken", data.token);

      navigate("/home");
    } catch (err) {
      setLoading(false);

      setApiError(
        err.response?.data?.message || "Something went wrong."
      );
    }
  }

  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    onSubmit: reset,
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={5}
          sx={{
            p: 5,
            borderRadius: 4,
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              mb: 3,
              color: theme.palette.text.secondary,
              textTransform: "none",
            }}
          >
            Back
          </Button>

          <Stack
            alignItems="center"
            spacing={2}
            mb={4}
          >
            <LockResetIcon
              sx={{
                fontSize: 55,
                color: theme.palette.mainColor.main,
              }}
            />

            <Typography
              variant="h4"
              fontWeight={700}
            >
              Reset Password
            </Typography>

            <Typography
              color="text.secondary"
              textAlign="center"
            >
              Enter your new password for
              <br />
              <strong>{email}</strong>
            </Typography>
          </Stack>

          {apiError && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
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
              label="New Password"
              type="password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              sx={{
                mb: 3,
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 3,
                bgcolor: theme.palette.mainColor.main,
                color: theme.palette.text.secondary,
                textTransform: "none",
                fontSize: 16,
              }}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}