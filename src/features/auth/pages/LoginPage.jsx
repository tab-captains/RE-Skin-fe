import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const handleLogin = ({ id, password }) => {
    console.log("로그인 클릭됨");
    console.log("ID:", id);
    console.log("PW:", password);
    alert("로그인 버튼이 눌렸습니다!");
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
