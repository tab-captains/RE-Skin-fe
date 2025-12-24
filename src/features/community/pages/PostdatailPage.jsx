import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import { submitComment, deleteComment, getComments } from "../../../shared/api/comments";
import { getPostDetail, updatePost, deletePost } from "../../../shared/api/posts";
import { likePost, unlikePost } from "../../../shared/api/contentlike";
import { useAuth } from "../../auth/context/AuthContext";
import { getMyInfo } from "../../../shared/api/users";


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

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
  justify-content: flex-end;
`;

const EditButton = styled.button`
  padding: 8px 14px;
  background: #2563EB;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover { background: #1D4ED8; }
`;

const DeletePostButton = styled.button`
  padding: 8px 14px;
  background: #DC2626;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover { background: #B91C1C; }
`;

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { user, isLoggedIn, updateUser } = useAuth();

  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (postId) {
      fetchPost();
      fetchCommentsData();
    }
  }, [postId]);

  // userId가 없으면 사용자 정보 API에서 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isLoggedIn && user && !user.userId) {
        try {
          console.log("userId가 없어서 사용자 정보를 가져옵니다.");
          const userInfo = await getMyInfo();
          console.log("가져온 사용자 정보:", userInfo);
          
          // AuthContext의 updateUser를 사용해서 userId 업데이트
          updateUser({
            userId: userInfo.userId || userInfo.id,
            loginId: userInfo.loginId || user.loginId,
            username: userInfo.nickname || user.username,
            email: userInfo.email || user.email,
            birthdate: userInfo.birthdate || user.dateOfBirth,
            gender: userInfo.gender || user.gender,
            skinType: userInfo.skintype || user.skinType,
          });
        } catch (err) {
          console.error("사용자 정보 가져오기 실패:", err);
        }
      }
    };

    fetchUserInfo();
  }, [isLoggedIn, user, updateUser]);

  const fetchPost = async () => {
    try {
      console.log("fetchPost 호출 - postId:", postId);
      if (!postId) {
        console.error("postId가 없습니다.");
        return;
      }
      
      const res = await getPostDetail(postId);
      console.log("getPostDetail 응답:", res);
      
      // 응답 구조: { success: true, code: "OK", message: "...", data: {...} }
      // getPostDetail이 res.data를 반환하므로, res는 이미 { success, code, message, data } 형태
      const detail = res.data;
      console.log("게시글 상세 데이터:", detail);

      if (!detail) {
        throw new Error("게시글 데이터를 찾을 수 없습니다.");
      }

      setPost(detail);
      setLikes(detail.likeCount || 0);
      setLiked(detail.liked || false);
      // 단건 조회 응답에 comments가 포함되어 있음
      if (detail.comments) {
        setComments(detail.comments);
      }
    } catch (err) {
      console.error("게시글 불러오기 실패:", err);
      console.error("에러 상세:", err.response?.data);
      alert("게시글을 불러오는데 실패했습니다. " + (err.response?.data?.message || err.message));
      navigate('/community');
    }
  };

  const fetchCommentsData = async () => {
    try {
      const res = await getComments(postId);
      // 댓글 목록 응답 구조 확인 필요 (res.data.data 또는 res.data)
      const commentsData = res.data?.data || res.data || [];
      setComments(Array.isArray(commentsData) ? commentsData : []); 
    } catch (err) {
      console.error("댓글 불러오기 실패:", err);
    }
  };

  const toggleLike = async () => {
    try {
      if (!postId) {
        console.error("postId가 없습니다.");
        return;
      }

      let res;

      if (!liked) {
        res = await likePost(postId);
      } else {
        res = await unlikePost(postId);
      }

      console.log("좋아요 응답:", res);
      
      // 응답 구조 확인: res.data 또는 res.data.data
      const responseData = res.data || res;
      const likeData = responseData.data || responseData;
      
      console.log("좋아요 데이터:", likeData);

      const likeCount = likeData.likeCount || likes;
      const newLiked = likeData.liked !== undefined ? likeData.liked : !liked;

      setLikes(likeCount);
      setLiked(newLiked);

      setAnimateHeart(true);
      setTimeout(() => setAnimateHeart(false), 300);

    } catch (err) {
      console.error("좋아요 처리 실패:", err);
      console.error("에러 상세:", err.response?.data);
      alert("좋아요 처리에 실패했습니다. " + (err.response?.data?.message || err.message));
    }
  };


  const addComment = async () => {
    if (!input.trim()) return;

    try {
      const res = await submitComment(postId, input);
      // 댓글 등록 응답 구조 확인 필요
      const newComment = res.data?.data || res.data || res;
      setComments([...comments, newComment]);
      setInput("");
      // 댓글 등록 후 목록 새로고침
      fetchCommentsData();
    } catch (err) {
      console.error("댓글 등록 실패:", err);
      alert("댓글 등록에 실패했습니다.");
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

  const handleEdit = () => {
    navigate(`/write?postId=${postId}&edit=true`);
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deletePost(postId);
      alert('게시글이 삭제되었습니다.');
      navigate('/community');
    } catch (err) {
      console.error("게시글 삭제 실패:", err);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  // 작성자 본인인지 확인
  const isAuthor = isLoggedIn && user && post && (
    user.userId === post.authorId || 
    String(user.userId) === String(post.authorId)
  );
  
  // 디버깅용 로그
  useEffect(() => {
    if (post && user) {
      console.log("작성자 확인:");
      console.log("  - user:", user);
      console.log("  - user.userId:", user.userId, typeof user.userId);
      console.log("  - post:", post);
      console.log("  - post.authorId:", post.authorId, typeof post.authorId);
      console.log("  - isLoggedIn:", isLoggedIn);
      console.log("  - isAuthor:", isAuthor);
    }
  }, [post, user, isLoggedIn]);

  if (!post) return <div>Loading...</div>;

  return (
    <PageContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>
        {isAuthor && (
          <ActionButtons>
            <EditButton onClick={handleEdit}>수정</EditButton>
            <DeletePostButton onClick={handleDelete}>삭제</DeletePostButton>
          </ActionButtons>
        )}
      </div>

      <Title>{post.title}</Title>
      <DateText>
        {post.publishedAt ? new Date(post.publishedAt).toLocaleString('ko-KR') : ''} · 작성자: {post.authorNickname}
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
