import './App.css';
import {  Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Table from './pages/Table';
import Header from './Header/header';
// import Footer from './footer/footer';
function App() {
  return (
   <>
     <Header/>
     <Routes>
      
        <Route exact path="/" element=<Home /> />
       <Route path="/table" element=<Table /> />
        

 
    </Routes>
    {/* <Footer/> */}
    </>
   
  );
}

export default App;
