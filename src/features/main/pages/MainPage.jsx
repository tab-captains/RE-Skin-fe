import styled from "styled-components";
import colors from "../../common/colors";
import LeftSection from "../components/LeftSection";
import RightSection from "../components/RightSection";
import BottomSection from "../components/BottomSection";

import {useNavigate} from "react-router-dom";
import useReveal from "../../common/hooks/useReveal"
import {useAuth} from "../../auth/context/AuthContext";

const MainPage=()=>{
  const navigate =useNavigate();
  const {isLoggedIn} = useAuth(); 
  return(
    <Container>
    <Top $isLoggedIn={isLoggedIn}>
      { !isLoggedIn && (<LeftSection />)}
      { !isLoggedIn && (<RightSectionItem $isLoggedIn={isLoggedIn}><RightSection /></RightSectionItem> )}
    </Top>
    <Bottom>
      <BottomSection />
    </Bottom >
    {!isLoggedIn && (
    <Footer>
      <TextItem>지금 바로 피부 상태를 확인해보세요.</TextItem>
      <ButtonItem onClick={() => navigate("/login")}>로그인 하기</ButtonItem>
    </Footer>
    )}
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

const ButtonItem = ({ children, ...props }) => {
  const { ref, isRevealed } = useReveal({ threshold: [0.5, 0.4] });

  return (
    <AnalyzeButton ref={ref} className={isRevealed ? "visible" : ""} {...props}>
      {children}
    </AnalyzeButton>
  );
};

const RightSectionItem = ({children, isLoggedIn}) => {
  const {ref, isRevealed} = useReveal({threshold: [0.3, 0.6]});

  const className = isLoggedIn ? "visible" : isRevealed ? "visible" : "";

  return(
    <RightWrapper ref={ref} className={className}>
      {children}
    </RightWrapper>
  );
};

const Footer = styled.div`
  margin: 100px;
  text-align: center;

`
const Text = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease-out;
  font-weight: bold;
  font-size: 1rem;
  color: black;
  margin-bottom: 30px;
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`
const AnalyzeButton=styled.button`
  opacity: 0;
  transform: translateY(20px);
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
  transition: all 1s ease-out, background-color 0.2s ease;

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
  min-height: ${({ $isLoggedIn }) => ($isLoggedIn ? "0" : "50vh")};
  padding: ${({ $isLoggedIn }) => ($isLoggedIn ? "0" : "100px 80px 120px 80px")};
`
const Bottom=styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 80px;
  min-height: 50vh;
  padding: 0 80px;
`
const RightWrapper = styled.div`
  opacity: 0;
  transform: translateY(30px); 
  transition: all 3s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;