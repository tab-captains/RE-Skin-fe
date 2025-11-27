import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { kakaoCallback } from '../../../shared/api/auth';  

const LoginSuccessPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      try {
        // 백엔드에서 바로 JWT와 username 받음
        const { accessToken, username } = await kakaoCallback();

        login({ token: accessToken, username });
        navigate("/", { replace: true });
      } catch (error) {
        console.error("카카오 로그인 콜백 오류:", error);
        navigate("/login");
      }
    };

    handleKakaoLogin();
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <p>카카오 로그인 처리 중...</p>
    </div>
  );
};

export default LoginSuccessPage;
