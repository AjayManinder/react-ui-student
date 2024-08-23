import React, { useState, useEffect, useContext } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../axiosConfig";
import { IoLogOut } from "react-icons/io5";
import { FiAlignRight } from "react-icons/fi";
import { Context } from "../App";

// authenticated, setAuthenticated are props passed from App.js, which are used to set the authenticated state
const Header = ({ authenticated, setAuthenticated }) => {
  // Using the Context hook to access shared state
  const [userDetails, setUserDetails] = useContext(Context);
  // State variables to track loading state and dropdown menu state
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Effect hook to fetch user details when authentication status changes
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Retrieving JWT token from localStorage
        const token = localStorage.getItem("token");
        // Checkin if there's a token and the user is authenticated:
        if (token && authenticated) {
          // These lines decode the JWT token using the jwtDecode function and extract the user_id property from the decoded token.
          // The optional chaining operator (?.) is used to avoid errors if decodedToken is null or undefined.
          const decodedToken = jwtDecode(token);
          const userId = decodedToken?.user_id;
          // This line checks if the userId is truthy, indicating that a valid user ID was successfully extracted from the decoded token.
          if (userId) {
            // This line sends a GET request to the server endpoint /users/${userId} to fetch user details corresponding to the userId extracted from the JWT token.
            // It uses Axios, an HTTP client for the browser and Node.js.
            const userResponse = await axiosInstance.get(`/users/${userId}`);
            // Fetch details based on the user's role
            // This line extracts the roleName property from the role_id object in the response data obtained from fetching user details.
            const role = userResponse.data?.role_id?.roleName;
            // These lines conditionally send additional requests to fetch specific details based on the user's role (student, teacher, or admin).
            //  The endpoint URL includes the userId parameter to fetch details related to the specific user.
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
              // Once both promises are resolved, Promise.all() returns an array containing the resolved values of each promise in the same order as the input array.
              // user will contain the resolved value of userResponse, and details will contain the resolved value of detailsResponse.
              // This allows us to access the data from both responses conveniently.
              const [user, details] = await Promise.all([
                userResponse,
                detailsResponse,
              ]);
              // Here, userDetail is assigned the value of user.data, which contains the user details fetched from the server response.
              const userDetail = user.data;

              // userSpecificDetails is assigned the specific details corresponding to the user's role.
              // This is determined by finding the details object in the details.data array where the user_id._id matches the _id of the user retrieved earlier.
              const userSpecificDetails = details.data.find(
                (detail) => detail.user_id._id === userDetail._id
              );

              console.log("User details:", userDetail);
              console.log(`${role} details in header:`, userSpecificDetails);

              // If userDetail and userSpecificDetails are truthy, the user details are combined into a single object
              //
              // This line logs the role and name of the user to the console. It uses optional chaining (?.) to access nested properties safely.and set as the value of userDetails using the setUserDetails function.
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
                // This line logs the role and name of the user to the console. It uses optional chaining (?.) to access nested properties safely.
                console.log(
                  `role - name in header ${role} / ${
                    userDetails?.student?.name ??
                    userDetails?.teacher?.teacherName ??
                    `Admin - ${userDetails?.admin?.adminName}`
                  }`
                );
              } else {
                // If either the user or specific details are not found or there's a mismatch in user ID, an error message is logged,
                // and setUserDetails(null) is called to reset the user details state.
                console.error(`User or ${role} not found or user_id mismatch`);
                setUserDetails(null);
              }
            } else {
              // If details are not found for the user's role, an error message is logged, and setUserDetails(null) is called.
              console.error(`Details not found for role: ${role}`);
              setUserDetails(null);
            }
          } else {
            // If the user ID is not found in the decoded token, an error message is logged, and setUserDetails(null) is called.
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  // Check if the user is already authenticated
  useEffect(() => {
    // Retrieve Token and Login Timestamp:
    const token = localStorage.getItem("token");
    console.log("Token in localStorage:", token);
    const loginTimestamp = localStorage.getItem("loginTimestamp");
    console.log("Login timestamp in localStorage:", loginTimestamp);
    // Check Token and Login Timestamp Existence:
    if (token && loginTimestamp) {
      const currentTime = Date.now();
      const sessionDuration = 60 * 60 * 1000; // 60 minutes in milliseconds
      // If the difference between the current time and the login timestamp exceeds the session duration (10 minutes in this case), it indicates that the session has expired.
      if (currentTime - parseInt(loginTimestamp) > sessionDuration) {
        // Session has expired, clear localStorage and set authenticated to false
        localStorage.removeItem("token");
        localStorage.removeItem("loginTimestamp");
        setAuthenticated(false);
        navigate("/login");
        return console.error("Session expired. Please login again.");
      } else {
        // Session is still valid, set authenticated to true
        setAuthenticated(true);
      }
    } else {
      // No token found, set authenticated to false
      setAuthenticated(false);
    }
  }, [setAuthenticated, navigate]); //This dependency array ensures that the effect runs whenever either setAuthenticated or navigate changes.

  // This function is called when the user clicks on the logout button.
  // It removes the JWT token from localStorage, sets the authenticated state to false, clears user details, and navigates the user to the login page.
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTimestamp");
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
              {/* Links based on user role and authentication status   */}
              {authenticated && userDetails ? (
                <>
                  {userDetails.role_id.roleName === "student" && (
                    <>
                      <Link
                        className="Header_Links"
                        to="/studentInfo"
                        onClick={handleLinkClick}
                      >
                        Student Info
                      </Link>
                      <Link
                        className="Header_Links"
                        to="/subjectRegistration"
                        onClick={handleLinkClick}
                      >
                        Subject Registration
                      </Link>
                    </>
                  )}
                  {userDetails.role_id.roleName === "admin" && (
                    <>
                    <Link
                      className="Header_Links"
                      to="/table"
                      onClick={handleLinkClick}
                    >
                      TABLE
                    </Link>
                     <Link
                     className="Header_Links"
                     to="/users"
                     onClick={handleLinkClick}
                   >
                     Users
                   </Link>
                 </>
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
                    <>
                      <Link
                        className="Header_Links"
                        to="/studentInfo"
                        onClick={handleLinkClick}
                      >
                        Student Info
                      </Link>
                      <Link
                        className="Header_Links"
                        to="/subjectRegistration"
                        onClick={handleLinkClick}
                      >
                        Subject Registration
                      </Link>
                    </>
                  )}
                  {userDetails.role_id.roleName === "admin" && (
                    <>
                      <Link
                        className="Header_Links"
                        to="/table"
                        onClick={handleLinkClick}
                      >
                        TABLE
                      </Link>

                      <Link
                        className="Header_Links"
                        to="/users"
                        onClick={handleLinkClick}
                      >
                        Users
                      </Link>
                    </>
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
