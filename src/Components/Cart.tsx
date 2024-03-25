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
  Flex,
} from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { NavLink } from "react-router-dom";
import {
  DecreaseQty,
  IncreaseQty,
  clearCart,
  deleteCart,
} from "../features/CartSlice";
const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { cart, totalAmount } = useSelector(
    (state: RootState) => state.CartSlice
  );

  if (cart.length == 0) {
    return (
      <Flex minH={"90vh"} justify={"center"} alignItems={"center"}>
        <Heading>Cart Is Empty</Heading>
      </Flex>
    );
  }
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
                  <Text>{item.title.split(" ").slice(0, 2).join(" ")}</Text>
                </Td>
                <Td textAlign={"center"}>{item.price}$</Td>
                <Td>
                  <HStack justify={"center"}>
                    <Button
                      size={"sm"}
                      onClick={() => dispatch(DecreaseQty(item))}
                    >
                      <GrPrevious />
                    </Button>
                    <Text>{item.quantity}</Text>
                    <Button
                      size={"sm"}
                      onClick={() => dispatch(IncreaseQty(item))}
                    >
                      <GrNext />
                    </Button>
                  </HStack>
                </Td>
                <Td textAlign={"center"}>{item.price * item.quantity}</Td>
                <Td textAlign={"center"}>
                  <Button
                    variant={"none"}
                    onClick={() => dispatch(deleteCart(item.id))}
                  >
                    <AiFillDelete fontSize={18} color="red" />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack justify={"space-between"}>
        <NavLink to="/products">
          <Button colorScheme="blue">Continue Shopping</Button>
        </NavLink>
        <Button colorScheme="red" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </Button>
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
          <Text>{totalAmount}</Text>
        </HStack>
        <HStack w={"full"} justify={"space-between"}>
          <Text>Shipping Fee</Text>
          <Text>5$</Text>
        </HStack>
        <Divider h={"1.2px"} bg={"black"}></Divider>
        <HStack w={"full"} justify={"space-between"}>
          <Text>Order Total</Text>
          <Text>{totalAmount + 5}$</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Cart;
