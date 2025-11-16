import styled from "styled-components";
import LeftSection from "../components/LeftSection";
import RightSection from "../components/RightSection";
import BottomSection from "../components/BottomSection";
const MainPage=()=>{
  return(
    <Container>
    <Top>
      <LeftSection />
      <RightSection />
    </Top>
    <Bottom>
      <BottomSection />
    </Bottom>
    </Container>
  );
};
export default MainPage;


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
  min-height: 50vh;
  padding: 120px 100px;
`
const Bottom=styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 80px;
  min-height: 50vh;
  padding: 0 100px;
`
