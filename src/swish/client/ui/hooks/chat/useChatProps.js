import axios from "axios";
import { useSetCurrentRecipient } from "../../contexts/data_master/DataProvider";

function useChatProps() {
  const setCurrentRecipient = useSetCurrentRecipient();

  return {
    updateCurrentRecipient: (chat) => setCurrentRecipient(chat)
  }

}

export default useChatProps;
