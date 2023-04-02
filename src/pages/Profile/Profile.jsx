import React from 'react';
import { Button, Typography } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './profile.scss';

const Profile = () => {
  const navigate = useNavigate();
  const decodeToken = localStorage.getItem('token');
  const user = jwtDecode(decodeToken);

  const handleLogOut = () => {
    navigate('/login');
  };

  const handleBackHome = () => {
    navigate('/');
  };
  const handleBackCart = () => {
    navigate('/cart');
  };
  return (
    <div className="profile-container">
      <Button
        onClick={handleLogOut}
        variant="contained"
        color="error"
        sx={{ display: 'flex', justifyContent: 'flex-end', float: 'right' }}>
        Log Out
      </Button>
      <img src={user.image} width={'300px'} />
      <Typography>
        username: <strong>{user.username}</strong>
      </Typography>
      <Typography>
        Firstname: <strong>{user.firstName}</strong>
      </Typography>
      <Typography>
        Lastname: <strong>{user.lastName}</strong>
      </Typography>
      <Typography>
        Email: <strong>{user.email}</strong>
      </Typography>
      <div className="profile-action">
        <Button onClick={handleBackHome} variant="contained" color="primary" sx={{ border: '3px solid #fff' }}>
          Back-Home
        </Button>
        <Button onClick={handleBackCart} variant="contained" color="success" sx={{ border: '3px solid #fff' }}>
          Back-Cart
        </Button>
      </div>
    </div>
  );
};

export default Profile;
