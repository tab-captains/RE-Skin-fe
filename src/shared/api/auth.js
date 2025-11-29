import instance from "./axiosInstance";

/**
 * 로그인 API
 */
export const login = async (loginId, password) => {
  try {
    const response = await instance.post("/api/auth/login", {
      loginId,
      password,
    });

    const resData = response.data.data;

    const accessToken = resData.accessToken;
    const refreshToken = resData.refreshToken;

    // 백엔드가 내려주는 유저 정보 매핑
    const userData = {
      username: resData.nickname,
      email: resData.email,
      birthdate: resData.birthdate,
      gender: resData.gender,
      skinType: resData.skintype,
    };

    // 토큰 저장
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // LoginPage → AuthContext.login()에서 써야 하는 포맷으로 return
    return {
      accessToken,
      refreshToken,
      userData,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * 회원가입 API
 */
export const register = async (
  userId,
  password,
  confirmPassword,
  nickname,
  email,
  birthdate,
  gender
) => {
  try {
    const requestBody = {
      loginId: userId,
      password,
      passwordConfirm: confirmPassword,
      nickname,
      email,
      birthdate, // 소문자 birthdate (백엔드 요구사항)
      gender,
    };

    console.log("회원가입 요청 데이터:", requestBody);

    const response = await instance.post("/api/auth/signup", requestBody);
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

/**
 * 카카오 로그인
 */
export const kakaoLogin = async () => {
  try {
    const response = await instance.get("/api/auth/kakao");
    const url = response.data.data;

    window.location.href = url;
  } catch (error) {
    console.error("Kakao login error:", error);
  }
};

/**
 * 카카오 콜백 처리
 */
export const kakaoCallback = async () => {
  try {
    const response = await instance.get("/api/auth/kakao/callback");
    const data = response.data.data;

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return data;
  } catch (error) {
    console.error("Kakao callback error:", error);
    throw error;
  }
};

/**
 * 로그아웃 API
 */
export const logout = async () => {
  try {
    const response = await instance.post("/api/auth/logout");
    console.log("Logout response:", response.data);
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // 항상 정리
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user_data");
  }
};
