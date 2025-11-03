import React from "react";
import "../assets/css/common.css";
import "../assets/css/WelcomeScreen.css";

function WelcomeScreen({authScreenChange}) {
  
  function handleSignInClick() {
    authScreenChange(1);
  }
  
  function handleSignUpClick() {
    authScreenChange(2);
  }
  
  return (
    // Using Grid Layout.
    <div className="welcome-screen app-default-box-welcome-screen">
      
      <div className="welcome-screen-container-top">
        <h1>Welcome to Swish Personal Comms</h1>
      </div>
      
      <div className="welcome-screen-container-middle">
        <div className="signin-button-container" onClick={handleSignInClick}>Sign In</div>
        <div className="signup-button-container" onClick={handleSignUpClick}>Sign Up</div>
      </div>
      
      {/* May need it in future.
      <div className="welcome-screen-container-bottom">
        <div className="move-forward-icon-container">
          <img className="move-forward-icon app-default-navigation-button-welcome-screen" src="../../public/images/forward.png" />
        </div>
      </div> */}
    </div>
  );
}

export default WelcomeScreen;