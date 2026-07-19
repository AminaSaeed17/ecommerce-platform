// @ts-nocheck
import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card, CardMedia, Typography, Skeleton, Container } from "@mui/material";
import Loading from "../Loading/Loading";

export default function Brands() {
  const [brands, setBrands] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getBrands() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      console.log(data);
      setBrands(data.data); 
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getBrands();
  }, []);

  return <>
    {loading? <Loading/> : <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Brands
      </Typography>

      <Grid container spacing={2}>
        {brands === null &&
          Array.from({ length: 8 }).map((_, i) => (
            <Grid item xs={6} sm={4} md={3} key={i}>
              <Skeleton variant="rectangular" height={160} />
            </Grid>
          ))}

        {brands?.map((brand) => (
          <Grid item xs={6} sm={4} md={3} key={brand._id}>
            <Card
              variant="outlined"
              sx={{
                p: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <CardMedia
                component="img"
                image={brand.image}
                alt={brand.name}
                sx={{ height: 100, width: "100%", objectFit: "contain", mb: 1 }}
              />
              <Typography variant="subtitle2">{brand.name}</Typography>
            </Card>
          </Grid>
        ))}

        {brands?.length === 0 && (
          <Grid item xs={12}>
            <Typography color="text.secondary">مفيش ماركات لعرضها.</Typography>
          </Grid>
        )}
      </Grid>
    </Container>}
  </>
}
