import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChangePassword from '../components/ChangePassword';
import { useAuth } from '../../auth/context/AuthContext';
import colors from '../../common/colors';
import { FaUserCircle } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

import { getMyInfo } from '../../../shared/api/users';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 20px;
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
    padding: 8px 12px;
    border: 1px solid #dcdfe4;
    border-radius: 8px;
    background-color: #f7f9fc;
    color: #333;
    font-size: 15px;
    margin-left: 10px;
    min-width: 180px;
    justify-content: ${(props) => (props.$isEditing ? "flex-start" : "space-between")};
    gap: 15px;

    input, select {
        border: none;
        background: none;
        outline: none;
        flex-grow: 1;
        font-size: 15px;
    }
`;

const EditButton = styled.button`
    background: none;
    border: none;
    color: ${colors.primary};
    cursor: pointer;

    &:hover {
        color: ${colors.textAccent};
    }
`;


const ActionButton = styled.button`
    width: 100%;
    padding: 12px;
    margin-top: 40px;
    background-color: ${(props) => (props.$isSave ? colors.primary : "#888")};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => (props.$isSave ? colors.textAccent : "#666")};
    }
`;


const ProfilePage = () => {

    const { user, updateUser, changePassword } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editedNickname, setEditedNickname] = useState("");
    const [editedDob, setEditedDob] = useState("");
    const [editedGender, setEditedGender] = useState("male");

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await getMyInfo();

                updateUser({
                    username: data.nickname,
                    email: data.email,
                    dateOfBirth: data.birthDate || data.birthdate,
                    gender: data.gender?.toLowerCase(),
                    skinType: data.skinType || data.skintype,
                });

            } catch (err) {
                console.error("프로필 정보를 불러오지 못했습니다:", err);
            }
        };

        loadProfile();
    }, []);


    useEffect(() => {
        setEditedNickname(user?.username || "");
        setEditedDob(user?.dateOfBirth || "");
        setEditedGender(user?.gender?.toLowerCase() || "male");
    }, [user]);


    const userData = {
        nickname: user?.username || "Guest",
        email: user?.email || "정보 없음",
        dob: user?.dateOfBirth
            ? new Date(user.dateOfBirth).toISOString().slice(0, 10)
            : "정보 없음",
        gender:
            user?.gender?.toLowerCase() === "male"
                ? "남성"
                : user?.gender?.toLowerCase() === "female"
                ? "여성"
                : "기타",
        skinType: user?.skinType || "정보 없음",
    };

    const handleSave = () => {
        updateUser({
            username: editedNickname,
            dateOfBirth: editedDob,
            gender: editedGender,
        });

        setIsEditing(false);
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
                                value={editedNickname}
                                onChange={(e) => setEditedNickname(e.target.value)}
                            />
                        ) : (
                            <>
                                <span>{userData.nickname}</span>
                                <EditButton onClick={() => setIsEditing(true)}>
                                    <FiEdit2 size={16} />
                                </EditButton>
                            </>
                        )}
                    </InputDisplay>
                </UserInputGroup>

                <UserInputGroup>
                    <Label>Email</Label>
                    <InputDisplay>{userData.email}</InputDisplay>
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
                    <InputDisplay>{userData.skinType}</InputDisplay>
                </UserInputGroup>

                <ActionButton
                    $isSave={isEditing}
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                >
                    {isEditing ? "저장하기" : "프로필 수정"}
                </ActionButton>

                {!isEditing && (
                    <ActionButton onClick={() => setIsModalOpen(true)}>
                        Change Password
                    </ActionButton>
                )}
            </ContentBox>

            <ChangePassword
                isVisible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onPasswordChange={changePassword}
            />
        </Container>
    );
};

export default ProfilePage;
