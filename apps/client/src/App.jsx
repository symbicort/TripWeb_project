import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Layout2 from './Layout2';
import Mainpage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Mypage from './pages/Maypage';
import UserMypage from './pages/UserMypage';



const App = () => {
  return (
    <>
        <Routes>
          <Route element = {<Layout/>}>
            <Route path='/' element = {<Mainpage/>}/>
          </Route>

          <Route path='*' element = {<Mainpage/>}/>
          <Route path='/login' element = {<LoginPage/>}/>
          <Route path='/signup' element = {<SignupPage/>}/>
          <Route path='/mypage' element = {<Mypage/>}/>
          <Route path='/usermypage' element = {<UserMypage/>}/>
     
          <Route element = {<Layout2/>}>
            
          </Route>
        </Routes>
      
      </>
  );
};

export default App;
