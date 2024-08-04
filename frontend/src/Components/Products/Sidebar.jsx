import { Box, Checkbox, CheckboxGroup, Grid, GridItem, HStack, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'
export const Sidebar = (index) => {
    // const [frame, setFrame] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();
    const initialColor = searchParams.getAll("color");
    const initialBrand = searchParams.getAll("brand");
    const initialSize = searchParams.getAll("size");
    const initialShape = searchParams.getAll("shape");
    const [color, setColor] = useState(initialColor || []);
    const [brand, setBrand] = useState(initialBrand || []);
    const [size, setSize] = useState(initialSize || []);
    const [shape, setShape] = useState(initialShape || []);

    //handleColor   
    const handleColor = (e) => {
        //console.log(e.target.value)
        let newColor = [...color]
        const value = e.target.value
        if (newColor.includes(value)) {
            newColor = newColor.filter((el) => el !== value)
        }
        else {
            newColor.push(value)
        }
        setColor(newColor)
    }
    //handleBrand
    const handleBrand = (e) => {
        //console.log(e.target.value)
        let newBrand = [...brand]
        const value = e.target.value
        if (newBrand.includes(value)) {
            newBrand = newBrand.filter((el) => el !== value)
        }
        else {
            newBrand.push(value)
        }
        setBrand(newBrand)
    }
    //handleSize
    const handleSize = (e) => {
        let newSize = [...size]
        const value = e.target.value
        if (newSize.includes(value)) {
            newSize = newSize.filter((el) => el !== value)
        }
        else {
            newSize.push(value)
        }
        setSize(newSize)
    }
    //handleShape
    const handleShape = (value) => {
        let newShape = [...shape]
        if (newShape.includes(value)) {
            newShape = newShape.filter((el) => el !== value)
        }
        else {
            newShape.push(value)
        }
        setShape(newShape)
    }

    useEffect(() => {
        const params = { color, brand, size, shape }
        setSearchParams(params)
    }, [color, brand, size, shape])
    return (
        <>
            <Stack overflowX={"hidden"} h={"100%"} overflowY={"scroll"} display={"flex"} p={"5pt"}
                justifyContent={"center"} alignItems={"center"} spacing={7} direction="column"
                userSelect={"none"} key={index} w={"100%"} css={{
                    '&::-webkit-scrollbar': {
                        display: "none"
                    }
                }}>
                <VStack align={"self-start"} w={"100%"} mt={["25rem", "0rem", "0rem", "0rem", "0vh"]} >
                    <Heading size={"sm"} fontWeight={"semibold"} color={"gray"}>AGE GROUP</Heading>
                    <CheckboxGroup>
                        <Checkbox size={"lg"} colorScheme="gray" >
                            <Text fontSize={"sm"} color={"gray"}>2-5 Yrs</Text>
                        </Checkbox>
                        <Checkbox size={"lg"} colorScheme='gray' >
                            <Text fontSize={"sm"} color={"gray"}>5-8 Yrs</Text>
                        </Checkbox>
                    </CheckboxGroup>
                </VStack>

                {/* fram types */}
                <VStack align={"start"} w={"100%"}>
                    <Heading size={"sm"} fontWeight={"semibold"} color={"gray"}>FRAME TYPE</Heading>
                    <HStack>
                        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} onClick={() => {
                            const value = "full-rim"
                        }} boxSize={"56px"} border={"1px solid lightgray"}>
                            <Image src='https://static.lenskart.com/images/cust_mailer/Eyeglass/FullRim.png' />
                            <Text fontWeight={"hairline"} color={"gray"} fontSize={"13px"}>Full Rim</Text>
                        </Box>
                        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} onClick={() => {
                            const value = "half-rim"
                        }} boxSize={"56px"} border={"1px solid lightgray"}>
                            <Image src='https://static.lenskart.com/images/cust_mailer/Eyeglass/HalfRim.png' />
                            <Text fontWeight={"hairline"} color={"gray"} fontSize={"13px"}>Half Rim</Text>
                        </Box>
                        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}
                            onClick={() => { const value = "rimless" }} boxSize={"56px"}
                            border={"1px solid lightgray"}>
                            <Image src='https://static.lenskart.com/images/cust_mailer/Eyeglass/Rimless.png' />
                            <Text fontWeight={"hairline"} color={"gray"} fontSize={"13px"}>Rimless</Text>
                        </Box>
                    </HStack>
                </VStack>

                {/* fram shapes */}
                <VStack align={"start"} w={"100%"}>
                    <Heading size={"sm"} fontWeight={"semibold"} color={"gray"}>FRAME SHAPE</Heading>
                    <Grid gap={2} gridTemplateColumns={"repeat(3,1fr)"}>
                        <GridItem display={"flex"} flexDirection={"column"} alignItems={"center"} _hover={{ border: "1px solid black" }} cursor={'pointer'} onClick={() => {
                            const value = "rectangle"
                            handleShape(value)
                            //console.log(value)
                        }}
                            boxSize={"56px"} width={"62px"} border={"1px solid lightgray"}>
                            <Image src='https://static.lenskart.com/images/cust_mailer/Eyeglass/Rectangle.png' />
                            <Text fontWeight={"hairline"} color={"gray"} fontSize={"13px"}>Rectangle</Text>
                        </GridItem>
                        <GridItem display={"flex"} flexDirection={"column"} alignItems={"center"} _hover={{ border: "1px solid black" }} cursor={'pointer'} onClick={() => {
                            const value = "round"
                            handleShape(value)
                        }} boxSize={"56px"} width={"62px"} border={"1px solid lightgray"}>
                            <Image src='https://static.lenskart.com/images/cust_mailer/Eyeglass/Round.png' />
                            <Text fontWeight={"hairline"} color={"gray"} fontSize={"13px"}>Round</Text>
                        </GridItem>
                        <GridItem display={"flex"} flexDirection={"column"} alignItems={"center"} _hover={{ border: "1px solid black" }} cursor={'pointer'} onClick={() => {
                            const value = "cat-eye"
                            handleShape(value)
                        }} boxSize={"56px"} width={"62px"} border={"1px solid lightgray"}>
                            <Image src='https://static.lenskart.com/images/cust_mailer/Eyeglass/CatEye.png' />
                            <Text fontWeight={"hairline"} color={"gray"} fontSize={"13px"}>Cat Eye</Text>
                        </GridItem>
                        <GridItem display={"flex"} flexDirection={"column"} alignItems={"center"} _hover={{ border: "1px solid black" }} cursor={'pointer'} onClick={() => {
                            const value = "square"
                            handleShape(value)
                        }} boxSize={"56px"} width={"62px"} border={"1px solid lightgray"}>
                            <Image src='https://static.lenskart.com/images/cust_mailer/Eyeglass/Square.png' />
                            <Text fontWeight={"hairline"} color={"gray"} fontSize={"13px"}>Square</Text>
                        </GridItem>
                        <GridItem display={"flex"} flexDirection={"column"} alignItems={"center"} _hover={{ border: "1px solid black" }} _focus={{ border: "1px solid black" }} cursor={'pointer'} onClick={() => {
                            const value = "geometric"
                            handleShape(value)
                        }} align={"center"} boxSize={"56px"} width={"62px"} border={"1px solid lightgray"}>
                            <Image src='https://static.lenskart.com/images/cust_mailer/Eyeglass/Geometric.png' />
                            <Text fontWeight={"hairline"} color={"gray"} fontSize={"13px"}>Geometric</Text>
                        </GridItem>
                        <GridItem display={"flex"} flexDirection={"column"} alignItems={"center"} _hover={{ border: "1px solid black" }} cursor={'pointer'} onClick={() => {
                            const value = "aviator"
                            handleShape(value)
                        }} boxSize={"56px"} width={"62px"} border={"1px solid lightgray"}>
                            <Image src='https://static.lenskart.com/images/cust_mailer/Eyeglass/Aviator.png' />
                            <Text fontWeight={"hairline"} color={"gray"} fontSize={"13px"}>Aviator</Text>
                        </GridItem>
                        <GridItem display={"flex"} flexDirection={"column"} alignItems={"center"} _hover={{ border: "1px solid black" }} cursor={'pointer'} onClick={() => {
                            const value = "wayfarer"
                            handleShape(value)
                        }} boxSize={"56px"} width={"62px"} border={"1px solid lightgray"}>
                            <Image src='https://static.lenskart.com/images/cust_mailer/Eyeglass/Wayfarer.png' />
                            <Text fontWeight={"hairline"} color={"gray"} fontSize={"13px"}>Wayfarer</Text>
                        </GridItem>
                    </Grid>
                </VStack>

                <VStack align={"start"} w={"100%"}>
                    <Accordion width={["100%", "100%", "100%", "18vw", "18vw"]} defaultIndex={[0]} allowMultiple>

                        {/* First  Frame Color*/}
                        <AccordionItem >
                            <Heading as={"h2"} size={"sm"} fontWeight={"bold"} color={"blackAlpha.700"} variant={"unstlyed"}
                                _focus={{ border: "none", outline: "none" }}>
                                <AccordionButton height={"7vh"} _focus={{ border: "none", outline: "none" }}>
                                    <Box as="span" flex='1' textAlign='left' _focus={{ border: "none", outline: "none" }}>
                                        FRAME COLOR
                                    </Box>
                                </AccordionButton>
                            </Heading>
                            <AccordionPanel pb={4}>
                                <Stack gap={1} align={"start"} direction="column">
                                    <CheckboxGroup>
                                        <HStack>
                                            <input type="checkbox" value={"black"} style={{ width: "20px", height: "20px", color: "red", backgroundColor: "green" }} checked={color.includes("black")} onChange={handleColor} />
                                            <Text fontSize={"sm"} color={"gray"}>Black</Text>
                                        </HStack>
                                        <HStack>
                                            <input type="checkbox" value={"brown"} checked={color.includes("brown")} style={{ width: "20px", height: "20px" }} onChange={handleColor} />
                                            <Text fontSize={"sm"} color={"gray"}>Brown</Text>
                                        </HStack>
                                        <HStack>
                                            <input type="checkbox" value={"transparent"} checked={color.includes("transparent")} style={{ width: "20px", height: "20px" }} onChange={handleColor} />
                                            <Text fontSize={"sm"} color={"gray"}>Transparent</Text>
                                        </HStack>
                                        {/* <HStack>
                                            <input type="checkbox" value={"blue"} checked={color.includes("blue")} style={{ width: "20px", height: "20px" }} onChange={handleColor} />
                                            <Text fontSize={"sm"} color={"gray"}>Blue</Text>
                                        </HStack>
                                        <HStack>
                                            <input type="checkbox" value={"green"} checked={color.includes("green")} style={{ width: "20px", height: "20px" }} onChange={handleColor} />
                                            <Text fontSize={"sm"} color={"gray"}>Green</Text>
                                        </HStack>
                                        <HStack>
                                            <input type="checkbox" value={"gold"} checked={color.includes("gold")} style={{ width: "20px", height: "20px" }} onChange={handleColor} />
                                            <Text fontSize={"sm"} color={"gray"}>Gold</Text>
                                        </HStack>
                                        <HStack>
                                            <input type="checkbox" value={"pink"} checked={color.includes("pink")} style={{ width: "20px", height: "20px" }} onChange={handleColor} />
                                            <Text fontSize={"sm"} color={"gray"}>Pink</Text>
                                        </HStack>
                                        <HStack>
                                            <input type="checkbox" value={"red"} checked={color.includes("red")} style={{ width: "20px", height: "20px" }} onChange={handleColor} />
                                            <Text fontSize={"sm"} color={"gray"}>Red</Text>
                                        </HStack>
                                        <HStack>
                                            <input type="checkbox" value={"teal"} checked={color.includes("teal")} style={{ width: "20px", height: "20px" }} onChange={handleColor} />
                                            <Text fontSize={"sm"} color={"gray"}>Teal</Text>
                                        </HStack> */}
                                    </CheckboxGroup>

                                </Stack>
                            </AccordionPanel>
                        </AccordionItem>
                        {/* Second  Frame brand*/}
                        <AccordionItem>
                            <Heading as={"h2"} size={"sm"} fontWeight={"bold"} color={"blackAlpha.700"}>
                                <AccordionButton height={"7vh"} >
                                    <Box as="span" flex='1' textAlign='left' _focus={{ border: "none", outline: "none" }}>
                                        BRANDS
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </Heading>
                            <AccordionPanel pb={4}>
                                <Stack gap={2} align={"start"} direction="column">
                                    <CheckboxGroup>
                                        <HStack>
                                            <input type="checkbox" value={"Vincent Chase"} checked={brand.includes("Vincent Chase")} onChange={handleBrand} style={{ width: "20px", height: "20px" }} />
                                            <Text fontSize={"sm"} color={"gray"}>VINCENT CHASE ONLINE</Text>
                                        </HStack>
                                        <HStack>
                                            <input type="checkbox" onChange={handleBrand} value={"Lenskart Air"} checked={brand.includes("Lenskart Air")} style={{ width: "20px", height: "20px" }} />
                                            <Text fontSize={"sm"} color={"gray"}>LENSKART AIR</Text>
                                        </HStack>
                                        <HStack>
                                            <input type="checkbox" onChange={handleBrand} value={"Lenskart STUDIO"} style={{ width: "20px", height: "20px" }} checked={brand.includes("Lenskart STUDIO")} />
                                            <Text fontSize={"sm"} color={"gray"}>LENSKART STUDIO</Text>
                                        </HStack>
                                    </CheckboxGroup>
                                </Stack>
                            </AccordionPanel>
                        </AccordionItem>
                        {/* Third Frame Size*/}
                        <AccordionItem>
                            <Heading as={"h2"} size={"sm"} fontWeight={"bold"} color={"blackAlpha.700"}>
                                <AccordionButton height={"7vh"} >
                                    <Box as="span" flex='1' textAlign='left' _focus={{ border: "none", outline: "none" }}>
                                        FRAME SIZE
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </Heading>
                            <AccordionPanel pb={4}>
                                <Stack gap={2} align={"start"} direction="column">
                                    <CheckboxGroup>
                                        <HStack>
                                            <input type="checkbox" value={"Extra Narrow"} checked={size.includes("Extra Narrow")} onChange={handleSize} style={{ width: "20px", height: "20px" }} />
                                            <Text fontSize={"sm"} color={"gray"}>EXTRA NARROW</Text>
                                        </HStack>
                                        <HStack>
                                            <input type="checkbox" onChange={handleSize} value={"Medium"} checked={size.includes("Medium")} style={{ width: "20px", height: "20px" }} />
                                            <Text fontSize={"sm"} color={"gray"}>MEDIUM</Text>
                                        </HStack>
                                        <HStack>
                                            <input type="checkbox" onChange={handleSize} value={"Wide"} checked={size.includes("Wide")} style={{ width: "20px", height: "20px" }} />
                                            <Text fontSize={"sm"} color={"gray"}>WIDE</Text>
                                        </HStack>
                                        <HStack>
                                            <input type="checkbox" onChange={handleSize} value={"Narrow"} checked={size.includes("Narrow")} style={{ width: "20px", height: "20px" }} />
                                            <Text fontSize={"sm"} color={"gray"}>NARROW</Text>
                                        </HStack>
                                    </CheckboxGroup>
                                </Stack>
                            </AccordionPanel>
                        </AccordionItem>
                        {/* Fourth Weight */}
                        <AccordionItem>
                            <Heading as={"h2"} size={"sm"} fontWeight={"bold"} color={"blackAlpha.700"}>
                                <AccordionButton height={"7vh"} >
                                    <Box as="span" flex='1' textAlign='left' _focus={{ border: "none", outline: "none" }}>
                                        WEIGHT GROUP
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </Heading>
                            <AccordionPanel pb={4}>
                                <Stack gap={2} align={"start"} direction="column">
                                    <CheckboxGroup>
                                        <Checkbox size={"lg"} colorScheme="gray" >
                                            <Text fontSize={"sm"} color={"gray"}>LIGHT</Text>
                                        </Checkbox>
                                        <Checkbox size={"lg"} colorScheme='gray' >
                                            <Text fontSize={"sm"} color={"gray"}>AVERAGE</Text>
                                        </Checkbox>
                                    </CheckboxGroup>
                                </Stack>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </VStack>
            </Stack>
        </>
    )
}
