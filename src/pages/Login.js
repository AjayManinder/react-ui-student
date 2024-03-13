import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../axiosConfig";
import Button from "responsive-ui-components/dist/Button";
 // eslint-disable-next-line no-unused-vars
import InputText from "responsive-ui-components/dist/InputText";

const MAX_LOGIN_ATTEMPTS = 5;

//setAuthenticated which we are getting from parent as a prop, which sets the authenticated state in the parent component
const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(MAX_LOGIN_ATTEMPTS);
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [userResponse] = useContext(Context);
  const backgroundImageArray = [
    "https://t4.ftcdn.net/jpg/02/16/47/33/360_F_216473351_FCLq1pZQOBFrgcyPBphKvBd8Z5wjD1dI.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/007/164/537/small/fingerprint-identity-sensor-data-protection-system-podium-hologram-blue-light-and-concept-free-vector.jpg",
    "https://t3.ftcdn.net/jpg/01/22/71/96/360_F_122719641_V0yw2cAOrfxsON3HeWi2Sf4iVxhv27QO.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const navigate = useNavigate(); // Hook for navigation

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (loginAttempts === 0) {
      setDisabled(true);
    }
  }, [loginAttempts]);

  // Function to handle login attempt
  const handleLogin = async () => {
    try {
      setLoading(true);
      if (disabled) {
        console.error("Login disabled. Too many unsuccessful attempts.");
        return;
      }

      // Sending login request to the server
      const response = await axiosInstance.post(`/login`, { email, password });
      //  If the login request is successful, it extracts the token from the response and stores it in the browser's localStorage.
      //It also stores the current login timestamp in localStorage.

      // Upon receiving a response from the server, the response.data contains the payload returned by the server.
      //This payload typically includes the JWT token among other data.
      const { token } = response.data;
      localStorage.setItem("token", token); // Storing token in localStorage
      console.log("Token stored in localStorage:", token);
      const setLocalstorage = localStorage.setItem(
        "loginTimestamp",
        Date.now()
      ); // Storing login timestamp in localStorage
      console.log("loginTimestamp stored in localStorage:", setLocalstorage);
      setAuthenticated(true); // updating the authenticated state in the parent component

      // Fetch user details after successful login
      const userResponse = await axiosInstance.get("/users");
      // using the find method, it searches through the array of user objects to find the user whose email matches the email provided during the login attempt.
      //  The found user object is stored in the user variable.
      const user = userResponse.data.find((u) => u.email === email);

      // Check user role and name
      // This code block checks if a user with the provided email exists (if (user)).
      if (user) {
        //If a user is found, it extracts the role_id and user_id from the user object.
        const { role_id, user_id } = user;
        console.log("User details:", user);

        // Extract roleName from role_id object
        const roleName = role_id?.roleName || "";

        // Set authentication state and user details
        // It sets the authentication state to true using the setAuthenticated function, indicating that the user has been successfully authenticated.
        setAuthenticated(true);

        // This if statement checks if the role of the user (roleName) is equal to "student". If so, it means that the user logging in has the role of a student.
        if (roleName === "student") {
          console.log("role name", roleName);
          // It's assumed that this endpoint retrieves information about the student associated with the provided user_id.
          const studentResponse = await axiosInstance.get(
            `/students?user_id=${user_id}`
          );
          // It assumes that the server returns an array of student objects, and since we're fetching details for a specific user, there should be only one student object corresponding to that user.
          const student = studentResponse.data[0]; // Assuming there is only one student per user

          if (student) {
            // Update state with student name
            // It updates the userDetails state by merging the existing details (prevDetails) with the student's name extracted from the student object.
            setUserDetails((prevDetails) => ({
              ...prevDetails,
              name: student.name,
            }));
          }

          // Redirect based on the role
          setLoading(true);
          navigate("/studentInfo");
        } else if (roleName === "teacher") {
          navigate("/table");
        } else if (roleName === "admin") {
          navigate("/table");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginAttempts((prevAttempts) => prevAttempts - 1);
      setLoading(false);
      setErrorMessage(
        `Invalid email or password. \n${loginAttempts - 1} attempts left.`
      );
    }
  };
  const dothis = () => {
    const newIndex = (currentImageIndex + 1) % backgroundImageArray.length;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="mainLoginContainer">
      <div
        className="LoginHead"
        style={{
          backgroundImage: `url(${backgroundImageArray[currentImageIndex]})`,
        }}
        onDoubleClick={dothis}
      >
        <div className="h2">Log into Portal</div>
      </div>
      <div className="login-container">
        <div className="input-group">
          <label>Email</label>
          <input
            className="input-field"
            type="text"
            value={email}
            placeholder="Enter e-mail Eg: student1@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <div style={{ position: "relative" }}>
            <input
              className="input-field"
              type={showPassword ? "text" : "password"}
              // This attribute binds the value of the input field to the password state variable.
              // This ensures that the input field reflects the current value stored in the password state and allows React to control the input field.
              value={password}
              placeholder="Enter password Eg: Abc1@123"
              // This attribute defines an event handler function that is triggered whenever the value of the input field changes.
              // When the user types in the input field, this function is called with the event object (e).
              //  It extracts the new value of the input field from e.target.value and updates the password state with this new value using the setPassword function.
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {/* <button className="login-btn" >
          Login
        </button> */}
        <Button text="Login" color="primary" size="small" onClick={handleLogin} disabled={disabled}/>
        <div className="link-Fp">
          <Link className="link-forgotpassword" to="/login">
            Forgot Password
          </Link>
        </div>
        {disabled && (
          <p style={{ color: "red" }}>Login disabled, please try again later</p>
        )}
      </div>
      {loading && <div className="loadingMessage">Loading...</div>}
    </div>
  );
};

export default Login;
