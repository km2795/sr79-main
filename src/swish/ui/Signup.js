import React, { useState } from "react";
import "../assets/css/common.css";
import "../assets/css/Signup.css"

function Signup({authScreenChange}) {
  
  const [mobileNumber, setMobileNumber] = useState("");

  function handleBackNavigation() {
    authScreenChange(0);
  }
  
  function handleFrontNavigation() {
    authScreenChange(1);
  }
  
  function handleSignUp() {
    console.log(mobileNumber)
  }

  return (
    <div className="signup-container app-default-box-welcome-screen">
      <div className="welcome-screen-container-top">
        <div className="signup-container-top-navigation">
          <div className="welcome-screen-top-navigation-goback" onClick={handleBackNavigation}>
            <img className="app-default-navigation-button-welcome-screen" src="../../public/left.png" />
          </div>
        </div>
        <div className="signup-container-top-banner welcome-screen-header-side-banner">
          <h2>Sign Up</h2>
        </div>
        <div className="welcome-screen-top-navigation-gofront" onClick={handleFrontNavigation}>
          <img className="app-default-navigation-button-welcome-screen" src="../../public/right.png" />
        </div>
      </div>
      <div className="signup-container-middle">
        <input 
          className="signup-input app-default-input" 
          placeholder="Number" 
          type="number" 
          value={mobileNumber} 
          onChange={(e) => setMobileNumber(e.target.value)} />
      </div>
      <div className="signup-container-bottom">
        <div className="move-forward-icon-container" onClick={handleSignUp}>
          <img className="move-forward-icon app-default-navigation-button-welcome-screen" src="../../public/forward.png" />
        </div>
      </div>
    </div>
  );
}

export default Signup;