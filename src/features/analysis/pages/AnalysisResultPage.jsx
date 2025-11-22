import styled from "styled-components"
import colors from "../../common/colors";
import { useAuth } from "../../auth/context/AuthContext";
import { skinAnalysis } from "../../../shared/api/skinAnalysis";

const AnalysisResultPage=()=>{
  const {user} =useAuth();
  const result = skinAnalysis;
  return(
    <Container>
      <Header>
        <p style = {{marginTop: "20px"}}>오늘의 피부 상태</p>
        <h2 style={{margin: "5px"}}>{result.skinType}타입</h2>
        <p><b>Re:skin</b>이 {user ? user.username: "Guest"}님의 피부 컨디션을 살펴보고 있어요.</p>
        <h1 style={{margin: "5px"}}>{result.score}/100</h1>
      </Header>

    </Container>
  );
};
export default AnalysisResultPage; 

const Header = styled.div`
  text-align: center;
  p{
    font-size: 15px;
    margin: 10px;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
`
