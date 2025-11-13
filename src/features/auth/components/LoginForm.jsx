const LoginForm = () => {
  return (
    <div
      style={{
        width: "420px",
        padding: "40px 30px",
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>Login</h1>

      <input
        type="text"
        placeholder="아이디를 입력하세요"
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="비밀번호 (8자이상 + 영문,숫자,특수문자)"
        style={inputStyle}
      />

      <button style={blackButton}>로그인</button>

      <button style={kakaoButton}>💬 kakao login</button>

      <div style={{ marginTop: "20px" }}>
        <a href="#">회원가입</a> / <a href="#">비밀번호찾기</a>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "13px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const blackButton = {
  width: "100%",
  padding: "13px",
  backgroundColor: "#000",
  color: "white",
  borderRadius: "8px",
  marginTop: "10px",
};

const kakaoButton = {
  width: "100%",
  padding: "13px",
  backgroundColor: "#FEE500",
  borderRadius: "8px",
  marginTop: "15px",
};

export default LoginForm;
