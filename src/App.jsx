import './App.css';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div id='app-container'>
      <NavBar/>
      <div id='content-container'>
        <Home/>
      </div>
      <div id='footer-container'>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
