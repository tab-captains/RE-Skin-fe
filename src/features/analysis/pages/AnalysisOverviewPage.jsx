import styled from "styled-components";
import colors from "../../common/colors";
import {useNavigate} from "react-router-dom";
import Overview from "../components/Overview";
const AnalysisOverviewPage=()=>{
  const navigate = useNavigate();
  return(
    <Container>
      <Top>
        <Overview />
      </Top>
    </Container>
  );
};
export default AnalysisOverviewPage;

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
  padding: 160px 80px 120px 80px;
`