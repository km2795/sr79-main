import axios from "axios";

function useUserAuthProps(setUserName) {

  /**
   * Function to check if the user exists in the records or not.
   * To avoid making multiple calls, the server would implicitly
   * store the username, assuming the user intended to sign up in
   * the first place.
   * For existing users, the server shall return true [Boolean]
   *
   * @param userName
   * @param password
   * @returns {Promise<axios.AxiosResponse<any>>}
   */
  async function checkUser(userName, password) {
    try {
      const response = await axios.post("/swish/user/", {
        body: {
          "id": userName,
          "password": password
        }
      });

      // Set the username, if the status is true.
      if (response.status) {
        setUserName(userName)
      }

      return response.status;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return { checkUser }
}

export default useUserAuthProps;
