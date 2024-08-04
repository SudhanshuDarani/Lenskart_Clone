import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { CgShoppingCart } from "react-icons/cg";
import Cleardekhologo from "../Cleardekhologo.png";
import { MdWifiCalling3 } from "react-icons/md";
import { TriangleDownIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box, Flex, Text, Image, Input, Button, HStack, Avatar, Grid, Menu, MenuButton, MenuList,
  Badge, MenuItem, ListItem, UnorderedList, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,
  ModalCloseButton, VStack, Heading
} from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MobileNav from "./MobileNav";
import Login from "../Pages/login/Login";
import Signup from "../Pages/Signup/Signup";
import { HompePageitem } from "../Pages/Homepage/HompepageItems";
import { addCartItems } from "../redux/cartReducer/cartAction";
import { addWishListItems } from "../redux/wishlistReducer/wishlistAction";
import { useDispatch, useSelector } from "react-redux";
import { setRouteParams } from "../redux/setRoutes/paramsActions";
import { useDisclosure } from "@chakra-ui/react";
import "../App.css";
import { HiOutlineShoppingBag } from "react-icons/hi";
const host = "http://localhost:5000";
const NavbarTopDescription = [
  {
    Tag: "Do more, Be More   ",
  },
  {
    Tag: "|"
  },
  {
    Tag: "Try in 3D   ",
  },
  {
    Tag: "|"
  },
  {
    Tag: "Store Locator   ",
  },
  {
    Tag: "|"
  },
  {
    Tag: "Singapore   ",
  },
  {
    Tag: "|"
  },
  {
    Tag: "UAE   ",
  },
  {
    Tag: "|"
  },
  {
    Tag: "John Jacobs   ",
  },
  {
    Tag: "|"
  },
  {
    Tag: "Aqualens   ",
  },
  {
    Tag: "|"
  },
  {
    Tag: "Cobrowsing   ",
  },
  {
    Tag: "|"
  },
  {
    Tag: "Engineering Blog   ",
  },
  {
    Tag: "|"
  },
  {
    Tag: "Lenskart Franchise   ",
  },

];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef()
  let googleUserData = JSON.parse(localStorage.getItem("googleUserData")) || ""
  let userData = JSON.parse(localStorage.getItem("userData")) || "";
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [productsData, setProductsData] = useState([])
  const userAccessToken = localStorage.getItem("userAccessToken");
  const googleUserToken = localStorage.getItem("googleAccessToken");
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSunglasses = searchParams.getAll("sun glasses");
  const initialEyeglasses = searchParams.getAll("Eye glasses");
  const initialLenses = searchParams.getAll("lens");
  const [sunglasses, setSunGlasses] = useState(initialSunglasses || []);
  const [eyeglasses, setEyeGlasses] = useState(initialEyeglasses || []);
  const [lens, setLens] = useState(initialLenses || []);
  const [cartData, setCartData] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);

  const datass = HompePageitem.filter((homey) => {
    return homey.title
  })
  // const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  const { cart } = useSelector((carts) => {
    return {
      cart: carts.cartReducer.cartItem,
      isLoading: carts.cartReducer.isLoading
    }
  })

  const wishlistss = useSelector((state) => state.wishlistReducer.wishListItem);

  const userID = (userData) ? userData._id : "" || (googleUserData) ? googleUserData._id : "";
  const userInfos = {
    userName: (userData) ? userData.name : "" || (googleUserData) ? googleUserData.name : "",
    userID: userID
  };
  useEffect(() => {
    const data = datass.find((el) => el.title)
    dispatch(addCartItems(cartData));
    dispatch(addWishListItems(wishlistData));
    getData();
    getProductData();
  }, [dispatch]);
  useEffect(() => {
    setWishlistData(wishlistss);
  }, [wishlistss])

  const getData = async () => {
    try {
      axios.get(`${host}/cart`, {
        headers: {
          Authorization: `${userAccessToken} ` || `${googleUserToken}`,
        },
        params: userInfos
      }).then((resultss) => {
        if (resultss.data.length > 0) {
          setCartData(resultss.data);
        } else {
          // console.log("No items found");
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  };
  const getProductData = async () => {
    const productsData = await axios.get(`${host}/eyeglasses`, {
      headers: {
        Authorization: `${googleUserToken || userAccessToken}`,
      }
    })
    setProductsData(productsData.data)
  };
  const getwishListData = async () => {
    try {
      const results = await axios.get(`${host}/wishlist`, {
        headers: {
          Authorization: `${userAccessToken} ` || `${googleUserToken}`
        },
        params: { userID: userInfos.userID }
      })
      // if (JSON.stringify(results.data) !== JSON.stringify(wishtListRef.current)) { 
      dispatch(addWishListItems(results.data))
      // }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleDelete = async (id) => {
    // const updatedList=wishlistss.filter((product)=>product.productId!==id);
    // console.log("updatedList",updatedList,id)
    const resultData = await axios.get(`${host}/wishlist`, {
      headers: {
        Authorization: `${googleUserToken}`,
      },
      params: { userID: userInfos.userID }
    })
    const update = resultData.data;
    const itemExist = update.some(item => item.productId === id)
    if (itemExist) {
      const itemToRemove = update.find(item => item.productId === id);
      const res = await axios.delete(`${host}/wishlist/delete/${itemToRemove._id}`, {
        headers: {
          Authorization: `${userAccessToken}` || `${googleUserToken}`
        }, data: { userID: userInfos.userID }
      })
      if (res.data) {
        getwishListData();
        toast({
          title: "Product removed from cart!!",
          status: "success",
          isClosable: true,
          duration: 4000,
          position: 'top'
        })
      }
    }
  };

  const handleInputChange = e => {
    setQuery(e.target.value);
    const filtered = datass.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    )
    const filtereds = productsData.filter(items =>
      items.title.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredData([...filtered, ...filtereds]);
  };
  let isAuth = JSON.parse(localStorage.getItem("auth")) || false
  let userdata = JSON.parse(localStorage.getItem("userData")) || "";
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await fetch(`http://localhost:5000/logout`, { method: "GET", credentials: "include" })
        .then(response => response.json())
        .then(result => {
          // console.log("results data to logout : ", result.message);
          window.location.href = '/'
        })
      // cookie.remove("googleAccessCookie")
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };
  const showToastMessage = () => {
    toast.success("Logout Successfull !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleSunglases = async () => {
    let newColor = [...sunglasses]
    const value = "sun glasses"
    if (newColor.includes(value)) {
      newColor = newColor.filter((el) => el !== value)
    }
    else {
      newColor.push(value);
      dispatch(setRouteParams({ value }));
      const url = `/eyeglasses?value=${value}`;
      navigate(url);
    }
    setSunGlasses(newColor);
  }
  const handleEyeglasses = () => {
    let newColor = [...eyeglasses];
    const value = "eye glasses";
    if (newColor.includes(value)) {
      newColor = newColor.filter((el) => el !== value)
    }
    else {
      newColor.push(value);
      dispatch(setRouteParams({ value }));
      const url = `/eyeglasses?value=${value}`;
      navigate(url);
    }
    setEyeGlasses(newColor)
  };
  const handleLens = () => {
    let newColor = [...lens];
    const value = "aqualens";
    if (newColor.includes(value)) {
      newColor = newColor.filter((el) => el !== value);
      console.log(newColor)
    }
    else {
      newColor.push(value)
      dispatch(setRouteParams({ value }))
      const url = `/eyeglasses?value=${value}`;
      navigate(url)
    }
    setLens(newColor)
  };
  useEffect(() => {
    const params = { sunglasses, eyeglasses, lens }
    setSearchParams(params);
  }, [sunglasses, eyeglasses, lens])

  return (
    <Box overflow="hidden" bg="white" >
      <Box display={{ base: "none", xl: "inherit" }} color="blackAlpha.800">
        {/* Top part of the navbar start */}
        <Box className="topPartNavbar">

          <Flex className="topInnerNav">

            {NavbarTopDescription.map((e, index) => (

              // <Box key={index} border={"1px solid black"} height={"100%"} display={"flex"} justifyContent={"center"} alignContent={"center"}>

              <Text key={index} cursor="pointer" fontSize="16px" fontWeight={"500"} >
                {e.Tag}
              </Text>

              // </Box>
            ))}

          </Flex>

          <Text className="topInnerText" cursor="pointer" display={"flex"} justifyItems={"center"}
            alignItems={"center"} fontSize="18px" fontWeight={"400"} p={"15px"}>
            Contact us
          </Text>
        </Box>
        {/* Top part of the navbar end  */}


        {/* Middle part of the navbar start */}
        <Box backgroundColor={"white"} w={"100%"}>
          {/*  cursor="pointer" onMouseEnter={() => setIsOpen(false)} */}
          <HStack>
            <Box w="10%">
              <Link to="/" >
                <Image pt={"30px"} pb={"10px"} pl={"20px"} pr={"20px"}
                  src={Cleardekhologo} alt="logo" w="100%" h="100%" />
              </Link>
            </Box>
            <HStack className="middleNav1">

              <Box w={["20%", "", "", "", "11%"]} h="100%" p={"8pt"}>
                <HStack fontSize="18px" w={"100%"} fontWeight="bold" display={"flex"}
                  justifyContent={"center"} >
                  <MdWifiCalling3 fontSize={"25px"} />
                  <Text mt={"10pt"}>1800-111-111</Text>
                </HStack>
              </Box>

              <Box className="middleNavSearch">

                <Input placeholder="What are you looking for" border="1px solid black" w="95%"
                  fontSize="20px" h="60px" id="userSearch" value={query}
                  onChange={handleInputChange} />

                <Box ml={"17pt"} id="inputContent" border={"3px solid lightgrey"}
                  backgroundColor={"white"} display={"none"} position={"absolute"} top={"4.4rem"}
                  h={"20rem"} w={"95%"} overflowY={"auto"}>
                  <UnorderedList backgroundColor={"whitesmoke"} textAlign={"start"}
                    listStyleType={"none"} ml={0} display={"flex"}
                    flexDirection={"column"} justifyContent={"space-between"} w={"100%"} p={"5pt"}>

                    {filteredData.map(items =>
                      <ListItem p={"5pt"} h={"35pt"} display={"flex"}
                        borderBottom={"2px solid lightgrey"} alignItems={"center"} fontSize={["17pt", "", "", "", ""]}>
                        <Link to={"/eyeglasses"} style={{ textDecoration: "none", color: "black" }}>
                          {items.title}
                        </Link>
                      </ListItem>
                    )}

                  </UnorderedList>
                </Box>
              </Box>

              <HStack className="middleNavButtons">

                <Button fontSize={"16pt"} variant={"unstlyed"} _focus={{ border: "none", outline: "none" }} className="middleNavButton" bg={"white"} _hover={{ bg: "white" }}>
                  Track Order
                </Button>

                {isAuth === true ? (
                  <>
                    <Menu >
                      <MenuButton border={"transparent"} display={"flex"} width={"25%"} backgroundColor={"transparent"}
                        _hover={{
                          backgroundColor: "transparent"
                        }} as={Button} fontSize={"14pt"} p={"0pt"} alignItems={"center"} justifyContent={"space-between"} variant={"unstlyed"} _focus={{ border: "none", outline: "none" }}>

                        {userdata.name || googleUserData.name}  <TriangleDownIcon fontSize={"12pt"} />

                      </MenuButton>
                      <MenuList boxShadow={"rgba(0, 0, 0, 0.24) 0px 5px 15px"} outline={"none"}>
                        <MenuItem variant={"unstlyed"} _focus={{ border: "none", outline: "none" }} outline={"none"} fontSize={"13pt"} fontWeight={"500"}
                          onClick={() => {
                            localStorage.removeItem("auth");
                            localStorage.removeItem("userData");
                            localStorage.removeItem("userAccessToken");
                            localStorage.removeItem("chakra-ui-color-mode");
                            localStorage.removeItem("googleUserData");
                            localStorage.removeItem("googleAccessToken")
                            logout();
                            showToastMessage();
                            setTimeout(() => {
                              navigate("/");
                            }, 1000);
                          }}>Sign out</MenuItem>
                      </MenuList>
                    </Menu>
                  </>
                ) : (
                  <Button fontSize={"16pt"} variant={"unstlyed"} _focus={{ border: "none", outline: "none" }} className="middleNavButton" bg={"white"} _hover={{ bg: "white" }}>
                    <Login /> & <Signup />
                  </Button>
                )}

                <Button fontSize={"16pt"} variant={"unstlyed"} _focus={{ border: "none", outline: "none" }}
                  className="middleNavButton" _hover={{ bg: "white" }} bg={"white"}
                  leftIcon={<>
                    <CiHeart style={{ fontSize: "25pt", color: "#333368" }} />
                    {wishlistData.length !== 0 ?
                      <sup>
                        <Badge backgroundColor={"#329C92"} color={"white"} display={"flex"} alignItems={"center"}
                          position={"absolute"} top={"-12pt"} left={"-16pt"} borderRadius={"90%"} height={"1.8em"}
                          fontSize={"16pt"} width={"1.8em"} justifyContent={"center"} fontWeight={"500"}>
                          {(wishlistData.length !== 0) ? wishlistData.length : ""}
                        </Badge>
                      </sup>
                      : ""}
                  </>}
                  onClick={onOpen} fontWeight={"600"}>
                  Wishlist
                </Button>
                <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent height={["80vh", "50rem"]} overflowY={"auto"} overflowX={"hidden"}
                    position={"relative"} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                    <ModalHeader textColor={"white"} width={["100%", "82.6%","58.2%","10%","19.5%"]} top={""} backgroundColor={"#333333"} mb={"20pt"} position={"fixed"} zIndex={999}>
                      Products ({wishlistData.length})
                    </ModalHeader>
                    <ModalCloseButton textColor={"white"} zIndex={999} fontSize={"15pt"} position={"sticky"} left={"90%"} top={"10pt"} />
                    <ModalBody pb={"50pt"} mt={"22pt"} gap={"10pt"}>
                      {(wishlistData.length > 0) ? wishlistData.map((datass) => (

                        <Box p={"6pt"} display={["flex"]} mt={"10pt"} key={datass._id} h={["40vh", "20vh"]} alignItems={["", "center"]}
                          w={["100%", "100%"]} flexDirection={['column', 'row']} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px;'}
                          justifyContent={'space-between'}>
                          <Box h={["20vh", "80%"]} w={["100%", "30%"]} p={"2pt"} display={["flex"]} justifyContent={["center", ""]}>
                            <Link to={`/eyeglasses/${datass.productId}`} style={{ textDecoration: "none" }}>
                              <Image src={datass.image} objectFit={"contain"} h={["100%", "100%"]} w={["100%", "100%"]} />
                            </Link>
                          </Box>
                          <Box height={['90%', "100%"]} width={["100%", "80%"]} display={"flex"} flexDirection={"column"}
                            alignItems={"center"} justifyContent={"center"} padding={["0", "8pt"]}>
                            <VStack w={["100%"]} display={"flex"} flexDirection={["row", "row"]} justifyContent={"space-between"}
                              alignItems={["center", "center"]} p={["4pt", ""]} h={["50%", "20%"]}>
                              <Link to={`/eyeglasses/${datass.productId}`} style={{ textDecoration: "none", color: "black" }}>
                                <Text fontSize={["14pt", "15pt"]} fontWeight={"400"} textAlign={"left"}>{datass.title}</Text>
                              </Link>
                              <HStack>
                                <Text fontWeight={'500'} fontSize={["154t", "15pt"]}>Rs. {datass.price}</Text>
                              </HStack>
                            </VStack>
                            <VStack zIndex={9} w={['100%']} p={"4pt"} height={["50%", "30%"]} display={"flex"} justifyContent={"center"}
                              alignItems={"left"} gap={"12pt"}>
                              <Button onClick={() => handleDelete(datass.productId)} width={["6rem", "6rem"]}>
                                <DeleteIcon /> Remove
                              </Button>

                            </VStack>
                          </Box>
                        </Box>
                      )) :
                        <Box p={"6pt"} display={["flex"]} key={datass._id} h={["100%"]}
                          alignItems={["", "center"]} w={["97%", "100%"]} flexDirection={['column', 'row']}
                          justifyContent={'center'} fontSize={"18pt"}>
                          Items not added to wishlist
                        </Box>

                      }
                    </ModalBody>
                  </ModalContent>
                </Modal>

                <Button variant={"unstlyed"} _focus={{ border: "none", outline: "none" }} outline={"none"}
                  fontSize={"16pt"} className="middleNavButton" _hover={{ bg: "white", color: "black" }} position={"relative"}
                  leftIcon={
                    <>
                      <HiOutlineShoppingBag style={{ fontSize: "25pt" }} />
                      {cart.length !== 0 ?
                        <sup>
                          <Badge backgroundColor={"#329C92"} color={"white"} display={"flex"} alignItems={"center"}
                            position={"absolute"} top={"-12pt"} left={"-16pt"} borderRadius={"90%"} height={"1.8em"}
                            fontSize={"16pt"} width={"1.8em"} justifyContent={"center"} fontWeight={"500"}>
                            {(cart.length !== 0) ? cart.length : ""}
                          </Badge>
                        </sup>
                        : ""}
                    </>
                  } bg={"white"} onClick={() => navigate("/cart")}>
                  {/*<CgShoppingCart  />   // Cart route */}
                  Cart
                </Button>

              </HStack>

            </HStack>
          </HStack>
        </Box>
        {/* Middle part of the navbar end */}

        {/* Lower part of navbar start  */}
        <Box width={"100%"} bg="#fbf9f7" p={2.5} height={"5rem"} marginBottom={"2pt"} display={"flex"}
          flexDirection={"column"} justifyContent={"center"} >

          <Flex className="lowerNav">
            <Flex className="lowerNav1">
              <Menu>
                {/* isOpen={isOpen} onClose={() => setIsOpen(false)} */}
                <MenuButton className="menuButtons" variant={"unstlyed"} _focus={{ border: "none", outline: "none" }}>
                  EYEGLASSES
                </MenuButton>

                <MenuList color="blackAlpha.900" h="420px" bg="white" w="95vw" p="5" zIndex={1200}>
                  <Box>
                    <Grid gridTemplateColumns="repeat(6, 1fr)" w="100%" h={"100%"}>
                      <Flex direction="column" justifyContent="space-between" mt="20" cursor={"default"}>
                        <Flex gap="5" fontSize="15px" display={"flex"} alignItems={"center"}>
                          <Avatar name="Male Avatar" src="https://static.lenskart.com/media/desktop/img/men_pic.png" alt="men"
                            size="md" />
                          <Box fontSize="lg" fontWeight="bold" >
                            Men
                          </Box>
                        </Flex>

                        <Flex gap="5" display={"flex"} alignItems={"center"}>
                          <Avatar name="women avatar" src="https://static.lenskart.com/media/desktop/img/women_pic.png" alt="women" size="md" />
                          <Box fontSize="lg" fontWeight="bold" >
                            Women
                          </Box>
                        </Flex>

                        <Flex gap="5" display={"flex"} alignItems={"center"}>
                          <Avatar name="Kids avatar" src="https://static.lenskart.com/media/desktop/img/kid_pic.png" alt="kid" size="md" />
                          <Box fontSize="lg" fontWeight="bold">
                            Kids
                          </Box>
                        </Flex>
                      </Flex>

                      <Flex direction="column" gap="6" cursor={"default"} textAlign={"start"}>
                        <Box fontSize="15pt" fontWeight="bold" borderBottom="1px solid black" p="1">
                          SELECT CATEGORY
                        </Box>
                        <Box cursor={"pointer"} fontSize={"15pt"} _hover={{ fontWeight: "bold" }} textDecoration={"none"} >
                          <Link to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}>
                            CLASSIC EYE-GLASSES
                            <p>
                              Starting From ₹ <span>1000</span>
                            </p>
                          </Link>
                        </Box>
                        <Box fontSize="15pt" cursor={"pointer"} _hover={{ fontWeight: "bold" }}>
                          <Link to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}>
                            PREMIUM EYE-GLASSES
                            <p>
                              Starting From ₹ <span>3200</span>
                            </p>
                          </Link>
                        </Box>
                        <Box fontSize="15pt" color={"black"} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                          <Link to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}>
                            COMPUTER EYE-GLASSES
                            <p>
                              Starting From ₹ <span>599</span>
                            </p>
                          </Link>
                        </Box>
                      </Flex>

                      <Flex direction="column" gap="6" cursor={"default"} textAlign={"start"}>
                        <Box fontSize="15pt" fontWeight="bold" borderBottom="1px solid black" p="1">
                          Our Top Picks
                        </Box>
                        <Flex direction="column" fontSize="14pt" gap="2">
                          <Box color={"black"} _hover={{ fontWeight: "bold" }} onClick={handleEyeglasses} cursor={"pointer"}>
                            {/* <Link to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}> */}
                            New Arrivals
                            {/* </Link> */}
                          </Box>
                          <Box color={"black"} _hover={{ fontWeight: "bold" }} onClick={handleEyeglasses} cursor={"pointer"}>
                            {/* <Link to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}> */}
                            Best Seller
                            {/* </Link> */}
                          </Box>
                          <Box color={"black"} _hover={{ fontWeight: "bold" }} onClick={handleEyeglasses} cursor={"pointer"}>
                            {/* <Link to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}> */}
                            Lenskart BLU lenses
                            {/* </Link> */}
                          </Box>
                          <Box color={"black"} _hover={{ fontWeight: "bold" }} onClick={handleEyeglasses} cursor={"pointer"}>
                            {/* <Link to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}> */}
                            Trending
                            {/* </Link> */}
                          </Box>
                          <Box color={"black"} _hover={{ fontWeight: "bold" }} onClick={handleEyeglasses} cursor={"pointer"}>
                            {/* <Link to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}> */}
                            Tinted Eyeglasses
                            {/* </Link> */}
                          </Box>
                          <Box color={"black"} _hover={{ fontWeight: "bold" }} onClick={handleEyeglasses} cursor={"pointer"}>
                            {/* <Link to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}> */}
                            Computer Eyeglasses
                            {/* </Link> */}
                          </Box>
                          <Box color={"black"} _hover={{ fontWeight: "bold" }} onClick={handleEyeglasses} cursor={"pointer"}>
                            {/* <Link to="/eyeglasses" color={"black"} style={{ textDecoration: "none", color: "black" }}> */}
                            Progressive Eyeglasses
                            {/* </Link> */}
                          </Box>
                        </Flex>
                      </Flex>

                      <Flex direction="column" gap="6" cursor={"default"} textAlign={"start"}>
                        <Box cursor={"default"} fontSize="15pt" fontWeight="bold" borderBottom="1px solid black" p="1">
                          Frame Type
                        </Box>
                        <Flex direction="column" fontSize="14pt" gap="2">
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Wayfarer Frames
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Rectangle Frames
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Round Frames
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Aviator Frames
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Cat-Eye Frames
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Rimless Frames
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Half Rim Frames
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Geometric Frames{" "}
                          </Box>
                        </Flex>
                      </Flex>

                      <Flex direction="column" gap="6" cursor={"default"} textAlign={"start"}>
                        <Box fontSize="15pt" fontWeight="bold" borderBottom="1px solid black" p="1">
                          Collection</Box>
                        <Flex direction="column" fontSize="14pt" gap="1">
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Crystal Clear
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Gradient
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Sleek Steel
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Switch-Magnetic Clips-On
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Air Flex
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Air Wrap
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Classic Acetate
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Series A
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Indian Accent
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Float Pop
                          </Box>
                        </Flex>
                      </Flex>

                      <Flex direction="column" gap="6" cursor={"default"} textAlign={"start"}>
                        <Box fontSize="15pt" fontWeight="bold" borderBottom="1px solid black" p="1">
                          Brands
                        </Box>
                        <Flex direction="column" fontSize="15pt" gap="2" >
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Vincent Chase
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Lenskart Air
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            John Jacobs
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            OJOS
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            New Balance
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Carrera
                          </Box>
                          <Box color={"black"} onClick={handleEyeglasses} _hover={{ fontWeight: "bold" }} cursor={"pointer"}>
                            Fossil
                          </Box>
                        </Flex>
                      </Flex>
                    </Grid>
                  </Box>

                </MenuList>
              </Menu>

              <Menu>
                <MenuButton className="menuButtons" variant={"unstlyed"} _focus={{ border: "none", outline: "none" }}>
                  SCREEN GLASSES
                </MenuButton>

                <MenuList color="blackAlpha.900" cursor={"default"} h="400px" bg="white" w="95vw" p="5" zIndex={1200}>
                  {/*   onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)} */}

                  <Box h={"100%"} w={"100%"} cursor={"default"}>
                    <Grid gridTemplateColumns="repeat(5, 1fr)" w="100%">
                      <Flex pl={"14pt"} direction="column" gap="4" justifyContent="space-evenly" mt="20">
                        <Flex gap="5" alignItems={"center"} >
                          <Avatar name="Men avatar" alt="men" size="md"
                            src="https://static.lenskart.com/media/desktop/img/men_pic.png" />
                          <Box fontSize="16pt" fontWeight="bold" onClick={handleEyeglasses}>
                            Men
                          </Box>
                        </Flex>

                        <Flex gap="5" alignItems={"center"}>
                          <Avatar name="Women avatar" alt="women" size="md"
                            src="https://static.lenskart.com/media/desktop/img/women_pic.png" />
                          <Box fontSize="16pt" fontWeight="bold" onClick={handleEyeglasses}>
                            Women
                          </Box>
                        </Flex>

                        <Flex gap="5" alignItems={"center"} >
                          <Avatar
                            name="kids"
                            src="https://static.lenskart.com/media/desktop/img/kid_pic.png"
                            alt="kid"
                            size="md"
                          />
                          <Box fontSize="16pt" fontWeight="bold" onClick={handleEyeglasses}>
                            Kids
                          </Box>
                        </Flex>
                      </Flex>

                      <Flex direction="column" gap="6" textAlign={"start"}>
                        <Box fontSize="15pt" fontWeight="bold" borderBottom="1px solid black" p="1">
                          SELECT CATEGORY
                        </Box>

                        <Box _hover={{ bg: "blackAlpha.200" }} cursor={"pointer"} fontSize="17pt">
                          Blu 0 Computer Glasses
                          <p onClick={handleEyeglasses}>
                            Starting From ₹ <span>1299</span>
                          </p>
                        </Box>
                        <Box _hover={{ bg: "blackAlpha.200" }} cursor={"pointer"} fontSize="17pt">
                          PREMIUM RANGE
                          <p onClick={handleEyeglasses}>
                            Starting From ₹ <span>3000</span>
                          </p>
                        </Box>
                      </Flex>
                    </Grid>
                  </Box>

                </MenuList>
              </Menu>

              <Menu>
                <MenuButton className="menuButtons" variant={"unstlyed"} _focus={{ border: "none", outline: "none" }}>
                  KIDS GLASSES
                </MenuButton>

                <MenuList color="blackAlpha.900" cursor={"default"} h="400" bg="white" w="95vw"
                  zIndex={1200}>

                  <Box display={"flex"} p={"20pt"} justifyContent={"center"} alignItems={"center"} h={"100%"} userSelect={"none"} >

                    <Grid gridTemplateColumns="repeat(3, 1fr)" width={"80%"} p={"15pt"} display={"flex"}
                      justifyContent={"space-between"} >
                      <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"} p={"10pt"} bg="whiteAlpha.900" h="250px" w="240px" >
                        <img width={"170pt"} onClick={handleEyeglasses} style={{ cursor: "pointer" }}
                          className="navImg1"
                          src="https://static1.lenskart.com/media/desktop/img/May22/glasses.jpg"
                          alt="kidsIcon_1"
                        />
                        <Box _hover={{ fontWeight: "bold" }} mt="10px" fontSize="lg" cursor={"pointer"} onClick={handleEyeglasses}>
                          Eye Glasses
                        </Box>
                      </Box>
                      <Box bg="whiteAlpha.900" h="250px" w="270px" display={"flex"} flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"} p={"10pt"} >
                        <img className="navImg2" width={"170pt"} onClick={handleEyeglasses} style={{ cursor: "pointer" }}
                          src="https://static1.lenskart.com/media/desktop/img/May22/computer-glasses.jpg"
                          alt="kidsIcon_2" />

                        <Box _hover={{ fontWeight: "bold" }} w={"100%"} cursor={"pointer"} textAlign="center" fontSize="lg" onClick={handleEyeglasses}>
                          Zero Power Computer Glasses
                        </Box>
                      </Box>
                      <Box bg="whiteAlpha.900" h="250px" w="240px" display={"flex"} flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"} p={"10pt"} >

                        <img className="navImg2" width={"170pt"} onClick={handleSunglases} style={{ cursor: "pointer" }}
                          src="https://static1.lenskart.com/media/desktop/img/May22/Sunnies.jpg"
                          alt="kidsIcon_3" />

                        <Box _hover={{ fontWeight: "bold" }} mt="10px" textAlign="center" cursor={"pointer"} fontSize="lg" onClick={handleSunglases}>
                          Sun Glasses
                        </Box>
                      </Box>
                    </Grid>
                  </Box>

                </MenuList>
              </Menu>

              <Menu>
                <MenuButton className="menuButtons" variant={"unstlyed"} _focus={{ border: "none", outline: "none" }}>
                  CONTACT LENSES
                </MenuButton>

                <MenuList color="blackAlpha.900" cursor={"default"} h="400px" bg="white" p="5" w="95vw"
                  zIndex={1200} >
                  <Box>
                    <Grid gridTemplateColumns="repeat(5, 1fr)" p="3" w="100%" textAlign={"start"}>
                      <Flex direction="column" gap="6">
                        <Box fontSize="md" fontWeight="bold" borderBottom="1px solid black" p="1">
                          Brands
                        </Box>
                        <Flex direction="column" gap="1" fontSize="15pt">
                          <Box _hover={{ fontWeight: "bold" }}>
                            <Link _hover={{ fontWeight: "bold" }} to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}>
                              Aqualens
                            </Link>
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }}>
                            <Link to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}>
                              Bausch Lomb
                            </Link>
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }}>
                            <Link to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}>
                              Johnson & Johnson
                            </Link>
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }}>
                            <Link to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}>
                              Soflens
                            </Link>
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }}>
                            <Link to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}>
                              Acuvue
                            </Link>
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }}>
                            <Link to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}>
                              Iconnect
                            </Link>
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }}>
                            <Link to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}>
                              Alcon
                            </Link>
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }}>
                            <Link to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}>
                              Air Optix
                            </Link>
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }}>
                            <Link to="/eyeglasses" style={{ textDecoration: "none", color: "black" }}>
                              Pure Vision
                            </Link>
                          </Box>
                        </Flex>
                      </Flex>

                      <Flex direction="column" gap="6">
                        <Box fontSize="md" fontWeight="bold" borderBottom="1px solid black" p="1">
                          Explore by Disposability
                        </Box>
                        <Flex direction="column" fontSize="15pt" gap="2">
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleLens}>
                            Monthly
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleLens}>
                            Day & Night
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleLens}>
                            Daily
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleLens}>
                            Yearly
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleLens}>
                            Bi-weekly
                          </Box>
                        </Flex>
                      </Flex>

                      <Flex direction="column" gap="6">
                        <Box fontSize="md" fontWeight="bold" borderBottom="1px solid black" p="1">
                          Explore by Power
                        </Box>
                        <Flex direction="column" fontSize="15pt" gap="2">
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleLens}>
                            Spherical - (CYL 0.5)
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleLens}>
                            Spherical + (CYL 0.5)
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleLens}>
                            Cylindrical Power (0.75)
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleLens}>
                            Toric Power
                          </Box>
                        </Flex>
                      </Flex>

                      <Flex direction="column" gap="6">
                        <Box fontSize="md" fontWeight="bold" borderBottom="1px solid black" p="1">
                          Explore by Colors
                        </Box>
                        <Flex direction="column" fontSize="15pt" gap="2">
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleLens}>
                            Green
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleLens}>
                            Blue
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleLens}>
                            Brown
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleLens}>
                            Turquoise
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleLens}>
                            View all colors
                          </Box>
                        </Flex>
                      </Flex>

                      <Flex direction="column" gap="6">
                        <Box fontSize="md" fontWeight="bold" borderBottom="1px solid black" p="1">
                          Solution
                        </Box>
                        <Flex direction="column" fontSize="15pt" gap="2">
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleLens}>
                            Small
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleLens}>
                            Large
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleLens}>
                            View all solutions
                          </Box>
                        </Flex>
                      </Flex>
                    </Grid>
                  </Box>
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton className="menuButtons" variant={"unstlyed"} _focus={{ border: "none", outline: "none" }}>
                  SUN GLASSES
                </MenuButton>

                <MenuList cursor={"default"} color="blackAlpha.900" h="400px" bg="white" w="999pt" p="5" zIndex={1200} >

                  <Box>
                    <Grid gridTemplateColumns="repeat(6, 1fr)" textAlign={"start"} gap={"5pt"}>
                      <Flex direction="column" justifyContent="space-evenly" cursor={"default"}>
                        <Flex gap="5" alignItems={"center"} >
                          <Avatar
                            name="men avatar" alt="men" size="md"
                            src="https://static.lenskart.com/media/desktop/img/men_pic.png" />
                          <Box fontSize="md" fontWeight="bold" >
                            Men
                          </Box>
                        </Flex>

                        <Flex gap="5" mt="-40%" alignItems={"center"}>
                          <Avatar name="female avatar" alt="women" size="md"
                            src="https://static.lenskart.com/media/desktop/img/women_pic.png"
                          />
                          <Box fontSize="md" fontWeight="bold">
                            Women
                          </Box>
                        </Flex>
                      </Flex>

                      <Flex direction="column" gap="6">
                        <Box fontSize="14.5pt" fontWeight="bold" borderBottom="1px solid black" p="1">
                          SELECT CATEGORY
                        </Box>
                        <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} fontSize="md" onClick={handleSunglases}>
                          CLASSIC SUNGLASSES
                          <p>
                            Starting From ₹ <span>1299</span>
                          </p>
                        </Box>
                        <Box _hover={{ fontWeight: "400" }} cursor={"pointer"} fontSize="md" >
                          PREMIUM SUNGLASSES
                          <p>
                            Starting From ₹ <span>2500</span>
                          </p>
                        </Box>
                      </Flex>

                      <Flex direction="column" gap="6">
                        <Box fontSize="15pt" fontWeight="bold" borderBottom="1px solid black" p="1" >
                          Our Top Picks
                        </Box>
                        <Flex direction="column" fontSize="14pt" gap="2">
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>
                            New Arrivals
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>
                            Best Seller
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>
                            Pilot Style
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>
                            Power Sunglasses
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>
                            Polarized Sunglasses
                          </Box>
                        </Flex>
                      </Flex>

                      <Flex direction="column" gap="6">
                        <Box fontSize="15pt" fontWeight="bold" borderBottom="1px solid black" p="1" >
                          Shape
                        </Box>
                        <Flex direction="column" fontSize="14pt" gap="2">
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>Aviator</Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>Rounders</Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>Wayfarer</Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>Rectangle</Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>Hexagon</Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>Cat-Eye</Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>
                            Clubmaster
                          </Box>
                        </Flex>
                      </Flex>

                      <Flex direction="column" gap="6">
                        <Box fontSize="15pt" fontWeight="bold" borderBottom="1px solid black" p="1" >
                          Colections
                        </Box>
                        <Flex direction="column" fontSize="14pt" gap="2">
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>Glam Slam</Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>Havana</Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>Polarized</Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>
                            Power Sunglasses
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>
                            Designer Sunglasses
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>
                            Reflectors
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>Marble</Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>Tinted</Box>
                        </Flex>
                      </Flex>

                      <Flex direction="column" gap="6">
                        <Box fontSize="15pt" fontWeight="bold" borderBottom="1px solid black" p="1" >
                          Brand
                        </Box>
                        <Flex direction="column" fontSize="14pt" gap="2">
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>
                            Vincent Chase
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>
                            John Jacobs
                          </Box>
                          <Box _hover={{ fontWeight: "bold" }} cursor={"pointer"} onClick={handleSunglases}>OJOS</Box>
                        </Flex>
                      </Flex>
                    </Grid>
                  </Box>
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton className="menuButtons" variant={"unstlyed"} _focus={{ border: "none", outline: "none" }}>
                  HOME EYE-TEST
                </MenuButton>

                <MenuList color="blackAlpha.900" h="400px" bg="white" w="100%" zIndex={1200}>
                  <Box>
                    <Grid gridTemplateColumns="repeat(2, 1fr)">
                      <Box>
                        <Image
                          h="100%" w="100%" alt="doctor_img"
                          src="https://static1.lenskart.com/media/desktop/img/HomeTryOut.png" />
                      </Box>
                      <Box>
                        <Box m="auto">
                          <Heading color="black" fontWeight="" fontSize="5xl" fontFamily="sans-serif"
                            textAlign="center" mt="10%">
                            Get your eyes checked <br />
                            <span>at home</span>
                          </Heading>
                          <Text color="black" fontSize="lg" fontWeight="400" textAlign="center"
                            mt="2%" >
                            A certified refractionist will visit you with
                          </Text>
                          <Text color="black"
                            fontSize="lg" fontWeight="400"
                            textAlign="center" mt="2%"  >
                            latest eye testing machines & 100 trail frames
                          </Text>
                          <Button
                            colorScheme="black"
                            variant="outline"
                            bg="whiteAlpha.900"
                            rounded="50px"
                            p="7"
                            fontSize="18px"

                            ml="10%"
                            _hover={{ bg: "#020043", color: "white" }}
                          >
                            Book appointment
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Box>
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton className="menuButtons" variant={"unstlyed"} _focus={{ border: "none", outline: "none" }}>
                  STORE LOCATOR
                </MenuButton>

                <MenuList color="blackAlpha.900" h="400px" bg="white" w="100%" p="5" zIndex={1200}>
                  <Grid gridTemplateColumns="repeat(2, 1fr)" gap={"50px"}>
                    <Box>
                      <Heading color="black" fontWeight="" fontSize="50px" fontFamily="sans-serif"
                        textAlign="center" mt="15%">
                        Over 1100+ Lenskart Store
                      </Heading>
                      <Box
                        color="black"
                        fontSize="15px"
                        textAlign="center"
                        mt="6%"
                      >
                        Experience eyewear in a whole new way: Visit your
                        nearest store
                      </Box>
                      <Box
                        color="black"
                        fontSize="15px"
                        textAlign="center"
                        mt="1.5%"
                      >
                        and treat yourself to 5000+ eyewear styles.
                      </Box>
                      <Button
                        colorScheme="black"
                        variant="outline"
                        bg="whiteAlpha.900"
                        rounded="50px"
                        p="6"
                        fontSize="15px"
                        mt="10"
                        ml="30%"
                        _hover={{ bg: "#020043", color: "white" }}
                      >
                        Locate a store
                      </Button>
                    </Box>
                    <Flex mt="30%" fontSize="14px" fontWeight="600">
                      <Box>
                        <Image
                          h=""
                          w=""
                          src="https://static.lenskart.com/media/desktop/img/Delhi1.png"
                          alt="Delhi"
                        ></Image>
                        <Text mt="-8px" ml="22px">
                          Delhi
                        </Text>
                      </Box>
                      <Box>
                        <Image
                          h=""
                          w=""
                          src="https://static.lenskart.com/media/desktop/img/Banglore1.png"
                          alt="Banglore"
                        ></Image>
                        <Text mt="-8px" ml="15px">
                          Banglore
                        </Text>
                      </Box>
                      <Box>
                        <Image
                          h=""
                          w=""
                          src="https://static.lenskart.com/media/desktop/img/Mumbai1.png"
                          alt="Mumbai"
                        ></Image>
                        <Text mt="-8px" ml="15px">
                          Mumbai
                        </Text>
                      </Box>
                      <Box>
                        <Image
                          h=""
                          w=""
                          src="https://static.lenskart.com/media/desktop/img/Ahmedabad1.png"
                          alt="Ahemdabad"
                        ></Image>
                        <Text mt="-8px" ml="10px">
                          Ahmedabad
                        </Text>
                      </Box>
                      <Box>
                        <Image
                          h=""
                          w=""
                          src="https://static.lenskart.com/media/desktop/img/Chennai1.png"
                          alt="Chennai"
                        ></Image>
                        <Text mt="-8px" ml="15px">
                          Chennai
                        </Text>
                      </Box>
                      <Box>
                        <Image
                          h=""
                          w=""
                          src="https://static.lenskart.com/media/desktop/img/Hyderabad1.png"
                          alt="Hyderabad"
                        ></Image>
                        <Text mt="-8px" ml="15px">
                          Hyderabad
                        </Text>
                      </Box>
                      <Box>
                        <Image
                          h=""
                          w=""
                          src="https://static.lenskart.com/media/desktop/img/Cities1.png"
                          alt="+100_cities"
                        ></Image>
                        <Text mt="-8px" ml="15px">
                          +100 cities
                        </Text>
                      </Box>
                    </Flex>
                  </Grid>
                </MenuList>
              </Menu>
              {userdata.role === "admin" ? <Link to={'/admindashboard'} style={{
                color: "#000042", fontSize: "21px", fontWeight: "600", textDecoration: "none"
              }}>ADMIN</Link> : null}
            </Flex>

            <HStack w="20%" justifyContent="right" padding={"20pt"}>
              <Link to={"/eyeglasses"}>
                <Image
                  src="https://static1.lenskart.com/media/desktop/img/May22/3dtryon1.png"
                  alt="img1" w="95px" borderRadius="base" />
              </Link>
              <Link to={"/eyeglasses"}>
                <Image
                  src="https://static1.lenskart.com/media/desktop/img/Mar22/13-Mar/blulogo.png"
                  alt="img2" w="95px" borderRadius="base" />
              </Link>
              <Link to={"/"}>
                <Image
                  src="https://static.lenskart.com/media/desktop/img/Feb22/18-Feb/goldlogo.jpg"
                  alt="img3" w={["95px", "", "", "", ""]} borderRadius="base" />
              </Link>
            </HStack>
          </Flex>
        </Box>
        {/* Lower Navbar Completed  */}
      </Box>

      <MobileNav />
    </Box>
  );
};

export default Navbar;