import axios from 'axios';

const baseUrl = process.REACT_APP_API_ENDPOINT;
// const baseUrl = 'http://localhost:3001/api/locations';

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/pending`);
  return response.data;
};

const updateLocation = async (location) => {
  const response = await axios.post(baseUrl, location);
  return response.data;
};

const deleteLocation = async (location) => {
  const response = await axios.delete(`${baseUrl}/pending/${location.id}`);
  return response.data;
};


const exports = {
  getAll,
  updateLocation,
  deleteLocation,
};

export default exports;
