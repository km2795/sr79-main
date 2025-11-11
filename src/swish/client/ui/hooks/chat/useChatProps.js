import axios from "axios";

function useChatProps(authCredentials, setCurrentRecipient) {

  return {
    updateCurrentRecipient: (chat) => setCurrentRecipient(chat),

    /**
     * Send the message to the server.
     *
     * @param message
     */
    sendMessage: async (message) => {
      try {
        console.log(message);
        const response = await axios.post("/swish/user/chat", {
          body: {
            "id": authCredentials.id,
            "password": authCredentials.password,
            "recipient": message.recipient,
            "message": message.message,
            "timestamp": message.timestamp
          }
        });
        console.log(response);
        return response.data.status;
      } catch (err) {
        console.log(`Error sending message: ${err.message}`);
        return false;
      }
    }
  }

}

export default useChatProps;
