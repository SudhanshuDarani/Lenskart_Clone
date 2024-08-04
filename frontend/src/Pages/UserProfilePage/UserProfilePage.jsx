import React, { useState } from "react"
import { Box, Button, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import axios from "axios"

const UserProfilePage = () => {
  // const userData = JSON.parse(localStorage.getItem("userData"));
  // const googleUserData = JSON.parse(localStorage.getItem("googleUserData"));
  // const [userDatas, setUserData] = useState({});
  const [formData, setFormData] = useState({ firstname: '', email: '', phoneNumber: '' });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/v1/auth/profile', formData);
      // Provide feedback to the user
    } catch (error) {
      console.log(error.message)
    }
  };





  return (
    <>
      <Box  display={"flex"} textAlign={"start"} flexDirection={"column"} alignItems={"center"}>
        <Heading fontSize={"35pt"} fontWeight={"600"}>Edit Account Information</Heading>

        <Box p={"10pt"} w={"50%"} gap={"20pt"}>
          <form style={{ gap: "10pt", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }} onSubmit={handleSubmit}>
            <FormControl w={"30%"}>
              <FormLabel fontSize={"18pt"}>First name</FormLabel>
              <Input placeholder='First Name' name="firstname" type="text" onChange={handleChange} fontSize={"14pt"} fontWeight={"500"} value={formData.firstname} />
              {/* (googleUserData) ? googleUserData.name : "" || (userData) ? userData.name : "" */}
            </FormControl>
            <FormControl  w={"30%"}>
              <FormLabel fontSize={"18pt"}>Last name</FormLabel>
              <Input type="text" onChange={handleChange} placeholder='Last Name' fontSize={"14pt"} h={"30pt"} />
            </FormControl>
            <FormControl isRequired w={"30%"}>
              <FormLabel fontSize={"18pt"}>Email</FormLabel>
              <Input type="email" onChange={handleChange} placeholder='Email' name="email" value={formData.email} fontSize={"14pt"} h={"30pt"} />
              {/* (googleUserData) ? googleUserData.email : "" || (userData) ? userData.email : "" */}
            </FormControl>
            <Button fontWeight={"600"} fontSize={"15pt"} colorScheme='blue' w={"30%"} size='md' type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </>
  )
}
export default UserProfilePage 