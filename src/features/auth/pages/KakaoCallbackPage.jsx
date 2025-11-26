import { useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginSuccessPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const usernameParam  = params.get("username");
    const username = usernameParam || "카카오 사용자";
    console.log("파싱된 토큰:", token);

    if (!token) {
      navigate("/login");
      return;
    }

    // 로그인 처리
    login({ token, username });
    
    // 로그인 완료 후 이동
    navigate("/", { replace: true });
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

