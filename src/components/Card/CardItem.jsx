// @ts-nocheck
import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Box, Button, Typography } from '@mui/material';
import './CardItem.scss';

const CartProductItem = ({ product, handleDeleteProductFromCart }) => {
  return (
    <Box className="card">
      <Box className="card-header">
        <Avatar src={product.images[0]} width="50px" height="100px" />
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
        <Typography>Quantity: {product.quantity}</Typography>
      </Box>
    </Box>
  );
};

const CardItem = ({
  product,
  handleDeleteProduct,
  onUpdateProduct,
  handleDeleteProductFromCart,
  handleAddProductsToCart,
}) => {
  // @ts-ignore
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
        <Avatar
          src={
            // @ts-ignore
            product.images[0]
          }
          width="50px"
          height="100px"
        />
        <Typography>
          {/* <strong>{product.firstName} </strong>
          <strong> {product.lastName} </strong> */}
          <input
            // @ts-ignore
            value={editableProduct.title}
            name="title"
            // @ts-ignore
            onChange={handlEditValues}
          />
          <input
            // @ts-ignore
            value={editableProduct.lastName}
            name="lastName"
            // @ts-ignore
            onChange={handlEditValues}
          />
        </Typography>
      </Box>
      <Box className="card-info">
        <Typography>
          Phone number:{' '}
          <input
            // @ts-ignore
            value={editableProduct.phone}
            name="phoneNumber"
            // @ts-ignore
            onChange={handlEditValues}
          />
        </Typography>
        <Typography>
          City:{' '}
          <input
            // @ts-ignore
            value={editableProduct.brand}
            name="city"
            // @ts-ignore
            onChange={handlEditValues}
          />
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="success"
        onClick={
          // @ts-ignore
          handleUpdateProduct
        }>
        Update Product
      </Button>
    </Box>
  );

  const renderProduct = () => (
    <Box className="card" key={product.id}>
      <Box className="card-header">
        <Avatar src={product.images[0]} sx={{ width: '150px', height: '100px', borderRadius: '5px', margin: 'auto' }} />
        <Typography>
          <Link to={`product/${product.id}`}>
            <strong>{product.title}</strong>{' '}
          </Link>
        </Typography>
      </Box>
      <Box className="card-info">
        <Typography sx={{ color: '#fff' }}>
          Brand: <strong>{product?.brand}</strong>
        </Typography>
        <Typography sx={{ color: '#fff' }}>
          Category: <strong> {product?.category} </strong>
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="error"
        sx={{ display: 'flex', jusifyContent: 'flex-end', width: '100%' }}
        onClick={() => handleDeleteProduct(product.id)}>
        Delete
      </Button>
      <Box className="card-action">
        <Button variant="contained" sx={{ fontWeight: 'bold' }} onClick={() => handleEditProduct(product)}>
          Edit Product
        </Button>
        <Button variant="contained" sx={{ fontWeight: 'bold' }} onClick={() => handleAddProductsToCart(product)}>
          Add To Cart
        </Button>
      </Box>
    </Box>
  );

  const renderContent = useMemo(() => {
    if (location.pathname === '/cart') {
      return <CartProductItem product={product} handleDeleteProductFromCart={handleDeleteProductFromCart} />;
    }
    if (editableProduct.id) {
      return renderEditableProduct();
    }
    return renderProduct();
  }, [editableProduct.id, product.quantity]);

  return <>{renderContent}</>;
};

export default CardItem;
