import axios from '../axios';

class APIService {
  static getAllDrivers = () => {
    return axios.get('/api/v1/drivers/');
  };

  static deleteUser = (id) => {
    return axios.delete(`/api/v1/drivers/${id}`);
  };

  static loginUser = (request) => {
    return axios.post('/auth/', request);
  };

  static createNewUser = (request) => {
    return axios.post('/api/v1/users', request);
  };

  static createNewToken = (request) => {
    return axios.post('/auth/', request);
  };

  static updateIndividualDriver = (id, postData) => {
    return axios.put(`/api/v1/drivers/${id}`, postData);
  };

  static retrieveUpdateIndividualDriver = (id) => {
    return axios.get(`/api/v1/drivers/${id}`);
  };

  static searchGetByName = (searchValue) => {
    return axios.get(`/api/v1/drivers/?search=${searchValue}`);
  };

  static newDriverAdd = (driver) => {
    return axios.post('/api/v1/drivers/new', driver);
  };
}

export default APIService;
