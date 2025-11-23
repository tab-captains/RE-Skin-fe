// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://reskin.online';

/**
 * 로그인 API
 * @param {string} id - 사용자 아이디
 * @param {string} password - 비밀번호
 * @returns {Promise<{accessToken: string, user: object}>}
 */
export const login = async (id, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `로그인 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
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
    
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('회원가입 에러 응답:', errorData);
      console.error('응답 상태:', response.status, response.statusText);
      throw new Error(errorData.message || errorData.error || `회원가입 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
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
    const response = await fetch(`${API_BASE_URL}/api/auth/kakao`, {
      method: 'GET',
    });
    const data = await response.json();
    
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

