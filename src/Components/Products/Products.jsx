import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Pagination,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
// import { productContext } from "../Context/ProductContext";
import { useContext, useEffect, useState } from "react";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { cartContext } from "../Context/CartContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Products() {
  // let { products} = useContext(productContext);
  let { addProductToCart } = useContext(cartContext);
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  let navigate = useNavigate();

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading } = useQuery({
    queryKey: ["recentProduct"],
    queryFn: getProducts,
  });

  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // @ts-ignore
  const handleChange = (event, value) => {
    setPage(value);
  };
  const currentProducts = data?.data.data.slice(startIndex, endIndex);

  console.log(data?.data.data);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Container sx={{ py: 9 }}>
            <Stack
              direction="row"
              sx={{ pt: 6, justifyContent: "center", flexWrap: "wrap", gap: 3 }}
            >
              {currentProducts.map(
                (
                  // @ts-ignore
                  item,
                ) => (
                  <Card
                    key={item}
                    onClick={() => navigate(`/product/${item.id}`)}
                    sx={{
                      maxWidth: 333,
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
                      <Stack
                        direction="row"
                        sx={{ justifyContent: "space-between" }}
                      >
                        <Typography gutterBottom variant="h6" component="div">
                          {item.title.split(" ", 2).join(" ")}
                        </Typography>
                        <Typography variant="subtitle1" component="p">
                          {item.price}$
                        </Typography>
                      </Stack>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {item.category.name}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
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
                ),
              )}
            </Stack>
            <Stack spacing={2} sx={{ alignItems: "center", mt: 4 }}>
              <Pagination
                count={Math.ceil(data?.data.data.length / itemsPerPage)}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </Container>
        </>
      )}
    </>
  );
}
