import { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Login from './components/Intro/Login/Login'
import Home from './components/Intro/IsLogged/Home/Home'
import { jwtDecode } from 'jwt-decode';

function App() {
  const [isLogged, setIsLogged] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const payload = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (payload.exp < currentTime) {    
          localStorage.removeItem('jwt')
          setIsLogged(false);
        } else {
          setIsLogged(true);
        }
      } catch (error) {
        console.error("Failed to decode token", error);
        localStorage.removeItem('jwt')
        setIsLogged(false);
      }
    } else {
      localStorage.removeItem('jwt')
      setIsLogged(false);
    }
  }, []);
  
  return (
    <div id='app-container' style={{backgroundColor: '#9A7872'}}>
      <div id='content-container'>
        {isLogged ? <Home/> : <Login/>}
      </div>
      <div id='footer-container'>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
