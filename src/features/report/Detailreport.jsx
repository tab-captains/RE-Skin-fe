import React from 'react';
import styled from 'styled-components';
import { FiDownload } from 'react-icons/fi';

// **********************************************
// 상세 리포트 관련 Styled Components
// **********************************************
const DetailContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f0f3f8;
    overflow-y: auto;
    z-index: 1000;
    padding: 20px;
    box-sizing: border-box;
    font-family: 'Pretendard', sans-serif;
`;

const DetailHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto 30px;
    padding: 10px 0;
    
    h2 {
        font-size: 28px;
        font-weight: 700;
        color: #1e2a55;
    }
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #1e2a55;
    padding: 5px;
    transition: color 0.2s;

    &:hover {
        color: #3d4a70;
    }
`;

const ProgressSection = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    max-width: 1000px;
    margin: 0 auto 40px;
`;

const Card = styled.div`
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    flex: 1;
    min-height: 200px;
    text-align: center;

    h3 {
        font-size: 18px;
        color: #1e2a55;
        margin-bottom: 15px;
        font-weight: 600;
    }
`;

const ScoreBox = styled.div`
    background-color: #e0e5ee;
    padding: 15px;
    border-radius: 8px;
    margin-top: 10px;

    p {
        font-size: 28px;
        font-weight: 700;
        color: #1e2a55;
        margin: 0;
    }
    span {
        font-size: 14px;
        color: #666;
    }
`;

const GraphPlaceholder = styled.div`
    height: 150px;
    background-color: #f7f9fc;
    border: 1px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9aa0a8;
    margin-top: 10px;
`;

const BeforeAfterSection = styled.div`
    max-width: 1000px;
    margin: 0 auto 40px;
    background: #fff;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 30px;
    margin-bottom: 30px;

    div {
        flex: 1;
        text-align: center;
        h4 {
            font-size: 20px;
            color: #1e2a55;
            margin-bottom: 15px;
        }
        .image-placeholder {
            width: 100%;
            height: 200px;
            background-color: #f7f9fc;
            border: 1px dashed #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #9aa0a8;
        }
    }
`;

const ScoreCommentRow = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
`;

const ScoreCircle = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: conic-gradient(#3d4a70 85%, #e0e5ee 0%); 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #1e2a55;
    font-weight: 700;
    font-size: 24px;
    position: relative;
    
    &::after {
        content: "Score";
        font-size: 12px;
        font-weight: 400;
        position: absolute;
        bottom: 10px;
        color: #333;
    }
`;

const CommentBox = styled.div`
    flex: 1;
    text-align: left;
    
    p {
        font-size: 14px;
        line-height: 1.6;
        color: #333;
    }
    
    .metrics {
        font-weight: 600;
        color: #3d4a70;
        margin-bottom: 5px;
    }
`;

const DownloadLink = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #3d4a70;
    font-size: 12px;
    cursor: pointer;
    margin-left: 30px;
    flex-shrink: 0;

    svg {
        font-size: 20px;
        margin-bottom: 5px;
    }

    &:hover {
        color: #1e2a55;
    }
`;

const DetailDownload = styled(DownloadLink)`
    position: absolute;
    right: 30px;
    bottom: 30px;
    margin: 0;
`;


// **********************************************
// 상세 리포트 메인 컴포넌트
// **********************************************
const DetailReport = ({ reportData, onClose }) => {
    // 상세 리포트의 더미 데이터 (실제 데이터는 reportData를 사용해야 함)
    const detailData = {
        score: 85,
        metrics: '85점 (▲10점), 수분감: 70% (▲5점), 여드름: 64% (▼7점)',
        comment: '전반적인 피부 상태가 크게 개선되었으며, 특히 수분감과 탄력이 증가했습니다. 하지만 여드름 지수가 소폭 증가했으니 해당 부분 관리에 유의가 필요합니다. 맞춤형 추천 루틴을 참고하세요.',
    };

    if (!reportData) return null;

    return (
        <DetailContainer>
            <DetailHeader>
                <h2>{reportData.date} Skin Report: {reportData.ago.replace(/[\(\)]/g, '')}</h2>
                <CloseButton onClick={onClose}>&times;</CloseButton>
            </DetailHeader>

            {/* 1. Your Skin progress (개선추이 피그마) */}
            <ProgressSection>
                <Card>
                    <h3>Your Skin progress</h3>
                    <ScoreBox>
                        <p>79 / 100</p>
                        <span>Good progress</span>
                    </ScoreBox>
                </Card>
                <Card>
                    <h3>Skin Health Score</h3>
                    <GraphPlaceholder>Chart Placeholder (10/31 ~ 11/6)</GraphPlaceholder>
                </Card>
            </ProgressSection>
            
            <ProgressSection>
                <Card style={{ flex: 'none', width: '100%' }}> 
                    <h3>Your Target points</h3>
                    <p style={{fontSize: '14px', color: '#666', marginTop: '10px'}}>Now your skin: {reportData.reportSummary.split(',')[0]}</p>
                    <p style={{fontSize: '14px', color: '#666', marginTop: '5px'}}>Our target point: {reportData.reportSummary.split(': ')[1]}</p>
                </Card>
            </ProgressSection>

            {/* 2. SkinReportPage - History Time (Before/After 피그마) */}
            <BeforeAfterSection>
                <h3>SkinReportPage - History Time</h3>
                <ImageWrapper>
                    <div>
                        <h4>Before</h4>
                        <div className="image-placeholder"></div>
                    </div>
                    <div>
                        <h4>After</h4>
                        <div className="image-placeholder"></div>
                    </div>
                </ImageWrapper>

                <ScoreCommentRow>
                    <ScoreCircle>{detailData.score}</ScoreCircle>
                    <CommentBox>
                        <p className="metrics">Now skin score: {detailData.metrics}</p>
                        <p className="comment">{detailData.comment}</p>
                    </CommentBox>
                </ScoreCommentRow>
            </BeforeAfterSection>

            <DetailDownload href="#" download>
                <FiDownload />
                PDF Download
            </DetailDownload>
        </DetailContainer>
    );
};

export default DetailReport;