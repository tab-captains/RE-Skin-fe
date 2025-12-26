// WeatherLocationModal.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SIDO_LIST = ["서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시", "대전광역시", "울산광역시", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도"];

// 시도-구군 매핑 예시
const REGION_MAP = {
  "서울특별시": ["강남구", "송파구", "동작구", "마포구", "은평구", "성북구"],
  "부산광역시": ["해운대구", "수영구", "부산진구"],

  "대구광역시": ["수성구", "달서구", "중구"],
  "인천광역시": ["남동구", "연수구", "부평구"],
  "광주광역시": ["북구", "서구", "광산구"],
  "대전광역시": ["서구", "유성구", "중구"],
  "울산광역시": ["남구", "중구", "울주군"],

  "경기도": ["수원시", "성남시", "고양시"],
  "강원도": ["춘천시", "원주시", "강릉시"],

  "충청북도": ["청주시", "충주시", "제천시"],
  "충청남도": ["천안시", "아산시", "공주시"],

  "전라북도": ["전주시", "군산시", "익산시"],
  "전라남도": ["여수시", "순천시", "목포시"],

  "경상북도": ["포항시", "경주시", "구미시"],
  "경상남도": ["창원시", "김해시", "진주시"],

  "제주특별자치도": ["제주시", "서귀포시", "우도면"]
};

const SelectLocation = ({ isOpen, onClose, onSubmit }) => {
  const [sido, setSido] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSido("");
      setRegion("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!sido || !region) return;
    onSubmit({ sidoName: sido, regionName: region });
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalBox>
        <Title>지역 선택</Title>

        <Select value={sido} onChange={(e) => { setSido(e.target.value); setRegion(""); }}>
          <option value="">시/도 선택</option>
          {SIDO_LIST.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </Select>

        {sido && REGION_MAP[sido] && (
          <Select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="">구/군 선택</option>
            {REGION_MAP[sido].map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </Select>
        )}

        <ButtonRow>
          <CancelBtn onClick={onClose}>취소</CancelBtn>
          <SubmitBtn onClick={handleSubmit}>적용</SubmitBtn>
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
};

export default SelectLocation;

/* ---------------- Styled ---------------- */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  width: 380px;
  padding: 25px;
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const CancelBtn = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  background: #ddd;
`;

const SubmitBtn = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  background: #4a82ff;
  color: white;
`;
