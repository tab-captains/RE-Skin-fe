import styled from "styled-components";
import colors from "../../common/colors";
import WeatherCard from "./WeatherCard";
import TipCard from "./TipCard";
import BoardCard from './BoardCard';
import RightSection from './RightSection';
import useReveal from "../../common/hooks/useReveal";
import { useAuth } from "../../auth/context/AuthContext";
import {useNavigate} from "react-router-dom";

const BottomSection = () => {
  const { isLoggedIn } = useAuth();
  const navigate =useNavigate();
  return(
    <Container>

      <LeftWrapper $isLoggedIn={isLoggedIn}>

      <WeatherCard />
      <TipCardItem>
      <p style={{margin: "0 0 15px 5px", fontWeight: "bold"}}>오늘의 뷰티 팁!</p>
      <TipCard   tips={[
        { title: "미세먼지 케어", content: "먼지가 높은 날은 클렌징을 꼼꼼하게! 쫀쫀한 제형의 클렌징을 사용하세요." },
        { title: "수분 관리", content: "피부 속 수분을 채우려면 가벼운 로션 레이어링! " },
        { title: "UV 케어", content: "자외선 지수 높으면 SPF50+ 꼭 챙기기! 유기자차와 무기자차 선크림을 어쩌고" },
      ]}/>
      </TipCardItem>

      {isLoggedIn &&(
      <BoardCardItem onClick={() => navigate("/board")}>
      <Title>정보 게시판</Title>
      <FeatureList>
        <FeatureItem>스킨케어 순서가 궁금해요.</FeatureItem>
        <FeatureItem>내 피부 타입 제품 추천</FeatureItem>
        <FeatureItem>내 피부 타입 테스트하기</FeatureItem>
      </FeatureList>
    </BoardCardItem>)}

      </LeftWrapper>


      <BoardWrapper $isLoggedIn={isLoggedIn}>
        {isLoggedIn && (
        <>
        <ExtraButton onClick={() => navigate("/analysisOverview")}>AI 피부분석 시작하기 -&gt;</ExtraButton>
        <RightSection />
        </>
        )}
        <BoardCard />
        {!isLoggedIn && (
        <InfoBoxItem>로그인 후에 더 많은 정보를 확인하세요! <br></br>Re:Skin이 피부 상태를 추적 관리합니다.</InfoBoxItem>)}
      </BoardWrapper>

    </Container>
  );
};

export default BottomSection;
const InfoBoxItem = ({ children }) => {
  const { ref, isRevealed } = useReveal({ threshold: 0.2 });

  return (
    <InfoBox ref={ref} className={isRevealed ? "visible" : ""}>
      {children}
    </InfoBox>
  );
};

 const TipCardItem = ({ children }) => {
  const { ref, isRevealed } = useReveal({ threshold: [0.5, 0.9] });

  return (
    <TipWrapper ref={ref} className={isRevealed ? "visible" : ""}>
      {children}
    </TipWrapper>
  );
};

const BoardCardItem = ({ children }) => {
  const { ref, isRevealed } = useReveal({ threshold: 0.2 });

  return (
    <BoardWrapperAnim ref={ref} className={isRevealed ? "visible" : ""}>
      {children}
    </BoardWrapperAnim>
  );
};

const BoardWrapperAnim = styled.div`
  width: 623px;
  height: 120px;
  border-radius: 10px;
  border: 1px solid gray;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  cursor: pointer;

  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 8px 18px rgba(0,0,0,0.1);

  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  &:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
  }
`;



const TipWrapper =styled.div`
  width: 630px;
  height: 170px;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 7px;

  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 8px 18px rgba(0,0,0,0.1);

  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
    &:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
  }
` 
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 17px;            
`;
const Container =styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 30px 0 100px 0;
`
const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 0;
  align-items: center;
  
`;

const ExtraButton = styled.button`
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  width: 360px;
  height: 50px;
  font-size: 1em;
  color: white;
  background-color: ${colors.primary};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.textAccent};
  }
`;


const Title = styled.div`
  margin: 0;
  font-weight: bold
`;

const FeatureList = styled.div`
  display: flex;
  gap: 15px;
  line-height: 1.3;
  margin-top: 10px;
`;

const FeatureItem = styled.div`
  flex: 1;
  height: 50px;
  padding: 15px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  color: ${colors.textAccent};
  
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 8px 18px rgba(0,0,0,0.1);
`;

const InfoBox = styled.div`
  width: 350px;
  height: 65px;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  font-size: 0.95rem;
  font-weight: bold;
  color: ${colors.textAccent};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 8px 18px rgba(0,0,0,0.1);

  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;