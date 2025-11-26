import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function getInitialUser() {
    // 💡 변경: userId와 password 필드를 기본 구조에 추가하여 일관성 유지
    const defaultUser = {
        userId: null,
        username: null,
        email: null,
        password: null, 
        dateOfBirth: null,
        gender: null,
    };
    
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
        try {
            const parsedUser = JSON.parse(storedUser);
            // 로컬 저장소에서 가져온 데이터와 기본 구조를 병합하여 누락된 필드를 채웁니다.
            return { ...defaultUser, ...parsedUser };
        } catch (e) {
            return defaultUser;
        }
    }
    return defaultUser;
}

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
    const [user, setUser] = useState(getInitialUser);

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

    const logout = () => {
        localStorage.removeItem("accessToken");
        // ❌ 핵심 변경: 로그아웃 시 user_data를 삭제하는 줄을 제거합니다. 
        // 이렇게 해야 다음 로그인 시 비밀번호/아이디 확인을 위한 정보가 남아있습니다.
        // localStorage.removeItem("user_data"); 
        
        setUser({
            userId: null, // 💡 추가: userId 초기화
            username: null,
            email: null,
            password: null, // 💡 추가: password 초기화
            dateOfBirth: null,
            gender: null,
        });
        setIsLoggedIn(false);
    };

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
}

export const useAuth = () => useContext(AuthContext);