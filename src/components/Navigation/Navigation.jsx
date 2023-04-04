// @ts-nocheck
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

import './Navigation.scss';
import { useStore } from '../../store/StoreContext';

const Navigation = () => {
  const { productQuantity: cartSize, handleChangeTheme } = useStore();

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleShowProfile = () => {
    navigate('/profile');
  };

  return (
    <header className="container">
      <nav className="subcontainer">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart {cartSize}</Link>
          </li>
        </ul>

        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Button variant="contained" color="error" onClick={handleLogOut}>
            Logout
          </Button>
          <Button onClick={handleShowProfile} variant="contained" color="success">
            Profile
          </Button>
        </Box>
        <Typography color="#fff" onClick={handleChangeTheme}>
          Change mode
        </Typography>
      </nav>
    </header>
  );
};

export default Navigation;
