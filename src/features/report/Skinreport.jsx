import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DetailReport from './Detailreport'; 
import { getAnalysisList, getAnalysisDetail } from '../../shared/api/skinAnalysis';
import { useAuth } from '../auth/context/AuthContext';
import ResultTop from '../analysis/components/ResultTop';
import SkinScoreGrid from '../analysis/components/SkinScoreGrid'; 

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}-${day}`;
};

// 상대 시간 계산 함수
const getTimeAgo = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return '(오늘)';
  if (diffDays === 1) return '(어제)';
  if (diffDays < 7) return `(${diffDays}일 전)`;
  if (diffDays < 30) return `(${Math.floor(diffDays / 7)}주 전)`;
  if (diffDays < 365) return `(${Math.floor(diffDays / 30)}개월 전)`;
  return `(${Math.floor(diffDays / 365)}년 전)`;
};

// 날짜와 시간 포맷팅 함수
const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const ReportContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 20px 100px;
    text-align: center;
    font-family: 'Pretendard', sans-serif;
`;

const ReportHeader = styled.div`
    margin-bottom: 70px;
    
    h1 {
        font-size: 38px;
        font-weight: 700;
        color: #1e2a55;
        margin-bottom: 12px;
    }
`;

const TimelineWrapper = styled.div`
    position: relative;
    max-width: 800px;
    margin: 0 auto;
`;

const TimelineBar = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: #e0e5ee;
`;

const RecordItem = styled.div`
    display: flex;
    margin-bottom: 50px;
    position: relative; 
    text-align: left;
    margin-left: 30px;
`;

const RecordPoint = styled.div`
    position: absolute;
    left: -37px; 
    top: 38px;
    width: 15px;
    height: 15px;
    background-color: #1e2a55;
    border-radius: 50%;
    z-index: 10;
`;

const DateColumn = styled.div`
    position: absolute;
    left: -60px;
    width: 80px;
    text-align: center;
    transform: translateX(-100%);
    top: 3px;
`;

const DateText = styled.h3`
    font-size: 16px;
    font-weight: 700;
    color: #1e2a55;
    margin-bottom: 2px;
`;

const AgoText = styled.p`
    font-size: 12px;
    color: #9aa0a8;
    margin-bottom: 4px;
`;

const DateTimeText = styled.p`
    font-size: 11px;
    color: #9aa0a8;
    margin-top: 2px;
`;

const CardContent = styled.div`
    flex: 1;
    background-color: #f7f9fc;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Summary = styled.div`
    font-size: 14px;
    color: #333;
    line-height: 1.6;
    flex: 1;

    span {
        font-weight: 700;
        display: block;
        margin-bottom: 8px;
        color: #1e2a55;
    }
`;

const SummaryContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const SummaryText = styled.div`
    font-size: 14px;
    color: #333;
    line-height: 1.5;
`;

const SummaryItem = styled.div`
    font-size: 13px;
    color: #555;
    line-height: 1.4;
`;

const SummaryLabel = styled.span`
    font-weight: 600;
    color: #1e2a55;
    margin-right: 4px;
`;

const SummaryMetrics = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
`;

const MetricItem = styled.div`
    font-size: 12px;
    color: #666;
    padding: 4px 8px;
    background-color: rgba(30, 42, 85, 0.08);
    border-radius: 6px;
    white-space: nowrap;
`;

const DownloadLink = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #3d4a70;
    font-size: 13px;
    font-weight: 600;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    margin-left: 30px;
    flex-shrink: 0;
    padding: 5px 10px;
    border: 1px solid #dcdfe4;
    border-radius: 8px;
    background-color: #fff;
    transition: all 0.2s;
    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

    svg {
        display: none; 
    }

    &:hover {
        ${({ disabled }) => !disabled && `
        color: #1e2a55;
        background-color: #e0e5ee;
        border-color: #aeb8c4;
        `}
    }
`;

const LoadingText = styled.div`
    text-align: center;
    padding: 40px;
    color: #1e2a55;
    font-size: 16px;
`;

const EmptyText = styled.div`
    text-align: center;
    padding: 40px;
    color: #9aa0a8;
    font-size: 16px;
`;

const DetailReportWrapper = styled.div`
    position: relative;
    min-height: 100vh;
    padding: 20px;
`;

const CloseButton = styled.button`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    padding: 10px 20px;
    background-color: #1e2a55;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s;

    &:hover {
        background-color: #3d4a70;
    }
