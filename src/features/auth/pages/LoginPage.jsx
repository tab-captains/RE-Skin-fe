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

      /* fakeToken — 나중에 API로 교체 */
      const fakeToken = "fake-token-123456";

      /* ⭐ 핵심: 로그인할 때 userData 전체를 넣어줘야 함 */
      const fakeUserData = {
        username: id,
        email: `${id}@example.com`,       // 임시 데이터
        dateOfBirth: "2000-01-01",        // 임시 데이터
        gender: "male",                   // 임시 데이터
        password: password
      };

      login({
        token: fakeToken,
        userData: fakeUserData
      });

      alert("로그인 성공!");
      navigate("/");

    } catch (err) {
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
