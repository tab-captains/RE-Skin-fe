import styled, {keyframes} from "styled-components";
import colors from "../../common/colors";
import {useNavigate} from "react-router-dom";
import Overview from "../components/Overview";
import OverviewMiddle from "../components/OverviewMiddle";
import OverviewBottom from "../components/OverviewBottom"; 
import useReveal from "../../common/hooks/useReveal"

const AnalysisOverviewPage=()=>{
  const navigate = useNavigate();
  
  const textReveal = useReveal({ threshold: 0.2 });
  const descReveal = useReveal({ threshold: 0.2 });
  const buttonReveal = useReveal({ threshold: 0.2 });
  
  return(
    <Container>
      <Top>
        <Overview />
      </Top>
      <Middle>
        <OverviewMiddle />
      </Middle>
      <Bottom>
        <OverviewBottom />
      </Bottom>
      <Footer>
        <AnimatedItem
          ref={textReveal.ref}
          className={textReveal.isRevealed ? "visible" : ""}
          delay="0s"
        >
          <Text>지금 바로 피부 상태를 확인해보세요.</Text>
        </AnimatedItem>

        <AnimatedItem
          ref={descReveal.ref}
          className={descReveal.isRevealed ? "visible" : ""}
          delay="0.2s"
        >
          <Description>
            사진으로 피부의 핵심 지표를 빠르게 분석하고, 맞춤형 관리법을 추천해드립니다.
          </Description>
        </AnimatedItem>

        <AnimatedItem
          ref={buttonReveal.ref}
          className={buttonReveal.isRevealed ? "visible" : ""}
          delay="0.4s"
        >
          <Button onClick={() => navigate("/upload")}>진단하러 가기</Button>
        </AnimatedItem>
      </Footer>
    </Container>
  );
};

export default AnalysisOverviewPage;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AnimatedItem = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
  transition-delay: ${(props) => props.delay || "0s"};

  &.visible {
    animation: ${fadeUp} 0.6s ease-out forwards;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 100px;            
`;
const Top=styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 80px;
  padding: 160px 80px 120px 80px;
`
const Middle = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 80px;
  padding: 0 80px 150px 80px;
`
const Bottom = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 80px;
  padding: 0 80px 150px 80px;
`
const Footer = styled.div`
  gap: 80px;
  padding: 0 80px 150px 80px;
  text-align: center;
`
const Text = styled.div`
  font-weight: bold;
  font-size: 2rem;
  color: ${colors.primary};
`;

const Description = styled.div`
  margin: 20px;
  margin-bottom: 30px;
  font-size: 0.9rem;
`;

const Button = styled.button`
  border: none;
  border-radius: 30px;
  width: 200px;
  padding: 12px;
  text-align: center;
  font-size: 1.2em;
  color: white;
  background-color: ${colors.primary};
  cursor: pointer;
`;