import React from "react";
import ChatListDirectoryItem from "./ChatListDirectoryItem";
import "../assets/css/ChatListDirectory.css";

function ChatListDirectory({ chatHistory, screenChange, updateCurrentRecipient }) {
  return (
      <div className="chat-list-directory-container">
        <div className="chat-list-directory-items">
          {
            chatHistory.map((chat, index) =>
              <ChatListDirectoryItem
                  key={index}
                  chat={chat}
                  screenChange={screenChange}
                  updateCurrentRecipient={updateCurrentRecipient}
              />
            )
          }
        </div>
      </div>
  );
}

export default ChatListDirectory;
