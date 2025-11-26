import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from "../../auth/context/AuthContext";

const Container = styled.div`
  background-color: #ffffff;
  padding: 40px 50px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  text-align: left;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #121212;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #555;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3a4b9b;
    box-shadow: 0 0 0 2px rgba(58, 75, 155, 0.2);
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3a4b9b;
    box-shadow: 0 0 0 2px rgba(58, 75, 155, 0.2);
  }
`;

const ValidationMessage = styled.p`
  font-size: 0.8rem;
  color: #e63946;
  margin-top: 5px;
`;

const RegisterButton = styled.button`
  padding: 14px;
  border: none;
  border-radius: 4px;
  background-color: #3a4b9b;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;

  &:hover {
    background-color: #2c3a7c;
  }

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;


function RegisterForm() {
  const { login } = useAuth();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('male');

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
      email &&
      dob &&
      gender &&
      !passwordError &&
      !confirmPasswordError
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    userId, password, confirmPassword, nickname, email, dob, gender,
    passwordError, confirmPasswordError
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert('입력 정보를 다시 확인해주세요.');
      return;
    }

    const fakeToken = "token-" + Math.random().toString(36).substring(2, 10);

    const userData = {
      userId: userId,
      username: nickname,
      email: email,
      password: password,
      dateOfBirth: dob,
      gender: gender,
    };

    login({
      token: fakeToken,
      userData: userData
    });

    alert('회원가입 성공! 자동 로그인 되었습니다.');
  };

  return (
    <Container>
      <Title>Welcome!</Title>
      <Subtitle>use skin type analyzer and check your skin information</Subtitle>

      <Form onSubmit={handleSubmit}>

        <InputGroup>
          <Label htmlFor="userid">아이디</Label>
          <Input
            type="text"
            id="userid"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <ValidationMessage>{passwordError}</ValidationMessage>}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="confirm-password">비밀번호 재확인</Label>
          <Input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && <ValidationMessage>{confirmPasswordError}</ValidationMessage>}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="nickname">닉네임</Label>
          <Input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="dob">생년월일</Label>
          <Input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="gender">성별</Label>
          <Select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">남자</option>
            <option value="female">여자</option>
            <option value="other">기타</option>
          </Select>
        </InputGroup>

        <RegisterButton type="submit" disabled={!isFormValid}>
          회원가입
        </RegisterButton>

      </Form>
    </Container>
  );
}

export default RegisterForm;
