import React from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
  Button,
  HStack,
  Text,
  Box,
  Heading,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
const Cart: React.FC = () => {
  const { cart } = useSelector((state: RootState) => state.CartSlice);
  return (
    <Box w={"100%"} maxW={"1200px"} mx={"auto"} mt={5} px={5}>
      <Heading>Cart Items</Heading>
      <TableContainer my={5} py={6} borderBlock={"2px solid black"}>
        <Table>
          <Thead>
            <Tr>
              {["S.No", "Item", "Price", "Quantity", "SubTotal", "Remove"].map(
                (item) => (
                  <Th textAlign={"center"} key={item}>
                    {item}
                  </Th>
                )
              )}
            </Tr>
          </Thead>
          <Tbody>
            {cart.map((item, i) => (
              <Tr key={i}>
                <Td textAlign={"center"}>{++i}</Td>
                <Td display={"flex"} gap={5} alignItems={"center"}>
                  <Image src={item.image} w={10} alt="" />
                  <Text>{item.title.split(" ").slice(0, 4).join(" ")}</Text>
                </Td>
                <Td textAlign={"center"}>{item.price}$</Td>
                <Td>
                  <HStack justify={"center"}>
                    <Button size={"sm"}>
                      <GrPrevious />
                    </Button>
                    <Text>1</Text>
                    <Button size={"sm"}>
                      <GrNext />
                    </Button>
                  </HStack>
                </Td>
                <Td textAlign={"center"}>100</Td>
                <Td textAlign={"center"}>
                  <Button variant={"none"}>
                    <AiFillDelete fontSize={18} color="red" />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack justify={"space-between"}>
        <Button colorScheme="blue">Continue Shopping</Button>
        <Button colorScheme="red">Clear Cart</Button>
      </HStack>
      <VStack
        bg={"gray.200"}
        w={"fit-content"}
        minW={"260px"}
        p={7}
        ms={"auto"}
        mt={4}
        gap={3}
      >
        <HStack w={"full"} justify={"space-between"}>
          <Text>SubTotal</Text>
          <Text>2000$</Text>
        </HStack>
        <HStack w={"full"} justify={"space-between"}>
          <Text>Shipping Fee</Text>
          <Text>2000$</Text>
        </HStack>
        <Divider h={"1.2px"} bg={"black"}></Divider>
        <HStack w={"full"} justify={"space-between"}>
          <Text>Order Total</Text>
          <Text>2000$</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Cart;
