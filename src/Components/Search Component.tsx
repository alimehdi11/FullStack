import React from "react";
import { Button, HStack, Input } from "@chakra-ui/react";
import { SlMagnifier } from "react-icons/sl";
import { FilterProps } from "../types/interfaces";

const SearchComponent: React.FC<FilterProps> = ({
  searchText,
  setSearchText,
  filterProductsFun,
}) => {
  const handleForm = (e: React.FocusEvent<HTMLDivElement>) => {
    e.preventDefault();
    filterProductsFun();
  };

  return (
    <HStack as={"form"} onSubmit={handleForm} gap={0} w={"500px"}>
      <Input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        type="search"
        rounded={"2xl"}
        size={"lg"}
        border={"1px solid gray"}
        borderEnd={0}
        borderRightRadius={"none"}
        placeholder="Search..."
        _placeholder={{ color: "black" }}
        _focusVisible={{
          outline: "none",
          border: "1px solid gray",
          borderEnd: "none",
        }}
        _hover={{ outline: "none" }}
      />
      <Button
        size={"lg"}
        fontSize={"2xl"}
        rounded={"2xl"}
        variant={"none"}
        border={"1px solid gray"}
        borderStart={0}
        borderLeftRadius={"none"}
        type="submit"
      >
        <SlMagnifier />
      </Button>
    </HStack>
  );
};

export default SearchComponent;
