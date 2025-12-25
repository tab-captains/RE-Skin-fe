
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
    
    // 파일 유효성 검사
    if (!slots.left || !slots.front || !slots.right) {
      alert("모든 이미지를 업로드해주세요.");
      setLoading(false);
      return;
    }

    // FormData에 파일 추가
    // 백엔드가 각각 다른 파라미터명을 기대하는 경우 (일반적인 패턴)
    formData.append("left", slots.left);
    formData.append("front", slots.front);
    formData.append("right", slots.right);
    
    // 만약 백엔드가 배열을 기대한다면 위 코드를 주석 처리하고 아래 코드를 사용하세요:
    // formData.append("files", slots.left);
    // formData.append("files", slots.front);
    // formData.append("files", slots.right);

    // 디버깅: FormData 내용 확인
    console.log("전송할 파일들:", {
      left: { name: slots.left.name, size: slots.left.size, type: slots.left.type },
      front: { name: slots.front.name, size: slots.front.size, type: slots.front.type },
      right: { name: slots.right.name, size: slots.right.size, type: slots.right.type }
    });

    const response = await instance.post(
      "/api/analyze",
      formData,
      {
        withCredentials: true,
        // axios가 FormData를 감지하면 자동으로 multipart/form-data와 boundary를 설정합니다
      }
    );

    console.log("분석 결과:", response.data);
    
    // API 응답 형식: { success, code, message, data: { ... } }
    if (response.data && response.data.success && response.data.data) {
      localStorage.setItem("analysisResult", JSON.stringify(response.data.data));
      navigate("/analysis");
    } else {
      throw new Error("Invalid response format");
    }

  } catch (error) {
    console.error("이미지 분석 실패:", error);
    console.error("에러 상세:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        "이미지 분석에 실패했습니다.";
    alert(`이미지 분석 실패: ${errorMessage}`);
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

      {allUploaded && (
        <AnalyzeButton onClick={handleStartAnalysis} disabled={loading}>
          {loading ? "분석 중..." : "분석 시작하기"}
        </AnalyzeButton>
      )}
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
cursor:${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
font-size:15px;
opacity:${({ disabled }) => (disabled ? 0.6 : 1)};
transition: opacity 0.2s ease;
`;