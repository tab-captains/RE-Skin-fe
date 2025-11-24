import styled from "styled-components";
import colors from "../../common/colors";
import { useAuth } from "../../auth/context/AuthContext";
import { IoArrowForward, IoSunny } from "react-icons/io5";

const Routine = ({ routineData }) => {
  const { user } = useAuth();

  //api 연결 시 삭제.
  const keywords = ["지성", "입술 건조함", "주름"];
  const routineSteps = routineData || [
    {
      img: "../../../assets/images/skinTypeIcon.png",
      title: "클렌징",
      desc: "가벼운 세안으로 피부 노폐물 제거"
    },
    {
      img: "../../../assets/images/skinTypeIcon.png",
      title: "토너",
      desc: "수분 공급 및 피부 진정"
    },
    {
      img: "../../../assets/images/skinTypeIcon.png",
      title: "크림",
      desc: "보습과 피부 장벽 강화"
    }
  ];

  return (
    <>
      <TitleWrapper>
        <IoSunny size={100} color="#f7b731" />
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
          <StepWrapper key={idx}>
            <StepBox>
              <ProductImg src={step.img} alt={step.title} />
              {/* StepTitle은 api 연결 시 삭제.*/}
              <StepTitle>{step.title}</StepTitle>
              <StepDesc>{step.desc}</StepDesc>
            </StepBox>
            {idx < routineSteps.length - 1 && (
              <Arrow>
                <IoArrowForward size={30} color={colors.primary} />
              </Arrow>
            )}
          </StepWrapper>
        ))}
        </Wrapper>
      </RoutineWrapper>
    </>
  );
};

export default Routine;

const Container = styled.div`
  padding: 30px 20px 60px;
`;

const TitleWrapper = styled.div`
  margin-bottom: 40px;
  text-align: center;
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
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Wrapper =styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 150px;
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
  padding-left: 15px;
`;
