import { createContext, useContext, useState, useEffect } from "react";

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

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsLoggedIn(false);
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
