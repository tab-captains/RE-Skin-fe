import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

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
        localStorage.removeItem("user_data");
        setUser({
            username: null,
            email: null,
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