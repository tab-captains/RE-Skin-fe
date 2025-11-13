// src/Auth/components/AuthLayout.jsx

import React from "react";

function AuthLayout({ children }) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#fff",
          padding: "40px 30px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
