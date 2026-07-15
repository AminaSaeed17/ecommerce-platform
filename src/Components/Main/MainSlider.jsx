import { Container, Typography } from "@mui/material";
import { categoryContext } from "../Context/CategoryContext";
import { useContext } from "react";
import SliderPackage from "react-slick";


// @ts-ignore
const Slider = SliderPackage.default || SliderPackage;

export default function MainSlider() {
    const {category} = useContext(categoryContext);
     const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:2000,
    arrows: false
  };
  return <>
    <Container>
        <Slider {...settings}>
            {category.map((
// @ts-ignore
            item, index) => (
              <div key={index}>
                <img

                  src={item.image}
                  alt={item.title}
                  style={{
                    // width: "100%",
                    height: "200px",
                    // borderRadius: 12,
                    objectFit: "cover",
                  }}
                />
                <Typography>{item.name}</Typography>
              </div>
            ))}
          </Slider>
    </Container>
  </>
}
