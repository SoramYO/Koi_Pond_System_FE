import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1", 
});

// Thêm interceptor để thêm token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const authRequired = ["/api/v1/login"];
    const path = new URL(config.baseURL + config.url).pathname;
    const requiresAuth = !authRequired.some((url) => path.startsWith(url));
    if (requiresAuth) {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
