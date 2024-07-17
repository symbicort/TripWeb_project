import { Route, Routes } from 'react-router-dom';
import Main from './page/MainPage';
import GlobalStyles from './styles/GlobalStyles';
import SignUpPage from './page/SignUpPage';
import MyPage from './page/MyPage';
import Community from './page/Community';
import LoginPage from './page/LoginPage';
import { useSelector } from 'react-redux';

function App() {
 const isLogin = useSelector((state)=>state.login.isLoggedIn)

  return (
    <>
    <GlobalStyles/>
      <Routes>
      <Route path="/" element = {<Main />} />
      <Route path="/login" element = {<LoginPage/>} />
      <Route path="/signUp" element = {<SignUpPage/>} />
      <Route path='/myPage' element = {<MyPage/>}/>
      <Route path='/community' element = {<Community/>}/>

      </Routes>
    </>
    
      
  );
}

export default App;
