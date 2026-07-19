// @ts-nocheck
import {
  Box,
  Button,
  Container,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SliderPackage from "react-slick";
import Loading from "../Loading/Loading";
// import CategoryProducts from "../CategoryProducts/CategoryProducts";
import { cartContext } from "../Context/CartContext";

const Slider = SliderPackage.default || SliderPackage;

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const {addProductToCart} = useContext(cartContext);
  const { id } = useParams();
  let theme = useTheme();
  const navigate = useNavigate();


  async function getProductDetails(productId) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
    );
    setProduct(data.data);
    getRelatedWork(data?.data?.category._id,data?.data?._id)
    setLoading(false);
  }
  async function getRelatedWork(categoryId, productId) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
    );
     const relatedProducts = data.data.filter(
    (product) => product._id !== productId
  );
  setRelatedProduct(relatedProducts);
  console.log(relatedProducts)
  setLoading(false);
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:2000
  };

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:2000,
    arrows: false
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProductDetails(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return <>
      {loading? <Loading/> : <>
                 <Container sx={{ py: 8 }}>
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 8 },
          alignItems: { xs: "center" },
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            width: { xs: "100%", sm: 320 },
            overflow: "hidden",
            "& .slick-slider": {
              width: "100%",
            },
          }}
        >
          <Slider {...settings}>
            {product.images.map((item, index) => (
              <div key={index}>
                <img
                  src={item}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "320px",
                    borderRadius: 12,
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </Slider>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="overline" color="text.secondary">
            {product.category?.name}
          </Typography>

          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {product.title}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, lineHeight: 1.8 }}
          >
            {product.description}
          </Typography>

          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 2 }}
            >
              <Rating
                value={Number(product.ratingsAverage)}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2" color="text.secondary">
                ({product.ratingsQuantity})
              </Typography>
            </Stack>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}
            >
              {product.price} EGP
            </Typography>
          </Stack>

          <Button
            fullWidth
            onClick={()=> addProductToCart(product._id)}
            variant="contained"
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              color: theme.palette.text.primary,
              fontSize: "1rem",
              bgcolor: theme.palette.bg?.main,
              "&:hover": {
                bgcolor: theme.palette.bg?.main,
                opacity: 0.9,
              },
            }}
          >
            <AddIcon />
            Add to Cart
          </Button>
        </Box>
      </Stack>
      <Box sx={{pt: 7}}>
        <Typography variant="h4">
          Related Products
        </Typography>
        <Slider {...settings2}>
            {relatedProduct.map((item, index)=> (
        <Box onClick={() => navigate(`/product/${item.id}`)} sx={{cursor: "pointer", border: 'none'}} key={index}>
                <img
                  src={item?.imageCover}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "320px",
                    borderRadius: 12,
                    objectFit: "contain",
                  }}
                />
                <Typography>{item.title.split(" ",2).join(" ")}</Typography>
              </Box>
      ))}
      </Slider>
      </Box>
    </Container>
      </>}
  </>
}
