import { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Home from './components/isLogged/Home/Home';

function App() {
  const [isLogged, setIsLogged] = useState(true)
  return (
    <div id='app-container'>
      <NavBar/>
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
