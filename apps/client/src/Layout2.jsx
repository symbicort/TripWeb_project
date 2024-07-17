import { Outlet } from 'react-router-dom'; 
import Header from './components/Header';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Layout = () => {
  return (
    <Container maxWidth="100%">
      <Box sx={{ position: 'relative' }}>
          <Header/>
          <Box sx={{ bgcolor: '#cfe22fc', width : '100%', height: '100vh', margin: '0', padding : '0'}}>
            <Outlet />
          </Box>
      </Box>
    </Container>
  );
};

export default Layout;
