// @ts-nocheck
import { useMemo, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.scss';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Profile from './pages/Profile';

import { isUserAuthenticated } from './helpers/auth';

const ProtectedRoutes = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddProductsToCart = (product) => {
    // onAddItemsToCart((prev) => {
    //   const isProductExist = prev.find((item) => item.id === product.id);
    //   if (isProductExist) {
    //     return prev.map((item) => {
    //       if (item.id === product.id) {
    //         return { ...item, quantity: item.quantity + 1 };
    //       }
    //       return item;
    //     });
    //   }
    //   return [...prev, { ...product, quantity: 1 }];
    // });
    setCartItems((prev) => {
      const indexOfItem = prev.findIndex((item) => item.id === product.id);
      if (indexOfItem === -1) {
        return [...prev, { ...product, quantity: 1 }];
      }
      const newProducts = [...prev];
      const existingProduct = newProducts[indexOfItem];
      const updatedProduct = { ...existingProduct, quantity: existingProduct.quantity + 1 };
      newProducts[indexOfItem] = updatedProduct;
      return newProducts;
    });
  };

  const handleDeleteProductFromCart = (id) => {
    setCartItems((prev) => {
      const indexOfItem = prev.findIndex((item) => item.id === id);
      if (indexOfItem === -1) {
        return prev;
      }
      const newProducts = [...prev];
      const existingProduct = newProducts[indexOfItem];
      const updatedProduct = { ...existingProduct, quantity: existingProduct.quantity - 1 };
      if (updatedProduct.quantity === 0) {
        newProducts.splice(indexOfItem, 1);
        return newProducts;
      }
      newProducts[indexOfItem] = updatedProduct;
      return newProducts;
    });
  };

  const productQuantity = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  return (
    <>
      <Navigation cartSize={productQuantity} />
      <Routes>
        <Route
          index
          path="/"
          element={
            <Home
              handleAddProductsToCart={handleAddProductsToCart}
              handleDeleteProductFromCart={handleDeleteProductFromCart}
            />
          }
        />
        <Route
          index
          path="/product/:id"
          element={
            <Product
              handleAddProductsToCart={handleAddProductsToCart}
              handleDeleteProductFromCart={handleDeleteProductFromCart}
            />
          }
        />
        <Route
          index
          path="/cart"
          element={<Cart cartItems={cartItems} handleDeleteProductFromCart={handleDeleteProductFromCart} />}
        />
      </Routes>
    </>
  );
};

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUserAuthenticated()) navigate('/login');
    if (isUserAuthenticated()) navigate('/');
  }, [isUserAuthenticated()]);
  return (
    <>
      <Routes>
        <Route path="/*" element={<ProtectedRoutes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
