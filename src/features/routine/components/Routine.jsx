import {useState, useEffect} from "react";
import styled, {keyframes} from "styled-components";
import colors from "../../common/colors";
import { useAuth } from "../../auth/context/AuthContext";
import {RoutineDetail} from "../../../shared/api/routines";
import { IoArrowForward, IoSunny, IoMoon} from "react-icons/io5";

const Routine = ({ routineData, type }) => {

    //api 연결 시 삭제.
  const keywords = ["지성", "입술 건조함", "주름"];
  const routineSteps = routineData || [];

  const { user } = useAuth();

  return (
    <>
      <TitleWrapper>
          {type === "morning" ? (
          <IoSunny size={100} color="#f7b731" />
        ) : (
          <IoMoon size={80} color="#4b7bec" />
        )}

        <Title>{user ? user.username : "Guest"}님의 피부 고민 키워드는</Title>
        <Keywords>
          {keywords.map((k, idx) => (
            <Keyword key={idx}>{k}</Keyword>
          ))}
        </Keywords>
      </TitleWrapper>

      <RoutineWrapper>
        <Wrapper>
        {routineSteps.map((step, idx) => (
          <StepWrapper key={idx} >
            <StepBox $delay={`${(idx+1) * 300}ms`}>
              <ProductImg src={step.img} alt={step.title} />
              <StepTitle>{step.title}</StepTitle>
              <StepDesc>{step.desc}</StepDesc>
            </StepBox>
            {idx < routineSteps.length - 1 && (
              <Arrow $delay={`${idx * 300}ms`}>
                <IoArrowForward size={30} color={colors.primary} />
              </Arrow>
            )}
          </StepWrapper>
        ))}
        </Wrapper>
        <BottomText>피부 상태에 맞춰 자동으로 구성된 최적 루틴이에요.</BottomText>
      </RoutineWrapper>
    </>
  );
};

export default Routine;
//애니메이션 처리.
const fadeUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

//styled-components
const Container = styled.div`
  padding: 30px 20px 60px;
`;

const TitleWrapper = styled.div`
  margin-bottom: 40px;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeUp} 0.7s ease forwards;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 22px;
  color: rgba(25, 30, 50, 0.95);
  margin-bottom: 20px;
`;

const Keywords = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const Keyword = styled.div`
  padding: 8px 20px;
  border-radius: 25px;
  border: 1px solid ${colors.primary};
  background: ${colors.primary};
  color: white;
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: ${colors.primary};
    color: white;
  }
`;

const RoutineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  gap: 20px; 
  flex-wrap: wrap;
  margin-bottom: 150px;
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Wrapper =styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`
const StepBox = styled.div`
  width: 240px;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.1);
  background: rgba(255,255,255,0.9);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;

  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeUp} 2s ease forwards;
  animation-delay: ${({ $delay }) => $delay || "0ms"};
`;

const ProductImg = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 12px;
`;

const StepTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 6px;
`;

const StepDesc = styled.div`
  font-size: 14px;
  color: rgba(50,50,70,0.7);
  text-align: center;
`;

const Arrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;

  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeUp} 0.7s ease forwards;
  animation-delay: ${({ $delay }) => $delay || "0ms"}
`;

const BottomText = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: rgba(25, 30, 50, 0.95);
  margin-bottom: 20px;
`