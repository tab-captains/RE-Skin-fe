import { createContext, useContext, useState } from "react";
import { logout as logoutAPI } from "../../../shared/api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 로그인 상태
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("accessToken");
  });

  // 사용자 정보 로드
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user_data");
    return stored ? JSON.parse(stored) : null;
  });

  // 로그인
  const login = ({ accessToken, refreshToken, userData }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // **여기서 userData의 key를 통일해서 저장**
    const normalized = {
      userId: userData.userId,
      loginId: userData.loginId,
      username: userData.username,
      email: userData.email,
      dateOfBirth: userData.birthDate, // 🔥 KEY 통일!!
      gender: userData.gender,
      skinType: userData.skinType,
    };

    localStorage.setItem("user_data", JSON.stringify(normalized));
    setUser(normalized);

    setIsLoggedIn(true);
  };

  // 사용자 정보 수정
  const updateUser = (newUserData) => {
    const merged = { ...(user || {}), ...newUserData };
    localStorage.setItem("user_data", JSON.stringify(merged));
    setUser(merged);
  };

  // 로그아웃
  const logout = async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.warn("서버 로그아웃 실패", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user_data");

      setUser(null);
      setIsLoggedIn(false);
    }
  };

  // 비밀번호 변경(로컬 기준)
  const changePassword = (currentPassword, newPassword) => {
    return newPromise((resolve, reject) => {
      if (!user) {
        reject(new Error("로그인 상태가 아닙니다."));
        return;
      }

      if (currentPassword !== user.password) {
        reject(new Error("현재 비밀번호가 일치하지 않습니다."));
        return;
      }

      const updated = { ...user, password: newPassword };
      localStorage.setItem("user_data", JSON.stringify(updated));
      setUser(updated);

      resolve("비밀번호가 성공적으로 변경되었습니다.");
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        updateUser,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
