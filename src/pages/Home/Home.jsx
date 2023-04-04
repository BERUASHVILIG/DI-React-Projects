// @ts-nocheck
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

import './Home.scss';
import { StoreContext } from '../../store/StoreContext';
import CardItem from '../../components/Card';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // const { handleChangeTheme } = useContext(StoreContext);

  const handleValues = (event) =>
    setProduct((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });

  const handleUpdateProduct = async (editedUser) => {
    const indexOfEditedProduct = products.findIndex((product) => product.id === editedUser.id);
    const updatedProducts = [...products];
    updatedProducts.splice(indexOfEditedProduct, 1, editedUser);
    // updatedProducts[indexOfeEditUser] = editableUser;
    setProducts(updatedProducts);
    await axios(`https://dummyjson.com/products/${editedUser.id}`, {
      method: 'PUT' /* or PATCH */,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...editedUser,
      }),
    });
  };

  const handleDeleteProduct = async (userId) => {
    const updatedProducts = [...products].filter((product) => product.id !== userId);
    setProducts(updatedProducts);
    await axios(`https://dummyjson.com/products/${userId}`, {
      method: 'DELETE',
    });
    // fetch(`https://dummyjson.com/products/${userId}`, {
    //   method: 'DELETE',
    // })
    //   .then((res) => res.json())
    //   .then(console.log);
  };

  useEffect(() => {
    const getUsers = async () => {
      const {
        data: { products },
      } = await axios('https://dummyjson.com/products');
      setProducts(products);
    };
    getUsers();
  }, []);

  useEffect(() => {
    setFilteredProducts(products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase())));
  }, [products, search]);
  return (
    <>
      <Box className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          onChange={(event) => setSearch(event.target.value)}
        />
      </Box>
      <Box className="flex-wrap">
        {filteredProducts.map((product) => {
          // if (editableUser.id === product.id) {
          //   return renderEditableUser(product);
          // }
          return (
            <CardItem
              key={product.id}
              product={product}
              handleDeleteProduct={handleDeleteProduct}
              onUpdateProduct={handleUpdateProduct}
            />
          );
        })}
      </Box>
    </>
  );
}

export default Home;
