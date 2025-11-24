import React, { useState, useEffect } from 'react';
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
    justify-content: ${props => props.$isEditing ? 'flex-start' : 'space-between'};
    gap: 15px;

    input {
        border: none;
        background: none;
        outline: none;
        flex-grow: 1;
        font-size: 15px
    }
    
    select {
        border: none;
        background: none;
        outline: none;
        flex-grow: 1;
        font-size: 15px
    }
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

const ActionButton = styled.button`
    width: 100%;
    padding: 12px;
    margin-top: 40px;
    background-color: ${props => props.$isSave ? colors.primary : '#888'};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: ${props => props.$isSave ? colors.textAccent : '#666'};
    }
`;

const ProfilePage = () => {
    const { user, updateUser } = useAuth();
    const [receiveNotifications, setReceiveNotifications] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const [editedNickname, setEditedNickname] = useState(user?.username || "");
    const [editedDob, setEditedDob] = useState(user?.dateOfBirth || "");
    const [editedGender, setEditedGender] = useState(user?.gender || "male");

    useEffect(() => {
        setEditedNickname(user?.username || "");
        setEditedDob(user?.dateOfBirth || "");
        setEditedGender(user?.gender || "male");
    }, [user]);
    
    const userData = {
        nickname: user?.username || "Guest",
        email: user?.email || "user@example.com", 
        dob: user?.dateOfBirth || "정보 없음", 
        gender: user?.gender === 'male' ? '남성' : user?.gender === 'female' ? '여성' : '기타', 
        skinType: "민감성/수분부족형",
    };

    const handleSave = () => {
        if (updateUser) {
            updateUser({
                username: editedNickname,
                dateOfBirth: editedDob,
                gender: editedGender,
            });
        }
        setIsEditing(false);
    }

    const handleActionClick = () => {
        if (isEditing) {
            handleSave();
        } else {
            setIsEditing(true);
        }
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
                    <InputDisplay $isEditing={isEditing}>
                        {isEditing ? (
                            <input 
                                type="text" 
                                value={editedNickname}
                                onChange={(e) => setEditedNickname(e.target.value)}
                            />
                        ) : (
                            <>
                                {userData.nickname}
                                <EditButton onClick={() => setIsEditing(true)}><FiEdit2 size={16} /></EditButton>
                            </>
                        )}
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
                    <InputDisplay $isEditing={isEditing}>
                        {isEditing ? (
                            <input 
                                type="date" 
                                value={editedDob}
                                onChange={(e) => setEditedDob(e.target.value)}
                            />
                        ) : (
                            <>
                                <span>{userData.dob}</span>
                                <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
                            </>
                        )}
                    </InputDisplay>
                </UserInputGroup>

                <UserInputGroup>
                    <Label>Gender</Label>
                    <InputDisplay $isEditing={isEditing}>
                        {isEditing ? (
                            <select 
                                value={editedGender} 
                                onChange={(e) => setEditedGender(e.target.value)}
                            >
                                <option value="male">남자</option>
                                <option value="female">여자</option>
                                <option value="other">기타</option>
                            </select>
                        ) : (
                            <>
                                <span>{userData.gender}</span>
                                <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
                            </>
                        )}
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
                
                <ActionButton 
                    $isSave={isEditing}
                    onClick={handleActionClick}
                >
                    {isEditing ? '저장하기' : '프로필 수정'}
                </ActionButton>
                
                {!isEditing && <ActionButton $isSave={false}>Change Password</ActionButton>}
                
            </ContentBox>
        </Container>
    );
};

export default ProfilePage;