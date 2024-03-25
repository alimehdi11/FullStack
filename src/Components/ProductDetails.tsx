import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import RelatedProducts from "./RelatedProducts";
import { Box, Flex, Text, Image, VStack } from "@chakra-ui/react";
import Stars from "./Stars";
import AddCartBtn from "./Buttons/AddCartBtn";

const ProductDetails = () => {
  const { products } = useSelector((state: RootState) => state.ProductSlice2);
  const { id } = useParams();
  const product = products?.find((item) => item.id == id);

  const otherProducts = [
    ...new Set(
      products
        ?.map((item) => item.category)
        .filter((item) => item != product?.category)
    ),
  ];
  return (
    <>
      {/* selected Product */}
      <Flex
        px={9}
        justify={"center"}
        alignItems={"center"}
        direction={{ base: "column", md: "row" }}
        my={10}
        gap={5}
      >
        <Box flexBasis={{ md: "40%", xl: "25%" }}>
          <Image
            src={product?.image}
            alt="product"
            objectFit={"contain"}
            h={200}
            w={"100%"}
            mx={"auto"}
          />
        </Box>
        <VStack flexBasis={{ md: "50%" }} alignItems={"start"} spacing={1}>
          <Text fontWeight={400} fontSize={22}>
            {product?.title}
          </Text>
          <Text fontWeight={400}>{product?.description}</Text>
          <Text fontWeight={400}>Rating : {product?.rating.rate}</Text>
          <Stars rating={Number(product?.rating?.rate)}></Stars>
          <Text pl={1}>Reviews : {product?.rating?.count}</Text>
          <AddCartBtn product={product!} />
        </VStack>
      </Flex>

      {/* related Products */}
      <RelatedProducts cat={product!?.category} id={id} />

      {/* otherProducts Products */}
      {otherProducts.map((item, index) => (
        <RelatedProducts cat={item} key={index} />
      ))}
    </>
  );
};

export default ProductDetails;
