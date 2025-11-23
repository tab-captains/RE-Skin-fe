import { createContext, useContext, useState, useEffect } from "react";
import { logout as logoutAPI } from "../../../shared/api/auth";

/*전역 로그인 상태 관리용. */
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = ({token, username}) => {
    localStorage.setItem("accessToken", token);
    setUser({ username }); 
    setIsLoggedIn(true);
  };

  const logout = async () => {
    // 프론트엔드 정리 먼저 진행
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsLoggedIn(false);
    
    // 백엔드 로그아웃 API 호출 (HttpOnly 쿠키의 refreshToken 처리)
    // 에러가 발생해도 이미 프론트엔드 정리는 완료되었으므로 무시
    try {
      await logoutAPI();
    } catch (error) {
      // 로그아웃 API 에러는 무시 (이미 프론트엔드 정리 완료)
      console.warn('Logout API 호출 중 에러 발생 (무시됨):', error);
    }
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
