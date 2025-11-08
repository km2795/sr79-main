import React, { useState } from "react";
import "../assets/css/common.css";
import "../assets/css/Signin.css";

function Signin({screenChange, checkUser}) {
  
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  /* To show messages related to sign up process. If the hiddenMessage string
   * is empty, the message element would remain hidden, otherwise it will be shown.
   */
  const [hiddenMessage, setHiddenMessage] = useState("", );
  
  function handleBackNavigation() {
    screenChange(0);
  }
  
  function handleFrontNavigation() {
    screenChange(2);
  }
  
  async function handleSignIn() {
    const response = await checkUser(mobileNumber, password, "sign-in");

    // If user checks out, go to user's chat list.
    if (response) {
      screenChange(3);
    } else {
      // Something went wrong, show this error. Classification for error, LATER!
      setHiddenMessage("Incorrect Username or Password.");
    }
  }

  return (
    <div className="signin-container app-default-box-welcome-screen">
      <div className="welcome-screen-container-top">
        <div className="signin-container-top-navigation">
          <div className="welcome-screen-top-navigation-goback" onClick={handleBackNavigation}>
            <img className="app-default-navigation-button-welcome-screen" src="./public/images/left.png" />
          </div>
        </div>
        <div className="signin-container-top-banner welcome-screen-header-side-banner">
          <h2>Sign In</h2>
        </div>
        <div className="welcome-screen-top-navigation-gofront" onClick={handleFrontNavigation}>
          <img className="app-default-navigation-button-welcome-screen" src="./public/images/right.png" />
        </div>
      </div>
      <div className="signin-container-middle">
        <input 
          className="signin-input app-default-input" 
          placeholder="Number" 
          type="number" 
          value={mobileNumber} 
          onChange={(e) => setMobileNumber(e.target.value)} />

        <input
          className="signin-input app-default-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

        {hiddenMessage.length > 0 ? <div className="signin-input hidden-message"><p>{hiddenMessage}</p></div>: ""}
      </div>
      <div className="signin-container-bottom">
        <div className="move-forward-icon-container" onClick={handleSignIn}>
          <img className="move-forward-icon app-default-navigation-button-welcome-screen" src="./public/images/forward.png" />
        </div>
      </div>
    </div>
  );
}

export default Signin;
