import React, { useState, useEffect } from "react";
import { Box, Grid, Text, Image, Center } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRouteParams } from "../../redux/setRoutes/paramsActions";
const HomepageContent1 = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSunglasses = searchParams.getAll("sun glasses");
  const initialEyeglasses = searchParams.getAll("Eye glasses");
  const initialProgressiveLenses = searchParams.getAll("progressive lense");
  const initialLenses = searchParams.getAll("lens");
  const [sunglasses, setSunGlasses] = useState(initialSunglasses || []);
  const [eyeglasses, setEyeGlasses] = useState(initialEyeglasses || []);
  const [progressiveLense, setProgressiveLense] = useState(initialProgressiveLenses || []);
  const [lens, setLens] = useState(initialLenses || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handleSunglasses
  const handleSunglases = async () => {
    let newColor = [...sunglasses]
    const value = "sun glasses"
    if (newColor.includes(value)) {
      newColor = newColor.filter((el) => el !== value)
    }
    else {
      newColor.push(value);
      dispatch(setRouteParams({ value }));
      const url = `/eyeglasses?value=${value}`;
      navigate(url);
    }
    setSunGlasses(newColor);
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
  }
  //handlelens
  const handleLens = () => {
    let newColor = [...lens];
    const value = "aqualens";
    if (newColor.includes(value)) {
      newColor = newColor.filter((el) => el !== value);
    }
    else {
      newColor.push(value);
      dispatch(setRouteParams({ value }));
      const url = `/eyeglasses?value=${value}`;
      navigate(url);
    }
    setLens(newColor)
  }
  const handleProgressiveLens = async () => {
    let newColor = [...sunglasses]
    const value = "progressive lense"
    if (newColor.includes(value)) {
      newColor = newColor.filter((el) => el !== value)
    }
    else {
      newColor.push(value);
      dispatch(setRouteParams({ value }));
      const url = `/eyeglasses?value=${value}`;
      navigate(url);
    }
    setProgressiveLense(newColor);
  }
  useEffect(() => {
    const params = { sunglasses, eyeglasses, progressiveLense, lens }
    setSearchParams(params)
  }, [sunglasses, eyeglasses, progressiveLense, lens])
  return (
    <Box mb="2" cursor="default" bgColor="#f5f5f5" p="4" w="100%" >
      <Grid
        templateColumns={{
          base: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
          xl: "repeat(6,1fr)",
          "2xl": "repeat(6,1fr)",
        }} gap={6} w="99%" m="auto">

        {data.map((e) => (
          <Box key={e.id} zIndex={"0"} cursor={"default"}
            flexDirection="column" borderRadius="md" bgColor="white" p="2" justifyContent={"space-between"}>
            <Center zIndex={"0"}>
              {/* <Link to={`/eyeglasses`} style={{ textDecoration: "none", color: "black" }}> */}
              {/* <Image src={`${e.image}`} alt={e.name} w="100%" /> */}
              {/* </Link> */}
            </Center>
            <Box >
              {(e.title === "Eyeglasses") ? (
                <>
                  <Image src={`${e.image}`} alt={e.name} w="100%" cursor={"pointer"}
                    onClick={handleEyeglasses} />
                  <Text cursor={"pointer"} color="gray" fontSize="16pt" fontWeight="400" onClick={handleEyeglasses}>
                    {e.title}
                  </Text>
                </>
              ) : ""}
              {(e.title === "Sunglasses") ? (
                <>
                  <Image src={`${e.image}`} alt={e.name} w="100%" cursor={"pointer"}
                    onClick={handleSunglases} />
                  <Text cursor={"pointer"} color="gray" fontSize="16pt" fontWeight="400" onClick={handleSunglases}>
                    {e.title}
                  </Text>
                </>
              ) : ""}
              {(e.title === "Computer Glasses") ? (
                <>
                  <Image cursor={"pointer"} onClick={handleEyeglasses} src={`${e.image}`} alt={e.name}
                    w="100%" />
                  <Text cursor={"pointer"} color="gray" fontSize="16pt" fontWeight="400" onClick={handleEyeglasses}>
                    {e.title}
                  </Text>
                </>
              ) : ""}
              {(e.title === "Contact lenses") ? (
                <>
                  <Image src={`${e.image}`} alt={e.name} w="100%" cursor={"pointer"}
                    onClick={handleLens} />
                  <Text cursor={"pointer"} color="gray" fontSize="16pt" fontWeight="400" onClick={handleLens}>
                    {e.title}
                  </Text>
                </>
              ) : ""}
              {(e.title === "Power Sunglases") ? (
                <>
                  <Image src={`${e.image}`} cursor={"pointer"} onClick={handleSunglases} alt={e.name}
                    w="100%" />
                  <Text cursor={"pointer"} color="gray" fontSize="16pt" fontWeight="400" onClick={handleSunglases}>
                    {e.title}
                  </Text>
                </>
              ) : ""}
              {(e.title === "Progressive Lenses") ? (
                <>
                  <Image src={`${e.image}`} alt={e.name} w="100%" cursor={"pointer"}
                    onClick={handleProgressiveLens} />
                  <Text cursor={"pointer"} color="gray" fontSize="16pt" fontWeight="400"
                    onClick={handleProgressiveLens}>
                    {e.title}
                  </Text>
                </>
              ) : ""}

            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default HomepageContent1;
