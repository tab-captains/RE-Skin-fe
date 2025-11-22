import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh; 
    font-size: 24px;
    font-weight: bold;
    color: #1e2a55;
    background-color: #f0f3f8;
`;

const ProfilePage = () => {
    return (
        <Container>
            이곳은 회원정보 페이지 입니다.
        </Container>
    );
};

export default ProfilePage;