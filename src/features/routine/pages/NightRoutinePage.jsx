import styled from "styled-components";
import Routine from "../components/Routine";
import Recommended from "../components/Recommended";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import ScrolltoTop from "../../common/ScrolltoTop";
import {getUserSkinType, nightRoutine, nightSkinType} from "../../../shared/api/routines";
import { useState, useEffect } from "react";
const NightRoutinePage = () => {
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
      <Routine  routineData={nightRoutine} type="night"/>
      <Recommended recommendedData={skinTypeData}/>
      <Footer target="/morning" />
    </Container>
    </>
  );
};

export default NightRoutinePage;

const Container = styled.div`
  padding: 30px 20px 60px;
`;