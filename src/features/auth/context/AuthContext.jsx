import { createContext, useContext, useState } from "react";
import { logout as logoutAPI } from "../../../shared/api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    return !!localStorage.getItem("accessToken") || !!code;
  });

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user_data");
    if (stored) {
      return JSON.parse(stored);
    }

    const username = localStorage.getItem("username");
    return username ? { username } : null;
  });

  const login = ({ accessToken, username, refreshToken }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    const userData = { username };
    localStorage.setItem("user_data", JSON.stringify(userData));

    setUser(userData);
    setIsLoggedIn(true);
  };

  const updateUser = (newUserData) => {
    const updatedUser = { ...(user || {}), ...newUserData };
    localStorage.setItem("user_data", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const logout = async () => {
    try {
      await logoutAPI(); 
    } catch (error) {
      console.warn("서버 로그아웃 실패", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user_data");
      localStorage.removeItem("username");

      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const changePassword = (currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {
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
