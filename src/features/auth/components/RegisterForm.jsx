import React, { useState, useEffect } from 'react';
import './RegisterForm.css'; 

function RegisterForm() {
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
      setIsFormValid(true); // 모든 조건 충족 시 true
    } else {
      setIsFormValid(false); // 하나라도 부족하면 false
    }
  }, [userId, password, confirmPassword, nickname, passwordError, confirmPasswordError]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert('입력 정보를 다시 확인해주세요.');
      return;
    }

    console.log("--- 회원가입 시도 ---");
    console.log("아이디:", userId);
    console.log("비밀번호:", password);
    console.log("닉네임:", nickname);
    
    alert('회원가입 성공! ');
    
  };

  return (
    <div className="register-form-container">
      <h1 className="register-title">Welcome!</h1>
      <p className="register-subtitle">
        use skin type analyzer and check your skin information
      </p>
      
      <form className="register-form" onSubmit={handleSubmit}>
        
<<<<<<< HEAD
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
            email && 
            dateOfBirth && 
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
    }, [userId, email, dateOfBirth, password, confirmPassword, nickname, passwordError, confirmPasswordError]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isFormValid) {
            console.error('입력 정보를 다시 확인해주세요.');
            return;
        }

        console.log("회원가입 시도");
        
        const fakeToken = `jwt-${Math.random().toString(36).substring(2, 9)}`;
        
        const userData = {
            username: nickname,
            email: email,
            dateOfBirth: dateOfBirth,
            gender: gender,
            password: password,
        };

        login({ token: fakeToken, userData: userData });
        
        console.log("회원가입 및 로그인 성공. 사용자 데이터:", userData);
        
        navigate('/'); 
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
                    <label htmlFor="email">이메일</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                
                <div className="input-group">
                    <label htmlFor="dob">생년월일</label>
                    <input 
                        type="date" 
                        id="dob" 
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="gender">성별</label>
                    <select 
                        id="gender" 
                        value={gender} 
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="male">남자</option>
                        <option value="female">여자</option>
                        <option value="other">기타</option>
                    </select>
                </div>

                
                <button 
                    type="submit" 
                    className="register-button"
                    disabled={!isFormValid} 
                >
                    회원가입
                </button>
            </form>
=======
        <div className="input-group">
          <label htmlFor="userid">아이디</label>
          <input 
            type="text" 
            id="userid" 
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
>>>>>>> parent of 0acc317 (feat:백에서 요청한 사항으로 회원가입 페이지 수정 및 프로필페이지 연결 기능 기본 UI 완료)
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