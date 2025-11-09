import React, {useEffect, useState} from "react";
import ChatItem from "./ChatItem";
import "../assets/css/ChatView.css";

function ChatView({ currentRecipient, sendMessage }) {

  const [messageText, setMessageText] = useState("");
  const [hiddenMessage, setHiddenMessage] = useState(false);
  const [messageList, setMessageList] = useState([]);

  function processChatHistory(history) {
    if(!Array.isArray(history)) return [];
    return [...history].sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
  }

  useEffect(() => {
    if (Array.isArray(currentRecipient.history)) {
      setMessageList(processChatHistory(currentRecipient.history));
    }
  }, [currentRecipient]);

  async function addMessage() {
    let message = {
      "message": messageText,
      "recipient": currentRecipient.recipient,
      "timestamp": Date.now(),
      "direction": "self"
    };

    const response = await sendMessage(message);

    if (response) {
      // In case, the hidden message is visible.
      showHiddenMessage(false);

      // Clear the input form for the next message.
      setMessageText("");
      setMessageList(prev => [...prev, message]);
    } else {
      showHiddenMessage(true);
    }
  }

  function showHiddenMessage(value) {
    setHiddenMessage(value);
  }

  return (
    <div className="chat-view-container">

      {/* To hold the title bar. */}
      <div className="chat-view-container-top">
        <div className="chat-view-container-top-banner">

          {/* User's profile info. */}
          <div className="chat-view-user-profile">
            {/* User's profit photo. */}
            <img className="chat-view-user-profile-photo-icon chat-view-default-icon-sizing" src="./public/images/user.png" />
            {/* Username is displayed here. */}
            <p className="chat-view-banner-username">{currentRecipient.recipient}</p>
          </div>


          {/* Action menus. */}
          <div className="chat-view-banner-action-menu">
            <img className="chat-view-banner-action-menu-icon chat-view-default-icon-sizing" src="./public/images/dot-menu.png" />
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
          <div className="chat-send-button-container" onClick={addMessage}>
            <img className="chat-send-button-image chat-view-default-icon-sizing" src="./public/images/send.png" />
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
