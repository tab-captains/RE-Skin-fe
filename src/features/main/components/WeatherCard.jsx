import styled from "styled-components";
import colors from "../../common/colors";
import GaugeCircle from "./GaugeCircle";
import useReveal from "../../common/hooks/useReveal"

const weatherMock = {
  city: "대한민국 서울특별시",
  temperature: 21,
  uvIndex: 6,
  pm10: 45,
  humidity: 65
};

const WeatherCard = ({weather=weatherMock}) => {

  return(
    <>
    <Wrapper>
      <WeatherCardItem>
        <TopSection>
          <TopTextWrapper>
            <Text>현재 기온</Text>
            <Temp>{weather.temperature}°C</Temp>
            <Text>{weather.city}</Text>
          </TopTextWrapper>
          <GaugesWrapper>
            <GaugeCircle label="미세먼지" value={weather.pm10} max={150} />
            <GaugeCircle label="UV 지수" value={weather.uvIndex} max={11} />
            <GaugeCircle label="습도" value={weather.humidity} max={100} />
          </GaugesWrapper>
        </TopSection>

     <BottomText>오늘은 미세먼지가 높으니 꼼꼼한 클렌징 잊지 마세요!</BottomText>
     </WeatherCardItem>
    </Wrapper>
    </>
  );
};
 const WeatherCardItem = ({ children }) => {
  const { ref, isRevealed } = useReveal({ threshold: [0.5, 0.4] });

  return (
    <Card ref={ref} className={isRevealed ? "visible" : ""}>
      {children}
    </Card>
  );
};

const Card = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  width: 600px;
  height: 170px;
  padding: 20px 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  background-color: ${colors.weather}; 
  backdrop-filter: blur(12px);     
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3); 
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2); 
`;

const TopSection =styled.div`
  display: flex;
  justify-content: space-between;
`

const TopTextWrapper =styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const BottomText = styled.div`
  font-size: 0.9rem;
  color: white;
  margin: 30px 0 0 0;
`;
const Text = styled.div`
  font-size: 0.8rem;
  color: white;
  margin: 0;
`;

const Temp = styled.div`
  font-size: 2.4rem;
  color: white;
`;

const GaugesWrapper = styled.div`
  display: flex;
  flex: 0.8; 
  justify-content: space-between;
  
`;
export default WeatherCard;