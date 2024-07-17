import { Outlet } from 'react-router-dom'; 
import Header from './components/Header';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FloatingButton from './components/FloatingButton';
const Layout = () => {
  return (
    // 메인페이지만 사용
    <Container maxWidth="100%">
      <Box>
          <Header/>
          <Box sx={{ bgcolor: '#cfe22fc', width : '100%', height: '100vh', margin: '0', padding : '0'}}>
            <Outlet/>
          </Box>
          <FloatingButton/>
      </Box>
    </Container>
  );
};

export default Layout;
