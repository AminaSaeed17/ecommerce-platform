// @ts-nocheck
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { categoryContext } from "../Context/CategoryContext";

export default function Categories() {

  const navigate = useNavigate();
  let {category, loading} = useContext(categoryContext)

  return <>
    {loading? <Loading/> : <>
      <Container sx={{ py: 9 }}>
      <Stack
        direction="row"
        sx={{ pt: 6, justifyContent: "center", flexWrap: "wrap", gap: 3 }}
      >
        {category.map((item) => (
          <Card
            key={item._id}
            onClick={() => navigate(`/category/${item._id}`)}
            sx={{
              ".MuiButtonBase-root": { Width: 333},
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
              },
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="180"
                image={item.image}
                alt={item.name}
                sx={{objectFit: "cover"}}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600 }}
                >
                  {item.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Container>
    </>}
  </>
}
