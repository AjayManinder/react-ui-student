import React, {useState} from "react";
import "./header.css";
import { Link, Navigate } from "react-router-dom";

const Header = ({ authenticated, setAuthenticated }) => {

  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  };

  return (
    <div className="container">
      <div className="innerContainer">
        <div className="Main_Head_Logo">
          <div>
            <img
              className="Header_Logo"
              src="https://logodix.com/logo/871287.png"
              alt="Logo"
            />
          </div>
          <div className="Main_header"> Student Portal </div>
        </div>
        <div className="Links">
          <Link className="Header_Links" to="/">
            HOME
          </Link>
          {authenticated && (
            <>
              <Link className="Header_Links" to="/table">
                TABLE
              </Link>
              <button className="Header_Links" onClick={handleLogout}>
                LOGOUT
              </button>
            </>
          )}
          {!authenticated && (
            <Link className="Header_Links" to="/login">
              LOGIN
            </Link>
          )}
        </div>
      </div>
      {/* Conditional rendering of Navigate component */}
      {authenticated && <Navigate to="/table" />}
    </div>
  );
};

export default Header;
