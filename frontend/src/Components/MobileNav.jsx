import React, { useState, useEffect, useRef } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Cleardekhologo from "../Cleardekhologo.png";
import { MdWifiCalling3 } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { HiShoppingBag } from "react-icons/hi";
import { addWishListItems } from "../redux/wishlistReducer/wishlistAction";
import { DeleteIcon } from "@chakra-ui/icons";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { CiHeart } from "react-icons/ci";
import {
  DrawerCloseButton, Button, Box, useDisclosure, HStack, Image, Input, Drawer, DrawerHeader,
  DrawerOverlay, DrawerContent, DrawerFooter, DrawerBody, Heading, Avatar, Text, Accordion,
  AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Flex,
  Badge, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, VStack,
} from "@chakra-ui/react";
import Login from "../Pages/login/Login"
import Signup from "../Pages/Signup/Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HompePageitem } from "../Pages/Homepage/HompepageItems";
import { useSelector, useDispatch } from "react-redux";
import { setRouteParams } from "../redux/setRoutes/paramsActions";
import axios from "axios";

const MobileNav = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSunglasses = searchParams.getAll("sun glasses");
  const initialEyeglasses = searchParams.getAll("Eye glasses");
  const [wishlist, setWishlistData] = useState([]);
  const initialLenses = searchParams.getAll("lens");
  const [sunglasses, setSunGlasses] = useState(initialSunglasses || []);
  const [eyeglasses, setEyeGlasses] = useState(initialEyeglasses || []);
  const [lens, setLens] = useState(initialLenses || []);
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const finalRef = useRef();
  const googleUserToken = localStorage.getItem("googleAccessToken");
  let googleUserData = JSON.parse(localStorage.getItem("googleUserData")) || ""
  let userData = JSON.parse(localStorage.getItem("userData")) || "";
  const userID = (userData) ? userData._id : "" || (googleUserData) ? googleUserData._id : "";
  const host = "http://localhost:5000";
  const userAccessToken = localStorage.getItem("userAccessToken");
  const datass = HompePageitem.filter((homey) => {
    return homey.title
  })
  let isAuth = JSON.parse(localStorage.getItem("auth")) || false;
  let userdata = JSON.parse(localStorage.getItem("userData")) || "";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Field = React.useRef();
  const { cart } = useSelector((carts) => {
    return {
      cart: carts.cartReducer.cartItem,
      isLoading: carts.cartReducer.isLoading
    }
  })
  const { wishlistss } = useSelector((wishlist) => {
    return {
      wishlistss: wishlist.wishlistReducer.wishListItem
    }
  })
  const userInfos = {
    userName: (userData) ? userData.name : "" || (googleUserData) ? googleUserData.name : "",
    userID: userID
  };
  const navigate = useNavigate()
  const getwishListData = async () => {
    try {
      const results = await axios.get(`${host}/wishlist`, {
        headers: {
          Authorization: `${userAccessToken} `
        },
        params: userInfos
      })
      if (results.status === 200 && results.data.length > 0) {
        setWishlistData(results.data)
        dispatch(addWishListItems(results.data))
      } else {
        // console.log("item not found")
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleInputChange = e => {
    setQuery(e.target.value);
    const filtered = datass.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredData(filtered);
  };
  const dispatch = useDispatch();
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
  //handleEyeglasses
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
  //handlelens
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

  const handleDelete = async (id) => {
    axios.delete(`${host}/wishlist/delete/${id}`, {
      headers: {
        Authorization: `${userAccessToken}`
      },
    }).then((res) => {
      toast({
        title: "Product removed from cart!!",
        status: "success",
        isClosable: true,
        duration: 4000,
        position: 'top'
      })
      setWishlistData((datas) => datas.filter(items => items._id !== id));
      getwishListData();
    })
  };
  useEffect(() => {
    const params = { sunglasses, eyeglasses, lens }
    setSearchParams(params)
    // dispatch(setRouteParams(params))
  }, [sunglasses, eyeglasses, lens])

  useEffect(() => {
    if (query.length === 0) {
      // console.log(query.length)
      var contents = document.getElementById("inputContent");
      contents.style.display = "none"
    } else {
      // console.log("querys length is more then a 0")
      var content = document.getElementById("inputContent");
      content.style.display = "block"
    }
  }, [])

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const showToastMessage = () => {
    toast.success("Logout Successfull !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const logout = async () => {
    try {
      await fetch(`http://localhost:5000/logout`, { method: "GET", credentials: "include" })
        .then(response => response.json())
        .then(result => {
          console.log("results data to logout : ", result.message);
          window.location.href = '/'
        })
      // cookie.remove("googleAccessCookie")
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  }
  return (
    <Box display={{ lg: "inherit", xl: "none" }} cursor="pointer" bg="#fbf9f7" p={1} >
      <HStack m="auto" gap={"2px"} >
        <Button background={"white"} p="0" onClick={onOpen}>
          <HamburgerIcon fontSize="20px" />
        </Button>
        <Box w={{ lg: "20%", md: "20%", sm: "18%", base: "30%" }}>
          <Link to="/">
            <Image src={Cleardekhologo} alt="logo" w={{
              lg: "75%", md: "100%", sm: "100%", base: "100%"
            }} />
          </Link>
        </Box>
        <Box w="70%" display={{ sm: "inherit", base: "none" }}>
          <Input placeholder="What are you looking for" border="1px solid black" w="90%" h="35px"
            fontSize="16px" id="userSearch" value={query} onChange={handleInputChange} />

        </Box>

        <Box w={{ lg: "20%", md: "20%", sm: "18%", base: "38%" }} display={"flex"}
          justifyContent={"center"} alignItems={"center"}>
          <HStack fontSize={"10px"} w={"100%"} fontWeight="bold" display={"flex"}
            justifyContent={"center"} alignItems={"center"}>
            <MdWifiCalling3 fontSize={["20px"]} />
            <Text mt={"10pt"} fontSize={["7pt", "", "", "", "12pt"]}>1800-111-111</Text>
          </HStack>
        </Box>
        <Box>
          <Box ml={["", "6pt"]} display={"flex"} gridTemplateColumns={"repeat(2,1fr)"} gap={["0pt", "15px"]}
            w={"65pt"} height={"25pt"} alignItems={"center"}>
            <Box w={"50%"} h={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}
              fontSize="15px" p="4% 0%" color="black" _hover={{ fontWeight: "bold" }}>

              {/* <AiFillHeart onClick={onOpen} /> */}
              <CiHeart style={{ fontSize: "22pt", color: "#333368" }} onClick={openModal} />
              {wishlistss.length !== 0 ?
                <sup>
                  <Badge backgroundColor={"#329C92"} color={"white"} display={"flex"} alignItems={"center"}
                    position={"absolute"} top={"-14pt"} left={"-10pt"} borderRadius={"90%"} height={"1.5em"}
                    fontSize={"12pt"} width={"1.5em"} justifyContent={"center"} fontWeight={"500"}>
                    {(wishlistss.length !== 0) ? wishlistss.length : ""}
                  </Badge>
                </sup>
                : ""}
              <Modal finalFocusRef={finalRef} isOpen={isModalOpen} onClose={closeModal} >
                <ModalOverlay />
                <ModalContent height={"50rem"} overflowY={"auto"} overflowX={"hidden"} position={"relative"}>
                  <ModalHeader textColor={"white"} width={"100%"} top={""} backgroundColor={"#333333"} mb={"20pt"}>
                    Products ({wishlistss.length})
                    <ModalCloseButton textColor={"white"} />
                  </ModalHeader>
                  <ModalBody pb={"50pt"}>
                    {(wishlistss.length > 0) ? wishlistss.map((datass) => (

                      <Box p={"6pt"} display={["flex"]} key={datass._id} h={["20vh"]}
                        alignItems={["", "center"]} w={["97%", "100%"]}
                        flexDirection={['column', 'row']} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px;'}
                        justifyContent={'space-between'}>
                        <Box h={["20vh", "80%"]} w={["100%", "30%"]} p={"2pt"} display={["flex"]} justifyContent={["center", ""]}>
                          <Link to={`/eyeglasses/${datass.productId}`} style={{ textDecoration: "none" }}>
                            <Image src={datass.image} objectFit={"contain"} h={["100%", "100%"]} w={["100%", "100%"]} />
                          </Link>
                        </Box>
                        <Box height={['90%', "100%"]} width={["100%", "80%"]} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} padding={["0", "8pt"]}>
                          <VStack w={["100%"]} display={"flex"} flexDirection={["row", "row"]} justifyContent={"space-between"} alignItems={["center", "center"]} p={["4pt", ""]} h={["50%", "20%"]}>
                            <Link to={`/eyeglasses/${datass.productId}`} style={{ textDecoration: "none", color: "black" }}>
                              <Text fontSize={["17pt", "15pt"]} fontWeight={"400"} textAlign={"left"}>{datass.title}</Text>
                            </Link>
                            <HStack>
                              <Text fontWeight={'500'} fontSize={["15pt", "15pt"]}>Rs. {datass.price}</Text>
                            </HStack>
                          </VStack>
                          <VStack w={['100%']} p={"4pt"} height={["50%", "30%"]} display={"flex"} justifyContent={"center"} alignItems={"left"} gap={"12pt"}>
                            <Button onClick={() => handleDelete(datass._id)} width={["6rem", "6rem"]}><DeleteIcon />Remove</Button>

                          </VStack>
                        </Box>
                      </Box>
                    )) : ""}

                  </ModalBody>
                </ModalContent>
              </Modal>

            </Box>
            <Box fontSize="15px" h={"100%"} w={"45%"} display={"flex"} justifyContent={"center"}
              alignItems={"center"} color="black" _hover={{ fontWeight: "bold", color: "black" }} position={"relative"}>
              <Link to="/cart" style={{ color: "black", textDecoration: "none" }}>
                {/* <HiShoppingBag /> */}
                <HiOutlineShoppingBag style={{ fontSize: "20pt", fontWeight: "400" }} />
              </Link>
              {cart.length !== 0 ?
                <sup>
                  <Badge backgroundColor={"#329C92"} color={"white"} display={"flex"} alignItems={"center"}
                    position={"absolute"} top={"-14pt"} left={"-12pt"} borderRadius={"90%"} height={"1.5em"}
                    fontSize={"12pt"} width={"1.5em"} justifyContent={"center"} fontWeight={"500"}>
                    {(cart.length !== 0) ? cart.length : ""}
                  </Badge>
                </sup>
                : ""}
            </Box>
          </Box>
          <Drawer size="xs" isOpen={isOpen} placement="left" initialFocusRef={Field} onClose={onClose} >
            <DrawerOverlay />
            <DrawerContent color="white" backgroundColor={"#1D3E53"} >
              <DrawerCloseButton />
              <DrawerHeader w={"100%"}
                backgroundColor={"#1D3E53"}
                borderBottom={"2px solid green"} m="1px 0px">
                {/* <Authentication logic  */}
                {isAuth ? (
                  <Flex direction="column" justifyContent="center" alignItems="center" w="100%">
                    <Flex w="100%" justifyContent={"center"}>
                      <Avatar
                        src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png"
                        size="lg" mr="2" />
                      <Flex
                        direction="column"
                        justifyContent="center" alignItems="center">
                        <Text mt="12px" fontSize="20px" color="whitesmoke">
                          {userdata.name || googleUserData.name}
                        </Text>
                        <Text color="gray.500" mt="5%" fontSize="sm">
                          Enjoy Buy 1 Get 1 offer for 365 days
                        </Text>
                      </Flex>
                    </Flex>
                    <Button
                      w="100%" h="35px" mt="5%" colorScheme="blue"
                      fontSize="15px"
                      _hover={{ bg: "blue.400" }}
                    >
                      GET GOLD MEMBERSHIP
                    </Button>
                  </Flex>
                ) : (<Box
                  style={{
                    padding: "5%", display: "flex", flexDirection: "column", justifyContent: "center",
                    alignItems: "center", width: "100%"
                  }}>
                  <Box style={{ width: "100%", display: "flex", gap: "5px", marginBottom: "-6%", }}>
                    <Box bg="#007AFF" p="3px 15px" color={"white"} _hover={{ bg: "blue.200" }}>
                      <Login />
                    </Box>
                    <Box bg="#007AFF" p="3px 15px" color={"white"} _hover={{ bg: "blue.200" }}>
                      <Signup />
                    </Box>
                  </Box>
                </Box>)}
                {userdata.role === "admin" ? <Link to={'/admindashboard'} style={{
                  fontSize: "15px", fontWeight: "600"
                }}>ADMIN</Link> : null}
              </DrawerHeader>
              <DrawerBody borderBottomWidth="1px" backgroundColor={"#1D3E53"}>
                <Box display="flex" flexDirection="column" fontSize="16px">
                  <Link>
                    <Box borderBottom={"2px solid grey"} m="5px 5px" fontSize="15px" p="4% 0%"
                      fontWeight={"500"} color="white" _hover={{ fontWeight: "bold" }}>
                      Contact Us
                    </Box>
                  </Link>
                </Box>

                <Heading mt="15%" color="white" mb="5%" fontSize="15px">
                  HIGHLIGHTS
                </Heading>
                <Box display="flex" flexDirection="column" fontSize="16px">
                  <Link>
                    <Box borderBottom="0.1px solid gray" p="5% 0%" color="white"
                      _hover={{ fontWeight: "bold" }} fontSize="15px">
                      Check Frame Size
                    </Box>
                  </Link>
                  <Link>
                    <Box borderBottom="0.1px solid gray" p="5% 0%" color="white"
                      _hover={{ fontWeight: "bold" }} fontSize="15px" >
                      Gold Membership
                    </Box>
                  </Link>
                  <Link>
                    <Box borderBottom="0.1px solid gray" p="5% 0%" color="white"
                      _hover={{ fontWeight: "bold" }} fontSize="15px">
                      Try Frames in 3D
                    </Box>
                  </Link>
                  <Link>
                    <Box borderBottom="1px solid white" p="5% 0%" color="white"
                      _hover={{ fontWeight: "bold" }} fontSize="15px" >
                      Dowloads Apps
                    </Box>
                  </Link>
                </Box>
                <Heading mt="15%" color="white" fontSize="15px" mb="5%">
                  SHOP NOW
                </Heading>
                <Box display="flex" flexDirection="column" fontSize="16px">
                  <Accordion defaultIndex={[0]} allowMultiple w="100%" m="auto">
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left" fontWeight="500" >
                            Men
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Box>
                          <Text pb="2" onClick={handleEyeglasses}>EYEGLASSES</Text>
                          <Text pb="2" onClick={handleEyeglasses}>COMPUTER GLASSES</Text>
                          <Text pb="2" onClick={handleLens}>CONTACT LENSES</Text>
                          <Text pb="2" onClick={handleSunglases}>SUN GLASSES</Text>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left" fontWeight="500">
                            Women
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={5}>

                        <Box>
                          <Text pb="2" onClick={handleEyeglasses}>EYEGLASSES</Text>
                          <Text pb="2" onClick={handleEyeglasses}>COMPUTER GLASSES</Text>
                          <Text pb="2" onClick={handleLens}>CONTACT LENSES</Text>
                          <Text pb="2" onClick={handleSunglases}>SUN GLASSES</Text>
                        </Box>

                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left" fontWeight="500"  >
                            Kids
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>

                        <Box>
                          <Text pb="2" onClick={handleEyeglasses}>EYEGLASSES</Text>
                          <Text pb="2" onClick={handleEyeglasses}>COMPUTER GLASSES</Text>
                          <Text pb="2" onClick={handleLens}>CONTACT LENSES</Text>
                          <Text pb="2" onClick={handleSunglases}>SUN GLASSES</Text>
                        </Box>

                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
                <Heading mt="15%" color="white" fontSize="15px" mb="5%">
                  Our Services
                </Heading>
                <Box display="flex" flexDirection="column" fontSize="16px">
                  <Link>
                    <Box borderBottom="0.1px solid gray" p="5% 0%" fontSize="15px" color="white"
                      _hover={{ fontWeight: "bold" }}  >
                      Free Home Trail
                    </Box>
                  </Link>
                  <Link>
                    <Box borderBottom="0.1px solid gray" p="5% 0%" color="white"
                      _hover={{ fontWeight: "bold" }} fontSize="15px">
                      Home Eye check-up
                    </Box>
                  </Link>
                  <Link>
                    <Box borderBottom="0.1px solid gray" p="5% 0%" color="white"
                      _hover={{ fontWeight: "bold" }} fontSize="15px" >
                      Store Locator
                    </Box>
                  </Link>
                </Box>

                <Heading mt="15%" color="white" fontSize="15px" mb="5%">
                  INTERNATIONAL
                </Heading>
                <Box display="flex" flexDirection="column" fontSize="16px">
                  <Link>
                    <Box
                      borderBottom="0.1px solid gray" p="5% 0%"
                      color="white" _hover={{ fontWeight: "bold" }} fontSize="15px" >
                      Singapore
                    </Box>
                  </Link>
                  <Link>
                    <Box borderBottom="0.1px solid gray" p="5% 0%" color="white"
                      _hover={{ fontWeight: "bold" }} fontSize="15px" >
                      USA
                    </Box>
                  </Link>
                  <Link>
                    <Box
                      p="5% 0%" color="white" _hover={{ fontWeight: "bold" }} fontSize="15px">
                      UAE
                    </Box>
                  </Link>
                </Box>

                <Heading mt="15%" color="white" fontSize="15px" mb="5%">
                  FAQ's & POLICIES
                </Heading>
                <Box display="flex" flexDirection="column" fontSize="16px">
                  <Link>
                    <Box
                      borderBottom="0.1px solid gray" p="5% 0%" color="white"
                      _hover={{ fontWeight: "bold" }} fontSize="15px" >
                      Frequently Asked Questions
                    </Box>
                  </Link>
                  <Link>
                    <Box
                      borderBottom="0.1px solid gray"
                      p="5% 0%" color="white" _hover={{ fontWeight: "bold" }} fontSize="15px" >
                      Cancellation & Return Policy
                    </Box>
                  </Link>
                  <Link>
                    <Box p="5% 0%" color="white"
                      _hover={{ fontWeight: "bold" }} fontSize="15px" >
                      Cobrowsing
                    </Box>
                  </Link>
                </Box>

                <Accordion allowMultiple></Accordion>
              </DrawerBody>
              {isAuth && (
                <DrawerFooter bg="#1D3E53" display={"flex"} justifyContent={"center"} alignItems={"center"}>
                  <Button
                    mt="5%" fontSize="18px" colorScheme="blue" p="6% 15%"
                    borderBottom="1px solid #526171" _hover={{ bg: "blue.200" }}
                    onClick={() => {
                      localStorage.removeItem("auth");
                      localStorage.removeItem("userData");
                      localStorage.removeItem("token");
                      localStorage.removeItem("userAccessToken");
                      localStorage.removeItem("googleUserData");
                      localStorage.removeItem("googleAccessToken")
                      logout()
                      showToastMessage();
                      setTimeout(() => {
                        navigate("/");
                      }, 1000);
                    }}>
                    <ToastContainer />
                    Sign Out
                  </Button>
                </DrawerFooter>
              )}
            </DrawerContent>
          </Drawer>
        </Box>
      </HStack>
    </Box>
  );
};

export default MobileNav;