import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { setRouteParams } from "../../redux/setRoutes/paramsActions";
import "../../App.css"
import { useDispatch } from "react-redux";
const HomepageContent2 = ({ data, index }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialEyeglasses = searchParams.getAll("Eye glasses");
  const [eyeglasses, setEyeGlasses] = useState(initialEyeglasses || []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //handleEyeglasses
  const handleEyeglasses = (e) => {
    let newColor = [...eyeglasses];
    const value = "eye glasses";
    if (newColor.includes(value)) {
      newColor = newColor.filter((el) => el !== value)
      // navigate(`/eyeglasses?value="tested"`)
    }
    else {
      newColor.push(value)
      dispatch(setRouteParams({ value }))
      const url = `/eyeglasses?value=${value}`;
      navigate(url)
      // console.log("routeParams value : ", routeParams.value)
    }
    setEyeGlasses(newColor)
  }

  useEffect(() => {
    const params = { eyeglasses }
    setSearchParams(params)
  }, [eyeglasses])

  return (
    // <Link href="/eyeglasses" style={{ textDecoration: "none", color: "black" }}>  prevArrow={<div className="prev"></div>} nextArrow={<div className="next"></div>}
    <Box key={index} cursor="pointer" p="-1" width={"100%"} >
      <Box height={"100%"}>
        <Slide>
          {data.map((e) => (
            <Box key={e} height={"100%"}>
              {/* <Link to={`/eyeglasses?value`}  style={{ textDecoration: "none", color: "black" }}> */}
              <Image _checked={eyeglasses.includes("eyeglasses")} onClick={handleEyeglasses}
                src={`${e.img}`} alt={e.caption} w="100%" objectFit={"cover"} height={"100%"}
              />
              <Text> {e.title}</Text>
              {/* </Link> */}
            </Box>
          ))}
        </Slide>
      </Box>
    </Box>
    // </Link>
  );
};

export default HomepageContent2;
