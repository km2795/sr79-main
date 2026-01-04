import React, { useState, useEffect } from "react";
import AddRecipientDialog from "./AddRecipientDialog";
import ChatListDirectoryItem from "./ChatListDirectoryItem";
import { useSocket, useSetSocket } from "./contexts/socket/SocketProvider";
import { createSocket } from "./contexts/socket/Socket";
import { useUserName, useChatHistory, useSetChatHistory, useSetCurrentRecipient, useAuthCredentials } from "./contexts/data_master/DataProvider";
import "../assets/css/ChatList.css"

function ChatList({
  screenChange,
  checkRecipient
}) {

  const socket = useSocket();
  const setSocket = useSetSocket();
  const chatHistory = useChatHistory();
  const setChatHistory = useSetChatHistory();
  const userName = useUserName();
  const authCredentials = useAuthCredentials();
  const updateCurrentRecipient = useSetCurrentRecipient();

  /*
   * To update the state of the chat history.
   */
  useEffect(() => {
    // Check if the socket is there or not.
    if (!socket) {
      const s = createSocket();
      setSocket(s);
      socket = s;
    }
    // Message to send to the server.
    const payload = {
      id: authCredentials.id,
      password: authCredentials.password
    };

    // Send the payload to receive the updated chat history.
    socket.emit("chat:chatHistory", payload);

    // Receive the updated chat history.
    socket.on("chat:chatHistory", (data) => {
      setChatHistory(data);
    });
  });

  /*
   * To show/hide the add recipient dialog box.
   */
  const [showAddRecipientDialog, setShowAddRecipientDialog] = useState(false);

  /*
   * Recipient Add dialog box's hidden message.
   */
  const [recipientDialogMessage, setRecipientDialogMessage] = useState("");

  /*
   * Visibility of the add recipient dialog's message.
   */
  const [recipientDialogMessageVisible, setRecipientDialogMessageVisible] = useState(false);

  /*
   * To update the state of show/hide flag for add recipient dialog box.
   */
  function updateAddRecipientDialogVisibility(state) {
    setRecipientDialogMessage("");
    setRecipientDialogMessageVisible(false);
    setShowAddRecipientDialog(state);
  }

  async function setCurrentRecipient(recipient) {
    const response = await checkRecipient(recipient);
    if (response == null) {
      // Show internal error occurred.
      setRecipientDialogMessage("Internal Error Occurred. Try Again Later.");
      setRecipientDialogMessageVisible(true);
    } else if (response) {
      setRecipientDialogMessage("");
      setRecipientDialogMessageVisible(false);
      updateCurrentRecipient({
        recipient: recipient,
        preview: "",
        timestamp: "",
        history: []
      });
      screenChange(4);
      updateAddRecipientDialogVisibility(false);
    } else {
      // Show recipient not exists message.
      setRecipientDialogMessage("Recipient Not Found.");
      setRecipientDialogMessageVisible(true);
    }
  }

  return (
    <div className="chat-list-container">
      {/* To hold the title bar. */}
      <div className="chat-list-container-top">
        <div className="chat-list-container-top-banner">

          {/* User's profile info. */}
          <div className="chat-list-user-profile">
            {/* User's profile photo. */}
            <img
              alt="Profile Photo"
              className="chat-list-user-profile-photo-icon chat-view-default-icon-sizing"
              src="./public/images/user_black.svg"
            />

            {/* Username is displayed here. */}
            <p className="chat-list-banner-username">{userName}</p>
          </div>


          {/* Action menus. */}
          <div className="chat-list-banner-action-menu">
            <img
              alt="More Options"
              className="chat-list-banner-action-menu-icon chat-list-default-icon-sizing"
              src="./public/images/dot-menu_black.svg"
            />
          </div>

        </div>
      </div>


      <div className="chat-list-container-middle">
        <div className="chat-list-directory-container">
          {
            chatHistory.length < 1
              ? <div className="chat-list-directory-empty-banner">It's so quiet in here!</div>
              : Object.keys(chatHistory).map((chatKey, index) =>
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

        {showAddRecipientDialog ? <AddRecipientDialog
          onAccept={(recipient) => setCurrentRecipient(recipient)}
          onClose={() => updateAddRecipientDialogVisibility(false)}
          recipientDialogMessage={recipientDialogMessage}
          recipientDialogMessageVisible={recipientDialogMessageVisible} /> : null}
      </div>

      <div className="chat-list-container-bottom">
        <div className="chat-list-add-recipient-button-container" onClick={() => updateAddRecipientDialogVisibility(true)}>
          <img
            alt="New Recipient"
            className="chat-list-add-recipient-button chat-list-default-icon-sizing"
            src="./public/images/new-message.svg"
          />
          New Conversation
        </div>
      </div>
    </div>
  )
}

export default ChatList;
