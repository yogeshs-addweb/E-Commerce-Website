import axios from "axios";

const createAxiosInstance = (baseURL) => {
  // console.log("base url is ", baseURL);

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

const PRODUCT_API = import.meta.env.VITE_PRODUCT_API;
const SINGLE_PRODUCT_API = import.meta.env.VITE_SINGLE_PRODUCT_API;
const VITE_LOGIN_API = import.meta.env.VITE_LOGIN_API_KEY;
// const VITE_USER_API = import.meta.env.VITE_USER_API_KEY;

export const productApi = createAxiosInstance(PRODUCT_API);
export const singleProductApi = createAxiosInstance(SINGLE_PRODUCT_API);
export const loginApi = createAxiosInstance(VITE_LOGIN_API);
// export const userApi = createAxiosInstance(VITE_USER_API);
