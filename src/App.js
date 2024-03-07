import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Table from "./pages/Table";
import Header from "./Header/header";
import Login from "./pages/Login";
import Footer from "./Footer/footer";
import UsersTable from "./Components/StudentTable/userTable/usersTable";
import StudentInfo from "./Components/StudentTable/studentInfo/studentInfo";
import SubjectRegistration from "./Components/StudentTable/subjectsRegistration/SubjectsRegistration";
import "./App.css";

export const Context = React.createContext();

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  return (
    // Providing the user details context to all child components
    <Context.Provider value={[userDetails, setUserDetails]}>
      <div className="appContainer">
        <Header
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
        <div className="containerApp">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/table"
              element={authenticated ? <Table /> : <Login />}
            />
            <Route
              path="/login"
              element={<Login setAuthenticated={setAuthenticated} />}
            />
            <Route
              path="/users"
              element={authenticated ? <UsersTable /> : <Login />}
            />
            <Route
              path="/studentInfo"
              element={authenticated ? <StudentInfo /> : <Login />}
            />
             <Route
              path="/subjectRegistration"
              element={authenticated ? <SubjectRegistration /> : <Login />}
            />
            {/* Add more routes here as needed */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Context.Provider>
  );
};

export default App;
