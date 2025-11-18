import React from 'react';
import './InfoboardPage.css'; 

const Infoboard = () => {
  const menuItems = [
    {
      id: 1,
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ), 
      title: "제품은 많은데 순서를 모르겠어요",
      action: "올바른 스킨케어 순서 보기 >",
      link: "/guide/step" 
    },
    {
      id: 2,
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ), 
      title: "앰플? 세럼? 뭐가 다른거죠?",
      action: "스킨케어 용어/제품 알아보기 >",
      link: "/guide/dictionary"
    },
    {
      id: 3,
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ), 
      title: "내 피부 타입, 정확히 모르겠어요",
      action: "내 피부 타입 진단하기(테스트) >",
      link: "/analysis/test"
    }
  ];

  return (
    <div className="info-container">
      <div className="info-header">
        <h1>무엇이 궁금하신가요?</h1>
        <p>
          피부관리가 어렵다면, 아래에서 필요한<br />
          정보를 선택하세요.
        </p>
      </div>
      <div className="info-card-list">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className="info-card" 
            onClick={() => console.log(`${item.title} 클릭됨!`)} 
          >
            <div className="icon-box">
              {item.icon}
            </div>
            <div className="card-content">
              <h3 className="card-title">{item.title}</h3>
              <span className="card-action-btn">{item.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Infoboard;