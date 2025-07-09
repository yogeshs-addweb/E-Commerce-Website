import axios from "axios";
const PRODUCT_API = import.meta.env.VITE_PRODUCT_API_BASE_URL;
// const SINGLE_API = import.meta.env.VITE_SINGLE_API;

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 600000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add a request interceptor
  instance.interceptors.request.use(
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
  instance.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response;
    },
    function (error) {
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return instance;
};

export const productApi = createAxiosInstance(PRODUCT_API);
// export const singleApi = createAxiosInstance(SINGLE_API);
