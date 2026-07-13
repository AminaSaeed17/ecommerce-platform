import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CategoryProducts() {
  let [products, setProducts] = useState([]);
  // @ts-ignore

  const { id } = useParams();
  async function getCategoryProduct() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
    );
    setProducts(data.data);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCategoryProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Container>
        <Stack
          direction="row"
          sx={{ pt: 6, justifyContent: "center", flexWrap: "wrap", gap: 3 }}
        >
          {products.map(
            (
              // @ts-ignore
              item,
            ) => (
              <Card
                // @ts-ignore
                key={item._id}
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
                  // @ts-ignore
                  image={item.imageCover}
                  title="green iguana"
                />
                <CardContent>
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      {item// @ts-ignore
                      .title
                        .split(" ", 2)
                        .join(" ")}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                      {
                        // @ts-ignore
                        item.price
                      }
                      $
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {
                      // @ts-ignore
                      item.category?.name
                    }
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ alignItems: "center", justifyContent: "space-between" }}
                >
                  <Button size="small" startIcon={<AddShoppingCartOutlined />}>
                    Add to Cart
                  </Button>
                  <Button size="small">
                    <Rating
                      name="read-only"
                      // @ts-ignore
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
      </Container>
    </>
  );
}
