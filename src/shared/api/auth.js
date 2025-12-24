import instance from "./axiosInstance";
import { getMyInfo } from "./users";

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

    // 토큰 저장 (사용자 정보 조회 전에 저장)
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // 항상 사용자 정보 API 호출해서 userId 확실하게 가져오기
    let userInfo = null;
    try {
      userInfo = await getMyInfo();
      console.log("사용자 정보 API 응답:", userInfo);
    } catch (err) {
      console.warn("사용자 정보 조회 실패:", err);
    }

    // userId 우선순위: userInfo > resData
    const userId = userInfo?.userId || userInfo?.id || resData.userId || resData.id;

    // 백엔드가 내려주는 유저 정보 매핑
    const userData = {
      userId: userId, // API 응답에서 가져온 userId
      loginId: userInfo?.loginId || resData.loginId || loginId, // API 응답에서 가져온 loginId
      username: userInfo?.nickname || resData.nickname,
      email: userInfo?.email || resData.email,
      birthdate: userInfo?.birthdate || resData.birthdate,
      gender: userInfo?.gender || resData.gender,
      skinType: userInfo?.skintype || resData.skintype,
    };

    console.log("로그인 후 userData:", userData);
    console.log("저장될 userId:", userData.userId);

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
