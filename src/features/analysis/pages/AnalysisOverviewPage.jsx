import styled from "styled-components";
import colors from "../../common/colors";
import {useNavigate} from "react-router-dom";
import Overview from "../components/Overview";
import OverviewMiddle from "../components/OverviewMiddle";

const AnalysisOverviewPage=()=>{
  const navigate = useNavigate();
  return(
    <Container>
      <Top>
        <Overview />
      </Top>
      <Middle>
        <OverviewMiddle />
      </Middle>
      <Bottom>
        
      </Bottom>
    </Container>
  );
};
export default AnalysisOverviewPage;

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