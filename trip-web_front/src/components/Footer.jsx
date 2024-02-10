import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: black;
  color: white;
  padding: 20px;
  text-align: center;

  @media (max-width: 768px) {
    /* 모바일 화면 */
    background-color: black;
    color: white;
    padding: 10px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
     <p>이것은 풔다!</p>
      &copy; 2024 Your Company. All rights reserved.
    </FooterContainer>
  );
};

export default Footer;