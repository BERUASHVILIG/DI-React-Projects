// @ts-nocheck
import React from 'react';

import CardItem from '../../components/Card';

const Cart = ({ cartItems, handleDeleteProductFromCart }) => {
  return (
    <>
      <h1>This is your cart</h1>
      {cartItems.map((product) => {
        return (
          <CardItem key={product.id} product={product} handleDeleteProductFromCart={handleDeleteProductFromCart} />
        );
      })}
    </>
  );
};

export default Cart;
