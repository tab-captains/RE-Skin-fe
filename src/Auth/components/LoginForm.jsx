// src/Auth/components/LoginForm.jsx

import React, { useState } from "react";

function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

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
        }}
      />

      {/* 로그인 버튼 */}
      <button
        type="button"
        style={{
          width: "100%",
          backgroundColor: "#111",
          color: "#fff",
          padding: "16px",
          borderRadius: "10px",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        로그인
      </button>

      {/* 카카오 버튼 */}
      <button
        type="button"
        style={{
          width: "100%",
          backgroundColor: "#FEE500",
          padding: "16px",
          borderRadius: "10px",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
          color: "#3A1D1D",
          fontWeight: "600",
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
        <span style={{ cursor: "pointer", textDecoration: "underline" }}>
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
