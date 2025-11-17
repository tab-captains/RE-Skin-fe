import styled from "styled-components";
import colors from "../../common/colors"
import LeftSection from "../components/LeftSection";
import RightSection from "../components/RightSection";
import BottomSection from "../components/BottomSection";
import {useNavigate} from "react-router-dom";
import useReveal from "../../common/hooks/useReveal"
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
      <TextItem>지금 바로 피부 상태를 확인해보세요.</TextItem>
      <ButtonItem onClick={() => navigate("/login")}>피부 분석하기</ButtonItem>
    </Footer>
    </Container>
  );
};
export default MainPage;

const TextItem = ({ children }) => {
  const { ref, isRevealed } = useReveal({ threshold: [0.5, 0.4] });

  return (
    <Text ref={ref} className={isRevealed ? "visible" : ""}>
      {children}
    </Text>
  );
};

const ButtonItem = ({ children }) => {
  const { ref, isRevealed } = useReveal({ threshold: [0.5, 0.4] });

  return (
    <AnalyzeButton ref={ref} className={isRevealed ? "visible" : ""}>
      {children}
    </AnalyzeButton>
  );
};


const Footer = styled.div`
  margin: 100px;
  text-align: center;

`
const Text = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: black;
  margin-bottom: 30px;
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    background: #eceff3;
  }
`
const AnalyzeButton=styled.button`
  border: none;
  border-radius: 20px;
  width: 160px;
  padding: 10px;
  text-align: center;
  font-size: 1em;
  color: white;
  background-color: ${colors.primary};
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s ease;

   &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    background: ${colors.textAccent};
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
  padding: 100px 80px 120px 80px;
`
const Bottom=styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 80px;
  min-height: 50vh;
  padding: 0 80px;
`
