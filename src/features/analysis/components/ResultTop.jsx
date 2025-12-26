import styled, {keyframes} from "styled-components";
import colors from "../../common/colors";
import {useNavigate} from "react-router-dom";

const ResultTop = ({ skinType, skinTypeDescription, summaryMessage }) => {
const navigate = useNavigate();
  
 return (
  <Container>
    <Wrapper>
        <p>피부 타입</p>
        <Title>{skinType || "분석 중"}</Title>
        <Description>{skinTypeDescription || "피부 타입 분석 결과가 없습니다."}</Description>
    </Wrapper>
    <Wrapper style={{flex: 1}}>
      <p>오늘의 리포트 요약</p>
        <Description>{summaryMessage || "리포트 요약이 없습니다."}</Description>
      <ButtonWrapper>
        <Button onClick={()=> navigate('/routineSelect')}>맞춤 세안 루틴 보러가기</Button>
        <Button>리포트 저장하기</Button>
      </ButtonWrapper>
    </Wrapper>
  </Container>
 );
};
export default ResultTop;

const Container =styled.div`
  margin-top: 10px;
  display: flex;
  gap: 30px;
  justify-content: center;
`
const Wrapper= styled.div`
  width: 700px;
  height: 170px;
  padding: 20px 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  p{
    font-weight: bold;
    font-size: 13px;
    margin: 2px;
  }
`
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: rgba(30, 38, 55, 0.9); 
`
const Description = styled.div`
  font-size: 13px;
  color: rgba(30, 38, 55, 1); 
  line-height: 1.4;
`
const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
  margin-top: auto;
`;
const Button=styled.button`
  white-space: nowrap;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  background-color: ${colors.primary}DD; 
  color: white;
  backdrop-filter: blur(3px);  
  border: 1px solid rgba(255,255,255,0.3); 

  box-shadow: 0 4px 12px ${colors.primary}33; 
  transition: 0.2s ease;

  &:hover {
    background-color: ${colors.primary}F2; 
  }
`;
