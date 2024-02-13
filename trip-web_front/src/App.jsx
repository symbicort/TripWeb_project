import { Route, Routes } from 'react-router-dom';
import Main from './page/Main';
import Login from './page/Login';
import GlobalStyles from './styles/GlobalStyles';
import SignUp from './page/SignUp';
import MyPage from './page/MyPage';
import CommunityBoard from './page/CommunityBoard';

function App() {
 

  return (
    <>
    <GlobalStyles/>
      <Routes>
      <Route path="/" element = {<Main />} />

      <Route path="/login" element = {<Login/>} />
      <Route path="/signUp" element = {<SignUp/>} />
      <Route path='/myPage' element = {<MyPage/>}/>
      <Route path='/community' element = {<CommunityBoard/>}/>

      </Routes>
    </>
    
      
  );
}

export default App;
