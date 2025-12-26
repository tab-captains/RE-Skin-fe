import styled from "styled-components";
import colors from "../../common/colors";
import useReveal from "../../common/hooks/useReveal"
import ProfileIcon from "../../common/components/ProfileIcon"
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { getTopViewedPosts } from "../../../shared/api/posts";
const BoardCard = () => {
  const navigate =useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
  const fetchTopPosts = async () => {
    try {
      const data = await getTopViewedPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("인기 게시글 조회 실패", e);
    }
  };
  fetchTopPosts();
}, []);
  return (
      <PopularContainer>
      <p style={{margin: "5px",marginTop:"7px", fontWeight:"bold"}}>오늘의 인기 게시글</p>
      {posts.map((post, index) => (
    <PreviewCardItem
      key={post.postId}
      onClick={() => navigate(`/community/post/${post.postId}`)}
    >
      <ProfileIcon
        name={`${post.nickname || "익명"} · ${index + 1}위`}
        size={30}
      />
      <TextWrapper>
        <Title>{post.title}</Title>
        <TagWrapper>
          <Tag>조회수 {post.viewCount}</Tag>
          <Tag>댓글 {post.commentCount}</Tag>
        </TagWrapper>
      </TextWrapper>
    </PreviewCardItem>
))}
    </PopularContainer>
  );
};

export default BoardCard;


const PreviewCardItem = ({ children, onClick }) => {
  const { ref, isRevealed } = useReveal({ threshold: [0.5, 0.4] });

  return (
    <PreviewCard
      ref={ref}
      className={isRevealed ? "visible" : ""}
      onClick={onClick}
    >
      {children}
    </PreviewCard>
  );
};



const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px; 
`;

const Title = styled.div`
  font-weight: bold;
  margin: 0;
  font-size: 15px;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2px;
`;

const Tag = styled.div`
  font-size: 10px;
  margin-right: 5px;
  color: ${colors.primary};
`;

const PopularContainer = styled.div`
  width: 360px;
  background: ${colors.box};
  padding: 10px 15px 15px 15px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
  }
`;

const PreviewCard = styled.div`
  background: white;
  padding: 12px;
  border-radius: 10px;
  height: 45px;
  display: flex;
  align-items: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    background: #eceff3;
  }
  `