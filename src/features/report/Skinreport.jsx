import React from 'react';
import styled from 'styled-components';
import { FiDownload } from 'react-icons/fi';

const skinRecords = [
  {
    date: '9-17',
    ago: '(1 month ago)',
    reportSummary: 'T존 유분 과다, 홍조 개선 필요. 추천 성분: 나이아신아마이드, 센텔라',
    downloadLink: '#',
  },
  {
    date: '10-31',
    ago: '(1 week ago)',
    reportSummary: '수분 부족형 지성 유지. 유분/피지 개선 효과 확인. 추천 성분: 살리실산, 비타민 C',
    downloadLink: '#',
  },
  {
    date: '11-6',
    ago: '(To day)',
    reportSummary: '민감성 완화 확인. 보습력 개선 필요. 추천 성분: 세라마이드, 히알루론산',
    downloadLink: '#',
  },
];

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

  span {
    font-weight: 700;
    display: block;
    margin-bottom: 5px;
    color: #1e2a55;
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

const SkinReport = () => {
  return (
    <ReportContainer>
      <ReportHeader>
        <h1>Your Skin Records</h1>
      </ReportHeader>

      <TimelineWrapper>
        <TimelineBar /> 
        
        {skinRecords.map((record, index) => (
          <RecordItem key={index}>
            <RecordPoint /> 
            
            <DateColumn>
              <DateText>{record.date}</DateText>
              <AgoText>{record.ago}</AgoText>
            </DateColumn>
            
            <CardContent>
              <Summary>
                <span>👤 Report Summary</span>
                {record.reportSummary}
              </Summary>
              
              <DownloadLink href={record.downloadLink} download>
                <FiDownload />
                PDF Download
              </DownloadLink>
            </CardContent>
          </RecordItem>
        ))}
      </TimelineWrapper>
    </ReportContainer>
  );
};

export default SkinReport;