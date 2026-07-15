// @ts-nocheck
import {
  Box,
  Container,
  Dialog,
  IconButton,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import AddShoppingCartOutlined from "@mui/icons-material/AddShoppingCartOutlined";
import { Close } from "@mui/icons-material";
import { productContext } from "../Context/ProductContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import MainSlider from "./MainSlider";
import { cartContext } from "../Context/CartContext";

export default function Main() {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  let { products, loading } = useContext(productContext);
  let { addProductToCart } = useContext(cartContext);
  const itemsPerPage = 6;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProducts = products.slice(startIndex, endIndex);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Container sx={{ px: "0 !important", py: 9 }}>
        <MainSlider/>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 3,
            mt: 9,
          }}
        >
          <Box>
            <Typography variant="h6">Selected Products</Typography>
            <Typography fontWeight={300} variant="body1">
              All our new arrivals in a exclusive brand selection
            </Typography>
          </Box>
        </Stack>
        {loading? <Loading/> : <>
          <Stack
          direction="row"
          sx={{ pt: 6, justifyContent: "center", flexWrap: "wrap", gap: 3 }}
        >
          {currentProducts.map((item) => (
            <Card
              key={item}
              onClick={()=> navigate(`/product/${item.id}`)}
              sx={{
                maxWidth: 333,
                cursor: "pointer",
                "&:hover .MuiCardMedia-root": {
                  rotate: "1deg",
                  scale: 1.05,
                  transition: "0.53s",
                },
              }}
            >
              <CardMedia
                sx={{ height: 227 }}
                // image={'https://mui.com/static/images/cards/contemplative-reptile.jpg'}
                image={item.imageCover}
                title="green iguana"
              />
              <CardContent>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.title.split(" ", 2).join(" ")}
                  </Typography>
                  <Typography variant="subtitle1" component="p">
                    {item.price}$
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {item.category.name}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ alignItems: "center", justifyContent: "space-between" }}
              >
                <Button
                  onClick={(e) => {
                          e.stopPropagation();
                          addProductToCart(item._id);
                        }}
                  size="small"
                  startIcon={<AddShoppingCartOutlined />}
                >
                  Add to Cart
                </Button>
                <Button size="small">
                  <Rating
                    name="read-only"
                    value={item.ratingsAverage}
                    precision={0.5}
                    readOnly
                  />
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
        <Stack sx={{flexDirection: "row", mt: 2}}>
          <Typography sx={{flexGrow: 5}}></Typography>
          <ToggleButtonGroup
            color="error"
            exclusive
            aria-label="text alignment"
            sx={{
              ".MuiButtonBase-root": {
                border: "1px solid rgba(233, 69, 96, 0.5) !important",
              },
              color: "#e94560",
              backgroundColor: "initial",
            }}
          >
            <Button
            component={Link}
            to={'/Products'}
              sx={{ color: theme.palette.text.primary }}
              className="myButton"
              aria-label="left aligned"
            >
              View All Products
            </Button>
          </ToggleButtonGroup>
        </Stack>
        </>
        }
        
        <Dialog
          sx={{ ".MuiPaper-root": { minWidth: { xs: "100%", md: 800 } } }}
          open={open}
          width="md"
          height={"100%"}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          role="alertdialog"
        >
          <IconButton
            onClick={handleClose}
            sx={{
              ":hover": { transition: "0.3s", color: "red" },
              position: "absolute",
              top: 2,
              right: 2,
            }}
          >
            <Close />
          </IconButton>
        </Dialog>
      </Container>
    </>
  );
}
