import styled, { keyframes } from "styled-components";
import colors from "../../common/colors";
import { useRef, useEffect } from "react";
import SkinScoreBox from "../components/SkinScoreBox";

const OverviewResult = () => {
  const itemRefs = useRef([]);
  itemRefs.current = [];

  const addToRefs = (el) => {
    if (el && !itemRefs.current.includes(el)) {
      itemRefs.current.push(el);
    }
  };

  useEffect(() => {
    const options = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, options);

    itemRefs.current.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <Container>
      <Wrapper>
        <AnimatedItem delay="0s" ref={addToRefs}>
          <Title>피부 고민에 따라 필요한 관리법은 모두 달라요.</Title>
        </AnimatedItem>

        <AnimatedItem delay="0.2s" ref={addToRefs}>
          <Description>
            모공, 주름, 여드름 등 고민별 핵심 포인트를 한눈에 보여드립니다.
          </Description>
        </AnimatedItem>
      </Wrapper>

      <AnimatedItem delay="0.4s" ref={addToRefs}>
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

export default OverviewResult;

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
    opacity: 1;
    transform: translateY(0);
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
