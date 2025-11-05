import React, {useState} from "react";
import "../assets/css/common.css";
import "../assets/css/Signup.css"

function Signup({screenChange, getUser}) {

  //mobileNumber (is userName).
  const [mobileNumber, setMobileNumber,] = useState("");

  const [password, setPassword] = useState("");

  /* To show messages related to sign up process. If the hiddenMessage string
   * is empty, the message element would remain hidden, otherwise it will be shown.
   */
  const [hiddenMessage, setHiddenMessage] = useState("", );

  // Go back to Welcome Screen.
  function handleBackNavigation() {
    screenChange(0);
  }
  
  // Go to Sign In Screen.
  function handleFrontNavigation() {
    screenChange(1);
  }
  
  // Handle the Sign-Up.
  async function handleSignUp() {
    const response = await getUser(mobileNumber, password);
  }

  return (
    <div className="signup-container app-default-box-welcome-screen">
      <div className="welcome-screen-container-top">
        <div className="signup-container-top-navigation">
          <div className="welcome-screen-top-navigation-goback" onClick={handleBackNavigation}>
            <img className="app-default-navigation-button-welcome-screen" src="../../public/images/left.png" />
          </div>
        </div>
        <div className="signup-container-top-banner welcome-screen-header-side-banner">
          <h2>Sign Up</h2>
        </div>
        <div className="welcome-screen-top-navigation-gofront" onClick={handleFrontNavigation}>
          <img className="app-default-navigation-button-welcome-screen" src="../../public/images/right.png" />
        </div>
      </div>
      <div className="signup-container-middle">
        <input 
          className="signup-input app-default-input" 
          placeholder="Number" 
          type="number" 
          value={mobileNumber} 
          onChange={(e) => setMobileNumber(e.target.value)} />

        <input
          className="signup-input app-default-input"
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)} />

        {hiddenMessage.length > 0 ? <div className="signup-input hidden-message"><p>{hiddenMessage}</p></div>: ""}
      </div>
      <div className="signup-container-bottom">
        <div className="move-forward-icon-container" onClick={handleSignUp}>
          <img className="move-forward-icon app-default-navigation-button-welcome-screen" src="../../public/images/forward.png" />
        </div>
      </div>
    </div>
  );
}

export default Signup;