import styled, { keyframes } from "styled-components";
import colors from "../../common/colors";

const SkinScoreGrid = ({ 
  acneScore, 
  acneMessage, 
  wrinkleScore, 
  wrinkleMessage, 
  poresScore, 
  poresMessage, 
  lipScore, 
  lipMessage 
}) => {
  // API 응답 데이터를 metrics 형식으로 변환
  const metrics = [
    {
      name: "여드름",
      score: acneScore || 0,
      message: acneMessage || "분석 결과가 없습니다."
    },
    {
      name: "주름",
      score: wrinkleScore || 0,
      message: wrinkleMessage || "분석 결과가 없습니다."
    },
    {
      name: "모공",
      score: poresScore || 0,
      message: poresMessage || "분석 결과가 없습니다."
    },
    {
      name: "입술 건조",
      score: lipScore || 0,
      message: lipMessage || "분석 결과가 없습니다."
    }
  ];

  return (
    <Container>
      {metrics.map((metric, idx) => (
        <Box key={idx}>
          <BoxTitle>{metric.name}</BoxTitle>
          <ScoreRow>
            <Score>{metric.score}/100</Score>
            <GaugeWrapper>
              <Gauge width={metric.score} idx={idx} />
            </GaugeWrapper>
          </ScoreRow>
          <Message>{metric.message}</Message>
        </Box>
      ))}
    </Container>
  );
};

export default SkinScoreGrid;





const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Box = styled.div`
  width: 530px;
  padding: 10px 15px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
`;

const BoxTitle = styled.div`
  font-weight: bold;
  font-size: 0.8rem;
  color: ${colors.primary};
  text-align: left;
`;

const ScoreRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 0;
`;

const GaugeWrapper = styled.div`
  flex: 1;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const fillGauge = (width) => keyframes`
  from { width: 0; }
  to { width: ${width}%; }
`;

const Gauge = styled.div`
  width: 0;
  height: 100%;
  background-color: ${colors.primary};
  border-radius: 4px;
  animation: ${({ width }) => fillGauge(width)} 1s ease-out forwards;
  animation-delay: ${({ idx }) => idx * 0.2}s; 
`;

const Score = styled.div`
  min-width: 32px;
  text-align: right;
  font-weight: bold;
  font-size: 14px;
  color: ${colors.primary};
`;

const Message = styled.div`
  font-size: 0.75rem;
  color: ${colors.primary};
  text-align: left;
  line-height: 1.4;
`;
