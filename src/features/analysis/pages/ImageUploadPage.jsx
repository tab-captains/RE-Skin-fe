
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../../common/colors"
import { useNavigate } from "react-router-dom";
import {analyzeImage} from "../../../shared/api/skinAnalysis";
import instance from "../../../shared/api/axiosInstance";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ImageUploadPage = () => {
  const navigate = useNavigate();

  const [slots, setSlots] = useState({ left: null,front: null,  right: null });
  const [dragActive, setDragActive] = useState({ left: false,  front: false, right: false });
  const [loading, setLoading] = useState(false);
  const validateFile = (file) => {
    if (!file.type.startsWith("image/")) { alert("이미지 파일만 업로드 가능합니다."); return false; }
    if (file.size > MAX_FILE_SIZE) { alert("파일 용량이 너무 큽니다. 5MB 이하로 올려주세요."); return false; }
    return true;
  };

  const handleFile = (slotKey, file) => {
    if (!file || !validateFile(file)) return;
    setSlots((s) => ({ ...s, [slotKey]: file }));
  };

  const onDrop = (slotKey) => (e) => {
    e.preventDefault();
    setDragActive((d) => ({ ...d, [slotKey]: false }));
    handleFile(slotKey, e.dataTransfer.files[0]);
  };

  const onDragOver = (slotKey) => (e) => { e.preventDefault(); setDragActive((d) => ({ ...d, [slotKey]: true })); };
  const onDragLeave = (slotKey) => (e) => { e.preventDefault(); setDragActive((d) => ({ ...d, [slotKey]: false })); };
  const onSelect = (slotKey) => (e) => { handleFile(slotKey, e.target.files[0]); e.target.value = ""; };
  const removeFile = (slotKey) => setSlots((s) => ({ ...s, [slotKey]: null }));

  const allUploaded =  slots.left && slots.front && slots.right;




const handleStartAnalysis = async () => {
  if (!allUploaded) return;
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("files", slots.left);
    formData.append("files", slots.front);
    formData.append("files", slots.right);

    const response = await instance.post(
      "/api/analyze",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("분석 결과:", response.data);
    localStorage.setItem("analysisResult", JSON.stringify(response.data));
    navigate("/analysis");

  } catch (error) {
    console.error("이미지 분석 실패:", error);
    alert("이미지 분석에 실패했습니다.");
  } finally {
    setLoading(false);
  }
};


  return (
    <PageWrapper>
      <Title>지금 바로 피부 상태를 확인해보세요.</Title>
      <Description>얼굴의 좌, 우, 정면 사진을 업로드해주세요. <br></br>정면 사진과 동일한 조명에서 촬영시 분석 정확도가 올라갑니다.</Description>

      <SlotsWrapper>
        {[{key:"left",label:"좌측면"},{key:"front",label:"정면"},{key:"right",label:"우측면"}].map(({key,label})=>(
          <Slot key={key}>
            <SlotLabel>{label}</SlotLabel>

            <DropZone $highlighted={dragActive[key]? true : undefined}
              onDrop={onDrop(key)}
              onDragOver={onDragOver(key)}
              onDragEnter={onDragOver(key)}
              onDragLeave={onDragLeave(key)}
              onClick={()=>document.getElementById(`file-${key}`).click()}
            >
              {slots[key] ? <PreviewImg src={URL.createObjectURL(slots[key])} alt={label}/> : <Placeholder>클릭 또는 드래그</Placeholder>}
            </DropZone>

            <HiddenInput id={`file-${key}`} type="file" accept="image/*" onChange={onSelect(key)} />

            {slots[key] && <ButtonsRow><SmallButton onClick={()=>removeFile(key)} $secondary>삭제</SmallButton><FileName>{slots[key].name}</FileName></ButtonsRow>}
          </Slot>
        ))}
      </SlotsWrapper>

      {allUploaded && <AnalyzeButton onClick={handleStartAnalysis}>분석 시작하기</AnalyzeButton>}
    </PageWrapper>
  );
};

export default ImageUploadPage;


const PageWrapper = styled.div`
min-height:100vh;
padding:40px;
display:flex;
flex-direction:column;
align-items:center;
`;
const Title = styled.h2`
margin-bottom:24px;
`;
const Description = styled.div`
text-align:center;
font-size:14px;
margin-bottom:30px;
`;
const SlotsWrapper = styled.div`
display:flex;
gap:18px;
align-items:flex-start;
`;

const Slot = styled.div`
width:320px;
display:flex;
flex-direction:column;
gap:10px;
align-items:center;
`;

const SlotLabel = styled.div`
font-weight:600;
`;
const DropZone = styled.div`
  width: 100%;
  height: 220px;
  border-radius: 10px;
  border: 2px dashed ${({ $highlighted }) => ($highlighted ? "#4d9fff" : "#ccc")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;

  background: 
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.7) 0%,
      rgba(240, 240, 240, 0.4) 40%,
      rgba(230, 230, 230, 0.2) 100%
    ),
    repeating-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.08) 0px,
      rgba(255, 255, 255, 0.08) 2px,
      rgba(0, 0, 0, 0.03) 3px,
      rgba(0, 0, 0, 0.03) 4px
    );
  
  backdrop-filter: blur(1px);
`;

const Placeholder = styled.div`
text-align:center;
color:#9aa0a6;
font-size:14px;
`;

const PreviewImg = styled.img`
max-width:100%;
max-height:100%;
object-fit:contain;
border-radius:8px;
`;

const HiddenInput = styled.input`
display:none;
`;
const ButtonsRow = styled.div`
width:100%;
display:flex;
gap:8px;
align-items:center;
justify-content:flex-start;
`;

const SmallButton = styled.button`
padding:6px 10px;
border-radius:6px;
border:none;
cursor:pointer;
background:${({$secondary})=>$secondary?"#eee":"#111"};
color:${({$secondary})=>$secondary?"#111":"#fff"};
font-size:13px;
`;

const FileName = styled.span`
font-size:13px;
color:#333;
white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis;
`;

const AnalyzeButton = styled.button`
margin-top:30px;
padding:10px 18px;
border-radius:20px;
background: ${colors.primary};
color:white;
border:none;
cursor:pointer;
font-size:15px;
`;