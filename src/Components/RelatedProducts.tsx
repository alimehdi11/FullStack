import { Flex, Heading } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const RelatedProducts = ({ cat ,id }: { cat: string,id?:string }) => {
  const { products } = useSelector((state: RootState) => state.ProductSlice2);
  return (
    <>
      <Heading
        w={"83%"}
        mx={"auto"}
        textTransform={"capitalize"}
        fontSize={30}
        mt={3}
      >
        {cat} Products
      </Heading>
      <Flex
        justify={{ base: "center", md: "start" }}
        mx="auto"
        wrap={"wrap"}
        w={"90%"}
        gap={5}
        my={5}
      >
        {products
          ?.filter((item) => (item?.category == cat && item.id != id) )
          .map((card) => (
            <ProductCard key={card?.id} {...card} />
          ))}
      </Flex>
    </>
  );
};

export default RelatedProducts;
