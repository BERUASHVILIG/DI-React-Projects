import jwtDecode from 'jwt-decode';

export const isUserAuthenticated = () => {
  const key = localStorage.getItem('token');
  if (!key) return false;
  const tokenExpireData = jwtDecode(key).exp;
  return Date.now() / 1000 < tokenExpireData;
};
