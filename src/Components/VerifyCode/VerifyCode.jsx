// @ts-nocheck

import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";

export default function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const email = location.state?.email;

  async function verify(values) {
    try {
      setLoading(true);

      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values,
      );
      navigate("/ResetPass", {
        state: {
          email: email,
        },
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      setApiError(err.response.data.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: verify,
  });

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={4}
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

            <Typography variant="h5" fontWeight={700}>
              Verify Code
            </Typography>

            <Typography
              sx={{
                mt: 2,
                mb: 4,
              }}
              color="text.secondary"
            >
              Enter the 6-digit verification code sent to
              <br />
              <strong>{email}</strong>
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

            <Box component="form" onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="Verification Code"
                name="resetCode"
                value={formik.values.resetCode}
                onChange={formik.handleChange}
                placeholder="123456"
                inputProps={{
                  maxLength: 6,
                }}
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
                }}
              >
                {loading ? "Verifying..." : "Verify Code"}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
