// ImageUploadPage.jsx (드롭존 안에 이미지 미리보기) 수정
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../../common/colors"
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ImageUploadPage = () => {
  const navigate = useNavigate();

  const [slots, setSlots] = useState({ front: null, left: null, right: null });
  const [dragActive, setDragActive] = useState({ front: false, left: false, right: false });

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

  const allUploaded = slots.front && slots.left && slots.right;
  const handleStartAnalysis = () => { if (allUploaded) navigate("/result"); };

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
background:#f5f7fa;
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
width:100%;
height:220px;
border-radius:10px;
border:2px dashed ${({$highlighted})=>$highlighted?"#4d9fff":"#ddd"};
display:flex;
justify-content:center;
align-items:center;
background:#fff;
cursor:pointer;
position:relative;
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