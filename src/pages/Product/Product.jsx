// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { Box } from '@mui/material';

import { useStore } from '../../store/StoreContext';

const Product = () => {
  const { id } = useParams();
  const { handleAddProductsToCart } = useStore();

  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const { data: product } = await axios(`https://dummyjson.com/products/${id}`);
      setProduct(product);
    };

    getProduct();
  }, []);

  return (
    <>
      <Link to="/">Back</Link>
      <Box>
        <img src={product?.images?.[0]} alt="avatar" />
        <h1>{product?.title}</h1>
        <h2>Price: {product?.price}</h2>
        <h2>Brand: {product?.brand}</h2>
      </Box>
      <h2 onClick={() => handleAddProductsToCart(product)}>Add to Cart</h2>
    </>
  );
};

export default Product;
