import styled from "styled-components"
/*npm install styled-component 명령어로 설치 후 사용. */
import {Link} from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi";
import colors from "../../common/colors";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../auth/context/AuthContext";

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
  font-size: 1.3em;
  color: ${colors.logo};
  text-decoration: none;
`
const Logo = styled(Link)`
font-weight: bold;
font-size: 1.3em;
color: ${colors.logo};
text-decoration: none;
transition: background-color 0.2s ease;

&:hover {
  text-shadow: 0 2px 4px ${colors.profile};
  transform: translateY(-2px); 

}
`

const NavButton = styled(Link)`
  font-size: 0.8em;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    color:${colors.primary};
    color: gray;
  }
`

const LoginButton =styled(Link)`
  border:1px solid white;
  border-radius: 5px;
  padding: 0.3rem 1.3rem;
  font-size: 0.8em;
  color: white;
  background-color: ${colors.primary};
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    color:${colors.primary};
    background-color: white;
  }
`
const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: white;
  font-size: 0.9em;
  cursor: pointer;
`;

const Navbar = ()=>{
    const { isLoggedIn, user } = useAuth();
  return (
    <Nav>
      <LeftGroup> 
        <Menu />
        <Logo to = '/'>Re:Skin</Logo>
      </LeftGroup>
      <RightGroup>
        <NavButton to = '/skinreport'>스킨 리포트</NavButton>
        <NavButton to = '/infoboard'>게시판 정보</NavButton>
        <NavButton to = '/community'>커뮤니티</NavButton>
        <NavButton to ='/analysisOverview'>피부 분석</NavButton>
        {!isLoggedIn ? (
          <LoginButton to="/login">로그인 / 회원가입</LoginButton>
        ) : (
          <UserBox>
            <FaUserCircle size={20} />
            <span>{user?.username ? `${user.username}님` : "User님"}</span>
          </UserBox>
        )}
      </RightGroup>
    </Nav>
  )
};

export default Navbar;