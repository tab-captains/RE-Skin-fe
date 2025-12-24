import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IoIosClose, IoIosSend } from 'react-icons/io'; 
import colors from '../../common/colors'; 

import { writePost, updatePost, getPostDetail } from "../../../shared/api/posts"; 

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
    gap: 15px;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    flex-grow: 1;
`;

const TypeSelect = styled.select`
    font-size: 0.9rem;
    padding: 6px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: white;
    color: #333;
    cursor: pointer;
    outline: none;
    transition: border-color 0.2s;

    &:hover {
        border-color: ${colors.primary};
    }

    &:focus {
        border-color: ${colors.primary};
    }
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
    const [searchParams] = useSearchParams();
    const postId = searchParams.get('postId');
    const isEditMode = searchParams.get('edit') === 'true';

    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postType, setPostType] = useState('ARTICLE');
    const [loading, setLoading] = useState(false);

    // 수정 모드일 때 기존 게시글 데이터 로드
    useEffect(() => {
        if (isEditMode && postId) {
            fetchPost();
        }
    }, [isEditMode, postId]);

    const fetchPost = async () => {
        try {
            setLoading(true);
            const res = await getPostDetail(postId);
            console.log("게시글 상세조회 응답:", res);
            
            // getPostDetail은 res.data를 반환하므로, res는 { success, code, message, data } 형태
            // 실제 게시글 데이터는 res.data에 있음 (PostDetailPage와 동일한 방식)
            const detail = res.data;
            console.log("게시글 상세 데이터:", detail);
            
            if (!detail) {
                throw new Error("게시글 데이터를 찾을 수 없습니다.");
            }
            
            setPostTitle(detail.title);
            setPostContent(detail.content);
            setPostType(detail.postType || 'ARTICLE');
        } catch (err) {
            console.error("게시글 불러오기 실패:", err);
            console.error("에러 상세:", err.response?.data);
            alert("게시글을 불러오는데 실패했습니다. " + (err.response?.data?.message || err.message));
            navigate('/community');
        } finally {
            setLoading(false);
        }
    };

    const handlePublish = async () => {
        if (!postTitle || !postContent) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        // postType 검증 강화
        const validType = postType === 'ARTICLE' || postType === 'POST' ? postType : 'ARTICLE';
        if (!validType || (validType !== 'ARTICLE' && validType !== 'POST')) {
            alert('게시글 종류를 선택해주세요.');
            return;
        }

        try {
            const postData = {
                title: postTitle.trim(),
                type: validType,
                content: postContent.trim()
            };

            console.log('전송할 게시글 데이터:', postData);
            console.log('postType 상태:', postType);
            console.log('validType:', validType);

            if (isEditMode && postId) {
                // 수정 모드
                const res = await updatePost(postId, postData);
                console.log("게시글 수정 응답:", res);
                alert("게시글이 수정되었습니다!");
            } else {
                // 작성 모드
                const res = await writePost(postData);
                console.log("게시글 등록 응답:", res);
                alert("게시글이 등록되었습니다!");
            }
            navigate('/community');
        } catch (err) {
            console.error(isEditMode ? "게시글 수정 실패:" : "게시글 등록 실패:", err);
            alert(err.response?.data?.message || (isEditMode ? "게시글 수정 실패!" : "게시글 등록 실패!"));
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
                <HeaderLeft>
                    <TypeSelect value={postType} onChange={(e) => setPostType(e.target.value)}>
                        <option value="ARTICLE">게시글</option>
                        <option value="POST">포스트</option>
                    </TypeSelect>
                    <TitleInput
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                    />
                </HeaderLeft>
                <ButtonGroup>
                    <ActionButton onClick={handleCancel}>
                        <IoIosClose size={20} style={{ marginRight: '3px' }} />
                        취소
                    </ActionButton>
                    <ActionButton $primary onClick={handlePublish} disabled={loading}>
                        <IoIosSend size={18} style={{ marginRight: '3px' }} />
                        {loading ? '로딩 중...' : (isEditMode ? '수정하기' : '등록하기')}
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