import styled from "styled-components";
import LeftSection from "../components/LeftSection";
import RightSection from "../components/RightSection";
const MainPage=()=>{
  return(
    <Container>
      <LeftSection />
      <RightSection />
    </Container>
  );
};
export default MainPage;


const Container=styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 80px;
  min-height: 50vh;
  padding: 120px 100px;
`
