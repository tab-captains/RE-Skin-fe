import styled, {keyframes} from "styled-components";
import colors from "../../common/colors";
import useReveal from "../../common/hooks/useReveal";
import {useNavigate} from "react-router-dom";
const Footer = ({target})=>{
const navigate= useNavigate();
const titleReveal = useReveal();
const buttonReveal = useReveal();
  return (
    <Container>
      <Wrapper>
      <Text ref={titleReveal.ref} $show={titleReveal.isRevealed}>이 내용은 언제든지 피부 리포트에서 다시 확인할 수 있어요!</Text>
      <Button
       ref={buttonReveal.ref}
       $show={buttonReveal.isRevealed}
       onClick={()=>{navigate(target)
        window.scrollTo(0, 0);
       }}>
      {target === "/night" ? "저녁":"아침"} 루틴 보러가기</Button>
      </Wrapper>

    </Container>

  )
}
export default Footer;
const fadeUp = `
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.7s ease;
`;


const Container = styled.div`
display: flex;
margin-top: 150px;
justify-content: center;
`
const Wrapper =styled.div`
  text-align: center;
`
const Text = styled.div`
  margin-bottom: 30px;
  font-weight: 700;
  font-size: 15px;
  color: rgba(25, 30, 50, 0.95);
${fadeUp}

${({$show})=>
  $show && `
    opacity: 1;
    transform : translateY(0);
  `
}
  
`

const Button = styled.button`
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  background: ${colors.primary};
  color: white;
  box-shadow: 0 6px 16px ${colors.primary}50;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: ${colors.primary}EE;
  }
${fadeUp}

${({$show})=>
  $show && `
    opacity: 1;
    transform : translateY(0);
  `
}
`