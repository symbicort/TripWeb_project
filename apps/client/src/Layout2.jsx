import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Layout2 = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header sx={{ position: 'sticky', top: 0, zIndex: 1000 }} />
        <Box sx={{ flexGrow: 1, flexDirection: 'column',display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};

export default Layout2;
