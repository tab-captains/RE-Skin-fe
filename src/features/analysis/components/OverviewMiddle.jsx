import styled, { keyframes } from "styled-components";
import colors from "../../common/colors";
import SkinScoreBox from "./SkinScoreBox";
import useReveal from "../../common/hooks/useReveal";

const OverviewMiddle = () => {
  const titleReveal = useReveal({ threshold: 0.2 });
  const descReveal = useReveal({ threshold: 0.2 });
  const boxReveal = useReveal({ threshold: 0.2 });

  return (
    <Container>
      <Wrapper>
        <AnimatedItem ref={titleReveal.ref} className={titleReveal.isRevealed ? "visible" : ""} delay="0s">
          <Title>피부 고민에 따라 필요한 관리법은 모두 달라요.</Title>
        </AnimatedItem>

        <AnimatedItem ref={descReveal.ref} className={descReveal.isRevealed ? "visible" : ""} delay="0.2s">
          <Description>
            모공, 주름, 여드름 등 고민별 핵심 포인트를 한눈에 보여드립니다.
          </Description>
        </AnimatedItem>
      </Wrapper>

      <AnimatedItem ref={boxReveal.ref} className={boxReveal.isRevealed ? "visible" : ""} delay="0.4s">
        <SkinScoreBox
          data={[
            { title: "여드름", scores: { acne: 70 } },
            { title: "모공", scores: { pore: 80 } },
            { title: "주름", scores: { wrinkle: 50 } },
          ]}
        />
      </AnimatedItem>
    </Container>
  );
};

export default OverviewMiddle;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AnimatedItem = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
  transition-delay: ${(props) => props.delay || "0s"};

  &.visible {
    animation: ${fadeUp} 0.6s ease-out forwards;
  }
`;

const Wrapper = styled.div`
  flex-direction: column;
  text-align: left;
  padding: 20px 20px 20px 0;
  max-width: 780px;
  gap: 20px;

  @media (max-width: 900px) {
    padding: 0;
    text-align: center;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 2.5rem;
  line-height: 2.9rem;
  color: ${colors.primary};
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 10px;
  color: ${colors.primary};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 80px;
  padding: 20px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 40px;
    text-align: center;
  }
`;
