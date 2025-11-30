import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import SelectLocation from "./SelectLocation";
import instance from "../../../shared/api/axiosInstance";
const weatherMock = {
  city: "지역 선택 전",
  temperature: 21,
  uvIndex: 6,
  fineDust: 45,
  humidity: 65,
  fineDustLevel:"보통",
  uvLevel:"낮음",
  humidityLevel:"높음",
  message: "지역을 선택하면 정확한 날씨 정보를 확인할 수 있어요."
};
const WeatherContainer = () => {
  const [weather, setWeather] = useState(weatherMock);
  const [location, setLocation] = useState({ sidoName: "지역", regionName: "선택 전" });
  const [modalOpen, setModalOpen] = useState(false);

const handleApplyLocation = async (loc) => {
  try {
    setLocation(loc);
    await instance.post("/api/user/location", loc);
    const res = await instance.get("/api/user/location/weather", {
      params: loc
    });
    console.log("API RESUlT: ",res.data);
    setWeather(res.data);
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
