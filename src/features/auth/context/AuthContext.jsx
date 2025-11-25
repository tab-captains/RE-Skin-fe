import { createContext, useContext, useState, useEffect } from "react";

/*전역 로그인 상태 관리용. */
const AuthContext = createContext();

<<<<<<< HEAD
function getInitialUser() {
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
        try {
            return JSON.parse(storedUser) || { username: null, email: null, dateOfBirth: null, gender: null };
        } catch (e) {
            return { username: null, email: null, dateOfBirth: null, gender: null };
        }
    }
    return {
        username: null,
        email: null,
        dateOfBirth: null,
        gender: null,
    };
}

=======
>>>>>>> parent of 0acc317 (feat:백에서 요청한 사항으로 회원가입 페이지 수정 및 프로필페이지 연결 기능 기본 UI 완료)
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

<<<<<<< HEAD
    const updateUser = (newUserData) => {
        const updatedUser = { ...user, ...newUserData };
        localStorage.setItem("user_data", JSON.stringify(updatedUser)); 
        setUser(updatedUser); 
    };

    const login = ({token, userData}) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user_data", JSON.stringify(userData)); 
        setUser(userData); 
        setIsLoggedIn(true);
    };
=======
  const login = ({token, username}) => {
    localStorage.setItem("accessToken", token);
    setUser({ username }); 
    setIsLoggedIn(true);
  };
>>>>>>> parent of 0acc317 (feat:백에서 요청한 사항으로 회원가입 페이지 수정 및 프로필페이지 연결 기능 기본 UI 완료)

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsLoggedIn(false);
  };

<<<<<<< HEAD
    const changePassword = (currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {

        if (currentPassword !== user.password) {
            reject(new Error("현재 비밀번호가 일치하지 않습니다."));
            return;
        }

        const updatedUser = { ...user, password: newPassword };

        localStorage.setItem("user_data", JSON.stringify(updatedUser));
        setUser(updatedUser);

        resolve("비밀번호가 성공적으로 변경되었습니다.");
    });
};



    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, updateUser, changePassword}}>
            {children}
        </AuthContext.Provider>
    );
=======

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
>>>>>>> parent of 0acc317 (feat:백에서 요청한 사항으로 회원가입 페이지 수정 및 프로필페이지 연결 기능 기본 UI 완료)
}

export const useAuth = () => useContext(AuthContext);
