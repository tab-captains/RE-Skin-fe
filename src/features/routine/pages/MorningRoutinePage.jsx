import styled from "styled-components";
import Routine from "../components/Routine";
import Recommended from "../components/Recommended";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import ScrolltoTop from "../../common/ScrolltoTop";
import { morningProducts, morningRoutine, morningSkinType} from "../../../shared/api/routines";
const MorningRoutinePage = () => {

  return (
    <>
    <ScrolltoTop />
    <Container>
      <Routine  routineData={morningRoutine} type="morning"/>
      <Recommended recommendedData={morningSkinType}/>
      <ProductList productData={morningProducts} />
      <Footer target="/night" />
    </Container>
    </>
  );
};

export default MorningRoutinePage;

const Container = styled.div`
  padding: 30px 20px 60px;
`;