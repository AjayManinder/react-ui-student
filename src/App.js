import React, { useState } from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Table from './pages/Table';
import Header from './Header/header';
import Login from './pages/Login';
import Footer from './Footer/footer';
import './App.css';

const App=()=> {
  const [authenticated, setAuthenticated] = useState(false);
  return (
   <div className='appContainer'>
      <Header authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <div className='containerApp'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/table"
          element={authenticated ? <Table /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<Login setAuthenticated={setAuthenticated} />}
        />
      </Routes>
      </div>
    <Footer/>
    </div>
   
  );
}

export default App;
