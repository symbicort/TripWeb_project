import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Mainpage from './pages/MainPage';


const App = () => {
  return (
        <Routes>
          <Route element = {<Layout/>}>
          <Route path='/' element = {<Mainpage/>}/>
          <Route path='/list' element = {<Mainpage/>}/>
          </Route>
        </Routes>
      
  );
};

export default App;
