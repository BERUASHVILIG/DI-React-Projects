// @ts-nocheck
import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Stack } from '@mui/material';

import './CardItem.scss';
import { useStore } from '../../store/StoreContext';

const CartProductItem = ({ product }) => {
  const { handleDeleteProductFromCart } = useStore();
  return (
    <Box className="card">
      <Box className="card-header">
        <img src={product.images[0]} width="50px" height="100px" />
        <Typography>
          <Link to={`product/${product.id}`}>
            <strong>{product.title}</strong>{' '}
          </Link>
        </Typography>
        <Typography
          style={{ color: 'red', cursor: 'pointer', marginLeft: 2 }}
          onClick={() => handleDeleteProductFromCart(product.id)}>
          Remove
        </Typography>
      </Box>
      <Box className="card-info">
        <Typography>
          Brand: <strong>{product?.brand}</strong>
        </Typography>
        <Typography>
          Category: <strong> {product?.category} </strong>
        </Typography>
        <Typography>
          Quantity: <strong>{product.quantity}</strong>{' '}
        </Typography>
      </Box>
    </Box>
  );
};

const CardItem = ({ product, handleDeleteProduct, onUpdateProduct }) => {
  const { handleAddProductsToCart } = useStore();

  const [editableProduct, setEditableProduct] = useState({});

  const location = useLocation();

  const handleEditProduct = (product) => {
    setEditableProduct((prev) => {
      if (prev.id === product.id) {
        return {};
      }
      return product;
    });
  };

  const handlEditValues = (event) => {
    setEditableProduct((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleUpdateProduct = () => {
    onUpdateProduct?.(editableProduct);
    setEditableProduct({});
  };

  // @ts-ignore
  const renderEditableProduct = () => (
    <Box className="card">
      <Box className="card-header">
        <img
          src={
            // @ts-ignore
            product.images[0]
          }
          width="50px"
          height="100px"
        />
        <span>
          <input value={editableProduct.title} name="title" onChange={handlEditValues} />
          <input value={editableProduct.lastName} name="lastName" onChange={handlEditValues} />
        </span>
      </Box>
      <Box className="card-info">
        <span>
          Phone number: <input value={editableProduct.phone} name="phoneNumber" onChange={handlEditValues} />
        </span>
        <span>
          City:{' '}
          <input
            // @ts-ignore
            value={editableProduct.brand}
            name="city"
            // @ts-ignore
            onChange={handlEditValues}
          />
        </span>
      </Box>
      <Button
        onClick={
          // @ts-ignore
          handleUpdateProduct
        }>
        Update Product
      </Button>
    </Box>
  );

  const renderProduct = () => (
    <Box className="card">
      <Box className="card-header">
        <img src={product.images[0]} width="50px" height="100px" />
        <Typography>
          <Link to={`product/${product.id}`}>
            <strong>{product.title}</strong>{' '}
          </Link>
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ cursor: 'pointer', marginLeft: 2 }}
          onClick={() => handleDeleteProduct(product.id)}>
          Delete
        </Button>
      </Box>
      <Box className="card-info">
        <Typography color="text">
          Brand: <strong>{product?.brand}</strong>
        </Typography>
        <Typography>
          Category: <strong> {product?.category} </strong>
        </Typography>
      </Box>
      <Button variant="outlined" color="info" onClick={() => handleEditProduct(product)}>
        Edit Product
      </Button>
      <Button
        variant="contained"
        color="success"
        sx={{ marginTop: '10px' }}
        onClick={() => handleAddProductsToCart(product)}>
        Add To Cart
      </Button>
    </Box>
  );

  const renderContent = useMemo(() => {
    if (location.pathname === '/cart') {
      return <CartProductItem product={product} />;
    }
    if (editableProduct.id) {
      return renderEditableProduct();
    }
    return renderProduct();
  }, [editableProduct.id, product.quantity]);

  return <>{renderContent}</>;
};

export default CardItem;
