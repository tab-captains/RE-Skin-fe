import Navbar from '../common/components/Navbar';
import styled from "styled-components";
import colors from "../common/colors";
const FixedNav = styled.div`
  top: 0;
  left: 0;
  z-index:1000;
  border-bottom:0;
  background-color:${colors.primary}
`;

const RootLayout = ()=>{

return(
  <FixedNav>
    <Navbar />
  </FixedNav>
)

}

export default RootLayout;