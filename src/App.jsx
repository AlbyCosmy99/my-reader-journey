import { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Login from './components/Intro/Login/Login'
import Home from './components/Intro/IsLogged/Home/Home'

function App() {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('jwt')) {
      setIsLogged(true)
    }
    else {
      setIsLogged(false)
    }
  }, [])
  return (
    <div id='app-container'>
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
