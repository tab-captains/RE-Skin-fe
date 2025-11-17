import React from 'react';
import './RegisterForm.css'; 

function RegisterForm() {
  return (
    <div className="register-form-container">
      <h1 className="register-title">Welcome!</h1>
      <p className="register-subtitle">
        use skin type analyzer and check your skin information
      </p>
      
      <form className="register-form">
        
        <div className="input-group">
          <label htmlFor="userid">아이디</label>
          <input type="text" id="userid" />
          <p className="validation-message">*사용 가능한 아이디입니다.</p>
        </div>
        
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" />
          <p className="validation-message">*8자 이상이며, 영문, 숫자, 특수문자를 모두 포함하세요.</p>
        </div>
        
        <div className="input-group">
          <label htmlFor="confirm-password">비밀번호 재확인</label>
          <input type="password" id="confirm-password" />
          <p className="validation-message">*비밀번호를 다시 입력해주세요.</p>
        </div>
        
        <div className="input-group">
          <label htmlFor="nickname">닉네임</label>
          <input type="text" id="nickname" />
          <p className="validation-message">*사용 가능한 닉네임입니다.</p>
        </div>
        
        <button type="submit" className="register-button">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;