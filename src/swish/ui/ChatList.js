import React, {useState} from "react";
import AddRecipientDialog from "./AddRecipientDialog";
import ChatListDirectoryItem from "./ChatListDirectoryItem";
import "../assets/css/ChatList.css"

function ChatList({ userName, chatHistory, screenChange, updateCurrentRecipient }) {

  /* If history is undefined or null, pass an empty list (at least). */
  chatHistory = chatHistory ? chatHistory : [];

  /*
   * To show/hide the add recipient dialog box.
   */
  const [showAddRecipientDialog, setShowAddRecipientDialog] = useState(false);

  /*
   * To update the state of show/hide flag for add recipient dialog box.
   */
  function updateAddRecipientDialogVisibility(state) {
    setShowAddRecipientDialog(state);
  }

  function setCurrentRecipient(recipient) {
    updateCurrentRecipient({
      recipient: recipient,
      preview: "",
      timestamp: "",
      history: []
    });
    screenChange(4);
    updateAddRecipientDialogVisibility(false);
  }

  return (
    <div className="chat-list-container">
      {/* To hold the title bar. */}
      <div className="chat-list-container-top">
        <div className="chat-list-container-top-banner">

          {/* User's profile info. */}
          <div className="chat-list-user-profile">
            {/* User's profile photo. */}
            <img className="chat-list-user-profile-photo-icon chat-view-default-icon-sizing" src="./public/images/user_black.svg" />
            {/* Username is displayed here. */}
            <p className="chat-list-banner-username">{userName}</p>
          </div>


          {/* Action menus. */}
          <div className="chat-list-banner-action-menu">
            <img className="chat-list-banner-action-menu-icon chat-list-default-icon-sizing" src="./public/images/dot-menu_black.svg" />
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
          onClose={() => updateAddRecipientDialogVisibility(false)} /> : null}
      </div>

      <div className="chat-list-container-bottom">
        <div className="chat-list-add-recipient-button-container" onClick={(e) => updateAddRecipientDialogVisibility(true)}>
          <img className="chat-list-add-recipient-button chat-list-default-icon-sizing" src="./public/images/new-message.svg" />
          New Conversation
        </div>
      </div>
    </div>
  )
}

export default ChatList;
