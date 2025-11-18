import styled from "styled-components";
import colors from "../../common/colors";
import WeatherCard from "./WeatherCard";
import TipCard from "./TipCard";
import BoardCard from './BoardCard';
import useReveal from "../../common/hooks/useReveal";
import { useAuth } from "../../auth/context/AuthContext";

const BottomSection = () => {
  const { ref, isRevealed } = useReveal({ threshold: 0.2 });
  const { isLoggedIn } = useAuth();
  return(
    <Container>
      <LeftWrapper>
      <WeatherCard />
      <TipCardItem>
      <p style={{margin: "0 0 15px 5px", fontWeight: "bold"}}>오늘의 뷰티 팁!</p>
      <TipCard   tips={[
        { title: "미세먼지 케어", content: "먼지가 높은 날은 클렌징을 꼼꼼하게! 쫀쫀한 제형의 클렌징을 사용하세요." },
        { title: "수분 관리", content: "피부 속 수분을 채우려면 가벼운 로션 레이어링! " },
        { title: "UV 케어", content: "자외선 지수 높으면 SPF50+ 꼭 챙기기! 유기자차와 무기자차 선크림을 어쩌고" },
      ]}/>
      </TipCardItem>
      </LeftWrapper>
      <BoardWrapper $isLoggedIn={isLoggedIn}>
        {isLoggedIn && (
        <ExtraButton onClick={() => alert("새 기능")}>AI 피부분석 시작하기 -&gt;</ExtraButton>
        )}
        <BoardCard />
      </BoardWrapper>
    </Container>
  );
};

export default BottomSection;


 const TipCardItem = ({ children }) => {
  const { ref, isRevealed } = useReveal({ threshold: [0.5, 0.9] });

  return (
    <TipWrapper ref={ref} className={isRevealed ? "visible" : ""}>
      {children}
    </TipWrapper>
  );
};


const TipWrapper =styled.div`
  width: 630px;
  height: 170px;
  border-radius: 10px;
  padding: 15px;
  border: 1px solid;
  border-color: gray;
  gap: 7px;

  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
` 
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 35px;            
`;
const Container =styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
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
  width: 350px;
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