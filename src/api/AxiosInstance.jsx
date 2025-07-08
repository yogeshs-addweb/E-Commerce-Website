import axios from "axios";
const PRODUCT_API = import.meta.env.VITE_PRODUCT_API_BASE_URL;

const createAxiosInstance = axios.create({
  baseURL: PRODUCT_API,
  timeout: 1000,
});

// Add a request interceptor
createAxiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
createAxiosInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default createAxiosInstance;

export const productApi = createAxiosInstance(PRODUCT_API);
