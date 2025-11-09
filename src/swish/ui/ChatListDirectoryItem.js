import React from "react";
import "../assets/css/ChatListDirectoryItem.css";

function ChatListDirectoryItem({ recipient, chatInfo, screenChange, updateCurrentRecipient }) {

  /*
   * Template object. What is processed here is different
   * from what is stored on the server. That is why, a
   * template is created out of the data received from the
   * server.
   */
  let recipientInfo = {
    recipient: recipient,
    preview: chatInfo["preview"],
    timestamp: chatInfo["timestamp"],
    history: chatInfo["history"]
  };

  return (
      <div className="chat-list-directory-item" onClick={
        (e) => {
          screenChange(4);
          updateCurrentRecipient(recipientInfo);
        }
      }>
        <div className="chat-list-directory-item-name">{recipientInfo.recipient}</div>
        <div className="chat-list-directory-item-preview">
          <span>{recipientInfo.preview}</span>
          <span className="chat-list-directory-item-timestamp">{recipientInfo.timestamp}</span>
        </div>
      </div>);
}

export default ChatListDirectoryItem;
