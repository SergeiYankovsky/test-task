import axios, { AxiosError } from "axios";

type ErrorResponseData = {
  Message: string;
};

const BASE_URL = "http://localhost:3000/api/v1";

export const createAPI = (path: string) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL + path,
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorResponseData>) => {
      if (!error.response) {
        throw new Error("Network error");
      }
      throw error;
    },
  );

  return axiosInstance;
};
