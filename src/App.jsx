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
import { useStore } from './store/StoreContext';

import { isUserAuthenticated } from './helpers/auth';

const ProtectedRoute = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/product/:id" element={<Product />} />
        <Route index path="/cart" element={<Cart />} />
        <Route index path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated()) navigate('/login');
    if (isUserAuthenticated()) {
      navigate('/');
    }
  }, [isUserAuthenticated()]);

  return (
    <>
      <Routes>
        <Route path="/*" element={<ProtectedRoute />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
