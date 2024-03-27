import { Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { Product } from "../../types/interfaces";
import { addToCart } from "../../features/CartSlice";
import { toast } from "react-toastify";
interface AddCartBtnProps {
  product: Product;
}

const AddCartBtn: React.FC<AddCartBtnProps> = ({ product }) => {
  const dispatch = useDispatch();
  const handleCart = () => {
    toast.success(`${product.title.split(" ").slice(0, 2)} has been added to the cart`);
    dispatch(addToCart(product));
  };
  return (
    <Button colorScheme="blue" onClick={handleCart}>
      Add To Cart
    </Button>
  );
};

export default AddCartBtn;
