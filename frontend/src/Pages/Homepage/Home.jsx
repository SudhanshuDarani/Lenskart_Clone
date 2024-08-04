import { Box, Image, Text } from "@chakra-ui/react";
import imgtext from "./imgtext.png";
import HomepageContent1 from "./HomepageContent1";
import HomepageContent2 from "./HomepageContent2";
import HomepageContent3 from "./HomepageContent3";
import {
  HompePageitem, HompePageitem10, HompePageitem13, HompePageitem14, HompePageitem4,
  HompePageitem5, HompePageitem6, HompePageitem7, HompePageitem8, HompePageitem9
} from "./HompepageItems";
import { HompePageitem2 } from "./HompepageItems";
import { HompePageitem3 } from "./HompepageItems";
import HomepageContent4 from "./HomepageContent4";
import {
  // HomepageContent5,
  HomepageContent5_I,
  HomepageContent5_II,
  HomepageContent5_III,
} from "./HomepageContent5";
import HomepageContent5 from "./HomepageContent5";
import HomepageContent6 from "./HomepageContent6";
import HomepageContent7 from "./HomepageContent7";
import HomepageContent8 from "./HomepageContent8";
import Footer from "../../Components/Footer/Footer";
import React, { useState, useEffect, } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRouteParams } from "../../redux/setRoutes/paramsActions";
import '../../App.css'

// import { Link } from "@chakra-ui/react";


