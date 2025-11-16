import styled from "styled-components";
import colors from "../../common/colors";

const TipCard=({tips})=>
  { return ( 
  <Wrapper> {tips.map((tip, idx) => ( 
    <TipBox key={idx}> 
      <Title>{tip.title}</Title> 
      <Content>{tip.content}</Content>
    </TipBox> 
  ))} 
 </Wrapper> 
  )
}

export default TipCard;

const Wrapper = styled.div `
  display:flex;
  width: 650px;
  gap: 20px;
`;

const TipBox = styled.div`
  width: calc(650px  / 3);
  height: 100px;
  padding: 15px;
  background-color: ${colors.box};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
`; 

const Title = styled.div`
  font-size: 0.85rem;
  font-weight: bold;
  color: ${colors.textAccent};
`; 

const Content = styled.div `
  font-size: 0.75rem;
  color: ${colors.primary};
  line-height: 1.3;
  margin-top: 15px;
`;