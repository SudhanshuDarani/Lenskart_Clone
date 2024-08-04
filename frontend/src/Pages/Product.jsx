import { Box, Image, Stack } from '@chakra-ui/react'
import React from 'react'
import { Sidebar } from '../Components/Products/Sidebar'
import { ProductMain } from '../Components/Products/ProductMain'

export const Product = () => {
  return (
    <>
      <Box display={["none", "none", "none", "flex", "flex"]} width={["100%", "100%", "100%", "97%", "97%"]} position={"relative"} left={"8px"} margin={["0px", "0px", "0px", "auto", "auto"]} height={"13vh"} >
        <Image width={"100%"} height={"13vh"} src="https://static1.lenskart.com/media/desktop/img/23apr/summer-sale/plp/PLP%20Camapaign%20-%20WEB%20(8).jpg" alt='Dan Abramov' />
      </Box>
      <Stack width={["100%", "100%", "100%", "100%", "97%"]} margin={"auto"} direction={"row"}
        display={"flex"} justifyContent={"space-between"}>

        {/* position={"absolute"} pt={"18pt"} */}
        <Box display={["none", "none", "none", "flex", "flex"]} zIndex={1110} height={"100%"} overflowY={"scroll"} 
        overflowX={"hidden"} p={"5pt"} width={["60%", "60%", "60%", "27%", "20%"]} css={{
            '&::-webkit-scrollbar': {
                display: "none"
            }
        }}>
          <Sidebar />
        </Box>

        {/* position={"relative"} left={["0px", "0px", "0px", "200px", "400px"]} */}
        <Box width={["100%", "100%", "100%", "80%", "80%"]} >
          <ProductMain />
        </Box>

      </Stack>
    </>
  )
}