const Home = (_id, index) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSunglasses = searchParams.getAll("sun glasses");
  const initialEyeglasses = searchParams.getAll("Eye glasses");
  const initialHustle = searchParams.getAll("hustle");
  const initialLenses = searchParams.getAll("lens");
  const [sunglasses, setSunGlasses] = useState(initialSunglasses || []);
  const [eyeglasses, setEyeGlasses] = useState(initialEyeglasses || []);
  const [hustle, setHustle] = useState(initialHustle || []);
  const [lens, setLens] = useState(initialLenses || []);

  const navigate = useNavigate();
  const dispatch = useDispatch()
  // const { routeParams } = useSelector(state => {
  //   return {
  //     // routeParams: state.routeParams,
  //     routeParams: state.paramsReducer.routeParams
  //   }
  // })

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

  const handleEyeglasses = () => {
    let newColor = [...eyeglasses];
    const value = "eye glasses";
    if (newColor.includes(value)) {
      newColor = newColor.filter((el) => el !== value)
    }
    else {
      newColor.push(value)
      dispatch(setRouteParams({ value }))
      const url = `/eyeglasses?value=${value}`;
      navigate(url)
    }
    setEyeGlasses(newColor)
  }

  const handleLens = () => {
    let newColor = [...lens];
    const value = "aqualens";
    if (newColor.includes(value)) {
      newColor = newColor.filter((el) => el !== value);
      console.log(newColor)
    }
    else {
      newColor.push(value)
      dispatch(setRouteParams({ value }))
      const url = `/eyeglasses?value=${value}`;
      navigate(url)
    }
    setLens(newColor)
  }

  const handleHustle = () => {
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
    const params = { sunglasses, eyeglasses, hustle, lens }
    setSearchParams(params)
    // dispatch(setRouteParams(params))
  }, [sunglasses, eyeglasses, hustle, lens])



  return (
    <Box key={index}>
      <HomepageContent1 data={HompePageitem} />
      <HomepageContent2 data={HompePageitem2} />


      <Box mt="20" display={"flex"} justifyContent={"center"}>
        {/* `/eyeglasses?value=${sunglasses}` */}
        {/* <Link to={{ pathname: `/eyeglasses`, state: { sunglasses } }} > */}
        <Image cursor={"pointer"}
          src="https://static1.lenskart.com/media/desktop/img/23apr/summer-sale/home/exrta-60_-off.gif"
          onClick={handleSunglases}
          alt="img" objectFit={"cover"} width={"100%"} />
        {/* </Link> */}
      </Box>
      <Image src="https://static1.lenskart.com/media/desktop/img/Apr22/Bannerforexport.jpg" alt="img"
        mt="10" objectFit={"cover"} width={"100%"} />

      <HomepageContent3 data={HompePageitem3} src={imgtext} />
      <br />
      <br />
      <br />
      <br />
      <HomepageContent4 text="Premium Eyeglasses - Buy 1 Get 1 + Free Membership" title="eye glasses"
        src="https://static1.lenskart.com/media/desktop/img/Feb23/23feb/PREMIUM%20BRANDS%20WEB.jpg" />
      <br />
      <br />
      <br />
      <br />
      <HomepageContent4 text="As Seen on Shark Tank" title={"Hooper"}
        src="https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif" />
      <br />
      <br />
      <br />
      <br />
      <HomepageContent4 text="As Seen On Karan Johar" title={"Hooper"}
        src="https://static1.lenskart.com/media/desktop/img/Dec22/Web_banner.gif" />
      <br />
      <br />
      <br />
      <br />
      <HomepageContent4 text="Trending Sunglasses" title={"sun glasses"}
        src="https://static1.lenskart.com/media/desktop/img/Jan23/sunglasses/Sun-Banner-web.gif" />
      <br />
      <br />
      <HomepageContent4 text="OJOS" title={"eye glasses"}
        src="https://static1.lenskart.com/media/desktop/img/Feb23/23feb/ojos%20banner/ojos%20banner/web%20banner/ojos-web-1199.gif" />
      <br />
      <br />
      <HomepageContent4 text="Aquacolor - Glam Up With Color Lenses" title={"aqualens"}
        src="https://static1.lenskart.com/media/desktop/img/Oct22/kiara/Refresh-Banner-Web.gif" />
      <br />
      <br />
      <br />
      <br />
      <HomepageContent5 />
      <br />
      <br />
      <br />
      <br />
      <Box mt={["5", "10"]} key={index}>
        {/* className="textHeading" */}
        <Text className="textHeading" fontSize={["20pt", "25pt", "30pt", "25pt", "28pt"]} pb="7" fontWeight="400" textAlign="center">
          INTRODUCING OJOS Wear - SUBSCRIBE & SAVE
        </Text>
        <Image cursor={"pointer"} checked={eyeglasses.includes("eyeglasses")} onClick={handleEyeglasses} src="https://static1.lenskart.com/media/desktop/img/May22/ojos-web.jpg" alt="img" w="100%" m="auto" />

      </Box>
      <br />
      <br />
      <br />
      <br />
      <HomepageContent5_I data={HompePageitem4} text="CONTACT LENSES & MORE" title={"aqualens"} />
      <br />
      <br />
      <br />
      <br />
      <HomepageContent5_II data={HompePageitem5} text="BUY IT YOUR WAY" />
      <br />
      <br />
      <br />
      <br />
      <Box mt="-19">
        {/* className="textHeading" */}
        <Text className="textHeading" fontSize="33pt" pb="6" fontWeight="400" textAlign="center">
          OUR BRANDS
        </Text>

        <Image cursor={"pointer"} checked={sunglasses.includes("sunglasses")} onClick={handleSunglases}
          src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/VC-Banner.jpg"
          alt="img" w="100%" m="auto" />

      </Box>
      <Box mt="10">
        {/* <Text fontSize="30px" pb="7" fontWeight="500" textAlign="center"></Text> */}

        <Image cursor={"pointer"} checked={sunglasses.includes("sunglasses")} onClick={handleSunglases}
          src="https://static1.lenskart.com/media/desktop/img/Nov22/Updated%20brand%20banner%20jj%20.jpg"
          alt="img" w="100%" m="auto" />

      </Box>
      <br />
      <br />
      <br />
      <br />
      <HomepageContent6 data={HompePageitem6} text="EYEGLASSES" />
      <br />
      <br />
      <br />
      <br />
      <HomepageContent6 data={HompePageitem7} text="SUNGLASSES" />
      <br />
      <br />
      <br />
      <br />
      <Box mt="10" >
        <Text fontSize="30px" pb="7" fontWeight="500" textAlign="center"></Text>

        <Image onClick={handleSunglases} cursor={"pointer"}
          src="https://static1.lenskart.com/media/desktop/img/Aug21/25-Aug/LK-AIR-Banner.jpg"
          alt="img" w="100%" m="auto" />

      </Box>

      <br />
      <br />
      <br />
      <br />
      <Box mt="10" >
        <Text fontSize="30px" pb="7" fontWeight="500" textAlign="center"></Text>

        <Image onClick={handleEyeglasses} cursor={"pointer"}
          src="https://static1.lenskart.com/media/desktop/img/Aug21/25-Aug/LK-Readers-Banner.jpg"
          alt="img"
          w="100%"
          m="auto"
        />

      </Box>
      <br />
      <br />
      <br />
      <br />
      <HomepageContent6 data={HompePageitem10} text="EYEGLASSES" />
      <br />
      <br />
      <br />
      <br />
      <Box mt="10" >
        <Text fontSize="30px" pb="7" fontWeight="500" textAlign="center"></Text>

        <Image onClick={handleHustle} cursor={"pointer"}
          src="https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/Banner05_Final2ndDec21.jpg"
          alt="img" w="100%" m="auto"
        />

      </Box>
      <br />
      <br />
      <br />
      <br />
      <HomepageContent6
        data={HompePageitem8}
        text="WITH POWER COMPUTER BLU LENSES"
      />
      <br />
      <br />
      <br />
      <br />
      <HomepageContent6
        data={HompePageitem9}
        text="WITH ZERO POWER COMPUTER BLU LENSES"
      />
      <br />
      <br />
      <br />
      <br />
      <Box mt="10">
        <Text fontSize="30px" pb="7" fontWeight="500" textAlign="center"></Text>
        <Image onClick={handleLens} cursor={"pointer"}
          src="https://static1.lenskart.com/media/desktop/img/June22/Our-Brands-Banner.jpg"
          alt="img"
          w="100%"
          m="auto"
        />

      </Box>
      <br />
      <br />
      <Box mt="10">
        <Text fontSize="30px" pb="7" fontWeight="500" textAlign="center"></Text>
        <Image
          src="https://static1.lenskart.com/media/desktop/img/Aug21/25-Aug/whatsapp.png"
          alt="img" w="100%" m="auto" />
      </Box>
      <br />
      <br />
      <br />
      <br />
      <HomepageContent5_III
        data={HompePageitem13}
        text="MEET OUR HAPPY CUSTOMERS"
      />
      <HomepageContent7 />
      <HomepageContent8 data={HompePageitem14} />
      <Footer />
    </Box>
  );
};

export default Home;
