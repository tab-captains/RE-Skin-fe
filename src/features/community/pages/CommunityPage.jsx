import React from 'react';
import styled from 'styled-components';
import { FaUserCircle, FaRegComment, FaHeart } from "react-icons/fa"; 
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { keyframes } from "styled-components";

const heartPop = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.4); }
  100% { transform: scale(1); }
`;

const AnimatedHeart = styled(({ animate, ...rest }) => <FaHeart {...rest} />)`
  animation: ${props => (props.animate ? heartPop : "none")} 0.3s ease;
`;

const PageContainer = styled.div`
    width: 90%;
    max-width: 1000px;
    margin: 2rem auto;
    font-family: 'Pretendard', sans-serif;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5rem;
`;

const Title = styled.h1`
    font-size: 2.25rem; 
    font-weight: bold;
`;

const WriteButton = styled.button`
    background-color: #2563EB;
    color: white;
    border: none;
    padding: 0.75rem 1.25rem; 
    border-radius: 8px; 
    font-size: 1rem; 
    font-weight: 500;
    cursor: pointer;

    &:hover {
        background-color: #1D4ED8; 
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const Card = styled.div`
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    overflow: hidden; 
    background-color: #FFFFFF;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 10px rgba(0,0,0,0.1);
    }
`;

const ImagePlaceholder = styled.div`
    width: 100%;
    aspect-ratio: 16 / 9;
    background-color: #F3F4F6; 
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9CA3AF;
    font-size: 1.25rem;
    border-bottom: 1px solid #E5E7EB;
`;

const Content = styled.div`
    padding: 1.25rem; 
`;

const ScribbleText = styled.div`
    width: 90%;
    height: 2.5rem; 
    background: linear-gradient(
        to bottom,
        #D1D5DB 0%,
        #D1D5DB 10px,
        transparent 10px,
        transparent 16px,
        #D1D5DB 16px,
        #D1D5DB 26px
    );
    opacity: 0.6;
    margin-bottom: 1rem;
`;

const DateText = styled.p`
    font-size: 0.875rem; 
    color: #6B7280; 
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem; 
    border-top: 1px solid #E5E7EB;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem; 
`;

const Likes = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem; 
    color: #EF4444; 
`;

const UserIcon = styled(FaUserCircle)`
    font-size: 1.25rem;
    color: #3B82F6; 
`;

const CommentBox = styled.div`
    padding: 1rem;
    border-top: 1px solid #E5E7EB;
    background-color: #F9FAFB;

    textarea {
        width: 100%;
        height: 60px;
        padding: 10px;
        border-radius: 6px;
        border: 1px solid #D1D5DB;
        resize: none;
        font-size: 0.9rem;
    }

    button {
        margin-top: 8px;
        padding: 6px 12px;
        background-color: #2563EB;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 0.85rem;
        cursor: pointer;

        &:hover {
            background-color: #1D4ED8;
        }
    }
`;

const CommentList = styled.div`
    margin-top: 12px;
`;

const CommentItem = styled.div`
    background: #fff;
    border: 1px solid #E5E7EB;
    padding: 8px 10px;
    margin-bottom: 6px;
    border-radius: 6px;
    font-size: 0.85rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DeleteBtn = styled.button`
    background: transparent;
    border: none;
    font-size: 0.75rem;
    color: #DC2626;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const PostCard = ({ id }) => {   
    const navigate = useNavigate();

    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [animateHeart, setAnimateHeart] = useState(false);

    const [comments, setComments] = useState([]);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentInput, setCommentInput] = useState("");

    const handleLike = () => {
        setLiked(!liked);
        setLikes(prev => (liked ? prev - 1 : prev + 1));

        setAnimateHeart(true);
        setTimeout(() => setAnimateHeart(false), 300);
    };

    const addComment = () => {
        if (!commentInput.trim()) return;
        setComments([...comments, commentInput]);
        setCommentInput("");
    };

    const deleteComment = (index) => {
        setComments(comments.filter((_, i) => i !== index));
    };

    return (
        <Card onClick={() => navigate(`/community/post/${id}`)}>
            <ImagePlaceholder>Image 들어갈 예정</ImagePlaceholder>

            <Content>
                <ScribbleText />
                <DateText>2025년 10.XX일</DateText>
            </Content>

            <Footer>
                <UserInfo
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                        e.stopPropagation();          
                        setShowCommentBox(!showCommentBox);
                    }}
                >
                    <UserIcon />
                    <span>댓글 {comments.length}</span>
                    <FaRegComment />
                </UserInfo>

                <Likes
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                        e.stopPropagation();       
                        handleLike();
                    }}
                >
                    <span>좋아요 {likes}</span>
                    <AnimatedHeart animate={animateHeart} color={liked ? "red" : "#EF4444"} />
                </Likes>
            </Footer>

            {showCommentBox && (
                <CommentBox>
                    <textarea
                        placeholder="댓글을 입력하세요..."
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <button onClick={addComment}>등록</button>

                    <CommentList>
                        {comments.map((c, idx) => (
                            <CommentItem key={idx}>
                                <span>{c}</span>
                                <DeleteBtn onClick={() => deleteComment(idx)}>
                                    삭제
                                </DeleteBtn>
                            </CommentItem>
                        ))}
                    </CommentList>
                </CommentBox>
            )}
        </Card>
    );
};

const CommunityPage = () => {
    const navigate = useNavigate();
    const mockPosts = [1, 2, 3, 4];

    return (
        <PageContainer>
            <Header>
                <Title>Free Board</Title>
                <WriteButton onClick={() => navigate('/write')}>
                    + 내 글 작성하기
                </WriteButton>
            </Header>

            <Grid>
                {mockPosts.map(id => (
                    <PostCard key={id} id={id} /> 
                ))}
            </Grid>
        </PageContainer>
    );
};

export default CommunityPage;
