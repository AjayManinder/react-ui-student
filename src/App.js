import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Table from './pages/Table';
import Header from './Header/header';
import Login from './pages/Login';
import Footer from './Footer/footer';
import UsersTable from './Components/StudentTable/userTable/usersTable';
import StudentInfo from './Components/StudentTable/studentInfo/studentInfo';
import './App.css';

export const Context = React.createContext();

const App=()=> {
  const [authenticated, setAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
 
  return (
    <Context.Provider value={[userDetails, setUserDetails]}>
    <div className='appContainer'>
      <Header authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <div className='containerApp'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/table"
            element={authenticated &&  <Table />}
          />
          <Route
            path="/login"
            element={<Login setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/users"
            element={authenticated && <UsersTable /> }
          />
          <Route
            path="/studentInfo"
            element={authenticated ? <StudentInfo /> :<Login />}
          />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
      <Footer />
    </div>
  </Context.Provider>
   
  );
}

export default App;
