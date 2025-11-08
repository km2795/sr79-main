import React, {useState} from "react";
import ChatListDirectory from "./ChatListDirectory";
import AddRecipientDialog from "./AddRecipientDialog";
import "../assets/css/ChatList.css"

function ChatList({userName, chatHistory}) {

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

  return (
      <div className="chat-list-container app-default-box-welcome-screen">
        {/* To hold the title bar. */}
        <div className="chat-list-container-top">
          <div className="chat-list-container-top-banner">

            {/* User's profile info. */}
            <div className="chat-list-user-profile">
              {/* User's profile photo. */}
              <img className="chat-list-user-profile-photo-icon chat-view-default-icon-sizing" src="./public/images/user.png" />
              {/* Username is displayed here. */}
              <p className="chat-list-banner-username">{userName}</p>
            </div>


            {/* Action menus. */}
            <div className="chat-list-banner-action-menu">
              <img className="chat-list-banner-action-menu-icon chat-list-default-icon-sizing" src="./public/images/dot-menu.png" />
            </div>

          </div>
        </div>


        <div className="chat-list-container-middle">
          <div className="chat-list-directory">
            {
              chatHistory.length < 1
                  ? <div className="chat-list-directory-empty-banner"></div>
                  : null
            }
            <ChatListDirectory chatHistory={[]}/>
          </div>
          {showAddRecipientDialog ? <AddRecipientDialog
            onAccept={(e) => console.log(e)}
            onClose={() => updateAddRecipientDialogVisibility(false)} /> : null}
        </div>

        <div className="chat-list-container-bottom">
          <div className="chat-list-add-recipient-button-container" onClick={(e) => updateAddRecipientDialogVisibility(true)}>
            <img className="chat-list-add-recipient-button chat-list-default-icon-sizing" src="./public/images/new-message.png" />
          </div>
        </div>
      </div>
  )
}

export default ChatList;
