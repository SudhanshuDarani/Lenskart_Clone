import React, { useState } from 'react';
import { Progress, Box, ButtonGroup, Button, Heading, Flex, FormControl, GridItem, FormLabel, Input, Select, SimpleGrid, InputGroup, FormHelperText, InputRightElement, } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
// import { useToast } from '@chakra-ui/react';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from "axios";

const token = localStorage.getItem("token")
const Form1 = () => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                User Registration
            </Heading>
            <Flex>
                <FormControl mr="5%">
                    <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                        First name
                    </FormLabel>
                    <Input id="first-name" placeholder="First name" />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="last-name" fontWeight={'normal'}>
                        Last name
                    </FormLabel>
                    <Input id="last-name" placeholder="First name" />
                </FormControl>
            </Flex>
            <FormControl mt="2%">
                <FormLabel htmlFor="email" fontWeight={'normal'}>
                    Email address
                </FormLabel>
                <Input id="email" type="email" />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="password" fontWeight={'normal'} mt="2%">
                    Password
                </FormLabel>
                <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type={show ? 'text' : 'password'}
                        placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
        </>
    );
};

const Form2 = () => {
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                User Details
            </Heading>
            <FormControl isRequired={true} as={GridItem} colSpan={[6, 3]}>
                <FormLabel htmlFor="country" fontSize="14pt" fontWeight="md" color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}>
                    Country / Region
                </FormLabel>
                <Select sx={{ padding: "5pt 18pt" }} id="country" name="country" border={"2pt solid lightgrey"} autoComplete="country"
                    placeholder="Select option" focusBorderColor="brand.400" shadow="sm" size="md" required={true} w="full"
                    rounded="md" fontSize={"15pt"} variant={"unstyled"}>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                    <option>India</option>
                    <option>Russia</option>
                    <option>China</option>
                    <option>Mexico</option>
                    <option>Bangladesh</option>
                </Select>
            </FormControl>

            <FormControl isRequired as={GridItem} colSpan={6}>
                <FormLabel htmlFor="street_address" fontSize="14pt" fontWeight="md" color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }} mt="2%">
                    Street address
                </FormLabel>
                <Input required type="text" name="street_address" id="street_address" autoComplete="street-address"
                    focusBorderColor="brand.400" shadow="sm" size="sm" fontSize={"18pt"} border={"1pt solid lightgrey"}
                    outline={"none"} p={"5pt 18pt"} w="full" rounded="md" isRequired variant={"unstyled"} />
            </FormControl>

            <FormControl isRequired as={GridItem} colSpan={[6, 6, null, 2]}>
                <FormLabel htmlFor="city" fontSize="14pt" fontWeight="md" color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }} mt="2%">
                    City
                </FormLabel>
                <Input required={true} type="text" name="city" id="city" autoComplete="city" focusBorderColor="brand.400"
                    shadow="sm" size="sm" w="full" rounded="md" p={"5pt 18pt"} border={"1pt solid lightgrey"} fontSize={"18pt"}
                    isRequired={true} variant={"unstyled"} />
            </FormControl>

            <FormControl isRequired as={GridItem} colSpan={[6, 3, null, 2]}>
                <FormLabel htmlFor="state" fontSize="14pt" fontWeight="md" color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }} mt="2%">
                    State / Province
                </FormLabel>
                <Input shadow="sm" size="sm" type="text" name="state" id="state" autoComplete="state"
                    focusBorderColor="brand.400" w="full" rounded="md" required={true}
                    isRequired={true} fontSize={"18pt"} p={"15pt 18pt"} variant={"unstlyed"}
                    border={"1pt solid lightgrey"} />
            </FormControl>

            <FormControl isRequired as={GridItem} colSpan={[6, 3, null, 2]}>
                <FormLabel htmlFor="postal_code" fontSize="14pt" fontWeight="md" color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }} mt="2%">
                    ZIP / Postal
                </FormLabel>
                <Input type="text" name="postal_code" id="postal_code" autoComplete="postal-code" focusBorderColor="brand.400"
                    shadow="sm" size="sm" w="full" rounded="md" fontSize={"15pt"} variant={"styled"} required isRequired={true}
                    border={"1pt solid lightgrey"} padding={"15pt 18pt"} />
            </FormControl>
        </>
    );
};


