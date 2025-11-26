import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import { login as loginAPI, kakaoLogin } from "../../../shared/api/auth";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();



  const handleLogin = async ({ id, password }) => {
    try {
      console.log("로그인 클릭됨");
      console.log("ID:", id);
      console.log("PW:", password);

    const res = await loginAPI(id, password);
    console.log("API 결과", res);

    //AuthContext에 로그인 상태 반영.
    if (res.data?.accessToken){
      login({
        token: res.data.accessToken,
        username: id,
      });
    }
    alert("로그인 성공!");
    navigate('/');
  } catch(error){
    console.error("로그인 실패!");
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
