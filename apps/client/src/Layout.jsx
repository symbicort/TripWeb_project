 import { Outlet } from 'react-router-dom'; 
import Header from './components/Header';
import Container from '@mui/material/Container';

const Layout = () => {
  return (
      <Container maxWidth="xl">
      <Header/>
          <Outlet/>
      </Container>
  );
};

export default Layout;
