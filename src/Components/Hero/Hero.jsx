import {
  Box,
  Button,
  Container,
  Link,
  Pagination,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
// @ts-ignore
import banner17 from "../../Images/banner-17.jpg";
// @ts-ignore
import banner16 from "../../Images/banner-16.jpg";
import { ArrowForward } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// @ts-ignore
import "./Slider.css";
// @ts-ignore
import banner15 from "../../Images/banner-15.jpg";
// @ts-ignore
import banner25 from "../../Images/banner-25.jpg";
import Services from "./Services";
import Main from "../Main/Main";

const sliderArr = [
  {type: "MEN", img: banner15},
  {type: "Women", img: banner25},
]

export default function Hero() {
  const theme = useTheme();
  return (
    <>
      <Container>
       <Box sx={{pt:2, display: "flex", alignItems: "center", mt: 2.5 }}>
         <Swiper
           pagination={true}
           loop={true}
           modules={[
             // @ts-ignore
             Pagination,
           ]}
           className="mySwiper"
         >
           {sliderArr.map((item)=> (
             <SwiperSlide
             className="parentSlider"
             // @ts-ignore
             sx={{ position: "relative" }}
           >
             <img src={item.img} alt="" />
             <Box
               sx={{
                 [theme.breakpoints.up("sm")]: {
                   position: "absolute",
                   left: "10%",
                   textAlign: "left",
                 },
                 [theme.breakpoints.down("sm")]: {
                   pt: 4,
                   pb: 6,
                 },
               }}
             >
               <Typography sx={{ color: "#222" }} variant={"h5"}>
                 LIFESTYLE COLLECTION
               </Typography>
               <Typography
                 sx={{ color: "#222", fontWeight: 400, my: 1 }}
                 variant={"h4"}
               >
                 {item.type}
               </Typography>
               <Stack direction={"row"} sx={{ justifyContent: { xs: "center", sm: "left", alignItems: "center" } }}>
                 <Typography
                   sx={{ color: "#333", fontWeight: 400, mr: 1 }}
                   variant={"h5"}
                 >
                   SALE UP To
                 </Typography>
                 <Typography
                   sx={{ color: "#D23F57", fontWeight: 400, my: 1 }}
                   variant={"h5"}
                 >
                   50% OFF
                 </Typography>
               </Stack>
               <Typography
                 sx={{ color: "#000", fontWeight: 300, my: 1 }}
                 variant={"body1"}
               >
                 Get Free Shipping on Orders Over $99.00
               </Typography>
               <Button
                 sx={{
                   px: 5,
                   py: 1,
                   mt: 2,
                   backgroundColor: "#222",
                   boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                   color: "#fff",
                   borderRadius: "1px",
                   "&:hover": {
                     bgcolor: "#151515",
                     boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                   },
                 }}
               >
                 shop now
               </Button>
             </Box>
           </SwiperSlide>
           ))}
         </Swiper>
         <Box sx={{ display: { xs: "none", md: "block", minWidth: "27%" }, pl: 2 }}>
           <Box sx={{ position: "relative", mb: 1 }}>
             <img src={banner17} width={"100%"} alt="" />
             <Stack
               sx={{
                 position: "absolute",
                 top: "50%",
                 transform: "translateY(-50%)",
                 left: 33,
               }}
             >
               <Typography variant="caption" sx={{ color: "#2B3445" }}>
                 NEW ARRIVALS
               </Typography>
               <Typography variant="h6" sx={{ color: "#2B3445" }}>
                 SUMMER
               </Typography>
               <Typography variant="h6" sx={{ color: "#2B3445" }}>
                 SALE 20% OFF
               </Typography>
               <Link
                 sx={{
                   color: "#2B3445",
                   display: "flex",
                   alignItems: "center",
                   gap: "5px",
                   transition: "0.3s",
                   ":hover": { color: "#D23F57", cursor: "pointer" },
                 }}
                 href="#"
                 underline="none"
               >
                 Shop now
                 <ArrowForward sx={{ fontSize: "13px" }} />
               </Link>
             </Stack>
           </Box>
           <Box sx={{ position: "relative" }}>
             <img src={banner16} width={"100%"} alt="" />
             <Stack
               sx={{
                 position: "absolute",
                 top: "50%",
                 transform: "translateY(-50%)",
                 left: 33,
               }}
             >
               <Typography variant="caption" sx={{ color: "#2B3445" }}>
                 GAMING 4K
               </Typography>
               <Typography variant="h6" sx={{ color: "#2B3445" }}>
                 DESKTOPS &
               </Typography>
               <Typography variant="h6" sx={{ color: "#2B3445" }}>
                 LAPTOPS
               </Typography>
               <Link
                 sx={{
                   color: "#2B3445",
                   display: "flex",
                   alignItems: "center",
                   gap: "5px",
                   transition: "0.3s",
                   ":hover": { color: "#D23F57", cursor: "pointer" },
                 }}
                 href="#"
                 underline="none"
               >
                 Shop now
                 <ArrowForward sx={{ fontSize: "13px" }} />
               </Link>
             </Stack>
           </Box>
         </Box>
       </Box >
      <Services/>
      <Main/>
      </Container>
    </>
  );
}
