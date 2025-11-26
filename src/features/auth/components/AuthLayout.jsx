import React from "react";

function AuthLayout({ children }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#fff",
          padding: "30px 20px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          margin: "20px 0",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
