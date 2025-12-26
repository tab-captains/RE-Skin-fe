import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyInfo } from "../../../shared/api/users";

const LoginSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // 토큰 저장
      localStorage.setItem("accessToken", token);
      
      // 사용자 정보 가져오기
      try {
        const userInfoRes = await getMyInfo();
        const userInfo = userInfoRes?.data || userInfoRes;
        
        const userData = {
          userId: userInfo?.id || userInfo?.userId,
          loginId: userInfo?.loginId,
          username: userInfo?.nickname,
          email: userInfo?.email,
          birthdate: userInfo?.birthdate,
          gender: userInfo?.gender,
          skinType: userInfo?.skinType, // ✅ skintype 말고 skinType일 가능성 큼
        };

        login({
          accessToken: token,
          refreshToken: "", // 카카오 로그인은 refreshToken이 없을 수 있음
          userData,
        });
      } catch (err) {
        console.error("사용자 정보 조회 실패:", err);
        // 사용자 정보 조회 실패해도 토큰만으로 로그인 처리
        login({
          accessToken: token,
          refreshToken: "",
          userData: {},
        });
      }
      
      navigate("/", { replace: true });
    };

    handleKakaoLogin();
  }, [location, login, navigate]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
      <p>카카오 로그인 처리 중...</p>
    </div>
  );
};

export default LoginSuccessPage;
