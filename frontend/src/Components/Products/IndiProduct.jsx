import {
    Flex, Box, Image, Badge, Icon, Tooltip, useDisclosure, useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { AiFillStar } from "react-icons/ai";
import default_image from "./default_image.jpeg";
import { BsHeartFill, BsHeart } from "react-icons/bs"
import { NavLink, } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addWishListItems, deleteWishListItem, getWishlistData } from '../../redux/wishlistReducer/wishlistAction';

function ProductCard({ _id, title, size, rating, price, color, image, type }) {
    const { onOpen, } = useDisclosure();
    // const firstField = useRef()
    const [liked, setLiked] = useState(false);
    const { routeParams } = useSelector(state => {
        return {
            routeParams: state.paramsReducer.routeParams
        }
    });
    const userData = JSON.parse(localStorage.getItem("userData")) || "";
    const googleUserData = JSON.parse(localStorage.getItem("googleUserData")) || "";
    const userID = (userData) ? userData._id : "" || (googleUserData) ? googleUserData._id : ""
    const userInfos = {
        userName: (userData) ? userData.name : "" || (googleUserData) ? googleUserData.name : "",
        userID: userID
    }
    const toast = useToast();
    const [wishlist, setWhislist] = useState([]);
    const googleUserToken = localStorage.getItem("googleAccessToken");
    const host = "http://localhost:5000";
    const dispatch = useDispatch();
    const userAccessToken = localStorage.getItem("userAccessToken");
    const wishlistss = useSelector((state) => state.wishlistReducer.wishListItem)
    useEffect(() => {
        getData();
        dispatch(addWishListItems(wishlistss))
    }, [googleUserData ? googleUserData.email : userData.email || liked]);

    useEffect(() => {
        // debug    
        // console.log("debug wishlist", wishlistss)
        const itemInWishlist = wishlistss?.some(item => item.productId === _id);
        setLiked(itemInWishlist)

    }, [wishlistss, _id])
    const getData = async () => {
        try {
            const results = await axios.get(`${host}/wishlist`, {
                headers: {
                    Authorization: `${googleUserToken}`,
                },
                params: { userID: userInfos.userID }
            })
            // if (results.data.length > 0) {
            dispatch(addWishListItems(results.data));
            setLiked(results.data.some(item => item.productId === _id));
            // } else {
            //     // console.log("item not found")
            // }
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleClick = async () => {
        try {
            const results = await axios.get(`${host}/wishlist`, {
                headers: {
                    Authorization: `${googleUserToken}`,
                },
                // params: userInfos
            })
            const updatingList = results.data;

            if (updatingList.some(item => item.productId === _id)) {
                toast({
                    title: 'Product already in wishlist!',
                    description: "This product is already in your wishlist",
                    status: 'info',
                    duration: 4000,
                    isClosable: true,
                    position: 'top'
                });
                return
            }

            const obj = {
                title: title,
                price: price,
                image: image,
                userName: (userData) ? userData.name : "" || (googleUserData) ? googleUserData.name : "",
                userID: (userData) ? userData._id : "" || (googleUserData) ? googleUserData._id : "",
                productId: _id
            }
            dispatch(addWishListItems([...wishlistss, obj]))
            setLiked(true)
            axios.post(`${host}/wishlist/addtowishList`, obj, {
                headers: {
                    Authorization: `${userAccessToken}  ` || `${googleUserToken}`
                },
                params: { userID }
            }).then((res) => {
                // getData()
                if (res.data.msg === "Please Login First!!" || res.data.msg === undefined) {
                    toast({
                        title: 'Login First or Sign up !',
                        description: "Please do login to your account or signup to start a new journey with us!",
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                        position: 'top'
                    })
                    dispatch(addWishListItems(wishlist.filter(item => item.productId !== _id)));
                    setLiked(false);
                } else {
                    dispatch(addWishListItems([...wishlistss, obj]))
                    toast({
                        title: 'Product added to wishlist!!',
                        description: "The product is added to your wishlist",
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                        position: "top"
                    })
                }
            }).catch((err) => {
                dispatch(addWishListItems(wishlist.filter(item => item.productId !== _id)));
                setLiked(false);
                toast({
                    title: 'Error adding to wishlist!',
                    description: "There was an error adding the product to your wishlist.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top'
                })
            })

        } catch (error) {
            console.log(error)
        }

    }
    const handleDelete = async (id) => {
        try {
            const resultData = await axios.get(`${host}/wishlist`, {
                headers: {
                    Authorization: `${googleUserToken}`,
                },
                params: { userID: userInfos.userID }
            })
            const updating = resultData.data;
            const itemExist = updating.some(item => item.productId === _id)
            if (itemExist) {
                const itemToRemove = updating.find(item => item.productId === _id);
                const res = await axios.delete(`${host}/wishlist/delete/${itemToRemove._id}`, {
                    headers: {
                        Authorization: `${userAccessToken}` || `${googleUserToken}`
                    }, data: { userID: userInfos.userID }
                })
                if (res.data) {
                    dispatch(deleteWishListItem(itemToRemove._id))
                    getData()
                    toast({
                        title: "Product removed from cart!!",
                        status: "success",
                        isClosable: true,
                        duration: 4000,
                        position: 'top'
                    })
                    dispatch(addWishListItems(wishlist.filter(item => item.productId !== _id)));
                    setLiked(false);
                    // dispatch(addWishListItems(prev => prev.filter(item => item.productId !== _id)));
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    };
    const handleButtonClick = () => {
        if (liked) {
            handleDelete(_id)
        } else {
            handleClick()
        }
    }
    return (
        <>
            {(routeParams.value === type) ?
                <Flex h={"100%"} gap={"10pt"} w={["100%", "100%", "100%", "100%", "100%"]} alignItems={"center"} justifyContent={"center"} backgroundColor={"#F0F0F0"} border={"2pt solid #EBEBF0"} rounded={"lg"} bo>
                    {/* <NavLink to={`/eyeglasses/${_id}`} style={{ textDecoration: "none", color: "black" }}> */}
                    <Box display={"flex"} backgroundColor={("white")} flexDirection={"column"}
                        alignItems={"center"} cursor={"pointer"} p={"5pt"} height={"100%"}
                        w={["100%", "100%"]} position="relative" rounded="lg" overflow={"hidden"}>

                        <Box height={["200pt"]} width={"100%"} paddingX={"2pt"} paddingY={"2pt"} overflow={"hidden"}
                            borderBottom={"1px solid lightgrey"}>
                            <NavLink to={`/eyeglasses/${_id}`} style={{ textDecoration: "none", color: "black" }}>
                                <Image objectFit={"contain"} height={"100%"} display={"block"} width={"100%"}
                                    src={(image === "defualt") ? default_image : image} />
                            </NavLink>
                        </Box>
                        <Box p="5" w={"100%"} cursor={"default"}>
                            <Box w={"100%"} display={"flex"} pos={"relative"} left={"-5pt"}>
                                <Badge display={"flex"} justifyContent={"center"} alignItems={"center"}
                                    textAlign={"center"} rounded="full" fontWeight={"600"} bgColor={"#eeeef5"}
                                    h={["5vh", "5vh", "4vh", "4vh", "4vh"]} w={["10vh", "16vw", "10vw", "15vw", "5vw"]} gap={"8pt"}
                                    fontSize="17px" >
                                    <Icon as={AiFillStar} h={[4, 10]} w={5} color={"#329c92"} alignSelf={'center'} />
                                    {rating}
                                </Badge>
                            </Box>
                            <Flex mt="8" justifyContent="space-between" alignContent="center">
                                <Box fontSize={["15pt", "25pt", "17pt", "16pt", "20pt"]} h={"32pt"} textAlign={"center"}
                                    display={"flex"} justifyContent={"center"} alignItems={"center"} fontWeight="400" as="h4"
                                    lineHeight="tight" isTruncated>
                                    <NavLink to={`/eyeglasses/${_id}`} style={{ textDecoration: "none", color: "black" }}>
                                        {title}
                                    </NavLink>
                                </Box>
                                <Tooltip mt={"5pt"} label="Whishlist" bg="white" placement={'top'} color={'gray.800'} fontSize={'1.2em'}>
                                    <Box display={'flex'} onClick={() => {
                                        onOpen()
                                        setLiked(!liked);
                                        // handleButtonClick(_id)
                                    }}>
                                        {
                                            liked ?
                                                <Icon cursor={"pointer"} as={BsHeartFill} fill={"red"} h={[5, 6, 7, 8, 7]}
                                                    w={7} alignSelf={'center'} onClick={handleButtonClick} />
                                                :
                                                <Icon cursor={"pointer"} as={BsHeart} onClick={handleButtonClick}
                                                    h={[5, 6, 7, 8, 7]} w={7} alignSelf={'center'} />
                                        }

                                    </Box>
                                </Tooltip>
                            </Flex>

                            <Flex direction={"column"} align={"start"}>
                                <Box fontSize="15pt" fontWeight={"500"} color={"#8484A4"} mt={"1pt"}>
                                    <Box as="span" color={'#8484A4'} fontSize="15pt" fontWeight={"500"} mr={"8px "}>
                                        Size :
                                    </Box>
                                    {size} + {" "} {"  "}{color}
                                </Box>
                                <Box fontSize="sm">
                                    <Box as="span" color={'gray.600'} fontSize="sm">
                                        {/* Color : */}
                                    </Box>
                                    {/* {color} */}
                                </Box>
                                <Box fontSize="20pt" mt={"5pt"} fontWeight={"500"} color={"#000042"}>
                                    {/* <Box as="span" fontWeight={"500"} color={'#000042'} fontSize="20pt"> */}
                                    ₹ {price}
                                    {/* </Box>  */}
                                </Box>

                            </Flex>
                        </Box>
                    </Box>
                </Flex>
                : "oops not found"
            }

            {/* {(routeParams.value === undefined) ?
                <Flex bor h={"100%"} gap={"10pt"} w={["100%", "100%", "100%", "100%", "100%"]} alignItems={"center"} justifyContent={"center"} backgroundColor={"#F0F0F0"} border={"2pt solid #EBEBF0"} rounded={"lg"}>
                    <Box display={"flex"} backgroundColor={("white")} flexDirection={"column"}
                        alignItems={"center"} cursor={"pointer"} p={"5pt"} height={"100%"}
                        w={["100%", "100%"]} position="relative" rounded="lg" overflow={"hidden"}>

                        <Box height={["200pt"]} width={"100%"} paddingX={"2pt"} paddingY={"2pt"} overflow={"hidden"} borderBottom={"1px solid lightgrey"} >
                            <NavLink to={`/eyeglasses/${_id}`} style={{ textDecoration: "none", color: "black" }}>
                                <Image objectFit={"contain"} height={"100%"} display={"block"} width={"100%"} src={(image === "defualt") ? default_image : image} alt={`Picture of ${title}`} />
                            </NavLink>
                        </Box>
                        <Box p="5" w={"100%"} cursor={"default"} >
                            <Box w={"100%"} display={"flex"} pos={"relative"} left={"-5pt"} >
                                <Badge display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}
                                    rounded="full" fontWeight={"600"} bgColor={"#eeeef5"} h={["5vh", "5vh", "4vh", "4vh", "4vh"]}
                                    w={["10vh", "16vw", "10vw", "15vw", "5vw"]} gap={"8pt"} fontSize="17px" >
                                    <Icon as={AiFillStar} h={[4, 10]} w={5} color={"#329c92"} alignSelf={'center'} />
                                    {rating}
                                </Badge>
                            </Box>
                            <Flex mt="8" justifyContent="space-between" alignContent="center">
                                <Box fontSize={["15pt", "25pt", "17pt", "16pt", "20pt"]} h={"32pt"} textAlign={"center"}
                                    display={"flex"} justifyContent={"center"} alignItems={"center"} fontWeight="400" as="h4"
                                    lineHeight="tight" isTruncated>
                                    <NavLink to={`/eyeglasses/${_id}`} style={{ textDecoration: "none", color: "black" }}>
                                        {title}
                                    </NavLink>
                                </Box>
                                <Tooltip mt={"5pt"} label="Whishlist" bg="white" placement={'top'} color={'gray.800'}
                                    fontSize={['1.2em']}>
                                    <Box display={'flex'} onClick={() => {
                                        setLiked(!liked)
                                        onOpen();
                                    }}>
                                        {
                                            liked ?
                                                <Icon cursor={"pointer"} id='fill' onClick={handleButtonClick} as={BsHeartFill} fill={"red"} h={[5, 6, 7, 8, 7]} w={7} alignSelf={'center'} />
                                                :
                                                <Icon cursor={"pointer"} onClick={handleButtonClick} as={BsHeart} h={[5, 6, 7, 8, 7]} w={7} alignSelf={'center'} />
                                        }

                                    </Box>
                                </Tooltip>
                            </Flex>

                            <Flex direction={"column"} align={"start"}>
                                <Box fontSize="15pt" fontWeight={"500"} color={"#8484A4"} mt={"1pt"}>
                                    <Box as="span" color={'#8484A4'} fontSize="15pt" fontWeight={"500"} mr={"8px "}>
                                        Size :
                                    </Box>
                                    {size} +   {color}
                                </Box>
                                <Box fontSize="sm">
                                    <Box as="span" color={'gray.600'} fontSize="sm">
                                    </Box>
                                </Box>
                                <Box fontSize="20pt" mt={"5pt"} fontWeight={"500"} color={"#000042"}>
                                    ₹ {price}
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                </Flex>
                : ""
            } */}

        </>
    );
}

export default ProductCard;