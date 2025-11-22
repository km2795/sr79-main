import axios from "axios";

function useChatProps(setCurrentRecipient) {

  return {
    updateCurrentRecipient: (chat) => setCurrentRecipient(chat),
  }

}

export default useChatProps;
