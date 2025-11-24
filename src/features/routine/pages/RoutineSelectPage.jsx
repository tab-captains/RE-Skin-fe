import styled ,{keyframes} from "styled-components";
import colors from "../../common/colors";
import { IoSunny, IoMoon } from "react-icons/io5";
import { useAuth } from "../../auth/context/AuthContext";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

const RoutineSelectPage = () => {
  const { user } = useAuth();
  const [selected, setSelected] = useState(null);
  const navigate= useNavigate();

  const handleConfirm = () => {
    if (selected) {
      navigate(`/${selected}`);
    }
  };

  return (
    <Container>
      <Title $index={1}>
        <b>Re:Skin</b>이<br />
        {user ? user.username : "Guest"}님을 위한 루틴을 준비했어요!
      </Title>

      <BoxWrapper>
        <RoutineBox
          onClick={() => setSelected("morning")}
          $active={selected === "morning"}
          $dimmed={selected && selected !== "morning"}
          $index={2}
        >
          <IoSunny size={60} color="#f7b731" />
          <BoxTitle>아침 루틴</BoxTitle>
          <BoxDesc>가벼운 세안 + 수분 중심 준비 루틴</BoxDesc>
        </RoutineBox>

        <RoutineBox
          onClick={() => setSelected("night")}
          $active={selected === "night"}
          $dimmed={selected && selected !== "night"}
          $index={2}
        >
          <IoMoon size={50} color="#8392dc" />
          <BoxTitle>저녁 루틴</BoxTitle>
          <BoxDesc>딥클렌징 + 진정 중심 회복 루틴</BoxDesc>
        </RoutineBox>
      </BoxWrapper>

      {selected && <ConfirmBtn $index={1} onClick={handleConfirm}>루틴 보러가기</ConfirmBtn>}
    </Container>
  );
};

export default RoutineSelectPage;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px 60px;
  text-align: center;
`;

const Title = styled.div`
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.6s ease forwards;
  animation-delay: ${({ $index }) => $index * 0.2}s;

  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  font-weight: 600;
  font-size: 22px;
  color: rgba(25,30,50,0.95);
  line-height: 1.4;
  margin-bottom: 70px;
`;

const BoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

const RoutineBox = styled.div`
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.6s ease forwards;
  animation-delay: ${({ $index }) => $index * 0.3}s;

  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  display: flex;
  width: 320px;
  padding: 28px;
  border-radius: 16px;
  gap: 12px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  transition: 0.25s ease;
  border: 1px solid rgba(255,255,255,0.6);
  background: rgba(255,255,255,0.85);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(0,0,0,0.1);
  }
  ${({ $active }) =>
    $active &&
    `
    background: rgba(255,255,255,0.55);
    backdrop-filter: blur(18px) saturate(150%);
    -webkit-backdrop-filter: blur(18px) saturate(150%);

    transform: translateY(-4px) scale(1.03);

    box-shadow:
      0 8px 24px rgba(0,0,0,0.12),
      0 0 18px rgba(120, 150, 255, 0.25); 

    border: 1px solid rgba(255,255,255,0.75); 

        &:hover {
          transform: translateY(-4px) scale(1.03); 
          box-shadow:
            0 8px 24px rgba(0,0,0,0.12),
            0 0 18px rgba(120,150,255,0.25);
        }
  `}

  ${({ $dimmed }) =>
  $dimmed &&
  `
    opacity: 0.55;
    transform: none !important;
    box-shadow: none !important;
    cursor: default;

    &:hover {
      transform: none !important;
      box-shadow: none !important;
      opacity: 0.55;
    }
  `}
`;

const BoxTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: rgba(30,38,55,0.95);
  margin-bottom: 6px;
`;

const BoxDesc = styled.div`
  font-size: 14px;
  color: rgba(40,50,70,0.7);
  line-height: 1.4;
`;

const ConfirmBtn = styled.button`
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.6s ease forwards;
  animation-delay: ${({ $index }) => $index * 0.3}s;

  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  margin-top: 40px;
  padding: 12px 26px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  background: ${colors.primary};
  color: white;
  box-shadow: 0 6px 16px ${colors.primary}50;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: ${colors.primary}EE;
  }
`;
