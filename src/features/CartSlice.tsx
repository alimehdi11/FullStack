import { createSlice } from "@reduxjs/toolkit";
import { cartProduct } from "../types/interfaces";

interface ICart {
  cart: cartProduct[];
  totalAmount: number;
}

const initialState: ICart = {
  cart: [],
  totalAmount: 0,
};

const calculateTotalAmount = (cart: cartProduct[]): number => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload;
      const existingProduct = state.cart.find(
        (product) => product.id === productToAdd.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...productToAdd, quantity: 1 });
      }

      state.totalAmount = calculateTotalAmount(state.cart);
    },

    IncreaseQty: (state, action) => {
      const product = state.cart.find(
        (product) => product.id === action.payload.id
      );

      if (product && product.quantity < product.stock) {
        product.quantity += 1;
      }

      state.totalAmount = calculateTotalAmount(state.cart);
    },

    DecreaseQty: (state, action) => {
      const product = state.cart.find(
        (product) => product.id === action.payload.id
      );

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }

      state.totalAmount = calculateTotalAmount(state.cart);
    },

    deleteCart: (state, action) => {
      const productIdToDelete = action.payload;
      state.cart = state.cart.filter((item) => item.id !== productIdToDelete);

      state.totalAmount = calculateTotalAmount(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, IncreaseQty, DecreaseQty, deleteCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
