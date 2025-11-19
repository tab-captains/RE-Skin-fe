import styled, {keyframes} from "styled-components";
import colors from "../../common/colors";
import {useNavigate} from "react-router-dom";

import analysisOverview from '../../../assets/images/analysisOverview.png';
import bar from '../../../assets/images/bar.png';
const Overview=()=>{
  const navigate = useNavigate();
  return(
    <Container>
      <Wrapper>
        <Title>사진을 업로드하고 피부 상태를 <br></br>진단하세요.</Title>
        <Description>AI 기반의 섬세한 분석으로 모공, 여드름, 주름 등 피부 핵심 지표를 제공합니다. </Description>
        <AnalyzeButton onClick={() => navigate("/upload")}>사진 업로드하기</AnalyzeButton>
      </Wrapper>
      <ImageWrapper>
      <Icon src={analysisOverview} alt="../../../assets/images/analysisOverview.png"></Icon>
      <BarIcon src={bar} alt="../../../assets/images/bar.png"></BarIcon>
      </ImageWrapper>
    </Container>
  );
};
export default Overview;

const fadeUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
const scanAnimation = keyframes`
  0% { top: -20%; }      /* Icon 위쪽 시작 */
  50% { top: 15%; }    /* Icon 아래쪽 끝 */
  100% { top: -20%; }    /* 다시 위쪽 */
`;

const ImageWrapper = styled.div`
  position: relative;   /* Icon과 BarIcon의 기준 */
  width: 300px;         /* 고정 크기 */
  height: 300px;        /* 고정 크기 */
`;

const Icon = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  position: relative;
  z-index: 1;
  opacity: 0;
  animation: ${fadeUp} 0.7s forwards;
  animation-delay: 2.0s; /* 텍스트 애니메이션 이후 등장 */
`;

const BarIcon = styled.img`
  position: absolute;
  top: -20%;     
  left: -31%;
  width: 150%;    
  height: 100%;    
  object-fit: contain;
  z-index: 2;
  
  opacity: 0;
  /* fadeUp 애니메이션 */
  animation-name: ${fadeUp};
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  animation-delay: 2s; /* 텍스트 후 등장 */

  /* scanAnimation은 fadeUp 끝나고 시작 */
  animation: ${fadeUp} 1.2s forwards 2s, ${scanAnimation} 2.5s ease-in-out 2.9s 2;
  /* 
    2s: fadeUp 지연
    2.7s: fadeUp 끝나고 scanAnimation 시작 (0.7초 후)
    2회 반복
  */
`;


const Wrapper=styled.div`
  flex-direction: column;
  text-align:left;
  padding: 20px 20px 20px 0;
  max-width: 600px;
  gap: 20px;
`

const Title=styled.div`
  font-weight: bold;
  font-size: 2.5rem;
  line-height: 3.3rem;
  color: ${colors.primary};
  margin-bottom: 10px;

  opacity: 0;
  animation: ${fadeUp} 0.7s forwards;
  animation-delay: 0.1s; 
`
const Description=styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 10px;
  color: ${colors.primary};
  opacity: 0;
  animation: ${fadeUp} 0.7s forwards;
  animation-delay: 0.6s; 
`
const AnalyzeButton=styled.button`
  border: none;
  border-radius: 20px;
  width: 150px;
  padding: 10px;
  text-align: center;
  font-size: 0.9em;
  margin-top: 20px;
  color: white;
  background-color: ${colors.primary};
  opacity: 0;
  animation: ${fadeUp} 0.7s forwards;
  animation-delay: 1.2s; 
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.textAccent};
  }
`

const Container = styled.div`
  display: flex;             
  align-items: center;       
  justify-content: space-between; 
  gap: 150px;            
  padding: 20px;
`