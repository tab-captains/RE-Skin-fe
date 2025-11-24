import React, { useState, useEffect } from 'react';

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

const BASE_COLORS = {
    primary: '#1a5f7f',
    error: '#dc3545',
    textAccent: '#2b7899',
    borderColor: '#dcdfe4',
    inputBgColor: '#f7f9fc',
};

const CloseIcon = ({ onClick, color = '#666' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color}
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        style={{ cursor: 'pointer' }}
        onClick={onClick}
    >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);


const ChangePasswordModal = ({ isVisible, onClose, onPasswordChange }) => {
    if (!isVisible) return null;

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (newPassword && !passwordRegex.test(newPassword)) {
            setPasswordError('*8자 이상, 영문, 숫자, 특수문자를 모두 포함해야 합니다.');
        } else {
            setPasswordError(''); 
        }
    }, [newPassword]);

    useEffect(() => {
        if (confirmNewPassword && newPassword !== confirmNewPassword) {
            setConfirmError('*새 비밀번호가 일치하지 않습니다.');
        } else {
            setConfirmError(''); 
        }
    }, [newPassword, confirmNewPassword]);

    useEffect(() => {
        if (
            currentPassword &&
            newPassword &&
            confirmNewPassword &&
            !passwordError &&
            !confirmError
        ) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [currentPassword, newPassword, confirmNewPassword, passwordError, confirmError]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGeneralError('');

        if (!isFormValid) {
            setGeneralError('올바르게 입력했는지 확인해주세요.');
            return;
        }

        setIsLoading(true);
        try {
            await onPasswordChange(currentPassword, newPassword);
            alert("비밀번호가 성공적으로 변경되었습니다."); 
            onClose(); 
        } catch (error) {
            setGeneralError(error.message || '비밀번호 변경에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = (hasError) => ({
        width: '100%',
        padding: '10px',
        border: `1px solid ${hasError ? BASE_COLORS.error : BASE_COLORS.borderColor}`,
        borderRadius: '6px',
        fontSize: '1em',
        backgroundColor: BASE_COLORS.inputBgColor,
        boxSizing: 'border-box',
        transition: 'border-color 0.2s',
        outline: 'none',
    });

    const submitButtonStyle = (disabled) => ({
        width: '100%',
        padding: '12px',
        marginTop: '20px',
        backgroundColor: disabled ? '#ccc' : BASE_COLORS.primary,
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1em',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.2s',
        opacity: isLoading ? 0.7 : 1,
    });

    return (
        <div 
            style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
                background: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', 
                alignItems: 'center', zIndex: 2000,
            }} 
            onClick={onClose}
        >
            <div 
                style={{
                    background: 'white', padding: '30px', borderRadius: '12px', 
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)', width: '90%', 
                    maxWidth: '400px',
                }} 
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                    <h3 style={{ color: BASE_COLORS.primary, fontSize: '1.5em', fontWeight: 700 }}>비밀번호 변경</h3>
                    <CloseIcon onClick={onClose} />
                </div>
                {generalError && <p style={{ color: BASE_COLORS.error, fontSize: '0.9em', textAlign: 'center', marginBottom: '15px' }}>{generalError}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="current-password" style={{ display: 'block', fontWeight: 600, color: '#3d4a70', marginBottom: '8px', fontSize: '0.9em' }}>현재 비밀번호</label>
                        <input 
                            type="password"
                            id="current-password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            style={inputStyle(false)}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="new-password" style={{ display: 'block', fontWeight: 600, color: '#3d4a70', marginBottom: '8px', fontSize: '0.9em' }}>새 비밀번호</label>
                        <input 
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={inputStyle(!!passwordError)}
                            required
                        />
                        {passwordError && <p style={{ color: BASE_COLORS.error, fontSize: '0.75em', marginTop: '5px' }}>{passwordError}</p>}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="confirm-new-password" style={{ display: 'block', fontWeight: 600, color: '#3d4a70', marginBottom: '8px', fontSize: '0.9em' }}>새 비밀번호 확인</label>
                        <input 
                            type="password"
                            id="confirm-new-password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            style={inputStyle(!!confirmError)}
                            required
                        />
                        {confirmError && <p style={{ color: BASE_COLORS.error, fontSize: '0.75em', marginTop: '5px' }}>{confirmError}</p>}
                    </div>

                    <button type="submit" style={submitButtonStyle(!isFormValid || isLoading)} disabled={!isFormValid || isLoading}>
                        {isLoading ? '변경 중...' : '변경하기'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;