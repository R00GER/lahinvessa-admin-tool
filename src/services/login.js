import axios from 'axios';

const baseURL = process.env.REACT_APP_API_LOGIN_ENDPOINT;
// const baseURL = 'http://localhost:3001/api/login';

const login = async (user) => {
  const response = await axios.post(baseURL, user);
  return response.data;
};

const exports = {
  login,
};

export default exports;
