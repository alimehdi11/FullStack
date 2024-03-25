import { Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { Product } from "../../types/interfaces";
import { addToCart } from "../../features/CartSlice";
interface AddCartBtnProps {
  product: Product;
}

const AddCartBtn: React.FC<AddCartBtnProps> = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <Button colorScheme="blue" onClick={() => dispatch(addToCart(product))}>
      Add To Cart
    </Button>
  );
};

export default AddCartBtn;
