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

const RootLayout = ()=>{

return(
  <>
  <GlobalStyle />
  <FixedNav>
    <Navbar />
  </FixedNav>
  <MainContent>
    <Outlet />
  </MainContent>
  </>
)

}

export default RootLayout;

