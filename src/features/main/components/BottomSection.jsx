import styled from "styled-components";
import colors from "../../common/colors";
import WeatherCard from "./WeatherCard";
import TipCard from "./TipCard";
const BottomSection = () => {

  return(
    <Container>
      <WeatherCard />
      <p style={{margin: "10px 0 0 10px", fontWeight: "bold"}}>오늘의 뷰티 팁!</p>
      <TipCard   tips={[
    { title: "미세먼지 케어", content: "먼지가 높은 날은 클렌징을 꼼꼼하게! 쫀쫀한 제형의 클렌징을 사용하세요." },
    { title: "수분 관리", content: "피부 속 수분을 채우려면 가벼운 로션 레이어링! 무거운 제형을 하나만 바르는 것보단, 가벼운 로션을 여러 번 덧발라주세요." },
    { title: "UV 케어", content: "자외선 지수 높으면 SPF50+ 꼭 챙기기! 유기자차와 무기자차 선크림을 어쩌고" },
  ]}/>
    </Container>
  );
};

export default BottomSection;

const Container = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 10px;            
`;
