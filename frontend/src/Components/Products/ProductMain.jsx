import ProductNav from './ProductNav';
import ProductCard from './IndiProduct';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getProducts } from '../../redux/productReducer/action';
import { useLocation, useSearchParams } from 'react-router-dom';
import SkeletonLoader from './SkeletonLoader';
// import { setRouteParams } from "../../redux/setRoutes/paramsActions";
export const ProductMain = (index) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const { products, isLoading, routeParams } = useSelector(state => {
    return {
      products: state.productReducer.products,
      isLoading: state.productReducer.isLoading,
      routeParams: state.paramsReducer.routeParams
    }
  })

  let obj = {
    params: {
      color: searchParams.getAll("color"),
      brand: searchParams.getAll("brand"),
      size: searchParams.getAll("size"),
      shape: searchParams.getAll("shape"),
      //sortObj: searchParams.get("order") && "price",
      orderBy: searchParams.get("order"),
      sunglasses: searchParams.set("values", routeParams.value)
    },
  }

  useEffect(() => {
    dispatch(getProducts(obj))
  }, [location.search])
  if (isLoading) {
    return (
      <SkeletonLoader />
    );
  }

  return (
    <Box key={index} >
      <Box pos={"relative"} w={"100%"} overflow={"hidden"} mt={"0pt"} p={"5pt"}>
        <ProductNav />
      </Box>
      <Grid width={"100%"} h={"128vh"} overflowY={["scroll"]} overflowX={"hidden"} p={["5pt", "10pt"]} mt={"2vh"} display={"flex"}
        flexWrap={"wrap"} justifyContent={["normal", "normal", "center", "normal", "normal"]} gap={"28pt"} css={{
          '&::-webkit-scrollbar': {
            display: "none"
          }
        }} gridTemplateColumns={["repeat(1,1fr)", "repeat(1,1fr)", "repeat(2,1fr)", "repeat(3,1fr)", "repeat(3,1fr)"]} >
        {products.length > 0 && products.map((el) => (
          <>
            {/* {routeParams.value === el.type ? (
              <GridItem mt={"0pt"} display={"flex"} alignItems={"center"} justifyContent={"center"}
                width={["100%", "350pt", "270pt", "250pt", "390pt"]} >
                <ProductCard
                  key={el._id}
                  {...el}
                />
              </GridItem>
            ) : (routeParams === undefined)} */}

            {/* {routeParams === undefined ? (
               <GridItem mt={"0pt"}  display={"flex"} alignItems={"center"} justifyContent={"center"}
                width={["100%", "100%", "270pt", "250pt", "400pt"]} >
                <ProductCard key={el._id}
                  {...el} />
              </GridItem>
            ) :  ""} */}
          </>

        ))}

        {products.length > 0 ? (
            <>
              {routeParams?.value ? (
                products.some(el => el.type === routeParams.value) ? (
                  products.filter(el => el.type === routeParams.value).map(el => (
                    <GridItem key={el._id} mt={"0pt"} display={"flex"} alignItems={"center"} justifyContent={"center"}
                      width={["100%", "350pt", "270pt", "250pt", "390pt"]} >
                      <ProductCard {...el} />
                    </GridItem>
                  ))
                ) : (
                  <GridItem height={"50vh"} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <Text fontSize={"22pt"}>Oops result not found</Text>
                  </GridItem>
                )
              ) : (
                <GridItem height={"50vh"} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                  <Text fontSize={"22pt"}>Oops result not found</Text>
                </GridItem>
              )}
            </>
          ) : (
            <GridItem height={"50vh"} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
              <Text fontSize={"22pt"}>Oops result not found</Text>
            </GridItem>
          )
        }

      </Grid>
    </Box>
  )
}
