import { Box, Flex, HStack, Spacer, Text, Heading, Select, } from "@chakra-ui/react"
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Switch } from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import SidebarMob from "./sidebarmobile"
function ProductNav(index) {
    const [searchParams, setSearchParams] = useSearchParams()
    const initialOrder = searchParams.getAll("order")
    const color = searchParams.getAll("color")
    const brand = searchParams.getAll("brand")
    const size = searchParams.getAll("size")
    const shape = searchParams.getAll("shape")
    const [order, setOrder] = useState(initialOrder || "")
    const handleChange = (e) => {
        setOrder(e.target.value)
    }
    useEffect(() => {
        const params = { color, brand, size, shape }

        order && (params.order = order)

        setSearchParams(params)
    }, [order])
    // console.log(searchParams.getAll("order"))
    return (
        <Flex key={index} pos={"relative"} left={["0vw", "0vw", "0vw", "5vw", "0vw"]}
            bgColor={"#efefef"} width={["100%", "", "", "88%", "100%",]} h="7vh" textAlign="center">
            <Box pl={"1vw"} alignSelf={"center"} >
                <Heading pos={"relative"} top={["3px", "3px", "4px", "4px", "4px"]}
                    fontWeight={"light"} size={["xs", "xs", "xs", "md", "md"]} color={"#6d6e71"} >
                    PROMOTIONS
                </Heading>
            </Box>
            <Spacer />
            <Box alignSelf={"center"} w={["50%", "", "", "50%", "22%"]}>
                <HStack gap={[0, 0, 0, 2, 2]} mt={"5pt"} p={"5pt"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    {/* pos={"relative"} top={["8px", "8px", "7px", "6px", "6px"]} */}
                    <Text position={"relative"} top={["4px", "3px", "4px", "4px", "4px"]}
                        fontSize={["11px", "8px", "10px", "14px", "14pt"]} color={"#329c92"}
                        fontWeight={"semibold"} >
                        VIEW FRAMES
                    </Text>
                    <Switch colorScheme='teal' size={["sm", "sm", "md", "lg", 'lg']} />
                    <Text pos={"relative"} top={["4px", "3px", "4px", "4px", "4px"]}
                        fontSize={["10px", "10px", "10px", "14pt", "14pt"]}>
                        VIEW 3D TRY ON
                    </Text>
                </HStack>
            </Box>
            <Spacer />
            <Box key={index} w={["10vw", "7vw", "9vw", "15vw", "15vw"]} alignSelf={"center"}
                mr={["7vw", "7vw", "1vw", "1vw", "1vw"]}>
                <HStack display={["none", "none", "none", "flex", "flex"]} alignSelf={"center"} justifyContent={"space-between"}>
                    <Text width={"5vw"} fontSize={["5px", "5px", "10px", "14px", "14pt"]} mt={"1.5vh"} color={"#329c92"} fontWeight={"bold"} >SORT BY</Text>
                    <Select onChange={handleChange} fontSize={"14pt"} width={"10vw"} size='sm'
                        bgColor={"white"} placeholder='Best Sellers' height={"35pt"}>
                        <option value='asc' checked={order === "asc"}>Price:Low to High</option>
                        <option value='desc' checked={order === "desc"}>Price:High to Low</option>
                    </Select>
                </HStack>
                {/* <Button border={"1px solid red"} size={"sm"} display={["flex","flex","flex","none","none"]}>
                </Button> */}
                <SidebarMob />
            </Box>
        </Flex>
    )
}

export default ProductNav