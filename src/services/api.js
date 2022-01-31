import axios from "axios";

const axiosInstance = (history = null) => {
  const baseURL = process.env.REACT_APP_LOCAL_BACKEND_URL;
  let headers = {};

  if (localStorage.token) {
    headers.Authorization = `Bearer ${localStorage.token}`;
  }

  const api = axios.create({
    baseURL: baseURL,
    headers,
  });

  api.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        history.push("/login");
      
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return api;
};

export default axiosInstance;
