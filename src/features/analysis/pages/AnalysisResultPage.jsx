import styled from "styled-components"
import colors from "../../common/colors";
import { useAuth } from "../../auth/context/AuthContext";
import { skinAnalysis } from "../../../shared/api/skinAnalysis";
import ResultTop from "../components/ResultTop";
import SkinScoreGrid from "../components/SkinScoreGrid";

const AnalysisResultPage=()=>{
  const {user} =useAuth();
  const result = skinAnalysis;
  return(
    <Container>
      <Header>
        <p style = {{marginTop: "20px"}}>오늘의 피부 상태</p>
        <h2>{result.skinType} 피부</h2>
        <p><b>Re:Skin</b>이 {user ? user.username: "Guest"}님의 피부 컨디션을 살펴보고 있어요.</p>
        <h2>{result.score}/100</h2>
      </Header>
      <ResultTop />
      <SkinScoreGrid />
    </Container>
  );
};
export default AnalysisResultPage; 

const Header = styled.div`
  text-align: center;
  p{
    font-size: 13px;
    margin: 10px;
  }
  h2{
    margin: 5px;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  gap: 30px;
  margin-bottom: 100px;
`
