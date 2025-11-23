import React, { useState } from "react";
import ScreenComponentIndex from "./ScreenComponentIndex";
import useNavigationProps from "./hooks/navigation/useNavigationProps";
import useUserAuthProps from "./hooks/auth/useUserAuthProps";
import useChatProps from "./hooks/chat/useChatProps";
import { SocketProvider } from "./socket/SocketProvider";
import "../assets/css/main.css";


function App() {

  /* Which screen is displayed currently. */
  const [screenIndex, setScreenIndex] = useState(0);
  const [userName, setUserName] = useState("");

  /* Complete chat history of the user. */
  const [chatHistory, setChatHistory] = useState([]);

  /* Current recipient. */
  const [currentRecipient, setCurrentRecipient] = useState("");

  /* For concurrent chat send/reception. Will be replaced by temporary auth tokens. */
  const [authCredentials, setAuthCredentials] = useState({id: "", password: ""});

  /*
   * Screen Component to be displayed.
   * or a fallback message in case of
   * unknown screen index.
   */
  let ScreenComponent = ScreenComponentIndex[screenIndex] || (() => <div>Invalid Screen</div>)

  const userProps = {
    ...useNavigationProps(setScreenIndex),
    ...useUserAuthProps(setUserName, setChatHistory, setAuthCredentials),
    ...useChatProps(setCurrentRecipient),
    userName,
    chatHistory,
    currentRecipient,
    authCredentials
  };

  return (
    <SocketProvider>
      <div className="main">
        <ScreenComponent { ...userProps } />
      </div>
    </SocketProvider>
  );
}

export default App;
