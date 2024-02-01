import React, { useState, useEffect } from "react";
import "./header.css";
import { Link, Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axiosInstance from "../axiosConfig";
import { IoLogOut } from "react-icons/io5";

const Header = ({ authenticated, setAuthenticated, students }) => {
  console.log('Students prop:', students);
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token && authenticated) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken?.user_id;
    
          if (userId) {
            // Fetch user details based on user_id
            const userResponse = await axiosInstance.get(`/users/${userId}`);
            const user = userResponse.data;
    
            // Fetch student details based on user_id
            const studentResponse = await axiosInstance.get(`/students?user_id=${userId}`);
            console.log('Student response:', studentResponse.data);
            const students = studentResponse.data;
    
            if (user && students.length > 0) {
              // Assuming you want to use the details of the first student for now
              const student = students[0];
    
              // Combine user and student details
              const userDetails = { ...user, student };
              setUserDetails(userDetails);
            } else {
              console.error('User or student not found');
              setUserDetails(null);
            }
          } else {
            console.error('User ID not found in the decoded token. Decoded token:', decodedToken);
            setUserDetails(null);
          }
        } else {
          setUserDetails(null);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setUserDetails(null);
      }
    };
    
    
    fetchUserDetails();
  }, [authenticated]);
  
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    setUserDetails(null);
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

          {authenticated && userDetails ? (
            <>
              <Link className="Header_Links" to="/table">
                TABLE
              </Link>
              <div className="Header-Userdetails">
              
              <div className="Header_Links_User">
  <strong>{userDetails.student && userDetails.student.name}</strong>
</div>

              <div className="Header_Links_Button" onClick={handleLogout}>            
              <strong><IoLogOut /></strong>
              </div>
              </div>
              
            </>
          ) : (
            <>
              <Link className="Header_Links" to="/login">
               Login
              </Link>
              {/* Add the TABLE link here if needed */}
            </>
          )}
        </div>
      </div>
      {/* Conditional rendering of Navigate component */}
      {/* {authenticated && <Navigate to="/table" />} */}
    </div>
  );
};

export default Header;
