import { useRef } from "react";
import { DeleteIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
    Box, Center, HStack, Image, Text, VStack, useToast, Button, Drawer, DrawerCloseButton, CardBody,
    Input, Card, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure, Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems } from '../../redux/cartReducer/cartAction';
import { ArrowForwardIcon } from "@chakra-ui/icons";
import "../../App.css"

// import { AddIcon } from "@chakra-ui/icons";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function Cart() {
    const [refresh, setRefresh] = useState(false);
    const userAccessToken = localStorage.getItem("userAccessToken");
    const googleUserToken = localStorage.getItem("googleAccessToken");
    const googleUserData = JSON.parse(localStorage.getItem("googleUserData"));
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [cartData, setCartData] = useState([]);
    const toast = useToast();
    const navigate = useNavigate();
    const host = "http://localhost:5000";
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = useRef()

    const [couponData, setCouponData] = useState([]);
    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState(0)


    useEffect(() => {
        dispatch(addCartItems(cartData))
        getData();
        getCoupon();
    }, [refresh])
    const userID = (userData) ? userData._id : "" || (googleUserData) ? googleUserData._id : ""
    const userInfos = {
        userName: (userData) ? userData.name : "" || (googleUserData) ? googleUserData.name : "",
        userID: userID
    }
    const getData = async () => {
        try {
            const results = await axios.get(`${host}/cart`, {
                headers: {
                    Authorization: `${userAccessToken}` || `${googleUserToken}`,
                },
                params: userInfos
            })
            setCartData(results.data, (googleUserData) ? googleUserData.email : userData.email);
            dispatch(addCartItems(results.data));
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleDelete = (id) => {
        axios.delete(`${host}/cart/delete/${id}`, {
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
            getData();
        })

    }
    const handleIncrease = (id) => {
        cartData.map((el) => {
            if (el._id === id) {
                //return {...el,quantity:el.quantity+1}
                axios.put(`${host}/cart/update/${id}`, { quantity: el.quantity + 1 }, {
                    headers: {
                        // Authorization: `${token}`
                        Authorization: `${userAccessToken}`
                    }
                }).then((res) => {
                    setRefresh(!refresh)
                })
            }
        })
    }
    const handleDecrease = (id) => {
        cartData.map((el) => {
            if (el._id === id) {
                //return {...el,quantity:el.quantity+1}
                axios.put(`${host}/cart/update/${id}`, { quantity: el.quantity - 1 }, {
                    headers: {
                        // Authorization: `${token}`
                        Authorization: `${userAccessToken || googleUserToken}`
                    }
                }).then((res) => {
                    setRefresh(!refresh)
                })
            }

        })
    }

    const { cart } = useSelector((carts) => {
        return {
            cart: carts.cartReducer.cartItem,
            isLoading: carts.cartReducer.isLoading
        }
    })
    // const totalPrice = cartData.length > 0 ? cartData.reduce((acc, curr) => {
    //     const data = cartData.find(el => el._id === curr._id)
    //     return acc + (data.price * data.quantity)
    // }, 0) : 0

    const totalPrice = cartData.reduce((acc, curr) => {
        const data = cartData.find(el => el._id === curr._id)
        // console.log(acc, data.price, data.quantity)
        return acc + (data.price * data.quantity)
    }, 0)
    // const orderDetails = {
    //     cartData: cartData,
    //     email: (googleUserData) ? googleUserData.email : userData.email,
    //     total: (discount > 0) ? totalPrice - discount : totalPrice
    // }
    const handleCheckout = async () => {
        const email = (googleUserData) ? googleUserData.email : userData.email;
        const totalAmount = (discount > 0) ? totalPrice - discount : totalPrice;
        const orderDetails = cartData.map(item => ({
            ...item,
            email: email,
            totalAmount: totalAmount
        }));
        try {
            await axios.post(`${host}/orders`, orderDetails).then((res) => {
                axios.delete(`${host}/cart/deletemany`, {
                    headers: { Authorization: `${userAccessToken || googleUserToken}` }, data: { userID: userID }
                })
                    .then((res) => {
                        // alert("Cart emptyed")
                        // console.log("response : ", res);
                    })
                    .catch((err) => {
                        // alert("ERROR")
                        console.log(err.message);
                    })
            })
            navigate('/payment')
        } catch (err) {
            console.log("Error during checkout : ", err)
        }
    }
    const getCoupon = async () => {
        const couponData = await axios.get(`${host}/coupons`);
        setCouponData(couponData.data)
    }
    const applyCoupon = async () => {
        try {
            const couponsResult = await axios.post(`${host}/coupons/apply`, { code })
            const discountValue = couponsResult.data.coupon.discount;
            setDiscount(discountValue)
            toast({
                title: "Coupon is applied !!",
                status: "success",
                isClosable: true,
                duration: 4000,
                position: 'top'
            })
        } catch (error) {
            console.log(error)
        }
    }
    const removeDiscount = async () => {
        try {
            setDiscount(0); // Reset the discount
            toast({
                title: "Coupon removed !!",
                status: "success",
                isClosable: true,
                duration: 4000,
                position: 'top'
            })
        } catch (error) {
            console.error('Error removing coupon:', error);
        }
    }

    if (cartData.length === 0) {
        return (
            <Center h={["93vh", "70vh"]} backgroundColor={"#FBF9F7"}>
                <Text fontWeight={'500'} fontSize={'25pt'}>Your Cart is Empty!!</Text>
            </Center>
        )
    } else {
        return (
            <>
                <Box position={"sticky"} top={"0pt"} height={"60pt"} display={"flex"}
                    justifyContent={"center"} alignItems={"center"} width={"100%"} backgroundColor={"#FBF9F7"}>
                    <Text fontWeight={'500'} fontSize={'3xl'}>
                        Total Payable  ₹{(discount > 0) ? totalPrice - discount : totalPrice}
                    </Text>
                </Box>

                <Box className="cartMain">
                    <Box className="cartmain1">
                        {cartData.map((el) => (
                            // <SimpleGrid key={el._id} m={'10px'}w={["100%",""]} p={['5px']} border={"2px solid red"} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px;'}>
                            <Box className="cartInfo" key={el._id} >
                                <Box className="cartInfo1" >
                                    <Link to={`/eyeglasses/${el.productId}`} style={{ textDecoration: "none" }}>
                                        <Image src={el.image} objectFit={"cover"} h={["100%", "100%"]} w={["100%", "100vw"]} />
                                    </Link>
                                </Box>
                                <Box className="cartInfo2">
                                    <VStack w={["100%"]} display={"flex"} flexDirection={["row", "row"]} justifyContent={"space-between"} alignItems={"center"} h={["50%", "40%", "50%", "30%", "45%"]} padding={"5pt"}>
                                        <Link to={`/eyeglasses/${el.productId}`} style={{ textDecoration: "none", color: "black" }}>
                                            <Text fontSize={["15pt", "18pt", "17pt", "14pt", "20pt"]} fontWeight={"500"} textAlign={"left"}>{el.title}</Text>
                                        </Link>
                                        <HStack width={"40%"} height={"100%"} display={"flex"} justifyContent={"center"}>
                                            <Text fontWeight={'500'} fontSize={["15pt", "15pt", "17pt", "14pt", "20pt"]}>
                                                Rs. {el.price}
                                            </Text>
                                        </HStack>
                                    </VStack>
                                    <VStack w={['100%']} p={"4pt"} height={["50%", "60%", "40%", "60%", "45%"]} display={"flex"} justifyContent={"center"} alignItems={"start"}>

                                        <Button fontSize={["10pt", "12pt", "14.5pt", "13.5pt", "15pt"]} onClick={() => handleDelete(el._id)} width={["7rem", "7.5rem", "9rem", "8rem", "9rem"]} display={"flex"} justifyContent={"space-between"} paddingX={"16pt"} paddingY={"12pt"}> <DeleteIcon /> Remove</Button>

                                        <HStack width={["10%", "", "50%", "45%", "35%"]} display={"flex"} padding={"2pt"}
                                            justifyContent={"space-between"}>
                                            <Button borderRadius={'10%'} bgColor={'#11DAAC'} fontSize={["20pt", "20pt"]}
                                                onClick={() => handleIncrease(el._id)}>
                                                +
                                            </Button>
                                            <Button fontSize={["17pt", "18pt"]}>{el.quantity}</Button>
                                            <Button borderRadius={'10%'} bgColor={'#11DAAC'} fontSize={["20pt", "25pt"]}
                                                isDisabled={el.quantity === 1} onClick={() => handleDecrease(el._id)}>
                                                -
                                            </Button>
                                        </HStack>
                                    </VStack>
                                </Box>
                            </Box>

                            // </SimpleGrid>
                        ))}
                    </Box>

                    <Box className="cartmain2">
                        <Button rightIcon={<ArrowForwardIcon />} onClick={onOpen} textAlign={"left"} colorScheme='#000042' variant='outline' fontWeight={"500"} fontSize={["15pt", "", "16pt", "18pt", "20pt"]} borderRadius={"3pt"} paddingX={"12pt"} paddingY={"20pt"} boxShadow={"rgba(0, 0, 0, 0.40) 0px 3px 10px"} border={"transparent"} backgroundColor={"white"}>
                            Apply Coupon
                        </Button>
                        <Drawer
                            isOpen={isOpen}
                            placement='right'
                            initialFocusRef={firstField}
                            onClose={onClose} size={"lg"}>

                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerCloseButton fontSize={"10pt"} fontWeight={"900"} />
                                <DrawerHeader borderBottomWidth='1px' textColor={"#000042"} fontWeight={"600"} display={"flex"}
                                    justifyContent={"center"} fontSize={"20pt"} backgroundColor={"#F5F5F5"}>
                                    Coupons for you
                                </DrawerHeader>

                                <DrawerBody backgroundColor={"#F5F5F5"} >
                                    <Stack spacing='30px'>
                                        <Box display={"flex"} justifyContent={"space-between"} mt={"18pt"} padding={"5pt"} gap={["5pt", "10pt"]}>
                                            <Input width={["60%", "65%"]}
                                                type="text"
                                                ref={firstField}
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)}
                                                id='username' placeholder='Enter Coupon code'
                                                fontSize={["13pt", "20pt"]} backgroundColor={"white"} color={"#333368"}
                                                height={["40pt", "44pt"]} paddingX={["10pt", "20pt"]} paddingY={["10pt", "18pt"]}
                                            />
                                            <Button colorScheme='#F5F5F5' border={"2px solid #000042"} textColor={"#000042"}
                                                fontSize={["16px", "18pt"]} height={["40pt", "45pt"]} disabled={true} onClick={applyCoupon} width={"20%"}>
                                                Apply
                                            </Button>
                                            <Button colorScheme='#F5F5F5' border={"2px solid #000042"} textColor={"#000042"}
                                                fontSize={["16px", "18pt"]} height={["40pt", "44pt"]} width={["25%", "20%"]}
                                                onClick={removeDiscount}>
                                                Remove
                                            </Button>
                                        </Box>
                                        {couponData.map((couponss) => (
                                            <Card>
                                                <CardBody>
                                                    <Stack spacing='4'>
                                                        <Box display={"flex"} justifyContent={"space-between"} >
                                                            <Text height={"100%"} fontSize={"15pt"} textColor={"#000042"} fontWeight={"400"}>
                                                                {couponss.code}
                                                            </Text>
                                                            <Text textDecoration={"underline"} textColor={"#000042"} fontWeight={"700"} textTransform='uppercase' cursor={"pointer"} onClick={applyCoupon}>
                                                                APPLY COUPON
                                                            </Text>
                                                        </Box>

                                                        <Text fontSize={"15pt"} fontWeight={"600"} mt={"-10pt"} textColor={"#000042"}>
                                                            Extra ₹{couponss.discount} Off
                                                        </Text>
                                                        <Text fontSize={'14pt'}>
                                                            Use Coupon SINGLE
                                                        </Text>


                                                    </Stack>
                                                </CardBody>
                                            </Card>
                                        ))}
                                    </Stack>
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                        <Button mt={["14pt", "15pt", "10pt", "15pt", "20pt"]} bgColor={'#11DAAC'} onClick={handleCheckout}
                            borderRadius={"20pt"} style={{ padding: "20pt 25pt", gap: "10pt" }}
                            width={["60%", "50%", "50%", "60%", "70%"]} fontSize={["12pt", "15pt", "17pt", "18pt", "16pt"]}>
                            Proceed to Checkout <ChevronRightIcon mt={"2pt"} fontSize={["14pt", "2pt", "25pt", "22pt", "25pt"]} />
                        </Button>
                    </Box>
                </Box>

            </>
        )
    }
}

export default Cart;

