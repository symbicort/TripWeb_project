import { Route, Routes } from 'react-router-dom';
import Main from './page/Main';
import Login from './page/Login';
import GlobalStyles from './styles/GlobalStyles';
import SignUp from './page/SignUp';

function App() {
 

  return (
    <>
    {/* <GlobalStyles/> */}
      <Routes>
      <Route path="/" element = {<Main />} />

      <Route path="/login" element = {<Login/>} />
      <Route path="/signUp" element = {<SignUp/>} />
      </Routes>
    </>
    
      
  );
}

export default App;
