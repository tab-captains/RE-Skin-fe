import styled from "styled-components"
/*npm install styled-component 명령어로 설치 후 사용. */
import {Link} from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi";
import colors from "../../common/colors";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  background-color:${colors.primary};
  width: 100%;
  height: 45px;
  padding: 0 1rem;
`

const LeftGroup = styled.div`
  display:flex;
  align-items:center;
  gap:1rem;
`
const RightGroup = styled.div`
  display:flex;
  align-items:center;
  margin-left: auto;
  gap: 1rem;
  padding: 0 2em 0 0;
`
const Menu = styled(GiHamburgerMenu)`
  font-weight: bold;
  font-size: 1.5em;
  color: ${colors.logo};
  text-decoration: none;
`
const Logo = styled(Link)`
font-weight: bold;
font-size: 1.5em;
color: ${colors.logo};
text-decoration: none;
`

const NavButton = styled(Link)`
  font-size: 0.8em;
  color: white;
  text-decoration: none;
`

const LoginButton =styled(Link)`
  border:1px solid white;
  border-radius: 5px;
  padding: 0.3rem 1.3rem;
  font-size: 0.8em;
  color: white;
  background-color: ${colors.primary};
  text-decoration: none;
`


const Navbar = ()=>{
  
  return (
    <Nav>
      <LeftGroup> 
        <Menu />
        <Logo>RE:SKIN</Logo>
      </LeftGroup>
      <RightGroup>
        <NavButton>커뮤니티</NavButton>
        <NavButton>피부 분석</NavButton>
        <LoginButton>로그인 / 회원가입</LoginButton>
      </RightGroup>
    </Nav>
  )
};

export default Navbar;