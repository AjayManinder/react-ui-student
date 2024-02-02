import React, { useState, useEffect } from "react";
import "./header.css";
import { Link, Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axiosInstance from "../axiosConfig";
import { IoLogOut } from "react-icons/io5";

const Header = ({ authenticated, setAuthenticated }) => {
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
            // Fetch details based on the user's role
            const role = userResponse.data?.role_id?.roleName;
    
            let detailsResponse;
            if (role === 'student') {
              detailsResponse = await axiosInstance.get(`/students?user_id=${userId}`);
            } else if (role === 'teacher') {
              detailsResponse = await axiosInstance.get(`/teachers?user_id=${userId}`);
            } else if (role === 'admin') {
              detailsResponse = await axiosInstance.get(`/admins?user_id=${userId}`);
            }
    
            if (detailsResponse) {
              // Wait for both responses
              const [user, details] = await Promise.all([userResponse, detailsResponse]);
    
              const userDetail = user.data;
              const userSpecificDetails = details.data.find(detail => detail.user_id._id === userDetail._id);
    
              console.log('User details:', userDetail);
              console.log(`${role} details in header:`, userSpecificDetails);
    
              if (userDetail && userSpecificDetails) {
                // Combine user and specific details
                const userDetails = {
                  ...userDetail,
                  [role]: {
                    ...userSpecificDetails,
                  },
                };
                console.log('Combined user details:', userDetails);
                setUserDetails(userDetails);
              } else {
                console.error(`User or ${role} not found or user_id mismatch`);
                setUserDetails(null);
              }
            } else {
              console.error(`Details not found for role: ${role}`);
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
  <strong>{userDetails.student && userDetails.student.name || userDetails.teacher && userDetails.teacher.teacherName || userDetails.admin && userDetails.admin.adminName }</strong>
  
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