const stripePromise = loadStripe('pk_test_51OeyPQSDGsRHH0YWG91WxeAI5KLfko1vsgNUtHZk4FB6vOBTgoZDZxZjESaGGG8Uj4Qludl74jH137mPw7GrBPNU00wwAhuNlD');
const CheckoutForm = () => {
    const host = "http://localhost:5000"
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        if (error) {
            setError(error.message);
        } else {
            const { data } = await axios.post(`${host}/create-payment-intent`, {
                amount: 1000, // Example amount in cents
                currency: 'usd',
                headers: {
                    Authorization: `${token}`
                }
            });

            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: paymentMethod.id,
            });
            if (result.error) {
                setError(result.error.message);
            } else {
                // Payment successful, handle success here
                console.log("success fully handled : ", result.paymentIntent);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
            {error && <div>{error}</div>}
        </form>
    );
};
const Form3 = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal">
                Payment
            </Heading>
            <SimpleGrid columns={1} spacing={6}>
                <FormControl isRequired id="cardno" >
                    <FormLabel fontSize="14pt" fontWeight="md" color="gray.700">Card Number</FormLabel>
                    <Input required={true} type="number" placeholder='1234 1234 1234 1234' shadow="sm" size="sm" w="full"
                        rounded="md" fontSize={"15pt"} variant={"styled"} isRequired={true}
                        border={"1pt solid lightgrey"} padding={" 18pt"} />
                </FormControl>
                <FormControl isRequired id="date" >
                    <FormLabel fontSize="14pt" fontWeight="md" color="gray.700">Exp Date</FormLabel>
                    <Input required={true} type="date" placeholder='1234 1234 1234 1234' isRequired={true} shadow="sm" size="sm"
                        w="full" rounded="md" fontSize={"15pt"} variant={"styled"} padding={" 18pt"}
                        border={"1pt solid lightgrey"} />
                </FormControl>

                <FormControl isRequired id="password" >
                    <FormLabel fontSize="14pt" fontWeight="md" color="gray.700">CVV</FormLabel>
                    <InputGroup>
                        <Input required={true} type={showPassword ? 'text' : 'password'} isRequired={true} shadow="sm" size="sm"
                            w="full" rounded="md" fontSize={"15pt"} variant={"styled"} padding={" 18pt"}
                            border={"1pt solid lightgrey"} />
                        <InputRightElement h={'full'}>
                            <Button
                                variant={'ghost'}
                                onClick={() =>
                                    setShowPassword((showPassword) => !showPassword)
                                }>
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl id="firstName" isRequired>
                    <FormLabel fontSize="14pt" fontWeight="md" color="gray.700">Name on Card</FormLabel>
                    <Input required={true} type="text" isRequired={true} shadow="sm" size="sm"
                        w="full" rounded="md" fontSize={"15pt"} variant={"styled"} padding={" 18pt"}
                        border={"1pt solid lightgrey"} />
                </FormControl>

                <FormControl id="firstName" isRequired>
                    <FormLabel fontSize="14pt" fontWeight="md" color="gray.700">Billing Address</FormLabel>
                    <Input required={true} type="text" placeholder='Country' isRequired={true} shadow="sm" size="sm"
                        w="full" rounded="md" fontSize={"15pt"} variant={"styled"} padding={" 18pt"}
                        border={"1pt solid lightgrey"} />
                    <Input required={true} mt={"2pt"} type="text" placeholder='Address' isRequired={true} shadow="sm" size="sm"
                        w="full" rounded="md" fontSize={"15pt"} variant={"styled"} padding={" 18pt"}
                        border={"1pt solid lightgrey"} />
                </FormControl>

                <Elements stripe={stripePromise}>
                    {/* <CheckoutForm /> */}
                </Elements>

            </SimpleGrid>
        </>
    );
};

export default function Payment() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(33.33);
    return (
        <>
            <Box borderWidth="1px" rounded="lg" shadow="1px 1px 3px rgba(0,0,0,0.3)" maxWidth={800} p={6} m="10px auto" as="form">
                <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated></Progress>
                {step === 1 ? <Form2 /> : <Form3 />}
                <ButtonGroup mt="5%" w="100%">
                    <Flex w="100%" justifyContent="space-between">
                        <Flex>
                            <Button
                                onClick={() => {
                                    setStep(step - 1);
                                    setProgress(progress - 33.33);
                                }} isDisabled={step === 1} colorScheme="teal" variant="solid" w="7rem" mr="5%">
                                Back
                            </Button>
                            <Button
                                w="7rem"
                                // isDisabled={step === 2}
                                onClick={() => {
                                    setStep(step + 1);
                                    if (step === 2) {
                                        setProgress(100);
                                        Swal.fire(
                                            'Order Placed!!',
                                            'Your order will be delivered in 5-8 business days!!',
                                            'success'
                                        )
                                        navigate('/')
                                    } else {
                                        setProgress(progress + 33.33);
                                    }
                                }}
                                colorScheme="teal"
                                variant="outline">
                                Next
                            </Button>
                        </Flex>
                        {step === 2 ? (
                            <Button
                                w="7rem"
                                colorScheme="red"
                                variant="solid"                                >
                                Thank You
                            </Button>
                        ) : null}
                    </Flex>
                </ButtonGroup>
            </Box>
        </>
    );
}