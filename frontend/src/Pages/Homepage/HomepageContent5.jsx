import React from "react";
import { Box, Text, Image, Grid, Link } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRouteParams } from "../../redux/setRoutes/paramsActions";
import "../../App.css"



const HomepageContent5 = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSunglasses = searchParams.getAll("sun glasses");
  const initialEyeglasses = searchParams.getAll("Eye glasses");
  const initialHustle = searchParams.getAll("hustle");
  const [sunglasses, setSunGlasses] = useState(initialSunglasses || []);
  const [eyeglasses, setEyeGlasses] = useState(initialEyeglasses || []);
  const [hustle, setHustle] = useState(initialHustle || []);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  //handleSunglasses
  const handleSunglases = async () => {
    let newColor = [...sunglasses]
    const value = "sun glasses"
    if (newColor.includes(value)) {
      newColor = newColor.filter((el) => el !== value)
    }
    else {
      newColor.push(value);
      dispatch(setRouteParams({ value }))
      const url = `/eyeglasses?value=${value}`;
      // console.log("routeParams value : ", routeParams.value)
      navigate(url)
    }
    setSunGlasses(newColor)
  }
  //handleEyeglasses
  const handleEyeglasses = () => {
    let newColor = [...eyeglasses];
    const value = "eye glasses";
    if (newColor.includes(value)) {
      newColor = newColor.filter((el) => el !== value)
    }
    else {
      newColor.push(value);
      dispatch(setRouteParams({ value }));
      const url = `/eyeglasses?value=${value}`;
      navigate(url);
    }
    setEyeGlasses(newColor)
  };

  //handleHustle
  const handleHustle = (e) => {
    let newColor = [...hustle];
    const value = "Hooper";
    if (newColor.includes(value)) {
      newColor = newColor.filter((el) => el !== value)
    }
    else {
      newColor.push(value)
      dispatch(setRouteParams({ value }))
      const url = `/eyeglasses?value=${value}`;
      navigate(url)
    }
    setHustle(newColor)
  }
  useEffect(() => {
    const params = { sunglasses, eyeglasses, hustle }
    setSearchParams(params)
    // dispatch(setRouteParams(params))
  }, [sunglasses, eyeglasses, hustle])
  return (
    <Box w="85%" m="auto" >
      {/* className="textHeading" */}
      <Text className="textHeading" fontSize={["32pt"]} pb="7" fontWeight="400" textAlign="center">
        FIND THE PERFECT FIT
      </Text>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)", md: "repeat(2,1fr)", lg: "repeat(2,1fr)",
          xl: "repeat(2,1fr)", "2xl": "repeat(2,1fr)",
        }} >
        <Box>
          <Image cursor={"pointer"}
            src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/eye-square10.jpg"
            alt="img" p="2" w={"100%"} onClick={handleEyeglasses} />

          <Image cursor={"pointer"}
            src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/power-sun-square.jpg"
            alt="img" p="2" w={"100%"} objectFit={"cover"} onClick={handleSunglases} />

        </Box>
        <Box>
          <Image cursor={"pointer"} onClick={handleEyeglasses}
            src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/ce-square.jpg"
            alt="img" p="2" w={"100%"} />

          <Image cursor={"pointer"} onClick={handleSunglases}
            src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/sun-square.jpg"
            alt="img" p="2" w={"100%"} />

          <Image cursor={"pointer"} w={"100%"} onClick={handleHustle}
            src="https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/Banner03_TileDesktop.jpg"
            alt="img" p="2" />

        </Box>
      </Grid>
    </Box>
  );
};

export const HomepageContent5_I = ({ data, text, title }) => {
  //handleHustle
  const [searchParams, setSearchParams] = useSearchParams();
  const initialHustle = searchParams.getAll("aqua lens");
  const [hustle, setHustle] = useState(initialHustle || []);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleHustle = (e) => {
    let newColor = [...hustle];
    const value = "aqualens";
    if (newColor.includes(value)) {
      newColor = newColor.filter((el) => el !== value)
      console.log(newColor)
    }
    else {
      newColor.push(value)
      dispatch(setRouteParams({ value }))
      const url = `/eyeglasses?value=${value}`;
      navigate(url)
    }
    setHustle(newColor)
  }
  useEffect(() => {
    const params = { hustle }
    setSearchParams(params)
    // dispatch(setRouteParams(params))
  }, [hustle])
  return (
    <Box w="100%" m="auto" cursor={"default"} display={"flex"} alignItems={"center"} flexDirection={"column"}>
      {/* className="textHeading" */}
      <Text className="textHeading" fontSize={["33pt"]} pb="7" fontWeight="400" textAlign="center">
        {text}
      </Text>
      <Grid width={"80%"} gap={"2rem"}
        display={"flex"} justifyContent={"space-between"}
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(1,1fr)",
          lg: "repeat(2,1fr)",
          xl: "repeat(2,1fr)",
          "2xl": "repeat(2,1fr)",
        }}>
        {data.map((e) => (
          <Box key={e} width={"100%"}>
            <Image height={"100%"} cursor={"pointer"} width={"100%"} src={`${e.img}`} alt={e.caption} onClick={handleHustle} />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export const HomepageContent5_II = ({ data, text }) => {
  return (
    <Box w="95%" m="auto" cursor={"default"}>
      {/* className="textHeading" */}
      <Text className="textHeading" fontSize="35pt" pb="7" fontWeight="400" textAlign="center">
        {text}
      </Text>
      <Grid cursor={"default"} gap={6}
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(1,1fr)",
          lg: "repeat(2,1fr)",
          xl: "repeat(2,1fr)",
          "2xl": "repeat(2,1fr)",
        }}>
        {data.map((e) => (
          <Box key={e} cursor={"default"}>
            {/* <Link href="/eyeglasses" style={{ textDecoration: "none", color: "black" }}> */}
            <Image w={"100%"} src={`${e.img}`} alt={e.caption} />

          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export const HomepageContent5_III = ({ data, text }) => {
  return (
    <Box bgColor="#fff092" pb="5%" pt="2%"  >
      <Box w="90%" m="auto" >
        <Text className="textHeading" fontSize="30px" pb="7" fontWeight="500" textAlign="center" fontFamily="futurastd-medium">
          {text}
        </Text>
        <Grid
          templateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(1,1fr)",
            lg: "repeat(2,1fr)",
            xl: "repeat(3,1fr)",
            "2xl": "repeat(3,1fr)",
          }}
          gap={6} w="100%">
          {data.map((e) => (
            <Box key={e}>
              <Link href="/eyeglasses" style={{ textDecoration: "none", color: "black" }}>
                <ReactPlayer url={e.img} width="100%" height="300px" />
              </Link>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default HomepageContent5