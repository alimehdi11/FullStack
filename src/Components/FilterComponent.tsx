import {  Flex } from "@chakra-ui/react";
import SearchComponent from "./Search Component";
import React from "react";
import { FilterProps } from "../types/interfaces";




const FilterComponent:React.FC<FilterProps> = ({searchText,setSearchText,filterProductsFun}) => {
  return (
    <Flex justify={"center"} mt={4}>
      <SearchComponent searchText={searchText} setSearchText={setSearchText} filterProductsFun={filterProductsFun} />
    </Flex>
  );
};

export default FilterComponent;
