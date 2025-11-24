import styled from "styled-components";
import Routine from "../components/Routine";
import Recommended from "../components/Recommended";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import ScrolltoTop from "../../common/ScrolltoTop";
import { nightProducts, nightRoutine, nightSkinType} from "../../../shared/api/routines";
const NightRoutinePage = () => {

  return (
    <>
    <ScrolltoTop />
    <Container>
      <Routine  routineData={nightRoutine} type="night"/>
      <Recommended recommendedData={nightSkinType}/>
      <ProductList productData={nightProducts} />
      <Footer target="/morning" />
    </Container>
    </>
  );
};

export default NightRoutinePage;

const Container = styled.div`
  padding: 30px 20px 60px;
`;