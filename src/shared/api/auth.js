// API Base URL
const API_BASE_URL = 'https://reskin.online';

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

