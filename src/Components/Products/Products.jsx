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
import { productContext } from "../Context/ProductContext";
import { useContext, useState } from "react";
import { AddShoppingCartOutlined } from "@mui/icons-material";

export default function Products() {
  let { products } = useContext(productContext);
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);
  // @ts-ignore
  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Container sx={{py: 9}}>
        <Stack
            direction="row"
            sx={{ pt: 6,justifyContent: "center", flexWrap: "wrap", gap: 3 }}
          >
        {currentProducts.map(
          (
            // @ts-ignore
            item,
          ) => (
            <Card
              key={item}
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
                  onClick={handleClickOpen}
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
          <Pagination count={Math.ceil(products.length / itemsPerPage)} page={page} onChange={handleChange} />
        </Stack>
      </Container>
    </>
  );
}
