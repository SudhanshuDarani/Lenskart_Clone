import React from "react";
import { Box, Image, Square, Link } from "@chakra-ui/react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
const HomepageContent6 = ({ data, text, index }) => {
  return (
    <Box
      key={index} textAlign={"left"} justifyContent="left" w="90%" m="auto" mt="6"
      fontSize="25pt" pb="7" fontWeight="400" >
      {text}
      <hr />
      <Box mt="0" >
        <Swiper 
          modules={[Navigation, Autoplay]}
          navigation
          style={{
            "--swiper-navigation-color": "#E5E4E2",
            // "border": "4px solid red"
          }}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}>
          {data.map((e) => (
            <Box>
              {/* <Link href={"/eyeglasses"} > */}
              <SwiperSlide style={{ height: "180pt", width: "400pt" }}>
                <Square style={{ height: "100%" }} m="auto" display={"flex"} justifyContent={"center"}
                  alignItems={"center"}>
                  <Link href="/eyeglasses" style={{ textDecoration: "none", color: "black" }}>
                    <Image cursor={"pointer"}
                      src={`${e.img}`} alt={e.caption}
                      w={["80%", "", "", "", "100%"]} />
                  </Link>
                </Square>
              </SwiperSlide>
              {/* </Link> */}
            </Box>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default HomepageContent6;
