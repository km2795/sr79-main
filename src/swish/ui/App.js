import React, { useState } from "react";
import ScreenComponentIndex from "./ScreenComponentIndex";
import useNavigationProps from "./hooks/navigation/useNavigationProps";
import useUserAuthProps from "./hooks/auth/useUserAuthProps";
import useChatProps from "./hooks/chat/useChatProps";
import "../assets/css/main.css";


function App() {

  /* Which screen is displayed currently. */
  const [screenIndex, setScreenIndex] = useState(0);
  const [userName, setUserName] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [currentRecipient, setCurrentRecipient] = useState("");

  /*
   * Screen Component to be displayed.
   * or a fallback message in case of
   * unknown screen index.
   */
  let ScreenComponent = ScreenComponentIndex[screenIndex] || (() => <div>Invalid Screen</div>)

  const userProps = {
    ...useNavigationProps(setScreenIndex),
    ...useUserAuthProps(setUserName, setChatHistory),
    ...useChatProps(setCurrentRecipient),
    userName,
    chatHistory,
    currentRecipient
  };

  return (
    <div className="main">
      <ScreenComponent { ...userProps } />
    </div>
  );
}

export default App;
