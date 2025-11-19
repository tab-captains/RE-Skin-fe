import styled, {keyframes} from "styled-components";
import colors from "../../common/colors";
import {useNavigate} from "react-router-dom";
import SkinScoreBox from "../components/SkinScoreBox";

const OverviewResult=()=>{
  return(
    <Container>
      <Wrapper>
        <Title>피부 고민에 따라 필요한 관리법은 모두 달라요. </Title>
        <Description>모공, 주름, 여드름 등 고민별 핵심 포인트를 한눈에 보여드립니다.</Description>
      </Wrapper>
      <SkinScoreBox 
        data={[
          { title: "여드름", scores: { acne: 70 } },
          { title: "모공", scores: { pore: 80 } },
          { title: "주름", scores: {wrinkle: 50 } },
        ]}
      />
    </Container>
  );
};
export default OverviewResult;


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

`
const Description=styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 10px;
  color: ${colors.primary};

`
const Container = styled.div`
  display: flex;             
  align-items: center;       
  justify-content: space-between; 
  gap: 150px;            
  padding: 20px;
`