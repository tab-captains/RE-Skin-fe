import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginSuccessPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      login({
        token: token,
        username: '카카오 사용자',
      });
      
      alert('카카오 로그인 성공!');
      navigate('/');
    } else {
      alert('토큰을 받지 못했습니다.');
      navigate('/login');
    }
  }, [searchParams, navigate, login]);

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

