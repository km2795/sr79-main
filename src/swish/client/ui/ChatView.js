import React, { useEffect, useState, useRef } from "react";
import { createSocket } from "./socket/Socket";
import { useSocket, useSetSocket } from "./socket/SocketProvider";
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
  const chatMiddleRef = useRef(null);

  function processChatHistory(history) {
    if (!Array.isArray(history)) return [];
    return [...history].sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
  }

  const socketFromContext = useSocket();
  const setSocket = useSetSocket();

  /*
   * Set the messageList with the recipient's info.
   */
  useEffect(() => {
    if (Array.isArray(currentRecipient?.history)) {
      setMessageList(processChatHistory(currentRecipient.history));
    } else {
      setMessageList([]);
    }
  }, [currentRecipient]);

  /**
   * To cache the message in the list, by checking its 
   * timestamp. To properly arrange it in the list.
   */
  function updateChatViewWithNewMessage(message) {
    // never mutate props (currentRecipient). Keep local state consistent.
    setMessageList(prev => {
      const list = Array.isArray(prev) ? [...prev] : [];
      // add new message
      list.push(message);
      // sort by timestamp to ensure ordering (older->newer)
      list.sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
      return list;
    });
  }

  /*
   * To connect the user to the server and listen for incoming messages.
   */
  useEffect(() => {
    const socket = socketFromContext;
    if (!socket || !authCredentials?.id) return;

    const onMessage = (message) => updateChatViewWithNewMessage(message);
    socket.on("chat:message", onMessage);

    return () => {
      socket.off("chat:message", onMessage);
    };
  }, [socketFromContext, authCredentials?.id]);

  /*
   * Scroll to the bottom of the chat list when a new message is added.
   */
  useEffect(() => {
    if (chatMiddleRef.current) {
      chatMiddleRef.current.scrollTop = chatMiddleRef.current.scrollHeight;
    }
  }, [messageList]);

  /**
   * To send new message to the server.
   */
  async function sendMessage(e) {
    // Don't send empty messages.
    if (messageText.length < 1) return;

    if (e && e.preventDefault) e.preventDefault();

    let socket = socketFromContext;
    if (!socket) {
      const s = createSocket({});
      setSocket(s);
      socket = s;
    }

    if (!socket || !authCredentials?.id) {
      setHiddenMessage(true);
      return;
    }

    // Message to send to the server.
    const message = {
      id: authCredentials.id,
      password: authCredentials.password,
      message: messageText,
      recipient: currentRecipient.recipient,
      timestamp: Date.now(),
      direction: "self"
    };

    try {
      socket.emit("chat:message", message);

      // update local view (single source of truth: messageList)
      updateChatViewWithNewMessage(message);
      setMessageText("");

    } catch (err) {
      console.log(`Error sending message: ${err?.message || err}`);
      setHiddenMessage(true);
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
      <div className="chat-view-container-middle" ref={chatMiddleRef}>
        <div className="chat-container">
          {
            processChatHistory(messageList).map((message) => (
              <ChatItem
                key={message.timestamp || `${message.id}-${Math.random()}`}
                messageInfo={message}
              />
            ))
          }

        </div>
      </div>

      {/* To hold the message input area. */}
      <div className="chat-view-container-bottom">
        <form className="chat-input-form-container" onSubmit={sendMessage}>
          <input
            className="chat-input"
            placeholder="What do you have in mind?"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <div className="chat-send-button-container" onClick={sendMessage} role="button" tabIndex={0}>
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
