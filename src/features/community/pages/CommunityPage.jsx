import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUserCircle, FaRegComment, FaHeart } from "react-icons/fa"; 
import { useNavigate } from 'react-router-dom';
import { togglePostLike } from '../../../shared/api/contentlike';
import { submitComment, deleteComment, getComments } from "../../../shared/api/comments";
import { getPostList } from "../../../shared/api/posts";
import { useAuth } from "../../auth/context/AuthContext";

// --- 스타일 정의 ---
const heartPop = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.4); }
  100% { transform: scale(1); }
`;

const AnimatedHeart = styled(({ animate, ...rest }) => <FaHeart {...rest} />)`
  animation: ${props => (props.animate ? heartPop : "none")} 0.3s ease;
`;

const PageContainer = styled.div` width: 90%; max-width: 1000px; margin: 2rem auto; font-family: 'Pretendard', sans-serif; `;
const Header = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; `;
const Title = styled.h1` font-size: 2.25rem; font-weight: bold; `;
const WriteButton = styled.button` background-color: #2563EB; color: white; border: none; padding: 0.75rem 1.25rem; border-radius: 8px; font-size: 1rem; font-weight: 500; cursor: pointer; &:hover { background-color: #1D4ED8; } `;
const FilterTabs = styled.div` display: flex; gap: 10px; margin-bottom: 1.5rem; border-bottom: 2px solid #E5E7EB; `;
const FilterTab = styled.button` padding: 0.75rem 1.5rem; background: none; border: none; border-bottom: 3px solid ${props => props.$active ? '#2563EB' : 'transparent'}; color: ${props => props.$active ? '#2563EB' : '#6B7280'}; font-size: 1rem; font-weight: ${props => props.$active ? '600' : '500'}; cursor: pointer; transition: all 0.2s; &:hover { color: #2563EB; } `;
const Grid = styled.div` display: flex; flex-direction: column; gap: 1.5rem; `;
const Card = styled.div` border: 1px solid #E5E7EB; border-radius: 12px; background-color: #FFFFFF; transition: all 0.2s ease; cursor: pointer; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); &:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border-color: #D1D5DB; } `;
const Content = styled.div` padding: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; `;
const PostTitle = styled.div` font-size: 1.25rem; font-weight: 600; color: #1a1a1a; line-height: 1.5; `;
const MetaInfo = styled.div` display: flex; align-items: center; gap: 0.75rem; font-size: 0.875rem; color: #9CA3AF; `;
const AuthorInfo = styled.div` display: flex; align-items: center; gap: 0.5rem; `;
const DateText = styled.span` color: #9CA3AF; `;
const Footer = styled.div` display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-top: 1px solid #E5E7EB; `;
const UserInfo = styled.div` display: flex; align-items: center; gap: 0.5rem; `;
const Likes = styled.div` 
  display: flex; 
  align-items: center; 
  gap: 0.5rem; 
  color: #EF4444; 
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}; 
  opacity: ${props => props.disabled ? 0.6 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
`;
const UserIcon = styled(FaUserCircle)` font-size: 1.25rem; color: #3B82F6; `;

const CommentBox = styled.div` padding: 1rem; border-top: 1px solid #E5E7EB; background-color: #F9FAFB; `;
const CommentInputWrapper = styled.div` display: flex; gap: 10px; margin-bottom: 12px; `;
const StyledInput = styled.input` 
  flex: 1; padding: 10px 14px; border-radius: 8px; border: 1px solid #E5E7EB; 
  font-size: 0.95rem; outline: none; &:focus { border-color: #2563EB; }
`;
const StyledSubmitBtn = styled.button` 
  padding: 0 18px; background-color: #2563EB; color: white; border: none; 
  border-radius: 8px; font-weight: 500; cursor: pointer;
  &:hover { background-color: #1D4ED8; }
`;

const CommentList = styled.div` margin-top: 10px; `;
const CommentItem = styled.div` 
  background: #fff; border: 1px solid #E5E7EB; padding: 12px; 
  margin-bottom: 8px; border-radius: 8px; display: flex; 
  justify-content: space-between; align-items: center; 
`;
const DeleteBtn = styled.button` 
  background: transparent; border: none; font-size: 0.8rem; color: #DC2626; 
  cursor: pointer; &:hover { text-decoration: underline; } 
`;

