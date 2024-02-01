import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import logo from '../assets/logo.png';

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
  padding: 1rem;
  background-color: #333;
  color: #fff;
  z-index: 1000; 
`;

const Logo = styled.div`
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

const MenuItem = styled.div`
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const LoginButton = styled.div`
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
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <NavContainer>
        <MenuIcon onClick={toggleMenu}>
          <Icon>&#9776;</Icon>
        </MenuIcon>
     
      <Logo>
        <img src={logo} alt="Logo" />
      </Logo>
      <Menu isOpen={menuOpen}>
        {menuOpen && (
          <CloseButton onClick={toggleMenu}>
            <Icon>&times;</Icon>
          </CloseButton>
        )}
        <MenuItem>Home</MenuItem>
        <MenuItem>About</MenuItem>
        <MenuItem>Contact</MenuItem>
      </Menu>
      <LoginButton>Login</LoginButton>
    </NavContainer>
  );
};

export default Header;
