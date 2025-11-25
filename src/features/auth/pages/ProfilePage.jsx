import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// 💡 useAuth 훅에서 user와 updateNickname 함수를 가져와야 합니다.
import { useAuth } from '../../auth/context/AuthContext';
import colors from '../../common/colors';
import { FaUserCircle } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

// --- Styled Components 정의 ---

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
    display: flex;
    align-items: center;
    padding: 5px;

    &:hover {
        color: ${colors.textAccent};
    }
`;

// 사용되지 않는 Toggle 컴포넌트는 제거하지 않고 유지합니다. (향후 사용 가능성)
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
    opacity: ${props => props.disabled ? 0.6 : 1}; // disabled 상태 시 투명도 조절
    transition: background-color 0.2s;

    &:hover {
        background-color: ${props => props.disabled ? '#888' : props.$isSave ? colors.textAccent : '#666'};
    }
`;

// --- ProfilePage 컴포넌트 ---

const ProfilePage = () => {
    // useAuth에서 사용자 데이터와 업데이트 함수를 가져옵니다.
    const { user, updateNickname } = useAuth(); 
    
    const [isEditing, setIsEditing] = useState(false);
    const [editedNickname, setEditedNickname] = useState(user?.username || "");
    const [loading, setLoading] = useState(false); // 로딩 상태 추가

    // user 정보가 변경될 때마다 editedNickname을 초기화합니다.
    useEffect(() => {
        setEditedNickname(user?.username || "");
    }, [user]);

    // 닉네임 업데이트 처리 함수
    const handleSave = async () => {
        const trimmedNickname = editedNickname.trim();
        
        // 1. 유효성 검사 (닉네임 공백 체크)
        if (!trimmedNickname) {
            alert('닉네임은 공백일 수 없습니다.');
            return;
        }

        // 2. 변경 사항이 없으면 저장하지 않고 모드만 닫습니다.
        if (trimmedNickname === user?.username) {
            setIsEditing(false);
            return;
        }

        setLoading(true);
        try {
            // 3. useAuth를 통해 API 통신 함수 호출
            await updateNickname(trimmedNickname); 
            
            setIsEditing(false);
            alert('닉네임이 성공적으로 업데이트되었습니다.'); 
        } catch (error) {
            console.error("프로필 업데이트 실패:", error);
            alert('닉네임 업데이트에 실패했습니다. 다시 시도해 주세요.'); 
            setEditedNickname(user?.username || ""); // 에러 시 원래 값으로 복구
        } finally {
            setLoading(false);
        }
    };

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
                <Header>Hello {editedNickname || "Guest"}!</Header>

                <AvatarContainer>
                    <FaUserCircle size={80} color="#1e2a55" />
                </AvatarContainer>

                <UserInputGroup>
                    <Label>Email</Label>
                    <InputDisplay>
                        <span>{user?.email || "이메일 정보 없음"}</span>
                    </InputDisplay>
                </UserInputGroup>

                <UserInputGroup>
                    <Label>Nickname</Label>
                    <InputDisplay $isEditing={isEditing}>
                        {isEditing ? (
                            <input
                                value={editedNickname}
                                onChange={(e) => setEditedNickname(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                                disabled={loading}
                            />
                        ) : (
                            <>
                                <span>{editedNickname}</span>
                                <EditButton onClick={() => setIsEditing(true)}>
                                    <FiEdit2 size={16} color={colors.primary} />
                                </EditButton>
                            </>
                        )}
                    </InputDisplay>
                </UserInputGroup>

                <ActionButton 
                    $isSave={isEditing} 
                    onClick={handleActionClick}
                    disabled={loading || (isEditing && !editedNickname.trim())} 
                >
                    {loading ? '저장 중...' : isEditing ? '저장하기' : '프로필 수정'}
                </ActionButton>
            </ContentBox>
        </Container>
    );
};

export default ProfilePage;