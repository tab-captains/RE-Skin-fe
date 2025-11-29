import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { login as loginAPI, kakaoLogin } from "../../../shared/api/auth";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async ({ id, password }) => {
    try {
      console.log("로그인 클릭됨");
      console.log("ID:", id);
      console.log("PW:", password);

      const { accessToken, refreshToken, userData } = await loginAPI(id, password);

      console.log("로그인 성공 - 반환된 userData:", userData);

      login({
        accessToken,
        refreshToken,
        userData,
      });

      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패!");
    }
  };

  const handleKakaoLogin = async () => {
    await kakaoLogin();
  };

  return (
    <AuthLayout>
      <LoginForm onLogin={handleLogin} onKakaoLogin={handleKakaoLogin} />
    </AuthLayout>
  );
};

export default LoginPage;
