// @ts-nocheck
import { Box, Button, Stack, Typography } from '@mui/material'
import imgDetails1 from '../../Images/images.jpg'
import imgDetails2 from '../../Images/final.png'
import { AddShoppingCartOutlined } from '@mui/icons-material'

export default function ProductDetails() {
  return <>
    <Box sx={{display: "flex",flexDirection: {xs: "column", sm:"row"} ,gap: 2, alignItems: "center"}}>
      <Box sx={{display: "flex"}}>
        <img width={300} src={imgDetails1} alt="" />
      </Box>
      <Box sx={{textAlign: {xs: "center", sm: "left"}}}>
        <Typography variant="h5">WOMEN'S FASHION</Typography>
        <Typography my={0.4} fontSize={"22px"} color={"crimson"} variant="h6">
          $12.99
        </Typography>
        <Typography variant="body1">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
        <Stack sx={{flexDirection: "row",justifyContent: {xs: "center", sm: "left"} ,gap: 1, my: 2}}>
          {[imgDetails1, imgDetails2].map((item)=>(
            <img key={item} width={90} src={item} alt="" />
          ))}
        </Stack>
        <Button sx={{mb: {xs: 1, sm: 0} ,textTransform: "capitalize" }} variant="contained">
          <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
          Buy now
        </Button>
      </Box>
    </Box>
  </>
}
