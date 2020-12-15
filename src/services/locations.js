import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_ENDPOINT;
// const baseUrl = 'http://localhost:3001/api/locations';

const getLocations = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const deleteLocation = async (location) => {
  const response = await axios.delete(`${baseUrl}/${location.id}`);
  return response.data;
};

const exports = {
  getLocations,
  deleteLocation,
};

export default exports;
