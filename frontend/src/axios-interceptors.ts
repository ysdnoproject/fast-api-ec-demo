import { AxiosRequestConfig, AxiosResponse } from "axios";
import Vue from "vue";

const setupInterceptors = (axiosInstance): void => {
  const onRequest = (_config: AxiosRequestConfig) => {
    console.log(_config);
  };

  const onResponse = (_response: AxiosResponse) => {
    console.log(_response);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (error: any) => {
    if (error.response) {
      console.log("Response Data", error.response.data);
      console.log("Response status", error.response.status);
      console.log("Response headers", error.response.headers);
    } else if (error.request) {
      Vue.prototype.$message.error(error.message);
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }

    console.log(error.config);
  };

  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      onRequest(config);
      return config;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: any) => {
      onError(error);
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      onResponse(response);
      return response;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: any) => {
      onError(error);
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
