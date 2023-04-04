// @ts-nocheck
import React from 'react';
import './Cart.scss';
import { Box } from '@mui/material';

import CardItem from '../../components/Card';
import { useStore } from '../../store/StoreContext';

const Cart = () => {
  const { cartItems } = useStore();
  return (
    <>
      <h1>This is your cart</h1>
      <Box className="cart-container">
        {cartItems.map((product) => {
          return <CardItem key={product.id} product={product} />;
        })}
      </Box>
    </>
  );
};

export default Cart;
