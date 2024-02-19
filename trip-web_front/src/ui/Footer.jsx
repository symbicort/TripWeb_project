import React from 'react';
import styled from 'styled-components';

import facebook from '../assets/facebook.png'
import github from '../assets/github.png'
import instargram from '../assets/instargram.png'
import linkedIn from '../assets/linkedIn.png'

const FooterContainer = styled.footer`
  background-color: #F7F8F9;
  color: black;
  padding: 20px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LogoFoot = styled.div`
  img {
    width: 150px;
    height: auto;
  }

  p {
    margin-top: 10px;
    color: black; 
  }
`;

const SNS = styled.div`
  img {
    width: 30px;
    height: auto;
    margin-right: 10px;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterBottomLeft = styled.div`
  p {
    margin-bottom: 10px;
    text-align: left;
  }

  p {
    color: black;
  }
`;

const FooterBottomRight = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 5px;

      a {
        color: black; 
        text-decoration: none;
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterInner>
        <FooterTop>
          <LogoFoot>
            <a href="/"><img src="/static/css/img/logo2.png" alt="logo" /></a>
            <p>개인정보처리방침 | 이용약관 | 고객센터 환불정책</p>
          </LogoFoot>
          <SNS>
            <a href="#" target="_blank" title="">
              <img src={instargram} alt="Instagram" />
            </a>
            <a href="#" target="_blank" title="">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="#" target="_blank" title="">
              <img src={linkedIn} alt="Linkedin" />
            </a>
            <a href="https://github.com/ghtjd1358/hypeboy.git" target="_blank" title="github" className="github">
              <img src={github} alt="Github" />
            </a>
          </SNS>
        </FooterTop>
        <FooterBottom>
          <FooterBottomLeft>
            <p>(주)제2조 | 조장 : God 정 원 | 사업자 번호 : 010-9500-2663 | 코딩판매업 : 제 2022-서울마포-1241호</p>
            <p>Git <i className="bi bi-git"></i> : https://github.com/symbicort/TripWeb_project.git | 전화 : 070-9500-2663</p>
            <p>주소 : 서울특별시 마포구 숭문 4길 6 스트레틱스 염리 사옥 4층</p>
            <p>@ 2024 KDT PROJECT</p>
          </FooterBottomLeft>
          <FooterBottomRight>
            <ul className="footer-ul">
              <li><a href="/computer">여행</a></li>
              <li><a href="/kiosk">일정계획</a></li>
              <li><a href="/culture">일정공유</a></li>
              <li><a href="/community">커뮤니티</a></li>
            </ul>
          </FooterBottomRight>
        </FooterBottom>
      </FooterInner>
    </FooterContainer>
  );
};

export default Footer;
