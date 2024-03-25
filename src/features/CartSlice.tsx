import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/interfaces";


interface ICart {
    cart:Product[]
}


const initialState:ICart = {
    cart:[]
}


const cartSlice = createSlice({
    name:"CartSlice",  
    initialState,
    reducers:{
      addToCart:(state,action)=>{
           state.cart.push(action.payload);
      }
    }
})

export const {addToCart} = cartSlice.actions; 
export default cartSlice.reducer;