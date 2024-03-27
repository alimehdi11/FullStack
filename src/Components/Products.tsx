import { Flex, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ProductCard from "./ProductCard";
import FilterComponent from "./FilterComponent";
import { useState } from "react";
import { Product } from "../types/interfaces";

const Products = () => {
  const { products } = useSelector((state: RootState) => state.ProductSlice2);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const filterProductsFun = () => {
    const filteredItems = products.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filteredItems);
  };

  return (
    <>
      {filteredProducts.length == 0 && searchText && (
        <Heading textAlign={"center"} mt={8}>
          All Products
        </Heading>
      )}

      <FilterComponent
        filterProductsFun={filterProductsFun}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <Flex
        justify={"center"}
        wrap={"wrap"}
        w={"90%"}
        mx={"auto"}
        gap={5}
        mt={10}
      >
        {filteredProducts.map((card) => (
          <ProductCard key={card.id} {...card} />
        ))}

        {searchText && filteredProducts.length == 0 && (
          <Heading>Search No Result</Heading>
        )}
      </Flex>
    </>
  );
};

export default Products;
