import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
  const {login} =useAuth();
  const navigate = useNavigate();

  const handleLogin = async ({ id, password }) => {
    try{
    console.log("로그인 클릭됨");
    console.log("ID:", id);
    console.log("PW:", password);

    /* fakeToken 설정.추후 로그인 API 요청 필요. */

    /* 추후 백 연결할 때 예시.
    const res = await axios.post("/api/auth/login", { id, password });

    login(res.data.accessToken);   // AuthContext의 login
    navigate("/");
    */

    const fakeToken ="123456";
    login(fakeToken);
    alert("로그인 성공!");
    navigate("/");
  } catch(err) {
      alert("로그인 실패!");
    }

  };

  const handleKakaoLogin = () => {
    alert("카카오 로그인!");
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
