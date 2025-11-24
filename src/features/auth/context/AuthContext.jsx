import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function getInitialUser() {
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
        try {
            return JSON.parse(storedUser);
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

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, updateUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);