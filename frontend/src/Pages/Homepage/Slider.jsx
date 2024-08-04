import React from "react";
import { Box, Image, Square, Link, Text, Button, Center, VStack } from "@chakra-ui/react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const Slider = ({ data, index }) => {
  return (
    <Swiper key={index}
      style={{
        "--swiper-navigation-color": "grey",
        "cursor": "default",
        // "border": "2px solid blue",
        "padding": "5pt",
        "height": "100%",
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center"
      }}
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 4000 }}
      breakpoints={{
        0: {
          slidesPerView: 1, spaceBetween: 10,
        },
        200: {
          slidesPerView: 1, spaceBetween: 10,
        },
        480: {
          slidesPerView: 1, spaceBetween: 10,
        },
        660: {
          slidesPerView: 2, spaceBetween: 10,
        },
        749: {
          slidesPerView: 3, spaceBetween: 10,
        },
        1240: {
          slidesPerView: 4, spaceBetween: 10,
        },
      }}>
      {data.map((i, index) => (
        <Box>
          <SwiperSlide  key={index}>

            {/* <Link to={i.linked} style={{ textDecoration: "none", color: "white" }}> */}
              <Square m="auto" cursor={"default"} h={"50%"}>
                <Link href="/eyeglasses" style={{ textDecoration: "none", color: "white" }}>
                  <Image src={`${i.img}`} alt={i.name} boxSize={{ base: "100px" }} w="100%" h={"100%"} /> 
                </Link>
              </Square>
            {/* </Link> */}
            <VStack m="auto" display={"flex"} justifyContent={"center"} alignItems={"center"} cursor={"default"} h={"50%"} >
              <Center display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Text fontWeight="500" fontSize="30px" fontFamily="Futura-Medium">
                  <Link href="/eyeglasses" style={{ textDecoration: "none", color: "black" }}>
                    {i.name}
                  </Link>
                </Text>
              </Center>
              <Button p="22px 38px" colorScheme="teal" fontSize="22px">
                <Link href="/eyeglasses" style={{ textDecoration: "none", color: "white" }}>
                  Explore
                </Link>
              </Button>
            </VStack>
          </SwiperSlide>
        </Box>
      ))}
    </Swiper>
  );
};

export default Slider;
