import './App.css';
import {BrowserRouter as Router, Routes,Route, Navigate} from 'react-router-dom'
import { Home } from './pages/Home';
import { Calendar } from './pages/Calendar';
import { Login } from './pages/Login';
import { Navbar } from './components/Navbar';
import { Signup } from './pages/Signup';
import { useEffect, useState } from 'react';
// import { Error } from './pages/Error';
function App() {
  const [isAuth, setIsAuth] = useState(false);
  // const location = useLocation()
  useEffect(()=>{
    // console.log(location);
  })
  return (
    <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}/>
        <Route path='/signup' element={<Signup setIsAuth={setIsAuth}/>}/>
        <Route path='/calendar' element={
        isAuth ? (
          <Calendar />
        ):(
          <Navigate to={'/login'} />
        )
        }/>
      </Routes>
    </Router>
  );
}

export default App;
