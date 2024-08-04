import React, { useEffect, useState } from "react";
import { Image, ButtonGroup, Flex, IconButton, SimpleGrid, Stack, chakra, useColorModeValue, Text, useToast, Box } from "@chakra-ui/react";
import { AiFillEdit, } from "react-icons/ai";
// import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import AdminNavbar from "../AdminPage/AdminNavbar";




const AdminOrders = () => {

  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [payload, setPayload] = useState({ status: "" })
  const toast = useToast();
  const baseUrl = "http://localhost:5000";

  // const handleDelete=(id)=>{
  //     axios.delete(`http://localhost:8080/eyeglasses/delete/${id}`)
  //     .then((res)=>{
  //         console.log(res);
  //         setUpdate(!update)
  //     })
  //     .catch((err)=>{
  //         console.log(err);
  //     })
  // }

  const handleUpdate = (ID) => {
    // let payload = { status: "" }
    data.map((el) => {
      if (el._id === ID) {
        if (el.status === "Placed") {
          setPayload({ status: "Shipped" })
        }
        else if (el.status === "Shipped") {
          // payload.status = "Delivered"
          setPayload({ status: "Delivered" })
        }
      }
    })
    axios.patch(`${baseUrl}/orders/update/${ID}`, payload)
      .then((res) => {
        toast({
          title: `Status of product updated!`,
          status: "success",
          isClosable: true,
          duration: 4000,
          position: 'top'
        })
        setUpdate(!update)
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error updating status",
          description: err.message,
          status: "error",
          isClosable: true,
          duration: 4000,
          position: 'top'
        });
      })
  }

  useEffect(() => {
    axios.get(`${baseUrl}/orders`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [update])


  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("white", "gray.800");
  const bg3 = useColorModeValue("gray.100", "gray.700");
  return (
    <>
      <AdminNavbar />
      <Text fontSize={'2xl'} w={'100%'} m={'auto'} userSelect={"none"}>
        List of All Orders
      </Text>
      <Flex w="full" _dark={{ bg: "#3e3e3e", }} p={5} alignItems="center" justifyContent="center" userSelect={"none"} >
        <Stack direction={{ base: "column", }} w="full" shadow="lg" >
          {data.map((token, tid) => {
            return (
              <Flex direction={{ base: "row", md: "column", }} key={tid}>
                <SimpleGrid
                  spacingY={3} bg={[bg3, "white"]} columns={{ md: 5, }} w={{ base: "full", md: "full", }}
                  textTransform="uppercase" color={'black'} py={{ base: 1, md: 4, }}
                  px={{ base: 2, md: 10, }} fontSize="md" fontWeight="medium">

                  <Box display={"flex"} flexDirection={["row", "column"]} justifyContent={["space-between", ""]} >

                    <chakra.span height={["100%", "50%"]} display={"flex"} alignItems={"center"} justifyContent={"center"}>User Name</chakra.span>

                    <chakra.span height={["100%", "50%"]} display={"flex"} alignItems={"center"} justifyContent={"center"}>{token.userName}</chakra.span>

                  </Box>

                  <Box display={"flex"} flexDirection={["row", "column"]} justifyContent={["space-between", ""]} >

                    <chakra.span height={["100%", "50%"]} display={"flex"} alignItems={"center"} justifyContent={"center"}>Price</chakra.span>
                    <chakra.span height={["100%", "50%"]} display={"flex"} alignItems={"center"} justifyContent={"center"} textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" >
                      {token.price}
                    </chakra.span>

                  </Box>

                  <Box display={"flex"} w={["100%", ""]} justifyContent={["space-between", ""]} flexDirection={["row", "column"]}>

                    <chakra.span height={["100%", "50%"]} display={"flex"} alignItems={"center"} justifyContent={"center"} >Status</chakra.span>
                    <chakra.span textColor={'gray.500'} fontWeight="semibold" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" height={["100%", "50%"]} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                      {payload.status}
                    </chakra.span>

                  </Box>

                  <Box display={"flex"} w={["100%", ""]} justifyContent={["space-between", ""]} flexDirection={["row", "column"]}>

                    <chakra.span height={["100%", "50%"]} display={"flex"} alignItems={"center"} justifyContent={"center"} >Image</chakra.span>
                    <Flex justifyContent={'center'} height={["100%", "50%"]} display={"flex"} alignItems={"center"} overflow={"hidden"} >
                      <Image w={["50px", '100px']} height={"100%"} objectFit={"cover"} src={token.image} />
                    </Flex>

                  </Box>

                  <Box display={"flex"} w={["100%", ""]} justifyContent={["space-between", ""]} flexDirection={["row", "column"]} >

                    <chakra.span height={["100%", "50%"]} display={"flex"} alignItems={"center"} justifyContent={"center"}>Action</chakra.span>

                    <Flex justify={{ base: 'center', md: "center", }} height={["100%", "50%"]} display={"flex"} alignItems={"center"} mt={"5pt"}>
                      <ButtonGroup variant="solid" size="md" >
                        <IconButton
                          isDisabled={token.status == "Delivered" ? true : false}
                          onClick={() => handleUpdate(token._id)}
                          colorScheme="green"
                          icon={<AiFillEdit />}
                          aria-label="Edit"
                        />
                      </ButtonGroup>
                    </Flex>

                  </Box>
                </SimpleGrid>


                {/* <SimpleGrid spacingY={3} columns={{ base: 1, md: 5, }} alignItems={'center'}
                  w="full" py={2} px={10} textColor={'gray.500'} fontWeight="semibold"  >
                  <chakra.span>{token.userName}</chakra.span>
                  <chakra.span textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap"  >
                    ₹{token.price}
                  </chakra.span>
                  <chakra.span textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" >
                    {token.status}
                  </chakra.span>
                  <Flex justifyContent={'center'}>
                    <Image w={'100px'} src={token.image} />
                  </Flex>
                  <Flex justify={{ base: 'center', md: "end", }}>
                    <ButtonGroup variant="solid" size="md">
                      <IconButton
                        isDisabled={token.status == "Delivered" ? true : false}
                        onClick={() => handleUpdate(token._id)}
                        colorScheme="green"
                        icon={<AiFillEdit />}
                        aria-label="Edit"
                      />
                    </ButtonGroup>
                  </Flex>
                </SimpleGrid> */}
              </Flex>
            );
          })}
        </Stack>
      </Flex>
    </>
  );
};

export default AdminOrders;