import { Button } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../types/interfaces';
import { addToCart } from '../../features/CartSlice';
import { RootState } from '../../app/store';
interface AddCartBtnProps {
  product: Product;
}

const AddCartBtn: React.FC<AddCartBtnProps> = ({ product }) => {
  
  const {cart} = useSelector((state:RootState)=>state.CartSlice);
  console.log(cart)
  const dispatch = useDispatch();
  return (
    <Button colorScheme="blue" onClick={() => dispatch(addToCart(product))}>
      Add To Cart
    </Button>
  );
};

export default AddCartBtn;
