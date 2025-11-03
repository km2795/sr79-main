import React, { useState } from "react";
import "../assets/css/common.css";
import "../assets/css/Signin.css";

function Signin({authScreenChange}) {
  
  const [mobileNumber, setMobileNumber] = useState("");
  
  function handleBackNavigation() {
    authScreenChange(0);
  }
  
  function handleFrontNavigation() {
    authScreenChange(2);
  }
  
  function handleSignIn() {
    console.log(mobileNumber);
  }

  return (
    <div className="signin-container app-default-box-welcome-screen">
      <div className="welcome-screen-container-top">
        <div className="signin-container-top-navigation">
          <div className="welcome-screen-top-navigation-goback" onClick={handleBackNavigation}>
            <img className="app-default-navigation-button-welcome-screen" src="../../public/images/left.png" />
          </div>
        </div>
        <div className="signin-container-top-banner welcome-screen-header-side-banner">
          <h2>Sign In</h2>
        </div>
        <div className="welcome-screen-top-navigation-gofront" onClick={handleFrontNavigation}>
          <img className="app-default-navigation-button-welcome-screen" src="../../public/images/right.png" />
        </div>
      </div>
      <div className="signin-container-middle">
        <input 
          className="signin-input app-default-input" 
          placeholder="Number" 
          type="number" 
          value={mobileNumber} 
          onChange={(e) => setMobileNumber(e.target.value)} />
      </div>
      <div className="signin-container-bottom">
        <div className="move-forward-icon-container" onClick={handleSignIn}>
          <img className="move-forward-icon app-default-navigation-button-welcome-screen" src="../../public/images/forward.png" />
        </div>
      </div>
    </div>
  );
}

export default Signin;
