import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import SelectLocation from "./SelectLocation";
import instance from "../../../shared/api/axiosInstance";
const weatherMock = {
  city: "대한민국 서울특별시",
  temperature: 21,
  uvIndex: 6,
  fineDust: 45,
  humidity: 65,
  fineDustLevel:"보통",
  uvLevel:"낮음",
  humidityLevel:"높음",
  message: "오늘은 미세먼지가 높으니 꼼꼼한 클렌징 잊지 마세요!"
};
const WeatherContainer = () => {
  const [weather, setWeather] = useState(weatherMock);
  const [location, setLocation] = useState({ sidoName: "서울특별시", regionName: "송파구" });
  const [modalOpen, setModalOpen] = useState(false);

const handleApplyLocation = async (loc) => {
  try {
    // 1. 프론트 상태 업데이트
    setLocation(loc);

    // 2. 백에 위치 저장
    await instance.post("/api/user/location", loc);

    // 3. 백에서 날씨 정보 GET 요청
    const res = await instance.get("/api/user/location/weather", {
      params: loc
    });

    // 4. 상태 업데이트
    setWeather(res.data);

    // 5. 모달 닫기
    setModalOpen(false);
  } catch (err) {
    console.error("위치/날씨 처리 오류", err);
  }
};


  return (

  <WeatherCard
    weather={{
      city: `${location.sidoName} ${location.regionName}`,
      temperature: weather?.temperature,
      fineDust: weather?.fineDust,
      uvIndex: weather?.uvIndex,
      humidity: weather?.humidity,
      message: weather?.message,
      fineDustLevel: weather?.fineDustLevel,
      uvLevel:weather?.uvLevel,
      humidityLevel:weather?.humidityLevel
    }}
    city={`${location.sidoName} ${location.regionName}`}
    onChangeLocation={() => setModalOpen(true)}
  >
  {modalOpen && (
      <SelectLocation
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleApplyLocation}
      />
      )}
    </WeatherCard>
  );
};

export default WeatherContainer;
