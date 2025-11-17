import styled from "styled-components";
import colors from "../../common/colors"
import LeftSection from "../components/LeftSection";
import RightSection from "../components/RightSection";
import BottomSection from "../components/BottomSection";
import {useNavigate} from "react-router-dom";
const MainPage=()=>{
  const navigate =useNavigate();
  return(
    <Container>
    <Top>
      <LeftSection />
      <RightSection />
    </Top>
    <Bottom>
      <BottomSection />
    </Bottom>
    <Footer>
      <Text>지금 바로 피부 상태를 확인해보세요.</Text>
      <AnalyzeButton onClick={() => navigate("/login")}>피부 분석하기</AnalyzeButton>
    </Footer>
    </Container>
  );
};
export default MainPage;

const Footer = styled.div`
  margin: 50px;
  text-align: center;

`
const Text = styled.div`
  font-weight: bold;
  color: black;
  margin-bottom: 30px;
`
const AnalyzeButton=styled.button`
  border: none;
  border-radius: 20px;
  width: 140px;
  padding: 10px;
  text-align: center;
  font-size: 0.8em;
  color: white;
  background-color: ${colors.primary};
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.textAccent};
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 50px;            
`;

const Top=styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 80px;
  min-height: 50vh;
  padding: 120px 100px;
`
const Bottom=styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 80px;
  min-height: 50vh;
  padding: 0 100px;
`
