import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';

const InfoContainer = styled.div`
  /* .info-container */
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;
  text-align: center;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
`;

const InfoHeader = styled.div`
  /* .info-header */
  margin-bottom: 50px;

  h1 {
    /* .info-header h1 */
    font-size: 32px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 12px;
  }

  p {
    /* .info-header p */
    font-size: 16px;
    color: #666b7a;
    line-height: 1.5;
  }
`;

const InfoCardList = styled.div`
  /* .info-card-list */
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InfoCard = styled.div`
  /* .info-card */
  display: flex;
  align-items: center;
  background-color: #eff1f5; /* 기존 CSS 색상 */
  padding: 30px;
  border-radius: 16px;
  text-decoration: none; 
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    /* .info-card:hover */
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    background-color: #e8ebf0; /* 기존 CSS hover 색상 */
  }
`;

const IconBox = styled.div`
  /* .icon-box */
  background-color: white;
  width: 60px;
  height: 60px;
  border-radius: 20px; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  svg {
    /* .icon-box svg */
    width: 30px;
    height: 30px;
    color: #333;
  }
`;

const CardContent = styled.div`
  /* .card-content */
  text-align: left;
  flex: 1;
`;

const CardTitle = styled.h3`
  /* .card-title */
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 10px 0;
`;



const Infoboard = () => {
  const navigate = useNavigate(); 

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
      link: "/infoboard/skinguide" 
    },
    {
      id: 2,
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.5c-4.142 0-7.5-3.358-7.5-7.5 0-4.142 7.5-14 7.5-14s7.5 9.858 7.5 14c0 4.142-3.358 7.5-7.5 7.5z" />
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ), 
      title: "내 피부 타입, 정확히 모르겠어요",
      action: "내 피부 타입 진단하기(테스트) >",
      link: "/analysis/test"
    }
  ];

  return (
    <InfoContainer>
      <InfoHeader>
        <h1>무엇이 궁금하신가요?</h1>
        <p>
          피부관리가 어렵다면, 아래에서 필요한<br />
          정보를 선택하세요.
        </p>
      </InfoHeader>
      <InfoCardList>
        {menuItems.map((item) => (
          <InfoCard 
            key={item.id} 
            onClick={() => navigate(item.link)} 
          >
            <IconBox>
              {item.icon}
            </IconBox>
            <CardContent>
              <CardTitle>{item.title}</CardTitle>
              <span className="card-action-btn">{item.action}</span>
            </CardContent>
          </InfoCard>
        ))}
      </InfoCardList>
    </InfoContainer>
  );
};

export default Infoboard;