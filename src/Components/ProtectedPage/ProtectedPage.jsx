import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function GuestProtected() {
  const navigate = useNavigate();

  const features = [
    "Save your reading progress across devices",
    "Get personalized book recommendations",
    "Access our full library of thousands of books",
    "Build your personal reading collection",
  ];

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <
// @ts-ignore
      Stack spacing={3} width="100%">
        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 4,
            border: "1px solid #E8D4B8",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              mx: "auto",
              borderRadius: "50%",
              bgcolor: "#F8F6F3",
              border: "1px solid #E8D4B8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MenuBookIcon
              sx={{
                fontSize: 40,
                color: "#6B5744",
              }}
            />
          </Box>

          <
// @ts-ignore
          Typography
            variant="h5"
            fontWeight={700}
            mt={3}
            color="#331B04"
          >
            Create an account to continue reading
          </Typography>

          <
// @ts-ignore
          Typography
            mt={2}
            color="#54360C"
            sx={{ opacity: 0.75 }}
          >
            Join BookNest to unlock full access to thousands of books and
            personalize your reading experience.
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              mt: 4,
              p: 3,
              bgcolor: "#F8F6F3",
              borderColor: "#E8D4B8",
              borderRadius: 3,
            }}
          >
            <Stack spacing={2}>
              {features.map((item) => (
                <
// @ts-ignore
                Stack
                  key={item}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      bgcolor: "#C4A574",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckIcon
                      sx={{
                        fontSize: 14,
                        color: "#fff",
                      }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="#6B5744"
                  >
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>

          <
// @ts-ignore
          Stack spacing={2} mt={4}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/register")}
              sx={{
                py: 1.3,
                borderRadius: 10,
                background:
                  "linear-gradient(180deg, #6B5744 0%, #8B7355 100%)",
              }}
            >
              Sign Up for Free
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/login")}
              sx={{
                py: 1.3,
                borderRadius: 10,
                borderColor: "#6B5744",
                color: "#6B5744",
              }}
            >
              Log In to Your Account
            </Button>
          </Stack>

          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              mt: 3,
              color: "#6B5744",
            }}
          >
            Back to Home
          </Button>
        </Paper>

        <
// @ts-ignore
        Typography
          textAlign="center"
          color="#6B5744"
          sx={{ opacity: 0.6 }}
          variant="body2"
        >
          Your personal reading sanctuary awaits
        </Typography>
      </Stack>
    </Container>
  );
}



