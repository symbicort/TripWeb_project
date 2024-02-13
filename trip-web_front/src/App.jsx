import { Route, Routes } from 'react-router-dom';
import Main from './page/MainPage';
import GlobalStyles from './styles/GlobalStyles';
import SignUpPage from './page/SignUpPage';
import MyPage from './page/MyPage';
import CommunityBoard from './page/CommunityBoard';
import LoginPage from './page/LoginPage';

function App() {
 

  return (
    <>
    <GlobalStyles/>
      <Routes>
      <Route path="/" element = {<Main />} />

      <Route path="/login" element = {<LoginPage/>} />
      <Route path="/signUp" element = {<SignUpPage/>} />
      <Route path='/myPage' element = {<MyPage/>}/>
      <Route path='/community' element = {<CommunityBoard/>}/>

      </Routes>
    </>
    
      
  );
}

export default App;
