import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUserCircle, FaRegComment, FaHeart } from "react-icons/fa"; 
import { useNavigate } from 'react-router-dom';
import { keyframes } from "styled-components";

import { submitComment, deleteComment } from "../../../shared/api/comments";
import { getPostList } from "../../../shared/api/posts";
import { useAuth } from "../../auth/context/AuthContext";

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

const FilterTabs = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #E5E7EB;
`;

const FilterTab = styled.button`
    padding: 0.75rem 1.5rem;
    background: none;
    border: none;
    border-bottom: 3px solid ${props => props.$active ? '#2563EB' : 'transparent'};
    color: ${props => props.$active ? '#2563EB' : '#6B7280'};
    font-size: 1rem;
    font-weight: ${props => props.$active ? '600' : '500'};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        color: #2563EB;
    }
`;

const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @media (max-width: 768px) {
        gap: 1rem;
    }
`;

const Card = styled.div`
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    background-color: #FFFFFF;
    transition: all 0.2s ease;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-color: #D1D5DB;
    }
`;

const Content = styled.div`
    padding: 1.5rem; 
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const PostTitle = styled.div`
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 1.5;
    margin-bottom: 0.25rem;
    
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const PostPreview = styled.div`
    font-size: 0.95rem;
    color: #6B7280;
    line-height: 1.6;
    margin-bottom: 0.5rem;
    
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const MetaInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: #9CA3AF;
    margin-top: 0.25rem;
`;

const AuthorInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const DateText = styled.span`
    color: #9CA3AF;
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

const LoadMoreContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

const LoadMoreButton = styled.button`
    padding: 0.75rem 2rem;
    background-color: #2563EB;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover:not(:disabled) {
        background-color: #1D4ED8;
    }

    &:disabled {
        background-color: #9CA3AF;
        cursor: not-allowed;
    }
`;

const EndMessage = styled.div`
    text-align: center;
    padding: 2rem;
    color: #6B7280;
    font-size: 0.9rem;
`;

const PostCard = ({ post }) => {
    const navigate = useNavigate();

    const [likes, setLikes] = useState(post.likeCount || 0);
    const [liked, setLiked] = useState(post.liked || false);
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

    const addComment = async (e) => {
        e.stopPropagation();
        if (!commentInput.trim()) return;

        try {
            const newComment = await submitComment(post.postId, commentInput);
            setComments([...comments, newComment]);  
            setCommentInput("");
        } catch (err) {
            console.error("댓글 등록 실패:", err);
            alert("댓글 등록 실패");
        }
    };

    const removeComment = async (commentId, e) => {
        e.stopPropagation();

        try {
            await deleteComment(commentId);
            setComments(comments.filter((c) => c.commentId !== commentId));
        } catch (err) {
            console.error("댓글 삭제 실패:", err);
            alert("댓글 삭제 실패");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}.${date.getDate()}일`;
    };

    return (
        <Card onClick={() => navigate(`/community/post/${post.postId}`)}>
            <Content>
                <PostTitle>{post.title}</PostTitle>
                
                <MetaInfo>
                    <AuthorInfo>
                        <UserIcon />
                        <span>{post.nickname || '익명'}</span>
                    </AuthorInfo>
                    <DateText>·</DateText>
                    <DateText>{formatDate(post.publishedAt)}</DateText>
                </MetaInfo>
            </Content>

            <Footer>
                <UserInfo
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowCommentBox(!showCommentBox);
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <FaRegComment size={16} />
                    <span>{post.commentCount || 0}</span>
                </UserInfo>

                <Likes
                    onClick={(e) => {
                        e.stopPropagation();
                        handleLike();
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <AnimatedHeart animate={animateHeart} color={liked ? "red" : "#EF4444"} size={16} />
                    <span>{post.likeCount || 0}</span>
                </Likes>
            </Footer>

            {showCommentBox && (
                <CommentBox onClick={(e) => e.stopPropagation()}>
                    <textarea
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="댓글을 입력하세요..."
                    />
                    <button onClick={addComment}>등록</button>

                    <CommentList>
                        {comments.map((c) => (
                            <CommentItem key={c.commentId}>
                                <span>{c.content}</span>
                                <DeleteBtn onClick={(e) => removeComment(c.commentId, e)}>삭제</DeleteBtn>
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
    const { user, isLoggedIn } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    
    // 필터 상태 (전체 / 내 글)
    const [filter, setFilter] = useState('all'); // 'all' 또는 'my'
    
    // 페이지네이션 상태
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [sort] = useState("publishedAt,desc");
    const [hasMore, setHasMore] = useState(true);
    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        fetchPosts(0, true);
    }, [filter]); // filter가 변경될 때마다 다시 불러오기

    const fetchPosts = async (pageNum = 0, isInitial = false) => {
        try {
            if (isInitial) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }
            setError(null);

            // 내 글 필터가 활성화되어 있고 로그인되어 있으면 authorId 전달
            const authorId = filter === 'my' && isLoggedIn && user?.userId ? user.userId : null;

            const res = await getPostList({
                page: pageNum,
                size: size,
                sort: sort,
                type: 'ARTICLE', // 커뮤니티 페이지는 ARTICLE만 표시
                authorId: authorId
            });

            const responseData = res.data || res;
            const newPosts = responseData.content || [];
            const total = responseData.totalElements || 0;
            const totalPages = responseData.totalPages || 0;

            if (isInitial) {
                setPosts(newPosts);
            } else {
                setPosts(prev => [...prev, ...newPosts]);
            }

            setTotalElements(total);
            setHasMore(pageNum < totalPages - 1);
            setPage(pageNum);
        } catch (err) {
            console.error("게시글 목록 불러오기 실패:", err);
            setError("게시글 목록을 불러오는데 실패했습니다.");
            if (isInitial) {
                alert("게시글 목록을 불러오는데 실패했습니다.");
            }
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            fetchPosts(page + 1, false);
        }
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setPage(0);
        setHasMore(true);
    };

    return (
        <PageContainer>
            <Header>
                <Title>Free Board</Title>
                <WriteButton onClick={() => navigate('/write')}>
                    + 내 글 작성하기
                </WriteButton>
            </Header>

            {isLoggedIn && (
                <FilterTabs>
                    <FilterTab 
                        $active={filter === 'all'} 
                        onClick={() => handleFilterChange('all')}
                    >
                        전체 게시글
                    </FilterTab>
                    <FilterTab 
                        $active={filter === 'my'} 
                        onClick={() => handleFilterChange('my')}
                    >
                        내 글
                    </FilterTab>
                </FilterTabs>
            )}

            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>로딩 중...</div>
            ) : error ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#DC2626' }}>
                    {error}
                </div>
            ) : posts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>게시글이 없습니다.</div>
            ) : (
                <>
                    <Grid>
                        {posts.map(post => (
                            <PostCard key={post.postId} post={post} />
                        ))}
                    </Grid>
                    
                    {hasMore && (
                        <LoadMoreContainer>
                            <LoadMoreButton 
                                onClick={handleLoadMore} 
                                disabled={loadingMore}
                            >
                                {loadingMore ? '로딩 중...' : '더보기'}
                            </LoadMoreButton>
                        </LoadMoreContainer>
                    )}
                    
                    {!hasMore && posts.length > 0 && (
                        <EndMessage>모든 게시글을 불러왔습니다.</EndMessage>
                    )}
                </>
            )}
        </PageContainer>
    );
};

export default CommunityPage;
