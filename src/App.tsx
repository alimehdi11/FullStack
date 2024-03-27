import { AppDispatch } from "./app/store";
import { useGetProductsQuery } from "./features/UserSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "./features/ProductSlice2";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import UserList from "./Components/UserList";
import Form from "./Components/Form";
import Products from "./Components/Products";
import ProductDetails from "./Components/ProductDetails";
import Login from "./Components/Login";
import Protected from "./Components/Protected";
import Cart from "./Components/Cart";

const App = () => {
  const { data: products, isSuccess } = useGetProductsQuery();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setProducts(products));
    }
  }, [products]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>homepage</div>} />
        <Route path="/about" element={<div>aboutpage</div>} />
        <Route path="/admin" element={<Protected comp={<UserList />} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact/" element={<Form />} />
        <Route path="/contact/:id" element={<Form />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
