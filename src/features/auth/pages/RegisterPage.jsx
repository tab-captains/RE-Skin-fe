import React from "react";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8f8f8",
        padding: "20px",
      }}
    >
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
