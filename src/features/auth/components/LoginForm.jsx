import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLogin, onKakaoLogin }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pw) => {
    const regExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regExp.test(pw);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();

    if (id.trim() === "") {
      // 아이디 체크
      alert("아이디를 입력해주세요.");
      return;
    }

    if (!validatePassword(password)) {
      // 비밀번호 체크
      alert(
        "비밀번호는 8자 이상이며, 영문 / 숫자 / 특수문자를 모두 포함해야 합니다."
      );
      return;
    }

    if (onLogin) {
      onLogin({ id, password });
    }
  };

  return (
    <form>
      <h2
        style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "700",
          marginBottom: "35px",
        }}
      >
        Login
      </h2>

      {/* 아이디 입력 */}
      <input
        type="text"
        placeholder="아이디를 입력하세요"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: "10px",
          border: "1px solid #dcdcdc",
          fontSize: "16px",
          marginBottom: "15px",
          boxSizing: "border-box", 
        }}
      />

      {/* 비밀번호 입력 */}
      <input
        type="password"
        placeholder="비밀번호 (8자이상 + 영문,숫자,특수문자)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: "10px",
          border: "1px solid #dcdcdc",
          fontSize: "16px",
          marginBottom: "25px",
          boxSizing: "border-box", 
        }}
      />

      {/* 로그인 버튼 */}
      <button
        type="button"
        onClick={handleLoginClick}
        style={{
          width: "100%",
          backgroundColor: "#111",
          color: "#fff",
          padding: "14px",
          borderRadius: "10px",
          fontSize: "15px",
          border: "none",
          cursor: "pointer",
          marginBottom: "12px",
          boxSizing: "border-box", 
        }}
      >
        로그인
      </button>

      {/* 카카오 버튼 */}
      <button
        type="button"
        onClick={onKakaoLogin}
        style={{
          width: "100%",
          backgroundColor: "#FEE500",
          padding: "14px",
          borderRadius: "10px",
          fontSize: "15px",
          border: "none",
          cursor: "pointer",
          color: "#3A1D1D",
          fontWeight: "600",
          boxSizing: "border-box",
        }}
      >
        🗨 kakao login
      </button>

      {/* 하단 링크 */}
      <div
        style={{
          marginTop: "25px",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        <span 
        onClick={() => navigate("/register")}
        style={{ cursor: "pointer", textDecoration: "underline" }}>
          회원가입
        </span>{" "}
        /{" "}
        <span style={{ cursor: "pointer", textDecoration: "underline" }}>
          비밀번호찾기
        </span>
      </div>
    </form>
  );
}

export default LoginForm;

