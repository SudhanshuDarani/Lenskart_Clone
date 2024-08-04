import React from "react";
import { Box, Flex, Image, Spacer } from "@chakra-ui/react";
import Slider from "./Slider";
const HomepageContent3 = ({ src, data, index }) => {
  // data.map((e) => {
  //   console.log(e)
  // });


  return (
    <Box  key={index} justifyContent="left" p={"2pt"} w="100%" m="auto" mt="6" cursor="pointer">
      <Flex h={"100%"} padding={"5pt"}>
        <Box
          boxSize="sm" cursor="default" pr={{ lg: "4", sm: "0", base: "0" }} w={{
            xs: "none", sm: "none", md: "none", lg: "none", xl: "50%", base: "none",
          }}>

          <Image src={src} boxSize="800px" h="100%" w={{
            xs: "80%", sm: "80%", md: "80%", lg: "75%", xl: "100%", base: "none",
          }} />
        </Box>
        <Spacer />
        <Box  w={{ sm: "100%", md: "100%", lg: "100%", xl: "80%", base: "100%" }}>
          <Slider data={data} />
        </Box>
      </Flex>
    </Box>
  );
};

export default HomepageContent3;
