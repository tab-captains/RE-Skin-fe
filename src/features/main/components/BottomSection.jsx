import styled from "styled-components";
import colors from "../../common/colors";
import WeatherContainer from "./WeatherContainer";
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

      <WeatherContainer />
      <TipCardItem>
      <p style={{margin: "0 0 15px 5px", fontWeight: "bold"}}>오늘의 뷰티 팁!</p>
      <TipCard   tips={[
        { title: "미세먼지 케어", content: "먼지가 높은 날은 클렌징을 꼼꼼하게! 젤 클렌저로 1차 세정 후, 약산성 거품 세안으로 모공 노폐물을 정리하세요." },
        { title: "수분 관리", content: "피부 속 수분을 채우려면 가벼운 로션 레이어링! 과한 유분 없이 수분 장벽을 채우는 데 효과적이에요." },
        { title: "각질 케어", content: "화장이 밀릴 때는 주 1회 효소 타입 세안을 권장합니다. 스크럽 사용은 피부 장벽을 무너뜨릴 수 있어요." },
      ]}/>
      </TipCardItem>

      {isLoggedIn &&(
      <BoardCardItem onClick={() => navigate("/infoboard")}>
      <Title>정보 게시판</Title>
      <FeatureList >
        <FeatureItem onClick={(e)=>{
          e.stopPropagation();
          navigate("/infoboard/skinguide")}}>
           <MainText>스킨케어 순서가 궁금해요</MainText>
          <SubText>초보자 필수 루틴 가이드</SubText>
          </FeatureItem>
        <FeatureItem onClick={(e)=>{
          e.stopPropagation();
          navigate("/infoboard/skindictionary")}}>
            <MainText>내 피부 타입 제품 추천</MainText>
          <SubText>초보자 필수 루틴 가이드</SubText>
          </FeatureItem>
        <FeatureItem onClick={(e)=>{
          e.stopPropagation();
          navigate("/skin-survey")}}>
            <MainText>내 피부 타입 테스트하기</MainText>
          <SubText>초보자 필수 루틴 가이드</SubText>
          </FeatureItem>
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

const BoardCardItem = ({ children, onClick }) => {
  const { ref, isRevealed } = useReveal({ threshold: 0.2 });

  return (
    <BoardWrapperAnim ref={ref} className={isRevealed ? "visible" : ""} onClick={onClick}>
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
  justify-content:center;
  cursor: pointer;

  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 8px 18px rgba(0,0,0,0.1);

  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  &:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    background-color: rgba(255, 255, 255, 0.22);
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
  align-items: center;
  width: 100%;
  padding: 30px 0 100px 0;
  gap: 40px;  
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
  background: radial-gradient(circle at 95% 5%, #223470 0%, #41779d 100%);
  cursor: pointer;

  transition:
    transform 0.3s ease,
    box-shadow 0.25s ease,
    background 0. ease;

  box-shadow: 0 3px 10px rgba(0,0,0,0.15);

  &:hover {
    background: radial-gradient(circle at 95% 5%, #3d58a8 0%, #5b90b9 100%);
    transform: translateY(-1px) scale(0.998);
    box-shadow: 0 6px 14px rgba(0,0,0,0.25);
  }

  &:active {
    transform: translateY(0) scale(0.99);
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  }
`;


const Title = styled.div`
  margin: 0;
  margin-bottom: 3px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.3px;

  color: ${colors.textDefault};
  text-shadow: 0 1px 2px rgba(0,0,0,0.15);
  text-align: center; 
  width: 100%;         

`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 10px;
`;

const FeatureItem = styled.div`
  height: 55px;
  padding: 12px 14px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;

  color: ${colors.textAccent};

  border-radius: 12px;
  cursor: pointer;

  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.35);
  
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);

  transition: 
    transform .2s ease,
    box-shadow .2s ease,
    background .2s ease;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(255,255,255,0.35);
    box-shadow: 0 8px 14px rgba(0,0,0,0.18);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const InfoBox = styled.div `
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
&.visible { opacity: 1; transform: translateY(0); }
`
const MainText = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${colors.textAccent};
`;

const SubText = styled.div`
  margin-top: 4px;
  font-size: 0.65rem;
  color: rgba(40,40,60,0.65);
`;