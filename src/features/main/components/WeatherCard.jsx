import styled from "styled-components";
import colors from "../../common/colors";
import GaugeCircle from "./GaugeCircle";

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
    </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  width: 600px;
  height: 170px;
  padding: 20px 30px;
  border-radius: 10px;
  border: 1px solid ${colors.weather};
  background-color:${colors.weather};
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  font-size: 1rem;
  color: white;
  margin: 10px 0;
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