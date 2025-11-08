import React from "react";
import "../assets/css/ChatListDirectoryItem.css";

function ChatListDirectoryItem({ chat, screenChange, updateCurrentRecipient }) {

  return (
      <div className="chat-list-directory-item" onClick={
        (e) => {
          screenChange(4);
          updateCurrentRecipient(chat);
        }
      }>
        <div className="chat-list-directory-item-name">{chat.recipient}</div>
        <div className="chat-list-directory-item-preview">
          <span>{chat.preview}</span>
          <span className="chat-list-directory-item-timestamp">{chat.timestamp}</span>
        </div>
      </div>);
}

export default ChatListDirectoryItem;
