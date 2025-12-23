import React, { useState } from 'react'; 
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom"; 
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import colors from "../../common/colors";
import { useAuth } from "../../auth/context/AuthContext"; 
import { SIDEBAR_CATEGORIES } from "../data/sideBarCategories";


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
    height: 100vh;

    background-color: white;
    color: #333;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    z-index: 1000;

    padding-top: 20px; 
    padding-bottom: 120px;
    overflow-y: auto;
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
    font-weight: 500;
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

const CloseArrow = styled(IoIosArrowForward)`
  margin-left: auto; 
  transform: rotate(180deg);
  cursor: pointer;
  color: #aaa;
  transition: all 0.2s ease;

  &:hover {
    color: #333;
    transform: translateX(-4px) rotate(180deg);
  }
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

const SubCategoryWrapper = styled.div`
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    max-height: 0; 
    ${props => props.$isOpen && css`
        max-height: 500px; 
    `}
`;

const ToggleCategoryTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
    color: #333;
    font-size: 0.9em;
    font-weight: 500;
    cursor: pointer;
    border-radius: 4px;
    margin: 2px 5px;

    &:hover {
        background-color: #eee;
    }
`;

const SubCategoryLink = styled(Link)`
    display: block;
    padding: 5px 20px 5px 40px; 
    color: #555;
    text-decoration: none;
    font-size: 0.9em;
    
    &:hover {
        background-color: #f5f5f5;
        color: #000;
    }
`;

const CategoryArrow = styled(IoIosArrowForward)`
  transition: transform 0.25s ease, color 0.2s ease;
  color: #aaa;
  transform: rotate(90deg);

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: rotate(270deg);
      color: #333;
    `}
`;

const Sidebar = ({ isOpen, toggleSidebar, user }) => {
    const { isLoggedIn } = useAuth();
    const [openCategory, setOpenCategory] = useState(null);

    const handleToggle = (key) => {
        setOpenCategory(openCategory === key ? null : key);
    };

    return (
        <>
            <Overlay $isOpen={isOpen} onClick={toggleSidebar} />
            <SidebarContainer $isOpen={isOpen} style={{ marginBottom: "50px" }}>
                
                <SidebarHeader>
                    <FaUserCircle size={26} style={{ marginRight: '14px', color: '#666' }} />
                    <span style={{ color: '#333', fontWeight: 'bold' }}>
                      {user?.username ? user.username : "Guest"}
                    </span>
                    <CloseArrow size={22} onClick={toggleSidebar} />
                </SidebarHeader>
                        <SidebarCategoryTitle style={{ color: colors.primary }}>관리자 메뉴</SidebarCategoryTitle>
                        <SidebarLink 
                            to="/admin/product/write" 
                            onClick={toggleSidebar}
                            style={{ color: colors.primary, fontWeight: 'bold' }}
                        >
                             제품 등록하기(관리자전용)
                        </SidebarLink>

                <SidebarCategoryTitle>바로가기</SidebarCategoryTitle>
                <SidebarLink to="/analysisOverview" onClick={toggleSidebar}>AI 피부 분석</SidebarLink>
                <SidebarLink to="/skinreport" onClick={toggleSidebar}>스킨 리포트</SidebarLink>
                <SidebarLink to="/routineSelect" onClick={toggleSidebar}>맞춤 세안 루틴</SidebarLink>
                <SidebarLink to="/skin-survey" onClick={toggleSidebar}>피부 타입 테스트</SidebarLink>
                <SidebarLink to="/community" onClick={toggleSidebar}>커뮤니티</SidebarLink>
                <SidebarLink to="/infoboard" onClick={toggleSidebar}>게시판 정보</SidebarLink>

                <SidebarCategoryTitle>제품 카테고리</SidebarCategoryTitle>
                {SIDEBAR_CATEGORIES.map((category) => (
                    <div key={category.key}>
                        {category.subCategories ? (
                            <>
                                <ToggleCategoryTitle onClick={() => handleToggle(category.key)}>
                                    <span>{category.title}</span>
                                    <CategoryArrow
                                        size={16}
                                        $isOpen={openCategory === category.key}
                                    />
                                </ToggleCategoryTitle>

                                <SubCategoryWrapper $isOpen={openCategory === category.key}>
                                    {category.subCategories.map((sub) => (
                                        <SubCategoryLink
                                            key={sub.type}
                                            to={`/product/${sub.type.toLowerCase()}`}
                                            onClick={toggleSidebar}
                                        >
                                            {sub.name}
                                        </SubCategoryLink>
                                    ))}
                                </SubCategoryWrapper>
                            </>
                        ) : (
                            <SidebarLink
                                to={`/product/${category.type.toLowerCase()}`}
                                onClick={toggleSidebar}
                                style={{
                                    fontWeight: 500,
                                    fontSize: '0.9em',
                                }}
                            >
                                {category.title}
                            </SidebarLink>
                        )}
                    </div>
                ))}
            </SidebarContainer>
        </>
    );
};

const Navbar = () => {
    const { isLoggedIn, user, logout } = useAuth(); 
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); 
    };
    
    const handleLogout = () => {
        logout(); 
        navigate('/'); 
    };
    
    const handleProfileClick = () => {
        navigate('/profile');
    };
    
    return ( 
        <>
            <Nav>
                <LeftGroup> 
                    <Menu onClick={toggleSidebar} />
                    <Logo to='/'>Re:Skin</Logo>
                </LeftGroup>
                <RightGroup>
                    <NavButton to='/community'>커뮤니티</NavButton>
                    <NavButton to='/skinreport'>스킨 리포트</NavButton>
                    <NavButton to='/analysisOverview'>피부 분석</NavButton>
                    
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
    );
};

export default Navbar;
