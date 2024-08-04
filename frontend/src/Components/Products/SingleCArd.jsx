import {
  Box, Stack, Text, Image, Flex, VStack, Button, Heading, Spacer, HStack, Input,
  InputGroup, InputRightElement
} from '@chakra-ui/react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, }
  from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import default_image from "./default_image.jpeg";
import { HompePageitem } from '../../Pages/Homepage/HompepageItems';
import axios from 'axios';
import { addCartItems } from '../../redux/cartReducer/cartAction';

const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  }
}
const SinglePage = () => {
  // const token = localStorage.getItem("token")
  const host = "http://localhost:5000";
  const userAccessToken = localStorage.getItem("userAccessToken");
  const googleUserToken = localStorage.getItem("googleAccessToken");
  const userData = JSON.parse(localStorage.getItem("userData"))
  const googleUserData = JSON.parse(localStorage.getItem("googleUserData"))
  const userID = (googleUserData) ? googleUserData._id : "" || (userData) ? userData._id : "";
  const toast = useToast();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [datas, setDatas] = useState({});
  const [cartData, setCartData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { products } = useSelector(state => {
    return { products: state.productReducer.products }
  })
  useEffect(() => {
    // ._id === id
    const data = products.find((el) => el._id === id)
    setData(data)
    const datas = HompePageitem.find((items) => items.id === id)
    setDatas(datas)
    getData()
  }, [refresh]);
  const userInfos = {
    userName: (userData) ? userData.name : "" || (googleUserData) ? googleUserData.name : "",
    userID: userID
  }
  const getData = async () => {
    try {
      const results = await axios.get(`${host}/cart`, {
        headers: {
          Authorization: `${googleUserToken}`,
        },
        params: userInfos
      })

      if (results.status === 200 && results.data.length > 0) {
        setCartData(results.data)
        dispatch(addCartItems(results.data))
      } else {
        // console.log("item not found")
      }

    } catch (error) {
      console.log(error.message)
    }
  }
  const existingItems = cartData.findIndex(items => items.productId === id)

  const handleClick = () => {
    const obj = {
      image: (datas) ? datas.image : data.image,
      title: (data) ? data.title : datas.title,
      price: (data) ? data.price : datas.price,
      quantity: 1,
      shape: (data) ? data.shape : "",
      size: (data) ? data.size : "",
      color: (data) ? data.color : "",
      rating: (data) ? data.rating : "",
      userName: (userData) ? userData.name : "" || (googleUserData) ? googleUserData.name : "",
      userID: (userData) ? userData._id : "" || (googleUserData) ? googleUserData._id : "",
      productId: id
    }
    if (existingItems !== -1) {
      cartData.map((el) => {
        if (el.productId === id) {
          axios.put(`${host}/cart/update/${el._id}`, { quantity: el.quantity + 1 }, {
            headers: {
              // Authorization: `${token}`
              Authorization: `${userAccessToken}`
            }
          }).then((res) => {
            // setRefresh(!refresh)
            setRefresh((prev) => !prev)
          })
        }
      })
    } else {
      axios.post(`${host}/cart/addtocart`, obj, {
        headers: {
          Authorization: `${userAccessToken}  ` || `${googleUserToken}`
        },
        params: { userID }
      }).then((res) => {
        getData()
        if (res.data.msg === "Please Login First!!" || res.data.msg === undefined) {
          toast({
            title: 'Login First or Sign up !',
            description: "Please do login to your account or signup to start a new journey with us!",
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: 'top'
          })

        } else {
          toast({
            title: 'Product added to cart!!',
            description: "The product is added to your cart",
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: "top"
          })
        }
      }).catch((err) => {
        toast({
          title: 'Login First!',
          description: "Please do login to your account or signup to start a new journey with us!",
          status: 'error',
          duration: 1000,
          isClosable: true,
          position: "top"
        })
      })
    }
  }

  const debounceHandleClick = debounce(handleClick, 300)
  return (
    <Box width={"100%"}>
      <Flex p={"10pt"} display={"flex"} justifyContent={"center"}
        margin={"auto"} width={"96%"} direction={["column", "column", "column", "row", "row"]}>
        <Flex position={"relative"} h={['50vh']} objectFit={"cover"} overflow={"hidden"} width={"100%"}>

          <Image border={"0.5px solid lightgrey"} alt={'product image'} w={'100%'}
            src={(data) ? data.image : default_image}
            fit={"contain"} align={'center'}
            h={{ base: '100%', sm: '100%', md: '70vh', lg: '100%' }} />
        </Flex>
        <Spacer />
        {/* position={"relative"} top={"-7vh"}  right={["0vh", "0vh", "0vh", "7vh", "7vw"]} */}
        <Stack h={"40%"} align={["center", "center", "center", "start", "start"]} width={["100%", "100%", "100%", "38vw", "38vw"]} ml={["0vw", "0vw", "0vw", "10vw", "10vw"]} spacing={{ base: 6, md: 10 }} p={"10pt"} alignItems={"center"}>

          <Box as={'header'} w={["100%", "100%"]} mt={["3rem", "0rem"]}>
            <Text align={["start"]} color={"#999"} fontWeight={"400"} pb={"0.5vh"} fontSize={"20pt"}>
              {/* {data.title} */}
              {(data) ? data.title : ""}
            </Text>
            <Heading lineHeight={1.1} textAlign={"start"} fontWeight="500" fontSize={{ base: 'sm', sm: 'sm', lg: '18pt' }}>
              Gunmetal Green Full Rim Round Eyeglasses
            </Heading>

            <Text align={"start"} color={"#999"} fontWeight={"semibold"} pt={"1vh"} fontSize={"19pt"}>
              Size : {(data) ? data.size : ""}
              {/* {data.size} */}
            </Text>
            <Text align={"start"} color={"#00BAC6"} fontWeight={"semibold"} fontSize={"25pt"}>
              {/* ₹{data.price} */}
              ₹ {(data) ? data.price : ""}
            </Text>
            <Text align={"start"} color={"blake"} textTransform={'uppercase'} fontWeight={"normal"} fontSize={"18px"}>
              {/* {data.shape} */}
              {(data) ? data.shape : ""}
            </Text>
            <Text align={"start"} color={"blake"} textTransform={'uppercase'} fontWeight={"normal"} fontSize={"15px"}>
              {/* {data.color} */}
              {(data) ? data.color : ""}
            </Text>
          </Box>
          <Button cursor={"default"} height={"45pt"} border={"none"} outline={"none"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} rounded={'5px'} w={'100%'} bg={'#00bac6'} color={"white"} _hover={{
            backgroundColor: '#00bac6'
          }}>
            {/* <VStack border={"2pt solid red"} width={"100%"} display={"flex"} height={"85%"} gap={"0"}> */}
            {/* pos={"relative"} top={"4pt"}  */}
            <Text textTransform={'uppercase'} mt={"12pt"} fontSize={["14pt", "20px"]} >
              SELECT LENSES <br />
            </Text>
            {/* pos={"relative"} bottom={"1.5vh"} */}
            <Text fontSize={["10pt", "", "", "", "15px"]} mt={"-8pt"}>
              (with 1 Year Warranty & 14 Day Return)
            </Text>
            {/* </VStack> */}

          </Button>
          <Button rounded={'5px'} w={'full'} display={"flex"} justifyContent={"center"} alignItems={"center"} mt={6} size={'lg'} py={'7'} bg={"white"} color={'gray.900'} textTransform={'uppercase'} border={"1px solid black"} onClick={debounceHandleClick} _hover={{
            transform: 'translateY(2px)',
            boxShadow: 'lg',
          }}>
            Add To Cart
          </Button>




          <Accordion width={["100%", "100%", "100%", "28vw", "28vw"]} defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' fontSize={"17px"} fontWeight={"semibold"} textAlign='start'>
                    Technical Information
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack align={"start"}>
                  <Text fontSize={"15px"} color={"grey"}>Product id  <span style={{
                    position: "relative", left: "5vw", color: "black", textAlign: "start"

                  }}>152841</span></Text>
                  <Text fontSize={"15px"} color={"grey"}>Model No.
                    <span style={{
                      position: "relative", left: "5vw",
                      color: "black", textAlign: "start"
                    }}>VC E14716</span></Text>
                  <Text fontSize={"15px"} color={"grey"}>Frame Size
                    <span style={{ position: "relative", left: "5vw", color: "black", textAlign: "start" }}>
                      {/* {data.size} */}
                      {(data) ? data.size : ""}

                    </span></Text>
                  <Text fontSize={"15px"} color={"grey"}>Frame Width
                    <span style={{ position: "relative", left: "4vw", color: "black", textAlign: "start" }}>137 mm</span>
                  </Text>
                  <Text fontSize={"15px"} color={"grey"}>Frame Dimensions
                    <span style={{ position: "relative", left: "2vw", color: "black", textAlign: "start" }}>53-18-135</span>
                  </Text>
                </VStack>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' fontSize={"17px"} fontWeight={"semibold"} textAlign='start'>
                    Visit Nearby Store
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <HStack>
                  <Image src='https://static.lenskart.com/media/desktop/img/pdp/visit_store.png' />
                  <VStack gap={0} align={"start"} >
                    <Text align={"start"} fontSize={"13px"} color={"grey"}>Please Share Your Location To See Nearby Stores</Text>
                    <Text fontSize={"14px"} color={"teal"} fontWeight={"semibold"}>Store Locator</Text>
                  </VStack>
                </HStack>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' fontSize={"15px"} fontWeight={"semibold"} textAlign='start'>
                    Check Delivery Options
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <HStack>
                  <InputGroup size='md'>
                    <Input pr='4.5rem' placeholder='Enter Pin Code' />
                    <InputRightElement width='4.5rem'>
                      <Button variant={"ghost"} h='1.75rem' size='sm'>
                        CHECK
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </HStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          {/* <Stack direction="row" display={"flex"} alignItems={"center"} justifyContent={'space-between'} >
            <MdLocalShipping />
            <Text >2-3 business days delivery</Text>
          </Stack> */}
        </Stack>
      </Flex>

    </Box>



  );
}

export default SinglePage;