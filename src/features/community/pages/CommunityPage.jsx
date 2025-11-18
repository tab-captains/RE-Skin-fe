import React from 'react';
import './CommunityPage.css';

const PostCard = () => {
  return (
    <div className="card">
      <div className="imagePlaceholder">
        <span>Image 들어갈예정</span>
      </div>
      
      <div className="content">
        <div className="scribbleText"></div>
        <p className="date">2025년 10.XX일</p>
      </div>

      <div className="footer">
        <div className="userInfo">
          <span className="userIcon">👤</span>
          <span>댓글</span>
        </div>
        <div className="likes">
          <span>❤️</span>
          <span>좋아요</span>
        </div>
      </div>
    </div>
  );
};

const CommunityPage = () => {
  return (
    <div className="pageContainer">
      <div className="header">
        <h1 className="title">Free Board</h1>
        <button className="writeButton">+ 내 글 작성하기</button>
      </div>
      
      <div className="grid">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
};

export default CommunityPage;