import styled from "styled-components";
import Routine from "../components/Routine";
import Recommended from "../components/Recommended";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import ScrolltoTop from "../../common/ScrolltoTop";
import { getUserSkinType} from "../../../shared/api/routines";
import { useState, useEffect } from "react";
const MorningRoutinePage = () => {
  const [skinTypeData, setSkinTypeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkinType = async () => {
      try {
        const data = await getUserSkinType();
        setSkinTypeData(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSkinType();
  }, []);

  if (loading) return null;

  return (
    <>
    <ScrolltoTop />
    <Container>
      <Routine  type="morning"/>
      <Recommended recommendedData={skinTypeData}/>
      <Footer target="/night" />
    </Container>
    </>
  );
};

export default MorningRoutinePage;

const Container = styled.div`
  padding: 30px 20px 60px;
`;