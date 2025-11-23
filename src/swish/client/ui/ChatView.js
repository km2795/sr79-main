import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useSocket } from "./socket/SocketProvider";
import ChatItem from "./ChatItem";
import "../assets/css/ChatView.css";

function ChatView({ 
  screenChange,
  currentRecipient,
  authCredentials,
}) {

  const [messageText, setMessageText] = useState("");
  const [hiddenMessage, setHiddenMessage] = useState(false);
  const [messageList, setMessageList] = useState([]);

  function processChatHistory(history) {
    if(!Array.isArray(history)) return [];
    return [...history].sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
  }
  
  const socket = useSocket();
  const socketRef = useRef(null);

  /*
   * Set the messageList with the recipient's info.
   */
  useEffect(() => {
    if (Array.isArray(currentRecipient.history)) {
      setMessageList(processChatHistory(currentRecipient.history));
    }
  }, [currentRecipient]);
  
  /*
   * To connect the user to the server.
   */
  useEffect(() => {
    if (!socket || !authCredentials.id)
      return;
    
    socket.emit("join", authCredentials.id);
    
    const onMessage = (message) => updateChatViewWithNewMessage(message);
    socket.on("chat:message", onMessage);
    
    return () => {
      socket.off("chat:message", onMessage);
    }
  }, [socket, authCredentials.id]);
  
  /**
   * To cache the message in the list, by checking its 
   * timestamp. To properly arrange it in the list.
   */
  function updateChatViewWithNewMessage(message) {
    setMessageList(prev => {
      const list = Array.isArray(prev) ? [...prev] : [];
      if (list.length === 0) {
        currentRecipient.history = [message];  
        return [message];  
      } else {
        // Check the last message
        const lastMessageTimestamp = list[list.length -1]?.timestamp ?? -Infinity;
        
        // If the new message has timestamp greater or equal
        // to the last message concat it to the list.
        if (lastMessageTimestamp <= message.timestamp) {
          currentRecipient.history = [...list, message];
          return [...list, message];
      
        // Since the message is older than the last message in the 
        // list, sort the list and update the view accordingly.
        } else {
          currentRecipient.history = processChatHistory(list);
          return processChatHistory(list);
        }
      }
    });
  }

  /**
   * To send new message to the server.
   */
  async function sendMessage() {

    // Message to send to the server.
    let message = {
      "id": authCredentials.id,
      "password": authCredentials.password,
      "message": messageText,
      "recipient": currentRecipient.recipient,
      "timestamp": Date.now(),
      "direction": "self"
    };

    try {
      socketRef.current?.emit("chat:message", message);
      setMessageText("");
      setMessageList(prev => [...prev, message]);

    } catch (err) {
      console.log(`Error sending message: ${err.message}`);
      return false;
    }
  }

  function showHiddenMessage(value) {
    setHiddenMessage(value);
  }

  function handleBackNavigation() {
    screenChange(3);
  }

  return (
    <div className="chat-view-container">

      {/* To hold the title bar. */}
      <div className="chat-view-container-top">
        <div className="chat-view-container-top-banner">

          {/* Back navigation button. */}
          <div className="chat-view-back-navigation" onClick={handleBackNavigation}>
            <img
              alt="Previous Page"
              className="chat-view-back-navigation-icon chat-view-default-icon-sizing"
              src="./public/images/left_black.svg"
            />

          </div>

          {/* User's profile info. */}
          <div className="chat-view-user-profile">
            {/* User's profit photo. */}
            <img
              alt="Profile Photo"
              className="chat-view-user-profile-photo-icon chat-view-default-icon-sizing"
              src="./public/images/user_black.svg"
            />

            {/* Username is displayed here. */}
            <p className="chat-view-banner-username">{currentRecipient.recipient}</p>
          </div>


          {/* Action menus. */}
          <div className="chat-view-banner-action-menu">
            <img
              alt="More Options"
              className="chat-view-banner-action-menu-icon chat-view-default-icon-sizing"
              src="./public/images/dot-menu_black.svg"
            />

          </div>

        </div>
      </div>
      
      {/* To hold the message view area. */}
      <div className="chat-view-container-middle">
        <div className="chat-container">
          {
            processChatHistory(messageList).map((message, index) =>
              <ChatItem key={index} messageInfo={message} />)
          }
        </div>
      </div>
      
      {/* To hold the message input area. */}
      <div className="chat-view-container-bottom">
        <form className="chat-input-form-container">
          <input
            className="chat-input"
            placeholder="What do you have in mind?"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <div className="chat-send-button-container" onClick={sendMessage}>
            <img
              alt="Send Message"
              className="chat-send-button-image chat-view-default-icon-sizing"
              src="./public/images/send_black.svg"
            />

          </div>
        </form>

        {/* To show error messages. */}
        {hiddenMessage ? <div className="chat-input-container-bottom-error-box">
          <p className="chat-input-container-bottom-error-box-message">Error Sending Message!</p>
        </div> : null}
      </div>
    </div>
  );
}

export default ChatView;
