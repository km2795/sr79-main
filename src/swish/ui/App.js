import React, { useState } from "react";
import axios from "axios";
import WelcomeScreen from "./WelcomeScreen";
import Signin from "./Signin";
import Signup from "./Signup";
import ChatList from "./ChatList";
import ChatView from "./ChatView";
import "../assets/css/main.css";


function App() {

  /*
   * Which Authentication screen to display.
   * 0: None
   * 1: Sign In
   * 2: Sign Up
   * 3: Chat List
   * 4: Chat Screen
   */
  const [screenIndex, setScreenIndex] = useState(3);
  
  /**
   * To change the current authentication screen.
   */
  function onScreenChange(value) {
    setScreenIndex(value);
  }

  function signInUser(userName, password) {}

  function signUpUser(userName, password) {}

  /**
   * Function to check if the user exists in the records or not.
   * To avoid making multiple calls, the server would implicitly
   * store the username, assuming the user intended to sign up in
   * the first place.
   * For existing users, the server shall return true [Boolean]
   *
   * @param userName
   * @param password
   * @returns {Promise<axios.AxiosResponse<any>>}
   */
  async function getUser(userName, password) {
    try {
      return await axios.get("/user/", {
        params: {
          id: userName,
          password: password
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  const userProps = {
    screenChange: onScreenChange,
    getUser: getUser,
    chatHistory: {}
  };

  function renderScreen(screenIndex, props) {
    switch (screenIndex) {
      case 0:
        return <WelcomeScreen { ...props} />;
      case 1:
        return <Signin { ...props} />;
      case 2:
        return <Signup {...props} />;
      case 3:
        return <ChatList { ...props} />;
      case 4:
        return <ChatView />;
    }
  }
  
  return (
    <div className="main">
      {renderScreen(screenIndex, userProps)}
    </div>
  );
}

export default App;
