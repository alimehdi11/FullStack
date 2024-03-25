import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../features/UserSlice";
// import { productApi } from "../features/ProductSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import ProductSlice2 from "../features/ProductSlice2";
import AuthSlice from "../features/AuthSlice";
import CartSlice from "../features/CartSlice";
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    // [productApi.reducerPath]: productApi.reducer,
    ProductSlice2,
    AuthSlice,
    CartSlice    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
