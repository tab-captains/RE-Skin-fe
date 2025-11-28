import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoIosClose, IoIosSend } from 'react-icons/io'; 
import colors from '../../common/colors'; 

import { writePost } from "../../../shared/api/posts"; 

const PageContainer = styled.div`
    width: 100%;
    min-height: calc(100vh - 45px);
    display: flex;
    flex-direction: column;
    padding-top: 45px; 
`;

const Header = styled.div`
    position: fixed;
    top: 45px; 
    left: 0;
    right: 0;
    z-index: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    background-color: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const TitleInput = styled.input`
    flex-grow: 1;
    font-size: 1.5rem;
    font-weight: 700;
    border: none;
    outline: none;
    padding: 5px 0;
    color: #1a1a1a;
    &::placeholder {
        color: #b0b0b0;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`;

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    padding: 8px 15px;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    
    ${props => props.$primary ? css`
        background-color: ${colors.primary || '#3a4b9b'};
        color: white;
        &:hover {
            background-color: #2c3a7c;
        }
    ` : css`
        background-color: #e9ecef;
        color: #495057;
        &:hover {
            background-color: #dee2e6;
        }
    `}
`;

const EditorContainer = styled.div`
    flex-grow: 1;
    max-width: 900px;
    width: 90%;
    margin: 20px auto;
    padding: 40px 0;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const ContentArea = styled.textarea`
    width: 100%;
    min-height: 500px;
    font-size: 1.1rem;
    line-height: 1.8;
    border: none;
    outline: none;
    resize: none;
    padding: 20px 40px;
    box-sizing: border-box;
    font-family: 'Pretendard', sans-serif;
    color: #333;
    &::placeholder {
        color: #ccc;
    }
`;


const PostWritePage = () => {
    const navigate = useNavigate();
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');

    const handlePublish = async () => {
    if (!postTitle || !postContent) {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
    }

    try {
        const res = await writePost(postTitle, postContent);  // ★ 서버에 게시글 전송
        console.log("게시글 등록 응답:", res.data);

        alert("게시글이 등록되었습니다!");
        navigate('/community');
    } catch (err) {
        console.error("게시글 등록 실패:", err);
        alert("게시글 등록 실패!");
    }
};

    const handleCancel = () => {
        if (window.confirm('작성 중인 내용을 저장하지 않고 나가시겠습니까?')) {
            navigate('/community'); 
        }
    };

    return (
        <PageContainer>
            <Header>
                <TitleInput
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <ButtonGroup>
                    <ActionButton onClick={handleCancel}>
                        <IoIosClose size={20} style={{ marginRight: '3px' }} />
                        취소
                    </ActionButton>
                    <ActionButton $primary onClick={handlePublish}>
                        <IoIosSend size={18} style={{ marginRight: '3px' }} />
                        등록하기
                    </ActionButton>
                </ButtonGroup>
            </Header>
            <EditorContainer>
                <ContentArea
                    placeholder="여기에 내용을 작성해주세요."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                />
            </EditorContainer>
        </PageContainer>
    );
};

export default PostWritePage;