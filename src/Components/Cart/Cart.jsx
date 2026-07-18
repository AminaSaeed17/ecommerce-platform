// @ts-nocheck
import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { cartContext } from "../Context/CartContext";
import Loading from "../Loading/Loading";

    export default function Cart() {
      // const [products, setProducts] = useState(initialProducts);
      const {cart, loading, updateProductCart, deleteProductCart} = useContext(cartContext);
      console.log(cart?.data)
      
 

  return <>
    {loading? <Loading/> : <Container>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
      <Table sx={{ minWidth: 650 }} aria-label="cart table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "grey.100" }}>
            <TableCell />
            <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Qty</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.data?.products?.map((product) => (
            <TableRow
              key={product.product.id}
              hover
              sx={{ "&:last-child td": { border: 0 } }}
            >
              <TableCell sx={{ width: 100 }}>
                <Box
                  component="img"
                  src={product.product.imageCover}
                  alt={product.product.title}
                  sx={{ width: { xs: 64, md: 96 }, maxWidth: "100%" }}
                />
              </TableCell>

              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {product.product.title.split(' ', 2).join(" ")}
                </Typography>
              </TableCell>

              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={product.count >= 1? ()=> updateProductCart(product.product.id, product.count-1) : deleteProductCart(product.product.id)}
                    sx={{
                      border: "1px solid",
                      borderColor: "grey.300",
                      width: 24,
                      height: 24,
                    }}
                  >
                    <RemoveIcon fontSize="inherit" />
                  </IconButton>

                  <Typography sx={{ minWidth: 24, textAlign: "center" }}>
                    {product.count}
                  </Typography>

                  <IconButton
                    size="small"
                    onClick={()=> updateProductCart(product.product.id, product.count+1)}
                    sx={{
                      border: "1px solid",
                      borderColor: "grey.300",
                      width: 24,
                      height: 24,
                    }}
                  >
                    <AddIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              </TableCell>

              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  ${product.price}
                </Typography>
              </TableCell>

              <TableCell>
                <Button
                  size="small"
                  onClick={()=> deleteProductCart(product.product.id)}
                  color="error"
                  sx={{ textTransform: "none", fontWeight: 500 }}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Container>}
  </>
}
