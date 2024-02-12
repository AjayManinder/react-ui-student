import React, { useState, useEffect, useContext } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../axiosConfig";
import { IoLogOut } from "react-icons/io5";
import { FiAlignRight } from "react-icons/fi";
import { Context } from "../App";

const Header = ({ authenticated, setAuthenticated }) => {
  const [userDetails, setUserDetails] = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token && authenticated) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken?.user_id;

          if (userId) {
            // Fetch user details based on user_id
            const userResponse = await axiosInstance.get(`/users/${userId}`);
            // Fetch details based on the user's role
            const role = userResponse.data?.role_id?.roleName;

            let detailsResponse;
            if (role === "student") {
              detailsResponse = await axiosInstance.get(
                `/students?user_id=${userId}`
              );
            } else if (role === "teacher") {
              detailsResponse = await axiosInstance.get(
                `/teachers?user_id=${userId}`
              );
            } else if (role === "admin") {
              detailsResponse = await axiosInstance.get(
                `/admins?user_id=${userId}`
              );
            }

            if (detailsResponse) {
              // Wait for both responses
              const [user, details] = await Promise.all([
                userResponse,
                detailsResponse,
              ]);

              const userDetail = user.data;
              const userSpecificDetails = details.data.find(
                (detail) => detail.user_id._id === userDetail._id
              );

              console.log("User details:", userDetail);
              console.log(`${role} details in header:`, userSpecificDetails);

              if (userDetail && userSpecificDetails) {
                // Combine user and specific details
                const userDetails = {
                  ...userDetail,
                  [role]: {
                    ...userSpecificDetails,
                  },
                };
                console.log("Combined user details:", userDetails);
                setUserDetails(userDetails);
                console.log(
                  `role - name in header ${role} / ${
                    userDetails?.student?.name ??
                    userDetails?.teacher?.teacherName ??
                    `Admin - ${userDetails?.admin?.adminName}`
                  }`
                );
              } else {
                console.error(`User or ${role} not found or user_id mismatch`);
                setUserDetails(null);
              }
            } else {
              console.error(`Details not found for role: ${role}`);
              setUserDetails(null);
            }
          } else {
            console.error(
              "User ID not found in the decoded token. Decoded token:",
              decodedToken
            );
            setUserDetails(null);
          }
        } else {
          setUserDetails(null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUserDetails(null);
      }
    };

    fetchUserDetails();
  }, [authenticated]);

  // Check if the user is already authenticated
  useEffect(() => {
    if (localStorage.getItem("token")) {
      // If token exists, set authenticated state to true
      setAuthenticated(true);
    }
  }, [setAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    setUserDetails(null);
    navigate("/login");
  };

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLinkClick = () => {
    setDropdownOpen(false);
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
          <div className="Main_header"> College Portal </div>
        </div>
        <div className="Links">
          {/* Dropdown button for mobile view */}
          <div
            className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="dropbtn" onClick={handleDropdown}>
              <FiAlignRight />
            </button>
            {/* Dropdown content */}
            <div
              className={`dropdown-content ${dropdownOpen ? "show" : ""}`}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link className="Header_Links" to="/" onClick={handleLinkClick}>
                HOME
              </Link>
              {authenticated && userDetails ? (
                <>
                  {userDetails.role_id.roleName === "student" && (
                    <Link
                      className="Header_Links"
                      to="/studentInfo"
                      onClick={handleLinkClick}
                    >
                      Student Info
                    </Link>
                  )}
                  {userDetails.role_id.roleName === "admin" && (
                    <Link
                      className="Header_Links"
                      to="/table"
                      onClick={handleLinkClick}
                    >
                      TABLE
                    </Link>
                  )}
                  {userDetails.role_id.roleName === "teacher" && (
                    <Link
                      className="Header_Links"
                      to="/table"
                      onClick={handleLinkClick}
                    >
                      TABLE
                    </Link>
                  )}
                  {userDetails.role_id.roleName === "admin" && (
                    <Link
                      className="Header_Links"
                      to="/users"
                      onClick={handleLinkClick}
                    >
                      Users
                    </Link>
                  )}
                  {/* User details and logout button */}
                  <div className="Header-Userdetails">
                    <div className="Header_Links_User">
                      <strong>
                        {userDetails.student?.name
                          ? `Student / ${userDetails.student.name}`
                          : userDetails.teacher?.teacherName
                          ? `Teacher / ${userDetails.teacher.teacherName}`
                          : userDetails.admin?.adminName
                          ? `Admin / ${userDetails.admin.adminName}`
                          : "No Role"}
                      </strong>
                    </div>
                    <div
                      className="Header_Links_Button"
                      onClick={() => {
                        handleLogout();
                        handleLinkClick();
                      }}
                    >
                      <strong>
                        <IoLogOut />
                      </strong>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  className="Header_Links"
                  to="/login"
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
          {/* Links for desktop view */}
          <div className="desktop-links">
            <div className="Links">
              <Link className="Header_Links" to="/" onClick={handleLinkClick}>
                HOME
              </Link>
              {authenticated && userDetails && (
                <>
                  {userDetails.role_id.roleName === "student" && (
                    <Link
                      className="Header_Links"
                      to="/studentInfo"
                      onClick={handleLinkClick}
                    >
                      Student Info
                    </Link>
                  )}
                  {userDetails.role_id.roleName === "admin" && (
                    <Link
                      className="Header_Links"
                      to="/table"
                      onClick={handleLinkClick}
                    >
                      TABLE
                    </Link>
                  )}
                  {userDetails.role_id.roleName === "teacher" && (
                    <Link
                      className="Header_Links"
                      to="/table"
                      onClick={handleLinkClick}
                    >
                      TABLE
                    </Link>
                  )}
                  {userDetails.role_id.roleName === "admin" && (
                    <Link
                      className="Header_Links"
                      to="/users"
                      onClick={handleLinkClick}
                    >
                      Users
                    </Link>
                  )}
                  {/* User details and logout button */}
                  <div className="Header-Userdetails">
                    <div className="Header_Links_User">
                      <strong>
                        {userDetails.student?.name
                          ? `Student / ${userDetails.student.name}`
                          : userDetails.teacher?.teacherName
                          ? `Teacher / ${userDetails.teacher.teacherName}`
                          : userDetails.admin?.adminName
                          ? `Admin / ${userDetails.admin.adminName}`
                          : "No Role"}
                      </strong>
                    </div>
                    <div
                      className="Header_Links_Button"
                      onClick={() => {
                        handleLogout();
                        handleLinkClick();
                      }}
                    >
                      <strong>
                        <IoLogOut />
                      </strong>
                    </div>
                  </div>
                </>
              )}
              {!authenticated && (
                <Link
                  className="Header_Links"
                  to="/login"
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
