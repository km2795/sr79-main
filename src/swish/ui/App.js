import React, { useState } from "react";

import WelcomeScreen from "./WelcomeScreen";
import Signin from "./Signin";
import Signup from "./Signup";
import "../assets/css/main.css";
import ChatView from "./ChatView";


function App() {

  /*
   * Which Authentication screen to display.
   * 0: None
   * 1: Sign In
   * 2: Sign Up
   */
  const [authScreen, setAuthScreen] = useState(0);
  
  /**
   * To change the current authentication screen.
   */
  function onAuthScreenChange(value) {
    setAuthScreen(value);
  }
  
  return (
    <div className="main">
      {authScreen === 0 ? (
        <WelcomeScreen authScreenChange={onAuthScreenChange} />
      ) : authScreen === 1 ? (
        <Signin authScreenChange={onAuthScreenChange} />
      ) : (
        <Signup authScreenChange={onAuthScreenChange} />
      )}
    </div>
  );
}

export default App;