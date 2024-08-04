import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import {
  Box, Button, Center, Heading, HStack, Image, Input, InputGroup, InputRightElement,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Checkbox
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from "../Signup/Signup";
import validator from "validator";
import googleIcon from "../google_icon.png"
const baseUrl = "http://localhost:5000";

const intial = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [loginData, setLoginData] = useState(intial);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState();
  const [passwordErr, setPassErr] = useState();

  const cookiess = async () => {
    try {
      const googleCookies = await fetch(`${baseUrl}/getCookies`, {
        method: "GET", withCredentials: true, credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (responses) => {
        const jsons = await responses.json();
        if (jsons.success) {
          // console.log(jsons.decoded)
          localStorage.setItem("googleUserData", JSON.stringify(jsons.decoded))
          localStorage.setItem("auth", JSON.stringify(true));
          localStorage.setItem("googleAccessToken", jsons.googleAccessToken);
          navigate("/")
        } else {
          // console.log(jsons)
        }
      })
    } catch (error) {
      console.log("out.2", error.message);
    }

  };
  const handleGoogleLoginClick = async () => {
    try {
      window.location.href = `${baseUrl}/auth/google`;
      // await cookiess();
    }
    catch (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };
  const handleGoogleAuthCallback = async () => {
    try {
      await cookiess();
    } catch (error) {
      console.error("Error fetching cookies after authentication : ", error.message);
    }
  };
  useEffect(() => {
    handleGoogleAuthCallback()
  });

  const showToastMessage = () => {
    toast.success('Login Successfull !', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  const validEmail = (email) => {
    return validator.isEmail(email)
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });

    switch (name) {
      case "email":
        setEmail(value);
        if (!validEmail(value)) {
          setError("Please enter a valid email format")
        } else {
          setError("")
        }
        break;
      case "password":
        setPassword(value);
        if (value.length < 5 || value.length > 10) {
          setPassErr("Password must be between 6 and 20 characters long");
        } else {
          setPassErr(""); // Clear error if password length is valid
        }
        break;
      default:
        break;
    }
  };

  const loginUser = async (info) => {
    try {
      setLoading(true)
      const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
        method: "POST", withCredentials: true, credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      }).then(async (response) => {
        if (!error && !passwordErr) {
          const json = await response.json();
          // console.log("users data : ", json)
          if (json.success) {
            localStorage.setItem("userData", JSON.stringify(json.user));
            localStorage.setItem("auth", JSON.stringify(true));
            localStorage.setItem("userAccessToken", JSON.stringify(json.userAccessToken))
            showToastMessage()
            setTimeout(() => {
              navigate("/")
            }, 1000)
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `${json.message}`,
              didOpen: () => {
                const container = document.querySelector('.swal2-container');
                container.style.zIndex = 10000;
              }
            });
            localStorage.removeItem("userData", JSON.stringify(json.user));
            localStorage.removeItem("auth", JSON.stringify(true));
            localStorage.removeItem("userAccessToken", JSON.stringify(json.userAccessToken))
          }
        }
      })
    } catch (error) {
      console.log("out.2", error.message);
    } finally {
      setLoading(false);
    }
  };
  const formFilled = loginData.email.trim() !== '' && loginData.password.trim() !== '';


  const handlesign = () => {
    loginUser(loginData);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Center cursor={"pointer"} onClick={handleOpen} h={"100%"} fontWeight={"500"} fontSize={["10pt", "15pt"]} w="100%">
        Sign In
      </Center>

      <Modal isOpen={isOpen} onClose={handleClose} isCentered size={{ xl: "xlg", lg: "xlg", md: "md", sm: "lg", base: "sm" }} >
        <ModalOverlay />
        <ModalContent userSelect={"none"} width={["98%", "95%", "95%", "70%", "32%"]} borderRadius={"10pt"}
          height={["70vh", "70vh", "65vh", "70vh", "82vh"]}>
          <ModalCloseButton borderRadius={"80%"} height={"45pt"} width={"45pt"} fontSize={"15pt"} bg="white" m={"19pt 10px 0px 0px"} size={"lg"} outline={"none"} />
          <ModalBody p={"0px 0px"}>
            <Image
              src="https://static1.lenskart.com/media/desktop/img/DesignStudioIcons/DesktopLoginImage.svg" alt="pic"
              borderRadius={"10px 10px 0px 0px "} />
            <Box height={"62%"} p={["15pt", "24pt"]}>
              <Heading fontFamily={" Times, serif"} fontWeight="100" fontSize={["20pt", "30pt", "34pt", "35pt", "33pt"]}
                mb={["24px"]} color={"#333368"}>
                Sign In
              </Heading>
              <Input name="email" placeholder="Email" h={["40pt", "50pt", "55pt", "60pt", "55pt"]}
                fontSize={["18pt", "27pt", "25pt", "28pt", "22pt"]} focusBorderColor="rgb(206, 206, 223)"
                borderColor={"rgb(206, 206, 223)"} value={email} onChange={handleChange} rounded="12pt"
                mb={["1pt", "1pt", "10pt", "3pt", "5pt"]} padding={["0pt 25pt", "0pt 20pt"]}
              />
              {(email) ? error && (
                <div style={{ color: "red", fontSize: "14pt", marginTop: "10pt", marginBottom: "5pt" }}>{error}</div>
              ) : ""}
              <InputGroup mt={"15pt"} mb={"8pt"}>
                <Input type={show ? "text" : "password"} name="password" placeholder="Enter password"
                  h={["40pt", "50pt", "55pt", "60pt", "55pt"]} fontSize={["18pt", "27pt", "25pt", "28pt", "22pt"]}
                  focusBorderColor="rgb(206, 206, 223)" borderColor={"rgb(206, 206, 223)"} value={password} onChange={handleChange}
                  rounded="12pt" padding={"0pt 20pt"} />
                <InputRightElement position={"absolute"} width={["5rem", "6.5rem"]} height={"100%"} size="xlg">
                  <Button height={"90%"} outline={"none"} size="lg" borderRadius="xl" border={"none"} onClick={() => setShow(!show)}
                    bg="white" fontSize={["15pt", "20pt"]}>
                    {(show) ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {(password) ? passwordErr && (
                <Box fontSize={["12pt", "", "12pt", "", "", "14pt"]} style={{ color: "red", marginTop: "10pt", marginBottom: "5pt" }}>{passwordErr}</Box>
              ) : ""}

              {/* <HStack fontSize="50pt">
                <Checkbox mb={"20px"} mt="20px" size="md">
                </Checkbox>
                <Image
                  src="https://static.lenskart.com/media/desktop/img/25-July-19/whatsapp.png" w={"22px"} h="22px" />
                  Get Update on whatsapp
              </HStack> */}

              {/* Sign in button */}
              <Box mt={["0pt", "15pt"]} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <Button isLoading={loading} onClick={handlesign} isDisabled={!formFilled} bgColor={"#11daac"} fontWeight={"400"}
                  width={["100%", "89%"]} fontFamily={"sans-serif"} color={"#000042"} borderRadius={"35pt"}
                  h={["35pt", "49pt", "60pt", "60pt", "70pt", "64pt"]} fontSize={["20pt", "25pt"]} _hover={{ backgroundColor: "#11daac" }}>
                  Sign In
                  <ToastContainer />
                </Button>
                <Button mt={"15pt"} height={["35pt", "40pt"]} width={["90%", "89%"]} border={"2px solid lightgrey"}
                  backgroundColor={"white"} gap={"5pt"} onClick={handleGoogleLoginClick} display={"flex"} alignItems={"center"}
                  fontSize={["15pt", "16pt", "18pt", "20pt", "20pt"]}>
                  <Image src={googleIcon} style={{ height: "100%", objectFit: "cover" }} />
                  Sign in with  google
                  {/* <GoogleLoginButton id="goggle" /> */}
                </Button>

              </Box>
              {/* Sign in with google button */}


              <HStack spacing={"0px"} padding={"0pt 20pt"} mt={["15pt", "12pt"]} gap={["2", "3"]} display={"flex"}>
                <Box fontSize={["15pt", "18pt"]} fontWeight={"400"}> New member?</Box>
                <Signup />
              </HStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoginPage;