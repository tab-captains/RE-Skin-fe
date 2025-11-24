import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';
import { useAuth } from '../../auth/context/AuthContext'; 
import colors from '../../common/colors'; 

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 20px;
    background-color: #f0f3f8; 
    min-height: 100vh;
`;

const ContentBox = styled.div`
    background: #fff;
    padding: 40px 60px;
    border-radius: 15px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    max-width: 450px;
    width: 100%;
    text-align: center;
`;

const Header = styled.h2`
    font-size: 32px;
    font-weight: 700;
    color: #1e2a55;
    margin-bottom: 40px;
`;

const AvatarContainer = styled.div`
    margin-bottom: 30px;
`;

const UserInputGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    text-align: left;
`;

const Label = styled.label`
    font-weight: 600;
    color: #3d4a70;
    font-size: 15px;
    min-width: 100px;
`;

const InputDisplay = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border: 1px solid #dcdfe4;
    border-radius: 8px;
    background-color: #f7f9fc;
    color: #333;
    font-size: 15px;
    margin-left: 10px;
    min-width: 180px;
    justify-content: flex-start;
    gap: 15px;
`;

const EditButton = styled.button`
    background: none;
    border: none;
    color: ${colors.primary};
    cursor: pointer;
    margin-left: 10px;
    display: flex;
    align-items: center;
    padding: 5px;
    flex-shrink: 0;
    
    &:hover {
        color: ${colors.textAccent};
    }
`;

const ToggleWrapper = styled(UserInputGroup)`
    margin-top: 30px;
`;

const ToggleSwitch = styled.label`
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    margin-left: 10px;

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    span {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 20px;
    }

    span:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
    }

    input:checked + span {
        background-color: ${colors.primary};
    }

    input:checked + span:before {
        transform: translateX(20px);
    }
`;

const ChangePasswordButton = styled.button`
    width: 100%;
    padding: 12px;
    margin-top: 40px;
    background-color: ${colors.primary};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: ${colors.textAccent};
    }
`;

const ProfilePage = () => {
    const [receiveNotifications, setReceiveNotifications] = useState(true);
    const { user } = useAuth(); 
    
    const userData = {
        nickname: user?.username || "Guest",
        email: user?.email || "user@example.com", 
        dob: user?.dateOfBirth || "정보 없음", // ⭐️ 수정 완료: dateOfBirth 참조
        gender: user?.gender === 'male' ? '남성' : user?.gender === 'female' ? '여성' : '기타', 
        skinType: "민감성/수분부족형",
    };

    return (
        <Container>
            <ContentBox>
                <Header>Hello {userData.nickname}!</Header>
                
                <AvatarContainer>
                    <FaUserCircle size={80} color="#1e2a55" />
                </AvatarContainer>
                
                <UserInputGroup>
                    <Label>Nickname</Label>
                    <InputDisplay>
                        {userData.nickname}
                        <EditButton><FiEdit2 size={16} /></EditButton>
                    </InputDisplay>
                </UserInputGroup>
                
                <UserInputGroup>
                    <Label>Email</Label>
                    <InputDisplay>
                        {userData.email}
                    </InputDisplay>
                </UserInputGroup>

                <UserInputGroup>
                    <Label>Date of Birth</Label>
                    <InputDisplay>
                        {userData.dob}
                        <EditButton>Edit</EditButton>
                    </InputDisplay>
                </UserInputGroup>

                <UserInputGroup>
                    <Label>Gender</Label>
                    <InputDisplay>
                        {userData.gender}
                    </InputDisplay>
                </UserInputGroup>

                <UserInputGroup>
                    <Label>Skin Type</Label>
                    <InputDisplay>
                        {userData.skinType}
                        <EditButton>Edit</EditButton>
                    </InputDisplay>
                </UserInputGroup>
                
                <ToggleWrapper>
                    <Label>Receive notifications?</Label>
                    <ToggleSwitch>
                        <input 
                            type="checkbox" 
                            checked={receiveNotifications} 
                            onChange={() => setReceiveNotifications(!receiveNotifications)}
                        />
                        <span />
                    </ToggleSwitch>
                </ToggleWrapper>
                <ChangePasswordButton>Change Password</ChangePasswordButton>
                
            </ContentBox>
        </Container>
    );
};

export default ProfilePage;