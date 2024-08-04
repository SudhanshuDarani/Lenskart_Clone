import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue,  useToast, } from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const host  = "http://localhost:5000"
  const navigate = useNavigate();

  const handleSubmit = () => {
    const payload = { email, password }
    // console.log(payload);
    setEmail("");
    setPassword("");
    axios.post(`${host}/admin/login`, payload)
      .then((res) => {
        if (res.data.message == "Email is not registerd") {
          toast({
            title: "Email not registered!!",
            status: "info",
            duration: 4000,
            isClosable: true,
            position: "top"
          })
        }
        if (res.data.message == "Invalid Password") {
          toast({
            title: "Invalid Password",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top"
          })
        }
        if (res.data.message == "Admin login successfull") {
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("userData", JSON.stringify(res.data.user))
          localStorage.setItem("auth", JSON.stringify(true))
          toast({
            title: "Login Successfull!!",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top"
          })
          navigate("/")
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Something went wrong",
          description: "Please try again in some time",
          status: "warning",
          duration: 4000,
          isClosable: true,
          position: "top"
        })
      })
  }

  return (
    <Flex minH={'72.2vh'} align={'center'} justify={'center'} >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Admin Sign In
          </Heading>
        </Stack>
        <Box bg={useColorModeValue('gray.50', 'gray.800')} rounded={'lg'}  boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input value={password} type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} />
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
            <Stack spacing={10} pt={2}>
              <Button onClick={handleSubmit} loadingText="Submitting" size="lg" bg={'#11DAAC'} color={'white'} _hover={{
                bg: '#11DAAC',
              }}>
                Sign In
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Not registered ? <Link to='/adminsignup' style={{textDecoration:"none",color:"black"}} >Admin Signup</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}