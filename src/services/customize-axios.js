import axios from "axios";

// Tính năng lấy token từ local storage
const getToken = () => {
  // Điều chỉnh logic lấy token từ local storage của bạn tại đây
  return localStorage.getItem("token");
};

const instance = axios.create({
  baseURL: 'https://localhost:7020/',
  // Sử dụng hàm getToken() để lấy token từ local storage
  headers: { Authorization: getToken() ? `Bearer ${getToken()}` : undefined },
});

// Thêm interceptor để cập nhật token cho mỗi request
instance.interceptors.request.use(
  function (config) {
    // Trước mỗi request, kiểm tra xem token đã thay đổi chưa và cập nhật nếu cần
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

// Thêm interceptor xử lý response
instance.interceptors.response.use(
  function (response) {
    // Any status code that lies within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data ? response.data : { statusCode: response.status };
  },
  function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
