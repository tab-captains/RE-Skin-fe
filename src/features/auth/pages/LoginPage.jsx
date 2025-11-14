import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <LoginForm />
    </div>
  );
};

export default LoginPage;

