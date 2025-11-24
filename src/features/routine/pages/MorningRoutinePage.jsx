import styled from "styled-components";
import colors from "../../common/colors";
import { useAuth } from "../../auth/context/AuthContext";
import { IoArrowForward, IoSunny } from "react-icons/io5";
import skinTypeIcon from  "../../../assets/images/skinTypeIcon.png"
import Routine from "../components/Routine";
import Recommended from "../components/Recommended";
const MorningRoutinePage = ({ routineData }) => {
  const { user } = useAuth();
  const keywords = ["지성", "입술 건조함", "주름"];

  return (
    <Container>
      <Routine />
      <Recommended />
    </Container>
  );
};

export default MorningRoutinePage;

const Container = styled.div`
  padding: 30px 20px 60px;
`;