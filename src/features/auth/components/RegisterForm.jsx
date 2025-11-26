import React, { useState, useEffect } from 'react';
import './RegisterForm.css';
import { useAuth } from "../../auth/context/AuthContext";
import { register as registerAPI } from "../../../shared/api/auth";
import {useNavigate} from "react-router-dom";
function RegisterForm() {
  const { login } = useAuth();
  const navigate= useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    if (password && !passwordRegex.test(password)) {
      setPasswordError('*8자 이상, 영문, 숫자, 특수문자를 모두 포함해야 합니다.');
    } else {
      setPasswordError('');
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError('*비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (
      userId &&
      password &&
      confirmPassword &&
      nickname &&
      !passwordError &&
      !confirmPasswordError
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [userId, password, confirmPassword, nickname, passwordError, confirmPasswordError]);




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert('입력 정보를 다시 확인해주세요.');
      return;
    }
console.log({
  loginId: userId,
  password,
  passwordConfirm: confirmPassword,
  nickname,
});
  try {
     // 회원가입 API 호출
      await registerAPI(userId, password, confirmPassword, nickname);

      // 회원가입 후 자동 로그인 없이 완료 메시지
      alert('회원가입 성공! 이제 로그인 해주세요.');
      navigate('/login'); // 로그인 페이지로 이동
    } catch (error) {
      console.error('회원가입 실패:', error);
      console.log('response:', error.response); // 서버 응답 확인
      console.log('data:', error.response?.data); // 서버 메시지 확인
      alert('회원가입 실패: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="register-form-container">
      <h1 className="register-title">Welcome!</h1>
      <p className="register-subtitle">
        use skin type analyzer and check your skin information
      </p>

      <form className="register-form" onSubmit={handleSubmit}>

        <div className="input-group">
          <label htmlFor="userid">아이디</label>
          <input
            type="text"
            id="userid"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="validation-error">{passwordError}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="confirm-password">비밀번호 재확인</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && <p className="validation-error">{confirmPasswordError}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="register-button"
          disabled={!isFormValid}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
