import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "../../../shared/api/auth";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async ({ id, password }) => {
    try {
      console.log("로그인 클릭됨");
      console.log("ID:", id);
      console.log("PW:", password);

      const fakeToken = "token-" + Math.random().toString(36).substring(2, 10);

      const savedUser = JSON.parse(localStorage.getItem("user_data"));

      if (!savedUser) {
        alert("등록된 사용자 정보가 없습니다. 회원가입을 진행해주세요.");
        return;
      }

      if (id !== savedUser.userId) {
        alert("아이디가 올바르지 않습니다.");
        return;
      }

      if (password !== savedUser.password) {
        alert("비밀번호가 올바르지 않습니다.");
        return;
      }

      login({
        token: fakeToken,
        userData: savedUser
      });

      alert("로그인 성공!");
      navigate("/");

    } catch (err) {
      console.error(err);
      alert("로그인 실패!");
    }
  };

  const handleKakaoLogin = async () => {
    await kakaoLogin();
  };

  return (
    <AuthLayout>
      <LoginForm
        onLogin={handleLogin}
        onKakaoLogin={handleKakaoLogin}
      />
    </AuthLayout>
  );
};

export default LoginPage;
