import axios from 'axios';
import Cookies from 'universal-cookie';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

const cookies = new Cookies();
const token = cookies.get('myToken');

instance.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = `Token ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
