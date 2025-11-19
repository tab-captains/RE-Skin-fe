import styled, {keyframes} from "styled-components";
import colors from "../../common/colors";
import {useNavigate} from "react-router-dom";

import skinTypeIcon from '../../../assets/images/skinTypeIcon.png';

const Overview=()=>{
  const navigate = useNavigate();
  return(
    <Container>
      <Wrapper>
        <Title>사진을 업로드하고 피부 상태를 <br></br>진단하세요.</Title>
        <Description>AI 기반의 섬세한 분석으로 모공, 여드름, 주름 등 피부 핵심 지표를 제공합니다. </Description>
        <AnalyzeButton onClick={() => navigate("/upload")}>사진 업로드하기</AnalyzeButton>
      </Wrapper>
      <Icon src={skinTypeIcon} alt="../../../assets/images/skinTypeIcon.png"></Icon>
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
const Icon = styled.img`
  width: 45px;
  height: 45px;
  object-fit: contain;
`;