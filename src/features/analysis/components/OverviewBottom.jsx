import styled, { keyframes } from "styled-components";
import colors from "../../common/colors";
import useReveal from "../../common/hooks/useReveal";
import analysisPreview from '../../../assets/images/analysisPreview.png';
import {useEffect, useState} from "react";
const OverviewBottom =()=>{
  const imageReveal = useReveal({ threshold: 0.15 });
  const titleReveal = useReveal({ threshold: 0.2 });
  const descReveal = useReveal({ threshold: 0.2 });

  const [showImage, setShowImage] = useState(false);
  const [showTitle, setShowTitle] =useState(false);
  const [showDesc, setShowDesc] = useState(false);
  useEffect(() => {
    if (imageReveal.isRevealed) setShowImage(true);
  }, [imageReveal.isRevealed]);

  useEffect(() => {
    if (titleReveal.isRevealed) setShowTitle(true);
  }, [titleReveal.isRevealed]);

  useEffect(() => {
    if (descReveal.isRevealed) setShowDesc(true);
  }, [descReveal.isRevealed]);

  return(
       <Container>
        <AnimatedItem ref={imageReveal.ref} className={showImage? "visible" : ""} delay="0s">
          <Icon src={analysisPreview} alt="../../../assets/images/analysisPreview.png"></Icon>
        </AnimatedItem>
      <Wrapper>
        <AnimatedItem ref={titleReveal.ref} className={showTitle? "visible" : ""} delay="0.4s">
          <Title>AI가 어떻게 분석하나요?</Title>
        </AnimatedItem>
        <AnimatedItem ref={descReveal.ref} className={showDesc? "visible" : ""} delay="0.6s">
          <Description>
            이미지 기반 학습 모델이 얼굴의 여러 지점을 분석해 주요 피부 지표를 도출합니다.
          </Description>
        </AnimatedItem>
      </Wrapper>

    </Container>
  )

}
export default OverviewBottom;

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
  text-align: right;
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

const Icon = styled.img`
  width: 400px;
  height: 400px;
  object-fit: contain;
`