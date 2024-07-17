// Layout.js

import React from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
  /* 다른 로컬 스타일 정의 가능 */
`;

const Layout = ({ children }) => {
  return <div className="layout">{children}</div>;
};

export default Layout;
