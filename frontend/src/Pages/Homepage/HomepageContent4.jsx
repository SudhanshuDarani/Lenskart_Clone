import React, { useState, useEffect } from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRouteParams } from "../../redux/setRoutes/paramsActions";
import '../../App.css'
const HomepageContent4 = ({ text, src, index, title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSunglasses = searchParams.getAll("sun glasses");

  const [sunglasses, setSunGlasses] = useState(initialSunglasses || []);
  //handleSunglasses
  const handleSunglases = async () => {
    let newColor = [...sunglasses]
    const value = title
    if (newColor.includes(value)) {
      newColor = newColor.filter((el) => el !== value)
      console.log("current onclick value : ", newColor)
      // navigate(`/eyeglasses?sunglasses=${value}`)
    }
    else {
      newColor.push(value)
      dispatch(setRouteParams({ value }))
      const url = `/eyeglasses?value=${value}`;
      navigate(url)
      // console.log(routeParams.value)
      // navigate(`/eyeglasses?sunglasses=${value}`)
    }
    setSunGlasses(newColor)
  }

  useEffect(() => {
    const params = { sunglasses }
    setSearchParams(params)
  }, [sunglasses])
  return (
    <Box key={index} mt="10" style={{
      display: "flex", flexDirection: "column"
    }}>
      {/* className="textHeading" */}
      <Text className="textHeading" fontSize={["22pt", "23pt", "28pt", "30pt", "26pt"]} pb="7" fontWeight="400" textAlign="center">
        {text}
      </Text>
      <Image cursor={"pointer"} src={src} alt="img" onClick={handleSunglases} />
    </Box>
  );
};

export default HomepageContent4;
