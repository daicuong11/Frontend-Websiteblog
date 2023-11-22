import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

const delToken = () => {
  return localStorage.removeItem("token");
};

const instance = axios.create({
  baseURL: 'https://localhost:7020/',
  headers: { Authorization: getToken() ? `Bearer ${getToken()}` : undefined },
});

instance.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data ? response.data : { statusCode: response.status };
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // Nếu mã lỗi là 401, chuyển hướng đến trang login
      delToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
