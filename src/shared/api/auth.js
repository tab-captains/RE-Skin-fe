import instance from "./axiosInstance";
/**
 * 로그인 API
 * @param {string} id - 사용자 아이디
 * @param {string} password - 비밀번호
 * @returns {Promise<{accessToken: string, user: object}>}
 */
export const login = async (loginId, password) => {
  try {
    const response = await instance.post("/api/auth/login", { 
        loginId,
        password });
    // 로그인 성공 시 localStorage에 토큰 저장
    if (response.data?.accessToken) {
      console.log("access", response.data.data.accessToken)
      console.log("refresh", response.data.data.refreshToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * 회원가입 API
 * @param {string} userId - 사용자 아이디
 * @param {string} password - 비밀번호
 * @param {string} confirmPassword - 비밀번호 확인
 * @param {string} nickname - 닉네임
 * @returns {Promise<{message: string, user?: object}>}
 */
export const register = async (userId, password, confirmPassword, nickname) => {
  try {
    const requestBody = {
      loginId: userId,
      password,
      passwordConfirm: confirmPassword,
      nickname,
    };
    
    console.log('회원가입 요청 데이터:', requestBody);
    
    const response = await instance.post("/api/auth/signup", requestBody);
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

/**
 * 카카오 소셜 로그인
 * 백엔드에서 카카오 로그인 URL을 받아와 리다이렉트
 */
export const kakaoLogin = async () => {
  try {
    const response = await instance.get("/api/auth/kakao");
    const data = response.data;
    console.log(response.data.data);
    
    if (data.success && data.data) {
      window.location.href = data.data;
    } else {
      throw new Error(data.message || '카카오 로그인 URL을 받아오지 못했습니다.');
    }
  } catch (error) {
    console.error('Kakao login error:', error);
    alert('카카오 로그인에 실패했습니다.');
  }
};


export const kakaoCallback = async () => {
  try {
    const response = await instance.get(`/api/auth/kakao/callback`);
    console.log("카카오 콜백 응답:", response.data);

    const { accessToken, refreshToken, username } = response.data.data;

    if (accessToken) localStorage.setItem("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

    return response.data.data;
  } catch (error) {
    console.error("Kakao callback error:", error);
    throw error;
  }
};


/**
 * 로그아웃 API
 * HttpOnly 쿠키에 저장된 refreshToken을 백엔드에서 처리
 * 백엔드는 @RequestParam으로 받지만, 쿠키에서도 읽을 수 있도록 처리
 * @returns {Promise<void>}
 */


//axios 로 변경하였음.

export const logout = async () => {
  try {
    const response = await instance.post("/api/auth/logout");
    console.log("Logout response:", response.data); // 로그 확인용
    localStorage.removeItem("token"); // 로컬 스토리지 정리
  } catch (error) {
    console.error("Logout error:", error);
    localStorage.removeItem("token"); // 에러가 나도 로컬 스토리지는 정리
  }
};

