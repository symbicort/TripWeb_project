import { Outlet } from 'react-router-dom'; 
import Header from './components/Header';
import Box from '@mui/material/Box';
import FloatingButton from './components/FloatingButton';
import Footer from './components/MainPageComponent/ProductFooter';
const Layout = () => {
  return (
    // 메인페이지만 사용
    <>
      <Box>
          <Header/>
            <Outlet/>
          <FloatingButton/>
      </Box>
       <Footer/>
       </>
  );
};

export default Layout;
