import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { kakaoCallback } from '../../../shared/api/auth';  

const LoginSuccessPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");   // ★ 토큰이 아니라 code를 가져오는 것이 정답!

    console.log("카카오 인가코드(code):", code);

    if (!code) {
      navigate("/login");
      return;
    }

    const handleKakaoLogin = async () => {
      try {
        // 1) 백엔드에 code를 보내서 accessToken 받아오기
        const { accessToken, username } = await kakaoCallback(code);

        console.log("백엔드에서 받은 accessToken:", accessToken);
        console.log("백엔드에서 받은 username:", username);

        // 2) AuthContext login 처리
        login({ token: accessToken, username });

        // 3) 홈으로 이동
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
