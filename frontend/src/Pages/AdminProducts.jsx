import React, { useEffect, useState } from "react";
import {
  Image, ButtonGroup, Flex, IconButton, SimpleGrid, Stack, chakra, useColorModeValue, Text,
   useToast,Box
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiFillEdit, } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import AdminNavbar from "../AdminPage/AdminNavbar";


const AdminProducts = () => {

  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const toast = useToast();
  const baseUrl = "http://localhost:5000";
  const handleDelete = (id) => {
    axios.delete(`${baseUrl}/eyeglasses/delete/${id}`)
      .then((res) => {
        toast({
          title: `Product with ID:${id} deleted successfully!!`,
          status: 'success',
          isClosable: true,
          duration: 4000,
          position: 'top'
        })
        setUpdate(!update)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    axios.get(`${baseUrl}/eyeglasses`)
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
      <Text userSelect={"none"} fontSize={'2xl'} w={'100%'} m={'auto'} >List of All Products</Text>
      <Flex
        w="full" userSelect={"none"} _dark={{ bg: "#3e3e3e", }} p={5} alignItems="center"
        justifyContent="center" >
        <Stack
          direction={{
            base: "column",
          }} w="full" shadow="lg" bg={{ md: bg, }} >
          {data.map((token, tid) => {
            return (
              <Flex direction={{ base: "row", md: "column", }} bg={bg2} key={tid} >
                {/* <SimpleGrid
                  spacingY={3} fontSize="md" fontWeight="medium" columns={{ base: 1, md: 5, }}
                  w={{ base: 120, md: "full", }} textTransform="uppercase"
                  bg={bg3} color={'black'} py={{ base: 1, md: 4, }} px={{ base: 2, md: 10, }} >
                  <span>Name</span>
                  <span>Price</span>
                  <span>Rating</span>
                  <span>Image</span>
                  <chakra.span textAlign={{ md: "right", }}      >
                    Action
                  </chakra.span>
                </SimpleGrid> */}

                <SimpleGrid
                  spacingY={3} bg={[bg3, "white"]} columns={{ md: 5, }} w={{ base: "full", md: "full", }}
                  textTransform="uppercase" color={'black'} py={{ base: 1, md: 4, }}
                  px={{ base: 2, md: 10, }} fontSize="md" fontWeight="medium">

                  <Box display={"flex"} flexDirection={["row", "column"]} justifyContent={["space-between", ""]} >

                    <chakra.span height={["100%", "50%"]} display={"flex"} alignItems={"center"} justifyContent={"center"}>User Name</chakra.span>

                    <chakra.span height={["100%", "50%"]} display={"flex"} alignItems={"center"} justifyContent={"center"}>{token.title}</chakra.span>

                  </Box>

                  <Box display={"flex"} flexDirection={["row", "column"]} justifyContent={["space-between", ""]} >

                    <chakra.span height={["100%", "50%"]} display={"flex"} alignItems={"center"} justifyContent={"center"}>Price</chakra.span>
                    <chakra.span height={["100%", "50%"]} display={"flex"} alignItems={"center"} justifyContent={"center"} textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" >
                      {token.price}
                    </chakra.span>

                  </Box>

                  <Box display={"flex"} w={["100%", ""]} justifyContent={["space-between", ""]} flexDirection={["row", "column"]}>

                    <chakra.span height={["100%", "50%"]} display={"flex"} alignItems={"center"} justifyContent={"center"} >Rating</chakra.span>
                    <chakra.span textColor={'gray.500'} fontWeight="semibold" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" height={["100%", "50%"]} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                      {/* {payload.status} */} {token.rating}
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
                      <Link to={`/adminproducts/update/${token._id}`}>
                        <IconButton
                          isDisabled={token.status == "Delivered" ? true : false}
                          // onClick={() => handleUpdate(token._id)}
                          colorScheme="green"
                          icon={<AiFillEdit />}
                          aria-label="Edit"
                        />
                        </Link>
                        <IconButton
                        onClick={() => handleDelete(token._id)}
                        colorScheme="red"
                        variant="solid"
                        icon={<BsFillTrashFill />}
                        aria-label="Delete" fontSize={"17pt"}
                      />
                      </ButtonGroup>
                    </Flex>

                  </Box>
                </SimpleGrid>

                {/* <SimpleGrid
                  spacingY={3} columns={{ base: 1, md: 5, }} alignItems={'center'} fontSize={"17pt"}
                  w="full" py={2} px={10} textColor={'gray.500'} fontWeight="semibold" >
                  <span>{token.title}</span>
                  <chakra.span textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                    ₹{token.price}
                  </chakra.span>
                  <chakra.span textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" >
                    {token.rating}
                  </chakra.span>
                  <Flex justifyContent={'center'} >
                    <Image w={'100px'} src={token.image} />
                  </Flex>
                  <Flex justify={{ base: 'center', md: "end", }} >
                    <ButtonGroup variant="solid" p={"5pt"}
                      display={"flex"} justifyContent={"center"} alignItems={"center"}>
                      <Link href={`/adminproducts/update/${token._id}`}>
                        <IconButton
                          colorScheme="green"
                          icon={<AiFillEdit />}
                          aria-label="Edit" fontSize={"19pt"}
                        />
                      </Link>
                      <IconButton
                        onClick={() => handleDelete(token._id)}
                        colorScheme="red"
                        variant="solid"
                        icon={<BsFillTrashFill />}
                        aria-label="Delete" fontSize={"17pt"}
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

export default AdminProducts;