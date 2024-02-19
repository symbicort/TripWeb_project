import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {authUiActions} from '../store/features/authUi'
import {useSelector, useDispatch} from 'react-redux';
import logo from '../assets/logo.png';

import { Link } from "react-router-dom";

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 1rem; */
  background-color: #fff;
  color: #000;
  z-index: 1000;
  height : 60px ;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1rem;
  img {
    width: 30px;
    height: auto;
  }
`;

const MenuIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const CloseButton = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  animation: ${(props) => (props.isOpen ? slideIn : slideOut)} 0.3s ease-in-out;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 80%;
    height: 100vh;
    position: absolute;
    top: 0;left: 0;
    background-color: #333;
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
    z-index: 1;
  }
`;

const MenuItem = styled(Link)`
  padding: 1rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #71C2EB;
  }
`;

const LoginButton = styled(Link)`
  cursor: pointer;
  padding: 1rem;
  border-left: 1px solid #555;

  @media (max-width: 768px) {
    border-left: none;
    border-top: 1px solid #555;
  }

  &:hover {
    background-color: #555;
  }
`;

const Icon = styled.span`
  font-family: 'Arial', sans-serif;
`;

const Header = () => {
  const dispatch = useDispatch()
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isAuth = useSelector((state)=>state.authUi.isAuthState);
  // const isLogin = useSelector((state)=>state.login.isLoggedIn)


  const logoutHandler = (e) =>{
    e.preventDefault();
    
    dispatch(authUiActions.logout())
  }


  return (
    <NavContainer>
        <MenuIcon onClick={toggleMenu}>
          <Icon>&#9776;</Icon>
        </MenuIcon>
     
      <Logo to='/'>
        <img src={logo} alt="Logo" />
      </Logo>
      <Menu isOpen={menuOpen}>
        {menuOpen && (
          <CloseButton onClick={toggleMenu}>
            <Icon>&times;</Icon>
          </CloseButton>
        )}
        <MenuItem>여행</MenuItem>
        <MenuItem>일정만들기</MenuItem>
        <MenuItem>일정공유</MenuItem>
        <MenuItem to="/community">커뮤니티</MenuItem>
      </Menu>
      {
        isAuth ? (
          <nav>
          <ul>
            <li>
              <a href='/'>My Products</a>
            </li>
            <li>
              <a href='/'>My Sales</a>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </nav>
       ) : <LoginButton to="/login">Login</LoginButton> 
      }
      
    </NavContainer>
  );
};

export default Header;
