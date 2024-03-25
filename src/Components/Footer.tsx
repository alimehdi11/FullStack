import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Flex p={10} bg={"blue.500"} position={"absolute"} top={555} w="full">
      <Heading>Footer</Heading>
    </Flex>
  );
};

export default Footer;
