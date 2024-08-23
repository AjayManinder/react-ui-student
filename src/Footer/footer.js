// import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="container-footer">
      <div className="sections">
        <div className="left-section">
          <div className="left-section-div-head">
            <strong>Hours</strong>
          </div>
          <div>Monday - Friday</div>
          <div>8:00 am - 5:00 pm</div>
          {/* <p>Student Portal</p> */}
        </div>
        <div className="right-section">
          <div className="right-section-div-head">
            <strong>Contact</strong>
          </div>
          <div>
            <strong>Email: </strong>collegeportal@gmail.com
          </div>
          <div>
            <strong>Phone:</strong>999-888-7766
          </div>
          {/* <p>Student Portal</p> */}
        </div>
      </div>
      <div className="main-container">
        <div>© College Portal. All rights reserved.</div>
      </div>
    </div>
  );
};

export default Footer;
