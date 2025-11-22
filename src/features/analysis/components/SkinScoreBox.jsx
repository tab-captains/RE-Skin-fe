import styled from "styled-components";
import colors from "../../common/colors";

  const getMessageByScore = (value) => {
    if (value >= 80) return "아주 건강한 상태예요!";
    if (value >= 60) return "전반적으로 괜찮지만 약간의 관리가 필요해요.";
    if (value >= 40) return "눈에 띄는 개선이 필요해 보여요.";
    return "전문적인 관리가 필요한 단계예요.";
  };

const SkinScoreBox = ({ data }) => {
  return (
    <Container>
      {data.map((box, idx) => (
        <Box key={idx}>
          <BoxTitle>{box.title}</BoxTitle>
          {Object.entries(box.scores).map(([key, value]) => (
            <div key={key}>
            <ScoreRow key={key}>
              <Score>{value}/100</Score>
              <GaugeWrapper>
                <Gauge width={value} />
              </GaugeWrapper>
            </ScoreRow>
            <Message>{getMessageByScore(value)}</Message>
            </div>
             ))}
        </Box>
      ))}
    </Container>
  );
};

export default SkinScoreBox;


const Container = styled.div`
  display: flex;
  gap: 20px;
  justify-content: right;
  flex-wrap: wrap;
  
`;

const Box = styled.div`
  width: 350px;
  padding: 10px 15px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
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

const Gauge = styled.div`
  width: ${({ width }) => width}%;
  height: 100%;
  background-color: ${colors.primary};
  border-radius: 4px;
  transition: width 0.5s ease;
`;

const Score = styled.div`
  min-width: 32px;     
  text-align: right;
  font-weight: bold;
  font-size: 10px;
  color: ${colors.primary};
`;


const Message = styled.div`
  font-size: 0.75rem;
  color: ${colors.primary};
  margin-top: 4px;
  text-align: left;
`;
