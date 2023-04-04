import React from 'react';
import { Box, Typography } from '@mui/material';
import jwtDecode from 'jwt-decode';
import './Profile.scss';

const Profile = () => {
  const decodedToken = localStorage.getItem('token');
  const user = jwtDecode(decodedToken);
  return (
    <Box className="profile-container">
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
    </Box>
  );
};

export default Profile;
