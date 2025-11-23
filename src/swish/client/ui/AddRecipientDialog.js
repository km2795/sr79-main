import React from "react";
import '../assets/css/AddRecipientDialog.css';

function AddRecipientDialog({ 
  onAccept, 
  onClose,
  recipientDialogMessage,
  recipientDialogMessageVisible 
}) {

  const [recipient, setRecipient] = React.useState("");

  return (
    <div className="add-recipient-dialog-overlay">
      <div className="add-recipient-dialog-container">
        <div className="add-recipient-dialog-container-top">
          <h2>Add Recipient</h2>
        </div>

        <div className="add-recipient-dialog-container-middle">
          <div className="add-recipient-dialog-input-container">
            <input
                className="add-recipient-dialog-input"
                type="text"
                placeholder="Enter recipient number"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
        </div>

        <div className="add-recipient-dialog-container-bottom">
          <div className="add-recipient-dialog-actions">
            <button className="add-recipient-dialog-actions-button accept" onClick={() => onAccept(recipient)}>Accept</button>
            <button className="add-recipient-dialog-actions-button close" onClick={onClose}>Close</button>
          </div>
        </div>
        
        {recipientDialogMessageVisible ? 
        (<div className="add-recipient-dialog-container-message">
          <div className="add-recipient-hidden-message">
            <p>{recipientDialogMessage}</p>
          </div>
        </div>)
        : null}

      </div>
    </div>
  );
}

export default AddRecipientDialog;
