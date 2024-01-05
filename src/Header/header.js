import React from "react";
import "./header.css";
import { Link } from "react-router-dom";


const Header = ()=>{
    return(
<div className="container">

<div className="innerContainer">

<div className="Main_Head_Logo">
<div > <img className="Header_Logo" src="https://logodix.com/logo/871287.png" alt="Logo" /> </div>
<div className="Main_header"> Student Portal </div>
</div>
<div className="Links">

<Link className="Header_Links" to="./">HOME</Link>
<Link className="Header_Links" to="./table">TABLE</Link>
</div>

</div>

</div>
    );
};


export default Header;