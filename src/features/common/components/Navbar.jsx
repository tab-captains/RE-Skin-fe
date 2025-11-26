import React, { useState } from 'react'; 
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom"; 
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle, FaHome, FaSearch } from "react-icons/fa";
import { FaUsers, FaChartLine, FaClipboardList } from "react-icons/fa"; 
import colors from "../../common/colors";
import { useAuth } from "../../auth/context/AuthContext"; 


const Nav = styled.nav`
    display: flex;
    align-items: center;
    background-color: ${colors.primary};
    width: 100%;
    height: 45px;
    padding: 0 1rem;
`;

const LeftGroup = styled.div`
    display:flex;
    align-items:center;
    gap:1rem;
`;
const RightGroup = styled.div`
    display:flex;
    align-items:center;
    margin-left: auto;
    gap: 1rem;
    padding: 0 2em 0 0;
`;
const Menu = styled(GiHamburgerMenu)`
    font-weight: bold;
    font-size: 1.3em;
    color: ${colors.logo};
    text-decoration: none;
    cursor: pointer;
`;
const Logo = styled(Link)`
    font-weight: bold;
    font-size: 1.3em;
    color: ${colors.logo};
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover {
        text-shadow: 0 2px 4px ${colors.profile};
        transform: translateY(-2px); 
    }
`;

const NavButton = styled(Link)`
    font-size: 0.8em;
    color: white;
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover {
        color: gray;
    }
`;

const LoginButton = styled(Link)`
    border: 1px solid white;
    border-radius: 5px;
    padding: 0.3rem 1.3rem;
    font-size: 0.8em;
    color: white;
    background-color: ${colors.primary};
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover {
        color: ${colors.primary};
        background-color: white;
    }
`;
const UserBox = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: white;
    font-size: 0.9em;
    cursor: pointer; 
`;

const LogoutButton = styled.button`
    border: 1px solid white;
    border-radius: 5px;
    padding: 0.3rem 1rem;
    font-size: 0.8em;
    color: white;
    background-color: transparent;
    cursor: pointer;

    transition: all 0.2s ease;
    &:hover {
        color: ${colors.textAccent};
        opacity: 0.9;
    }
`;

const SidebarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100%;
    background-color: white;
    color: #333;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
    padding-top: 50px; 

    transform: translateX(-100%); 
    ${props => props.$isOpen && css`
        transform: translateX(0);
    `}
`;

const SidebarHeader = styled.div`
    font-size: 1.5em;
    color: #999;
    padding: 0 20px 10px;
    margin-bottom: 5px;
    font-weight: 500;
    display: flex;
    align-items: center;
`;

const SidebarLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 5px 20px;
    color: #333;
    text-decoration: none;
    font-size: 0.9em;
    gap: 8px;
    border-radius: 4px;
    margin: 2px 5px;
    
    &:hover {
        background-color: #eee; 
        color: #000;
    }
`;

const SidebarCategoryTitle = styled.h4`
    font-size: 0.75em;
    color: #999;
    padding: 10px 20px 5px;
    margin: 10px 0 0;
    text-transform: uppercase;
    font-weight: 600;
`;

const Overlay = styled.div`
    ${props => props.$isOpen && css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 999;
    `}
`;

const Sidebar = ({ isOpen, toggleSidebar, user }) => {
    return (
        <>
            <Overlay $isOpen={isOpen} onClick={toggleSidebar} />
            <SidebarContainer $isOpen={isOpen}>
                
                <SidebarHeader>
                    <FaUserCircle size={26} style={{ marginRight: '14px', color: '#666' }} />
                    <span style={{ color: '#333', fontWeight: 'bold' }}>
                      {user?.username ? user.username : "Guest"}
                    </span>
                </SidebarHeader>

                <SidebarLink to="/" onClick={toggleSidebar}>
                    <FaHome size={18} style={{ opacity: 0.8 }}/> Home
                </SidebarLink>

                <SidebarCategoryTitle>페이지</SidebarCategoryTitle>
                
                <SidebarLink to="/community" onClick={toggleSidebar}>
                    <span style={{ marginLeft: '10px' }}>▪</span> 커뮤니티
                </SidebarLink>
                <SidebarLink to="/analysisOverview" onClick={toggleSidebar}>
                    <span style={{ marginLeft: '10px' }}>▪</span> AI 피부 분석
                </SidebarLink>
                <SidebarLink to="/skin-survey" onClick={{toggleSidebar}}>
                    <span style={{ marginLeft: '10px'}}>▪</span> 피부 설문
                </SidebarLink>
                <SidebarLink to="/skinreport" onClick={toggleSidebar}>
                    <span style={{ marginLeft: '10px' }}>▪</span> 스킨 리포트
                </SidebarLink>
                <SidebarLink to="/infoboard" onClick={toggleSidebar}>
                    <span style={{ marginLeft: '10px' }}>▪</span> 게시판 정보
                </SidebarLink>

            </SidebarContainer>
        </>
    );
};

const Navbar = ()=>{
    const { isLoggedIn, user, logout } = useAuth(); 
    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); 
    };
    
    const handleLogout = () => {
        logout(); 
        navigate('/'); 
    }
    
    const handleProfileClick = () => {
        navigate('/profile');
    }
    
    return ( 
        <>
            <Nav>
                <LeftGroup> 
                    <Menu onClick={toggleSidebar} />
                    <Logo to = '/'>Re:Skin</Logo>
                </LeftGroup>
                <RightGroup>
                    <NavButton to = '/skin-survey'>피부설문</NavButton>
                    <NavButton to = '/skinreport'>스킨 리포트</NavButton>
                    <NavButton to = '/infoboard'>게시판 정보</NavButton>
                    <NavButton to = '/community'>커뮤니티</NavButton>
                    <NavButton to ='/analysisOverview'>피부 분석</NavButton>
                    
                    {!isLoggedIn ? (
                        <LoginButton to="/login">로그인 / 회원가입</LoginButton>
                    ) : (
                        <>
                            <UserBox onClick={handleProfileClick}>
                                <FaUserCircle size={20} />
                                <span>{user?.username ? `${user.username}님` : "User님"}</span>
                            </UserBox>
                            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton> 
                        </>
                    )}
                </RightGroup>
            </Nav>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} />
        </>
    )
};

export default Navbar;