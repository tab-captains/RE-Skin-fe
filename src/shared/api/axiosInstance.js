import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: accessToken 자동 추가
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: accessToken 만료 → refresh 재발급 처리
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken 만료 (401)
    if (error.response?.status === 401 ||  error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        // refreshToken을 body에 넣어서 보냄
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/api/auth/refresh`,
          { refreshToken }
        );

        const newAccessToken = refreshResponse.data.data.accessToken;
        const newRefreshToken = refreshResponse.data.data.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        instance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;


        return instance(originalRequest);
      } catch (err) {
        // refreshToken 만료 → 자동 로그아웃
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user_data");

        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
