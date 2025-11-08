import React from "react";
import Utility from "../Utility";
import "../assets/css/ChatItem.css";

function ChatItem(messageInfo) {
  messageInfo = messageInfo.messageInfo
  return (
    <div className={`message ${messageInfo.direction}`}>
      <div className="text">{messageInfo.message}</div>
      <div className="timestamp">{Utility.modifyDateField(new Date(Number(messageInfo.timestamp)))}</div>
    </div>
  );
}

export default ChatItem;
