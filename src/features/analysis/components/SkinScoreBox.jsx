import styled from "styled-components";
import colors from "../../common/colors";

const SkinScoreBox = ({ data }) => {
  return (
    <Container>
      {data.map((box, idx) => (
        <Box key={idx}>
          <BoxTitle>{box.title}</BoxTitle>
          {Object.entries(box.scores).map(([key, value]) => (
            <ScoreRow key={key}>
              <Label>{key.toUpperCase()}</Label>
              <GaugeWrapper>
                <Gauge width={value} />
              </GaugeWrapper>
              <Score>{value}</Score>
            </ScoreRow>
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
  justify-content: center;
  flex-wrap: wrap;
`;

const Box = styled.div`
  width: 400px;
  height: 50px;
  padding: 20px;
  border-radius: 12px;
  background-color: #f5f7fa;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const BoxTitle = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  color: ${colors.primary};
  text-align: left;
`;

const ScoreRow = styled.div`
  display: flex;
  align-items: left;
  gap: 10px;
`;

const Label = styled.div`
  width: 70px;
  font-weight: 600;
  color: ${colors.primary};
`;

const GaugeWrapper = styled.div`
  flex: 1;
  height: 12px;
  background-color: #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
`;

const Gauge = styled.div`
  width: ${({ width }) => width}%;
  height: 100%;
  background-color: ${colors.primary};
  border-radius: 6px;
  transition: width 0.5s ease;
`;

const Score = styled.div`
  width: 30px;
  text-align: right;
  font-weight: 500;
  color: ${colors.primary};
`;
