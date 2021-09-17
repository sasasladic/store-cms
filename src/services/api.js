import axios from "axios";

let headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const token = localStorage.getItem("token");
if (token) {
  headers["Authorization"] = `Bearer ${token}`;
}

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers,
});

export default api;
