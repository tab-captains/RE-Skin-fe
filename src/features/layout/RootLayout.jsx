import {Outlet} from 'react-router-dom';
import Navbar from '../common/components/Navbar';
import styled from "styled-components";
import colors from "../common/colors";
import GlobalStyle from "../../shared/GlobalStyle";

const FixedNav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index:1000;
  border-bottom:0;
`;
const MainContent =styled.div`
padding-top: 45px;
`
const LayoutContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;


const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(180deg, 
      #fafbfc 0%,
      #f0f4f8 60%,
      #e8eef5 100%
    );
  z-index: -1;
  
  /* 블러 처리된 물결 그라데이션 */
  &::before {
    content: '';
    position: absolute;
    bottom: -100px;
    left: -10%;
    width: 120%;
    height: 500px;
    background: 
      radial-gradient(ellipse 800px 400px at 50% 100%, 
        rgba(31, 48, 88, 0.15) 0%, 
        rgba(68, 96, 149, 0.1) 40%,
        rgba(23, 104, 172, 0.05) 70%,
        transparent 100%
      );
    filter: blur(60px);
    transform: rotate(-2deg);
  }
  
  /* 추가 레이어로 깊이감 */
  &::after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: -5%;
    width: 110%;
    height: 400px;
    background: 
      radial-gradient(ellipse 1000px 350px at 60% 100%, 
        rgba(68, 96, 149, 0.12) 0%, 
        rgba(23, 104, 172, 0.06) 50%,
        transparent 100%
      );
    filter: blur(40px);
    transform: rotate(1deg);
  }
`;
const RootLayout = ()=>{

return(
    <>
      <GlobalStyle />
      <LayoutContainer>
        <Background />
        <FixedNav>
          <Navbar />
        </FixedNav>
        <MainContent>
          <Outlet />
        </MainContent>
      </LayoutContainer>
    </>

)

}

export default RootLayout;

