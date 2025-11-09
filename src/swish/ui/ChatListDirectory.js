import React from "react";
import ChatListDirectoryItem from "./ChatListDirectoryItem";
import "../assets/css/ChatListDirectory.css";

function ChatListDirectory({ chatHistory, screenChange, updateCurrentRecipient }) {
  return (
      <div className="chat-list-directory-container">
        <div className="chat-list-directory-items">
          {
            Object.keys(chatHistory).map((chatKey, index) =>
              <ChatListDirectoryItem
                  key={index}
                  recipient={chatKey}
                  chatInfo={chatHistory[chatKey]}
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
