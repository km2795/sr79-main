import React from "react";
import '../assets/css/AddRecipientDialog.css';

function AddRecipientDialog({ onAccept, onClose }) {
  const [recipient, setRecipient] = React.useState("");

  return (
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

      </div>
  );
}

export default AddRecipientDialog;
