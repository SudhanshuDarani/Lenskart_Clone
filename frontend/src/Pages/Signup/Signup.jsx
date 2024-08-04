import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Center, Heading, HStack, InputGroup, InputLeftAddon, useDisclosure, Image, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Button, Box, Input, Checkbox, InputRightElement, useToast,Link } from "@chakra-ui/react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Login from "../login/Login"
import validator from "validator";

const baseUrl = "http://localhost:5000";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const intial = {
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  };
  const [userInfo, setUserInfo] = useState(intial);
  const [username, setUserName] = useState();
  const [useraddress, setUserAddress] = useState();
  const [userPhone, setUserPhone] = useState();
  const [usermail, setUserMail] = useState();
  const [userpass, setUserPass] = useState();
  const [error, setError] = useState();
  const [passwordErr, setPassErr] = useState();
  const [phoneError, setphoneErr] = useState();
  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toasts = useToast();
  const validEmail = (email) => {
    return validator.isEmail(email)
  }
  const formFilled = userInfo.name !== '' && userInfo.address !== '' && userInfo.email !== '' && userInfo.password !== '' && userInfo.phone !== ''
  // change the name required
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });

    // if (!validEmail(usermail)) {
    //   setError("Please a enter a valid email address format ")
    // }

    switch (name) {
      case "name":
        setUserName(value);
        break;
      case "address":
        setUserAddress(value);
        break;
      case "phone":
        setUserPhone(value);
        if (value.length < 10 || value.length > 10) {
          setphoneErr("Phone number should 10 digits")
        } else {
          setphoneErr("")
        }
        break;
      case "email":
        setUserMail(value);
        if (!validEmail(value)) {
          setError("Please a enter a valid email address format ")
        } else {
          setError("")
        }
        break;
      case "password":
        setUserPass(value);
        if (value.length < 6 || value.length > 11) {
          setPassErr("Password must be between 6 and 11 characters long");
        } else {
          setPassErr(""); // Clear error if password length is valid
        }
        break;
      default:
        break;
    }
  };
  const showToastMessage = () => {
    toast.success('registered  Successfully !!!', {
      position: toast.POSITION.TOP_RIGHT
    });
  };
  const showtoastMessage = (message) => {
    toast.success(`${message}`, { position: toast.POSITION.TOP_CENTER });
  };
  const navigate = useNavigate();
  const registerUser = async (info) => {
    try {
      setLoading(true)
      const response = await fetch(`${baseUrl}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      }).then(async (response) => {
        const json = await response.json()
        // console.log("registration side json :: ", json)
        if (!error && !phoneError && !passwordErr) {
          if (json.success) {
            localStorage.setItem("userData", JSON.stringify(json.user));
            localStorage.setItem("auth", JSON.stringify(true));
            showToastMessage()
            setTimeout(() => {
              navigate("/")
            }, 1000);
            setUserInfo(intial);
          } else {
            toasts({
              title: `${json.message}`,
              status: "success",
              isClosable: true,
              duration: 4000,
              position: 'top'
            })
            localStorage.removeItem("userData", JSON.stringify(json.user));
            localStorage.removeItem("auth", JSON.stringify(true));
            localStorage.removeItem("userAccessToken", JSON.stringify(json.userAccessToken))
          }
        }
      })
      // .then((out) => {
      //   if (out.success) {
      //     if (out.error !== undefined) {
      //       // alert(out.error);
      //       Swal.fire({
      //         icon: 'info',
      //         // title: 'error',
      //         text: `${out.error}`,
      //         didOpen: () => {
      //           const container = document.querySelector('.swal2-container');
      //           container.style.zIndex = 10000;
      //         }
      //       });
      //     }
      //     if (out.message === "Already Register please login") {
      //       Swal.fire({
      //         icon: 'error',
      //         title: 'error',
      //         text: `${out.message}`,
      //         didOpen: () => {
      //           const container = document.querySelector('.swal2-container');
      //           container.style.zIndex = 10000;
      //         }
      //       });
      //       // alert(out.message);
      //     }

      //     setLoading(false)
      //     console.log("1", out);
      //     console.log("11", out.message);
      //     console.log("111", out.user);

      //     setUserInfo(intial);
      //     navigate("/")
      //   } else {
      //     // Registration failed, handle accordingly
      //     console.log(out.message);
      //     // console.log("2", out);
      //     // console.log('Failed to register user');
      //   }
      // });
    } catch (error) {
      console.log("Error registering user ", error.message);
    } finally {
      setLoading(false)
    }
  };
  const handleRegister = () => {
    registerUser(userInfo);
    setUserName("");
    setUserAddress("");
    setUserPhone("");
    setUserMail("");
    setUserPass("");
  };
  return (
    <div>
      <Center cursor={"pointer"} onClick={onOpen} fontWeight={"500"} fontSize={["10pt", "15pt"]} h={"100%"}
        w="100%">
        Sign Up
      </Center>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={["xlg"]} >
        <ModalOverlay />
        <ModalContent width={["100%", "95%", "90%", "80%", "32%"]} height={["98vh", "85%"]} padding={"5pt"} borderRadius={"12pt"}>

          <ModalBody>
            <Box height={"100%"} display={"flex"} p={["0pt", "24pt"]} flexDirection={"column"}>
            <ModalCloseButton fontSize={["", "20pt"]} marginTop={"8pt"} variant={"unstyled"} />
              <Heading
                fontFamily={"Times, serif"} fontWeight="100" textAlign={"start"}
                fontSize={["20pt", "30pt", "34pt", "35pt", "33pt"]} mb={["10pt", "20pt"]} color={"#333368"}>
                Create an Account 
              </Heading>

              <Input
                type="text" fontSize={["18pt", "27pt", "25pt", "28pt", "22pt"]}
                onChange={handleChange} isRequired={true} focusBorderColor="rgb(206, 206, 223)" color={"#7C7C7C"} name="name"
                placeholder="First Name *" h={["40pt", "50pt", "55pt", "60pt", "55pt"]} borderColor={"rgb(206, 206, 223)"}
                m={["0px 0px 15pt 0px", "8px 0px 30pt 0px", "8px 0px 18pt 0px", "8px 0px 30pt 0px", "8px 0px 20pt 0px"]}
                borderRadius={["5pt", "", "", "", "10pt"]} value={username} required
                padding={["", "0pt 30pt", "0pt 25pt", "0pt 25pt", "0pt 25pt"]} />

              <Input
                fontSize={["18pt", "27pt", "25pt", "28pt", "22pt"]} onChange={handleChange} isRequired={true}
                name="address" type="text" placeholder="Last Name * " h={["40pt", "50pt", "55pt", "60pt", "55pt"]}
                focusBorderColor="rgb(206, 206, 223)" borderColor={"rgb(206, 206, 223)"}
                m={["0px 0px 15pt 0px", "8px 0px 30pt 0px", "8px 0px 18pt 0px", "8px 0px 30pt 0px", "8px 0px 20pt 0px"]}
                borderRadius={"8pt"} value={useraddress} required padding={["", "0pt 30pt", "0pt 25pt", "0pt 25pt", "0pt 25pt"]}
              />
              <InputGroup w="100%" h={["40pt", "50pt", "55pt", "60pt", "55pt"]} fontSize={["18pt", "27pt", "25pt", "28pt", "22pt"]}
                borderRadius="xl" mb={["18pt", "25pt", "13pt", "25pt", "20pt"]}>
                <InputLeftAddon children="+91" h={["40pt", "50pt", "55pt", "60pt", "55pt"]}
                  fontSize={["18pt", "27pt", "25pt", "28pt", "22pt"]} rounded="2xl" bg="whiteAlpha.900" />

                <Input required onChange={handleChange} type="number" name="phone" placeholder="Mobile *"
                  w="100%" h={["40pt", "50pt", "55pt", "60pt", "55pt"]} fontSize={["18pt", "27pt", "25pt", "28pt", "22pt"]}
                  focusBorderColor="rgb(206, 206, 223)" borderColor={"rgb(206, 206, 223)"} rounded="2xl" value={userPhone} />
              </InputGroup>
              {phoneError && (
                <div style={{ color: "red", fontSize: "14pt" }}>{phoneError}</div>
              )}
              <Input
                required onChange={handleChange} fontSize={["18pt", "27pt", "25pt", "28pt", "22pt"]} padding={["", "0pt 25pt"]}
                name="email" placeholder="Email*" h={["40pt", "50pt", "55pt", "60pt", "55pt"]} focusBorderColor="rgb(206, 206, 223)"
                borderColor={"rgb(206, 206, 223)"} borderRadius={"8pt"} value={usermail}
                m={["0px 0px 15pt 0px", "8px 0px 30pt 0px", "8px 0px 18pt 0px", "8px 0px 30pt 0px", "8px 0px 15pt 0px"]} />
              {error && (
                <div style={{ color: "red", fontSize: "14pt", marginBottom: "10pt" }}>{error}</div>
              )}
              <InputGroup position={"relative"}>
                <Input required padding={["", "0pt 25pt"]}
                  onChange={handleChange} fontSize={["18pt", "27pt", "25pt", "28pt", "22pt"]} type={show ? "text" : "password"}
                  borderColor={"rgb(206, 206, 223)"} name="password" placeholder="Password*" h={["40pt", "55pt"]}
                  focusBorderColor="rgb(206, 206, 223)" borderRadius={"8pt"} value={userpass}
                  m={["0px 0px 15pt 0px", "8px 0px 30pt 0px", "8px 0px 18pt 0px", "8px 0px 30pt 0px", "8px 0px 5pt 0px"]} /> <br />
                <InputRightElement position={"absolute"} width={["5rem", "6.5rem"]} height={"100%"} size="xlg" >
                  <Button height={"80%"} outline={"none"} border={"none"} size="lg" borderRadius="xl" onClick={() => setShow(!show)}
                    bg="white" fontSize={["15pt", "20pt"]}>
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {passwordErr && (
                <div style={{ color: "red", fontSize: "14pt", marginTop: "0pt", marginBottom: "10pt" }}>{passwordErr}</div>
              )}

              {/* <HStack w={"100%"} p={"2pt"} mt={["0pt", "10pt"]}>
                <Box cursor={"default"} textDecoration={"underline"} fontFamily={"sans-serif"} color={"#333368"}
                  fontSize={["15pt", "20pt", "", "20pt", "18pt"]}>
                  Got a Referral code?
                </Box>

                <Box cursor={"default"} fontSize={["14pt", "18pt", "", "20pt", "16pt"]} fontFamily={" sans-serif"} color={"#333368"}>
                  (Optional)
                </Box>
              </HStack>

              <HStack w={"100%"} p={"2pt"} fontSize={["24pt", "16pt", "", "28pt", "88pt"]}>
                <Checkbox fontSize={["24pt", "16pt", "", "28pt", "88pt"]} mb={["5pt", "20px"]} mt={["5pt", "20px"]} size="lg"
                  fontFamily={"sans-serif"} >
                  Get Update on whatsapp
                </Checkbox>
                <Image
                  src="https://static.lenskart.com/media/desktop/img/25-July-19/whatsapp.png"
                  w={"22px"} h="22px" />
              </HStack>

              <HStack gap={["0.8rem", "1.2rem", "1rem", "1rem", "0.5rem"]} mt={["0pt", "10pt"]} mb={["10pt", "20pt"]}>
                <Box fontSize={["10pt", "17pt", "20pt", "20pt", "15pt"]} fontFamily={" sans-serif"} fontWeight="100" letterSpacing={"-0.4px"} >
                  By creating this account, you agree to our
                </Box>{"    "}
                <Box fontSize={["8pt", "17pt", "", "20pt", "15pt"]} fontWeight={"700"} textDecoration="underline">
                  Privacy Policy
                </Box>
              </HStack> */}

              <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} mt={["8pt", "18pt"]}>
                {/* isDisabled={!formFilled} */}
                <Button isLoading={loading} isDisabled={!formFilled} onClick={handleRegister} bgColor={"#11daac"}
                  width={["85%", "95%"]} borderRadius={"35px/35px"} color={"#000042"} h={["40pt", "62pt", "", "60pt", "59pt"]}
                  _hover={{ backgroundColor: "#11daac" }} fontFamily={"sans-serif"} fontWeight="300"
                  fontSize={["16pt", "22pt", "", "25pt", "22pt"]}>
                  {loading ? 'Create an Account' : "Create an Account"}
                </Button>
              </Box>


              {/* <Link style={{ textDecoration: "none", color: "black" }} fontWeight={"500"} to="/adminsignup">{" "} or Sign up as Admin?</Link> */}

              <Center mt={["5pt", "18pt", "16pt", "20pt", "14pt"]} fontSize={["15pt", "16pt", "12pt", "20pt", "17pt"]} gap="2">
                Have an account?{" "}
                <Center fontWeight={"500"} gap={"5pt"}>
                  <Login />
                </Center>
              </Center>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Signup;