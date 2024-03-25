import {
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ProductCard from "./ProductCard";

const Products = () => {

 const {products} = useSelector((state:RootState)=>state.ProductSlice2)

  return (
    <>
      <Heading textAlign={"center"} mt={2}>
        All Products
      </Heading>
      <Flex
        justify={"center"}
        wrap={"wrap"}
        w={"90%"}
        mx={"auto"}
        gap={5}
        mt={10}
      >
        {products?.map((card) => (
          <ProductCard key={card.id} {...card}  />
        ))}
      </Flex>
    </>
  );
};

export default Products;