const PostCard = ({ post }) => {
    const navigate = useNavigate();
    const { user, isLoggedIn } = useAuth();
    
    const [likes, setLikes] = useState(post.likeCount || 0);
    const [liked, setLiked] = useState(post.liked || false);
    const [animateHeart, setAnimateHeart] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [comments, setComments] = useState([]);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentInput, setCommentInput] = useState("");

    useEffect(() => {
        if (showCommentBox) {
            const fetchComments = async () => {
                try {
                    const res = await getComments(post.postId);
                    const data = res.data || res;
                    setComments(Array.isArray(data) ? data : []); 
                } catch (err) { console.error(err); }
            };
            fetchComments();
        }
    }, [showCommentBox, post.postId]);

    // ✅ 댓글 등록 로직 수정
    const addComment = async (e) => {
        if (e) e.stopPropagation();
        if (!commentInput.trim() || isProcessing) return;
        setIsProcessing(true);
        try {
            const res = await submitComment(post.postId, commentInput);
            const resData = res.data || res;

            // 핵심: 서버에서 온 데이터에 현재 유저의 닉네임을 강제로 주입하여 익명 표시 방지
            const newComment = {
                ...resData,
                nickname: user?.username || resData.nickname || '익명'
            };

            setComments(prev => [...prev, newComment]);
            setCommentInput("");
        } catch (err) { alert("댓글 등록 실패"); }
        finally { setIsProcessing(false); }
    };

    const handleLike = async (e) => {
        if (e) e.stopPropagation();
        
        // 로그인 체크
        if (!isLoggedIn) {
            alert("로그인이 필요합니다.");
            return;
        }
        
        // 중복 클릭 방지
        if (isProcessing) return;
        
        // 이전 상태 저장 (롤백용)
        const originalLiked = liked;
        const originalLikes = likes;
        
        setIsProcessing(true);
        setAnimateHeart(true);
        
        try {
            // 토글 API 호출
            const res = await togglePostLike(post.postId);
            
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
            setLiked(originalLiked);
            setLikes(originalLikes);
            setAnimateHeart(false);
            
            console.error("좋아요 토글 실패:", err);
            const errorMessage = err.response?.data?.message || "좋아요 처리에 실패했습니다.";
            alert(errorMessage);
        } finally {
            setIsProcessing(false);
        }
    };

    const removeComment = async (commentId, e) => {
        if (e) e.stopPropagation();
        if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
        try {
            await deleteComment(commentId);
            setComments(prev => prev.filter(c => c.commentId !== commentId));
        } catch (err) { alert("삭제 권한이 없거나 오류가 발생했습니다."); }
    };

    return (
        <Card onClick={() => navigate(`/community/post/${post.postId}`)}>
            <Content>
                <PostTitle>{post.title}</PostTitle>
                <MetaInfo>
                    <AuthorInfo><UserIcon /><span>{post.nickname || '익명'}</span></AuthorInfo>
                    <DateText>· {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}</DateText>
                </MetaInfo>
            </Content>
            <Footer>
                <UserInfo>
                    👀 <span>{post.viewCount ?? 0}</span>
                </UserInfo>
                
                <UserInfo onClick={(e) => { e.stopPropagation(); setShowCommentBox(!showCommentBox); }}>
                    <FaRegComment size={16} />
                    <span>{comments.length > 0 ? comments.length : (post.commentCount || 0)}</span>
                </UserInfo>
                <Likes onClick={handleLike} disabled={isProcessing}>
                    <AnimatedHeart animate={animateHeart} color={liked ? "#EF4444" : "#9CA3AF"} size={16} />
                    <span>{likes}</span>
                </Likes>
            </Footer>
            {showCommentBox && (
                <CommentBox onClick={(e) => e.stopPropagation()}>
                    <CommentInputWrapper>
                        <StyledInput 
                            value={commentInput} 
                            onChange={(e) => setCommentInput(e.target.value)} 
                            placeholder="댓글을 입력하세요..." 
                        />
                        <StyledSubmitBtn onClick={addComment} disabled={isProcessing}>등록</StyledSubmitBtn>
                    </CommentInputWrapper>
                    <CommentList>
                        {comments.map((c) => {
                            // ProfilePage에서 저장한 'user.username' 필드와 댓글 작성자 이름을 비교
                            const commentWriter = c.nickname || c.authorNickname;
                            const isMyComment = isLoggedIn && user && (user.username === commentWriter);
                            
                            return (
                                <CommentItem key={c.commentId || Math.random()}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <span style={{ fontWeight: 'bold', color: '#4B5563', fontSize: '0.85rem' }}>
                                            {commentWriter || '익명'}
                                        </span>
                                        <span>{c.content}</span>
                                    </div>
                                    {isMyComment && (
                                        <DeleteBtn onClick={(e) => removeComment(c.commentId, e)}>삭제</DeleteBtn>
                                    )}
                                </CommentItem> 
                            );
                        })}
                    </CommentList>
                </CommentBox>
            )}
        </Card>
    );
};

const CommunityPage = () => {
    const navigate = useNavigate();
    const { user, isLoggedIn } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const authorId = filter === 'my' && isLoggedIn && user?.userId ? user.userId : null;
            const res = await getPostList({ page: 0, size: 20, sort: "publishedAt,desc", type: 'ARTICLE', authorId });
            setPosts((res.data || res).content || []);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchPosts(); }, [filter, isLoggedIn, user]);

    return (
        <PageContainer>
            <Header><Title>Free Board</Title><WriteButton onClick={() => navigate('/write')}>+ 내 글 작성하기</WriteButton></Header>
            {isLoggedIn && (
                <FilterTabs>
                    <FilterTab $active={filter === 'all'} onClick={() => setFilter('all')}>전체 게시글</FilterTab>
                    <FilterTab $active={filter === 'my'} onClick={() => setFilter('my')}>내 글</FilterTab>
                </FilterTabs>
            )}
            {loading ? <div style={{textAlign:'center', padding: '2rem'}}>로딩 중...</div> : (
                <Grid>{posts.map(post => <PostCard key={post.postId} post={post} />)}</Grid>
            )}
        </PageContainer>
    );
};

export default CommunityPage;