import axios from "axios";
import { useSocket, useSetSocket } from "../../socket/SocketProvider";
import { createSocket } from "../../socket/Socket";

function useUserAuthProps(setUserName, setChatHistory, setAuthCredentials) {
  const socketFromContext = useSocket();
  const setSocket = useSetSocket();

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
      const payload = {
        body: {
          "id": userName,
          "password": password,
          "authType": authType
        }
      };

      // ensure we have a socket; create if missing (sign-in/sign-up)
      let socket = socketFromContext;
      if (!socket) {
        const s = createSocket({}); // pass auth if needed
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

        socket.once("chat:user", (resp) => {
          clearTimeout(timer);
          onResponse(resp);
        });

        socket.emit("chat:user", payload);
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return { checkUser };
}

export default useUserAuthProps;
