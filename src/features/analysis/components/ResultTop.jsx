import styled, {keyframes} from "styled-components";
import colors from "../../common/colors";

/*api */
import { skinAnalysis } from "../../../shared/api/skinAnalysis";

const ResultTop = ()=>{
const result = skinAnalysis;
 return (
  <Container>
    <Wrapper>
        <p>피부 타입</p>
        <Title>{result.skinType}</Title>
        <Description>{result.skinTypeDescription}</Description>
    </Wrapper>
    <Wrapper style={{flex: 1}}>
      <p>오늘의 리포트 요약</p>
      <Description>{result.dailySummary}</Description>
      <ButtonWrapper>
        <Button>맞춤 세안 루틴 보러가기</Button>
        <Button>리포트 저장하기</Button>
      </ButtonWrapper>
    </Wrapper>
  </Container>
 );
};
export default ResultTop;

const Container =styled.div`
  margin-top: 50px;
  display: flex;
  gap: 30px;
  justify-content: space-between;
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
  border: none;
  border-radius: 20px;
  padding: 10px 30px;
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