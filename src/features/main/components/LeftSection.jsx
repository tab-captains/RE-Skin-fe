import styled from "styled-components";
import colors from "../../common/colors";
import {useNavigate} from "react-router-dom";
const LeftSection =()=>{
  const navigate = useNavigate();

  return(
          <Wrapper>
        <Title>당신의 피부, <br></br>지금 어떤 상태인가요?</Title>
        <Description>Skin Type Analyzer로 AI가 분석한 당신의 피부 타입과 맞춤 관리 팁을 확인하세요.
           분석한 기록은 자동으로 저장되어 추적 관리가 가능합니다.</Description>
        <AnalyzeButton onClick={() => navigate("/login")}>피부 분석하기 -&gt;</AnalyzeButton>
      </Wrapper>
  )
}

const Wrapper=styled.div`
  flex-direction: column;
  text-align:left;
  padding: 20px;
  max-width: 600px;
`

const Title=styled.div`
  font-weight: bold;
  font-size: 2.5rem;
  line-height: 3.3rem;
  color: ${colors.primary};
  margin-bottom: 10px;
`
const Description=styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  margin-top: 10px;
  color: ${colors.primary};
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

export default LeftSection;