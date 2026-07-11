// @ts-nocheck
import {
  Box,
  Container,
  Dialog,
  IconButton,
  Rating,
  Stack,
  ToggleButton,
  Typography,
  useTheme,
} from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import AddShoppingCartOutlined from "@mui/icons-material/AddShoppingCartOutlined";
import { Close } from "@mui/icons-material";
import ProductDetails from "./ProductDetails";


export default function Main() {

  const allProductsApi = "products?populate=*"
  const menCategoryApi = "products?populate=*&filters[productCategory][$eq]=men"
  const womenCategoryApi = "products?populate=*&filters[productCategory][$eq]=women"

  const [mydata, setMyData] = useState(allProductsApi);
  const [open, setOpen] = useState(false);

  // @ts-ignore
  const handleAlignment = (event, newValue) => {
      setMyData(newValue);
  };

  const theme = useTheme();

   const handleClickOpen = () => {
    setOpen(true);
  };
  

  const handleClose = () => {
    setOpen(false);
  };

 

    return (
      <>
        <Container sx={{px: "0 !important", py: 9}}>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            <Box>
              <Typography variant="h6">Selected Products</Typography>
              <Typography fontWeight={300} variant="body1">
                All our new arrivals in a exclusive brand selection
              </Typography>
            </Box>
            <ToggleButtonGroup
              color="error"
              value={mydata}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
              sx={{
                ".MuiButtonBase-root": {
                  border: "1px solid rgba(233, 69, 96, 0.5) !important",
                },
                color: "#e94560",
                backgroundColor: "initial",
              }}
            >
              <ToggleButton
                sx={{ color: theme.palette.text.primary }}
                className="myButton"
                value={allProductsApi}
                aria-label="left aligned"
              >
                All Products
              </ToggleButton>
              <ToggleButton
                sx={{ mx: "16px !important", color: theme.palette.text.primary }}
                className="myButton"
                value={menCategoryApi}
                aria-label="centered"
              >
                MEN Category
              </ToggleButton>
              <ToggleButton
                sx={{ color: theme.palette.text.primary }}
                className="myButton"
                value={womenCategoryApi}
                aria-label="right aligned"
              >
                Women Category
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Stack
            direction="row"
            sx={{ pt: 6,justifyContent: "space-between", flexWrap: "wrap", gap: 3 }}
          >
            {["aaaa", "bbbb"].map((item) => (
              <Card key={item} sx={{ maxWidth: 333, "&:hover .MuiCardMedia-root": {rotate: "1deg", scale: 1.05, transition: "0.53s"} }}>
                <CardMedia
                  sx={{ height: 227 }}
                  image={'https://mui.com/static/images/cards/contemplative-reptile.jpg'}
                  title="green iguana"
                />
                <CardContent>
                  <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography gutterBottom variant="h6" component="div">
                      Lorem, ipsum.
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                      88.99$
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ alignItems: "center", justifyContent: "space-between" }}
                >
                  <Button onClick={handleClickOpen} size="small" startIcon={<AddShoppingCartOutlined />}>
                    Add to Cart
                  </Button>
                  <Button size="small">
                    <Rating
                      name="read-only"
                      value={3}
                      precision={0.5}
                      readOnly
                    />
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
          <Dialog
          sx={{".MuiPaper-root": {minWidth: {xs: "100%", md: 800}}}}
          open={open}
          width="md"
          height={"100%"}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          role="alertdialog"
        >
           <IconButton onClick={handleClose} sx={{ ":hover":{transition: "0.3s", color: "red"} , position: "absolute", top: 2, right: 2 }}>
                <Close />
          </IconButton>
          <ProductDetails/>
        </Dialog>
        </Container>
      </>
    );
  }

