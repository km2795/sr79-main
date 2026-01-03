import axios from "axios";
import { useSocket, useSetSocket } from "../../contexts/socket/SocketProvider";
import { createSocket } from "../../contexts/socket/Socket";
import { useSetChatHistory } from "../../contexts/data_master/DataProvider";

function useUserAuthProps(setUserName, setAuthCredentials) {
  const socketFromContext = useSocket();
  const setSocket = useSetSocket();
  const setChatHistory = useSetChatHistory();

  /**
   * Function to check if the user exists in the records or not.
   * To avoid making multiple calls, the server would implicitly
   * store the username, assuming the user intended to sign up in
   * the first place.
   * For existing users, the server shall return true [Boolean]
   *
   * @param userName
   * @param password
   * @param authType
   * @returns {Promise<axios.AxiosResponse<any>>}
   */
  async function checkUser(userName, password, authType) {
    try {
      const payload = { "id": userName, password, authType };

      // ensure we have a socket; create if missing (sign-in/sign-up)
      let socket = socketFromContext;
      if (!socket) {
        const s = createSocket({});
        setSocket(s);
        socket = s;
      }

      // wait for server reply (one-time listener)
      return await new Promise((resolve) => {
        const onResponse = (response) => {
          try {
            if (response && response.status) {
              setUserName(userName);
              setChatHistory(response.chatHistory || []);
              setAuthCredentials({ id: userName, password });
              resolve(true);
            } else {
              resolve(false);
            }
          } catch (e) {
            resolve(false);
          }
        };

        // safety timeout
        const timer = setTimeout(() => {
          socket.off("chat:user", onResponse);
          resolve(false);
        }, 5000);

        socket.once("chat:user", onResponse);
        socket.emit("chat:user", payload);
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
  /**
   * Check if the recipient exists or not.
   */
  async function checkRecipient(userId) {
    try {
      let socket = socketFromContext;
      if (!socket) {
        const s = createSocket({}); // pass auth if needed
        setSocket(s);
        socket = s;
      }
      
      return await new Promise((resolve) => {
        const onResponse = (response) => {
          try {
            if (response && response.status) {
              resolve(true);
            } else if (response.status != null) {
              resolve(false);
            }
          } catch (error) {
            console.log(error);
            resolve(null);
          }
        };
        
        // safety timeout
        const timer = setTimeout(() => {
          socket.off("chat:checkUser", onResponse);
          resolve(null);
        }, 5000);
        
        socket.once("chat:checkUser", onResponse);
        socket.emit("chat:checkUser", { "recipient": userId })
      })
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return { checkUser, checkRecipient };
}

export default useUserAuthProps;
