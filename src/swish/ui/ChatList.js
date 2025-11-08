import React from "react";
import "../assets/css/ChatList.css"

function ChatList({userName, chatHistory}) {
  return (
      <div className="chat-list-container app-default-box-welcome-screen">
        {/* To hold the title bar. */}
        <div className="chat-list-container-top">
          <div className="chat-list-container-top-banner">

            {/* User's profile info. */}
            <div className="chat-list-user-profile">
              {/* User's profit photo. */}
              <img className="chat-list-user-profile-photo-icon chat-view-default-icon-sizing" src="./public/images/user.png" />
              {/* Username is displayed here. */}
              <p className="chat-list-banner-username">{userName}</p>
            </div>


            {/* Action menus. */}
            <div className="chat-list-banner-action-menu">
              <img className="chat-list-banner-action-menu-icon chat-view-default-icon-sizing" src="./public/images/dot-menu.png" />
            </div>

          </div>
        </div>


        <div className="chat-list-container-middle"></div>
        <div className="chat-list-container-bottom"></div>
      </div>
  )
}

export default ChatList;
