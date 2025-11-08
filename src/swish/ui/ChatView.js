import React from "react";
import ChatItem from "./ChatItem";
import "../assets/css/ChatView.css";

function ChatView({ currentRecipient }) {

  function processChatHistory(currentRecipient) {
    return !currentRecipient || currentRecipient.sort((a, b) => (Number(a.timestamp) - Number(b.timestamp)));
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
            processChatHistory(currentRecipient.history).map((message, index) =>
              <ChatItem key={index} messageInfo={message} />)
          }

        </div>
      </div>
      
      {/* To hold the message input area. */}
      <div className="chat-view-container-bottom">
        <form className="chat-input-form-container" action="">
          <input className="chat-input" placeholder="What do you have in mind?" />
          <div className="chat-send-button-container">
            <img className="chat-send-button-image chat-view-default-icon-sizing" src="./public/images/send.png" />
          </div>
        </form>
      </div>
    </div>
    
  );
}

export default ChatView;
