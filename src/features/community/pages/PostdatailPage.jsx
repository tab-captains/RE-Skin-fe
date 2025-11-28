import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import { submitComment, deleteComment, getComments } from "../../../shared/api/comments";
import { getPostDetail } from "../../../shared/api/posts";

const heartPop = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

const AnimatedHeart = styled(FaHeart)`
  animation: ${props => (props.animate ? heartPop : "none")} 0.3s ease;
`;

const PageContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const DateText = styled.p`
  color: #6B7280;
  margin-bottom: 1.5rem;
`;

const Content = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  white-space: pre-wrap;
  margin-bottom: 1.5rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-top: 1px solid #E5E7EB;
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #EF4444;
  cursor: pointer;
`;

const BackButton = styled.button`
  padding: 8px 14px;
  background: #e5e7eb;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover { background: #d1d5db; }
`;

const CommentBox = styled.div`
  margin-top: 2rem;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 70px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #D1D5DB;
  font-size: 0.95rem;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  background: #2563EB;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;

  &:hover { background: #1D4ED8; }
`;

const CommentList = styled.div`
  margin-top: 1.2rem;
`;

const CommentItem = styled.div`
  padding: 10px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  margin-bottom: 10px;

  display: flex;
  justify-content: space-between;
`;

const DeleteBtn = styled.button`
  font-size: 0.8rem;
  background: none;
  border: none;
  color: #DC2626;
  cursor: pointer;

  &:hover { text-decoration: underline; }
`;

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchPost();
    fetchCommentsData();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const res = await getPostDetail(postId);
      setPost(res.data);
    } catch (err) {
      console.error("게시글 불러오기 실패:", err);
    }
  };

  const fetchCommentsData = async () => {
    try {
      const res = await getComments(postId);
      setComments(res); 
    } catch (err) {
      console.error("댓글 불러오기 실패:", err);
    }
  };

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(prev => (liked ? prev - 1 : prev + 1));

    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 300);
  };

  const addComment = async () => {
    if (!input.trim()) return;

    try {
      const newComment = await submitComment(postId, input);
      setComments([...comments, newComment]);
      setInput("");
    } catch (err) {
      console.error("댓글 등록 실패:", err);
    }
  };

  const removeComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter(c => c.commentId !== commentId));
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>

      <Title>{post.title}</Title>
      <DateText>
        {post.createdAt} · 작성자: {post.writerName}
      </DateText>

      <Content>{post.content}</Content>

      <Footer>
        <Likes onClick={toggleLike}>
          <span>좋아요 {likes}</span>
          <AnimatedHeart animate={animateHeart} color={liked ? "red" : "#EF4444"} />
        </Likes>

        <div>
          <FaRegComment style={{ marginRight: 5 }} />
          댓글 {comments.length}
        </div>
      </Footer>

      <CommentBox>
        <CommentInput
          placeholder="댓글을 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <SubmitButton onClick={addComment}>댓글 등록</SubmitButton>

        <CommentList>
          {comments.map((c) => (
            <CommentItem key={c.commentId}>
              <span>{c.content}</span>
              <DeleteBtn onClick={() => removeComment(c.commentId)}>삭제</DeleteBtn>
            </CommentItem>
          ))}
        </CommentList>
      </CommentBox>
    </PageContainer>
  );
};

export default PostDetailPage;