`;

const AnalysisResultPageWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

// AnalysisResultPage를 재사용하기 위한 래퍼 컴포넌트
const AnalysisResultPageWithData = ({ data }) => {
    const { user } = useAuth();
    
    // API 응답 필드를 컴포넌트에서 사용할 형식으로 매핑
    const skinTypeMap = {
        "COMBINATION": "복합성",
        "DRY": "건성",
        "OILY": "지성",
        "NORMAL": "중성",
        "SENSITIVE": "민감성"
    };

    const displaySkinType = skinTypeMap[data.skinType] || data.skinType;

    return (
        <>
        <Container>
            <Header>
                <p style = {{marginTop: "20px"}}>오늘의 피부 상태</p>
                <h2>{displaySkinType} 피부</h2>
                <p><b>Re:Skin</b>이 {user?.nickname || user?.username || "Guest"}님의 피부 컨디션을 살펴보고 있어요.</p>
                <h2>{data.totalScore}/100</h2>
            </Header>
            <ResultTop 
                skinType={displaySkinType}
                skinTypeDescription={data.skinTypeDescription}
                summaryMessage={data.summaryMessage}
            />
            <SkinScoreGrid 
                acneScore={data.acneScore}
                acneMessage={data.acneMessage}
                wrinkleScore={data.wrinkleScore}
                wrinkleMessage={data.wrinkleMessage}
                poresScore={data.poresScore}
                poresMessage={data.poresMessage}
                lipScore={data.lipScore}
                lipMessage={data.lipMessage}
            />
        </Container>
        </>
    );
};

const Header = styled.div`
    text-align: center;
    p{
        font-size: 13px;
        margin: 10px;
    }
    h2{
        margin: 5px;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px;
    gap: 30px;
    margin-bottom: 100px;
`;

const SkinReport = () => {
    const [showDetail, setShowDetail] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [analysisList, setAnalysisList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [detailData, setDetailData] = useState(null);
    const [loadingDetail, setLoadingDetail] = useState(false);

    useEffect(() => {
        const fetchAnalysisList = async () => {
            try {
                setLoading(true);
                const response = await getAnalysisList();
                
                if (response && response.success && response.data) {
                    // response.data.data가 배열
                    const list = Array.isArray(response.data) ? response.data : [];
                    setAnalysisList(list);
                }
            } catch (error) {
                console.error("분석 목록 조회 실패:", error);
                setAnalysisList([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalysisList();
    }, []);

    const handleDownloadClick = async (record, e) => {
        e.preventDefault();
        
        // analysisId 사용
        const analysisId = record.analysisId || record.id;
        if (!analysisId) {
            alert("분석 ID가 없습니다.");
            return;
        }

        try {
            setLoadingDetail(true);
            const response = await getAnalysisDetail(analysisId);
            
            if (response && response.success && response.data) {
                setDetailData(response.data);
        setSelectedReport(record);
        setShowDetail(true);
            } else {
                alert("분석 결과를 불러올 수 없습니다.");
            }
        } catch (error) {
            console.error("분석 상세 조회 실패:", error);
            alert("분석 결과를 불러오는 중 오류가 발생했습니다.");
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
        setSelectedReport(null);
        setDetailData(null);
    };

    return (
        <>
            <ReportContainer style={{ display: showDetail ? 'none' : 'block' }}> 
                <ReportHeader>
                    <h1>Your Skin Records</h1>
                </ReportHeader>

                <TimelineWrapper>
                    <TimelineBar /> 
                    
                    {loading ? (
                        <LoadingText>분석 목록을 불러오는 중...</LoadingText>
                    ) : analysisList.length === 0 ? (
                        <EmptyText>분석 기록이 없습니다.</EmptyText>
                    ) : (
                        analysisList.map((record, index) => {
                            const analysisId = record.analysisId || record.id;
                            
                            // LocalStorage에서 분석 시각 가져오기
                            const key = "analysisTimes";
                            const saved = JSON.parse(localStorage.getItem(key) || "{}");
                            const savedTime = saved[analysisId];
                            
                            // LocalStorage에 저장된 시간이 있으면 사용, 없으면 createdAt 사용
                            const createdAt = savedTime || record.createdAt || null;
                            const dateStr = createdAt ? formatDate(createdAt) : '-';
                            const timeAgo = createdAt ? getTimeAgo(createdAt) : '';
                            const dateTime = createdAt ? formatDateTime(createdAt) : '';
                            
                            return (
                                <RecordItem key={analysisId || index}>
                            <RecordPoint /> 
                            
                            <DateColumn>
                                        <DateText>{dateStr}</DateText>
                                        {timeAgo && <AgoText>{timeAgo}</AgoText>}
                                        {dateTime && <DateTimeText>{dateTime}</DateTimeText>}
                            </DateColumn>
                            
                            <CardContent>
                                <Summary>
                                    <span>👤 Report Summary</span>
                                            <SummaryContent>
                                                {record.summaryMessage && (
                                                    <SummaryText>{record.summaryMessage}</SummaryText>
                                                )}
                                                {record.skinTypeLabel && (
                                                    <SummaryItem>
                                                        <SummaryLabel>피부 타입:</SummaryLabel> {record.skinTypeLabel}
                                                    </SummaryItem>
                                                )}
                                                <SummaryMetrics>
                                                    {record.acneLabel && (
                                                        <MetricItem>여드름: {record.acneLabel}</MetricItem>
                                                    )}
                                                    {record.poresLabel && (
                                                        <MetricItem>모공: {record.poresLabel}</MetricItem>
                                                    )}
                                                    {record.wrinkleLabel && (
                                                        <MetricItem>주름: {record.wrinkleLabel}</MetricItem>
                                                    )}
                                                    {record.lipLabel && (
                                                        <MetricItem>입술건조: {record.lipLabel}</MetricItem>
                                                    )}
                                                </SummaryMetrics>
                                                {!record.summaryMessage && !record.skinTypeLabel && !record.acneLabel && 
                                                 !record.poresLabel && !record.wrinkleLabel && !record.lipLabel && (
                                                    <SummaryText>분석 결과 요약이 없습니다.</SummaryText>
                                                )}
                                            </SummaryContent>
                                </Summary>
                                
                                <DownloadLink 
                                            href="#"
                                            onClick={(e) => handleDownloadClick(record, e)}
                                            disabled={loadingDetail}>
                                            {loadingDetail && (selectedReport?.analysisId === analysisId || selectedReport?.id === analysisId)
                                                ? "로딩 중..." 
                                                : "Report Detail"}
                                </DownloadLink>
                            </CardContent>
                        </RecordItem>
                            );
                        })
                    )}
                </TimelineWrapper>
            </ReportContainer>
            {showDetail && detailData && (
                <DetailReportWrapper>
                    <CloseButton onClick={handleCloseDetail}>✕ 닫기</CloseButton>
                    <AnalysisResultPageWrapper>
                        <AnalysisResultPageWithData data={detailData} />
                    </AnalysisResultPageWrapper>
                </DetailReportWrapper>
            )}
        </>
    );
};

export default SkinReport;