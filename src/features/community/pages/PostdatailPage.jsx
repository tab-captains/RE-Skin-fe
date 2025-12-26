import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { submitComment, deleteComment, getComments } from "../../../shared/api/comments";
import { getPostDetail, deletePost } from "../../../shared/api/posts";
import { togglePostLike } from "../../../shared/api/contentlike";
import { useAuth } from "../../auth/context/AuthContext";

const heartPop = keyframes` 0% { transform: scale(1); } 40% { transform: scale(1.3); } 100% { transform: scale(1); } `;
const AnimatedHeart = styled(FaHeart)` animation: ${props => (props.animate ? heartPop : "none")} 0.3s ease; `;

const PageContainer = styled.div` max-width: 800px; margin: 2rem auto; padding: 1.5rem; background: #fff; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); `;
const Title = styled.h1` font-size: 2rem; font-weight: 700; margin-bottom: 1rem; `;
const DateText = styled.p` color: #6B7280; margin-bottom: 1.5rem; `;
const Content = styled.p` font-size: 1.1rem; line-height: 1.7; white-space: pre-wrap; margin-bottom: 1.5rem; `;
const Footer = styled.div` display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-top: 1px solid #E5E7EB; `;
const Likes = styled.div` 
  display: flex; 
  align-items: center; 
  gap: 0.5rem; 
  color: #EF4444; 
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}; 
  opacity: ${props => props.disabled ? 0.6 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
`;
const BackButton = styled.button` padding: 8px 14px; background: #e5e7eb; border: none; border-radius: 8px; cursor: pointer; margin-bottom: 1rem; `;

const CommentBox = styled.div` margin-top: 2rem; `;
const CommentInputWrapper = styled.div` display: flex; gap: 10px; margin-bottom: 1.5rem; `;
const CommentInput = styled.input` flex: 1; padding: 12px; border-radius: 8px; border: 1px solid #D1D5DB; font-size: 0.95rem; `;
const SubmitButton = styled.button` background: #2563EB; color: white; border: none; padding: 0 20px; border-radius: 8px; cursor: pointer; font-weight: 500; `;

const CommentList = styled.div` margin-top: 1rem; `;
const CommentItem = styled.div` padding: 14px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; `;
const DeleteBtn = styled.button` font-size: 0.8rem; background: none; border: none; color: #DC2626; cursor: pointer; `;

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
  const { user, isLoggedIn } = useAuth();

  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pRes = await getPostDetail(postId);
        const detail = pRes.data || pRes;
        setPost(detail);
        setLikes(detail.likeCount || 0);
        setLiked(detail.liked || false);
        
        const cRes = await getComments(postId);
        setComments(cRes.data || cRes || []);
      } catch (err) { navigate('/community'); }
    };
    if (postId) fetchData();
  }, [postId, navigate]);

  const toggleLike = async () => {
    // 로그인 체크
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    // 중복 클릭 방지
    if (isProcessing) return;

    // 이전 상태 저장 (롤백용)
    const prevLikes = likes;
    const prevLiked = liked;

    setIsProcessing(true);
    setAnimateHeart(true);
    
    try {
      // 토글 API 호출
      const res = await togglePostLike(postId);
      
      // 응답 구조: { success, code, message, data: { postId, likeCount, liked } }
      const responseData = res.data || res;
      
      // 서버 응답 값을 single source of truth로 사용
      if (responseData.likeCount !== undefined) {
        setLikes(responseData.likeCount);
      }
      if (responseData.liked !== undefined) {
        setLiked(responseData.liked);
      }
      
      setTimeout(() => setAnimateHeart(false), 300);
    } catch (err) {
      // 에러 발생 시 이전 상태로 롤백
      setLikes(prevLikes);
      setLiked(prevLiked);
      setAnimateHeart(false);
      
      console.error("좋아요 토글 실패:", err);
      const errorMessage = err.response?.data?.message || "좋아요 처리에 실패했습니다.";
      alert(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const addComment = async () => {
    if (!input.trim() || isProcessing) return;
    setIsProcessing(true);
    try {
      const res = await submitComment(postId, input);
      const resData = res.data || res;

      // ✅ [해결] 등록 직후 '익명' 방지 및 내 닉네임 주입
      const newComment = {
        ...resData,
        nickname: user?.username || resData.nickname || '익명'
      };

      setComments(prev => [...prev, newComment]);
      setInput("");
    } catch (err) { alert("댓글 등록 실패"); }
    finally { setIsProcessing(false); }
  };

  const removeComment = async (id) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await deleteComment(id);
      setComments(prev => prev.filter(c => c.commentId !== id));
    } catch (err) { alert("삭제 실패"); }
  };

  if (!post) return <PageContainer>Loading...</PageContainer>;

  const isAuthor =
  isLoggedIn &&
  user &&
  post &&
  String(user.userId) === String(post.authorId);

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>

      {isAuthor && (
      <ActionButtons>
        <EditButton onClick={() => navigate(`/write?postId=${postId}&edit=true`)}>
          수정
        </EditButton>
      <DeletePostButton
        onClick={async () => {
          if (!window.confirm("정말 삭제하시겠습니까?")) return;
          await deletePost(postId);
          navigate("/community");
        }}
      >
      삭제
      </DeletePostButton>
      </ActionButtons>
    )}
      
      <Title>{post.title}</Title>
      <DateText>{new Date(post.publishedAt).toLocaleString()} · 작성자: {post.nickname}</DateText>
      <Content>{post.content}</Content>

      <Footer>
        <div>👀 조회수 {post.viewCount ?? 0}</div>
        <Likes onClick={toggleLike} disabled={isProcessing}>
          <AnimatedHeart animate={animateHeart} color={liked ? "#EF4444" : "#9CA3AF"} />
          <span>좋아요 {likes}</span>
        </Likes>
        <div><FaRegComment /> 댓글 {comments.length}</div>
      </Footer>

      <CommentBox>
        <CommentInputWrapper>
          <CommentInput placeholder="댓글을 입력하세요..." value={input} onChange={(e) => setInput(e.target.value)} />
          <SubmitButton onClick={addComment} disabled={isProcessing}>등록</SubmitButton>
        </CommentInputWrapper>
        <CommentList>
          {comments.map((c) => {
            // ✅ [해결] ProfilePage의 필드인 user.username과 일치하는지 비교
            const commentWriter = c.nickname || c.authorNickname;
            const isMyComment = isLoggedIn && user && (user.username === commentWriter);

            return (
              <CommentItem key={c.commentId || Math.random()}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#4B5563' }}>
                    {commentWriter || '익명'}
                  </span>
                  <span>{c.content}</span>
                </div>
                {/* ✅ 본인 닉네임과 일치할 때만 삭제 버튼 노출 */}
                {isMyComment && (
                  <DeleteBtn onClick={() => removeComment(c.commentId)}>삭제</DeleteBtn>
                )}
              </CommentItem>
            );
          })}
        </CommentList>
      </CommentBox>
    </PageContainer>
  );
};

export default PostDetailPage;