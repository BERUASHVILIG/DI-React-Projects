import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import './Navigation.scss';

const Navigation = ({ cartSize }) => {
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
        <div className="navigation-action">
          <Button
            onClick={handleLogOut}
            variant="contained"
            color="error"
            sx={{ fontSize: '13px', border: '2px solid black' }}>
            LOG OUT
          </Button>
          <Button
            onClick={handleShowProfile}
            variant="contained"
            color="success"
            sx={{ fontSize: '13px', border: '2px solid black' }}>
            Profile
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
