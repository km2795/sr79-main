import express from 'express';
import * as ChatHandler from "../handlers/ChatHandler";
import * as UserHandler from "../handlers/UserHandler";

const router = express.Router();

// Serve Swish index
router.get('/', (_req, res) => {
  res.sendFile('index.html', { root: './src/swish/dist/' });
});

// Handle user operations
router.post('/user', async (req, res) => {
  try {
    const userData = req.body.body;
  
    // user id received with request from client.
    const reqUserId = userData.id;

    // user id stored in the index at the server.
    const UserId = UserHandler.USER_INDEX[userData.id]

    if (reqUserId && UserId && userData.id in UserHandler.USER_INDEX) {
      // If password field exists in the payload, then check for authenticity.
      if ("password" in userData) {
        if (UserId["password"] === userData.password) {
          res.json({
            status: true,
            message: "User Authenticated.",

            // If the authType is sign-in, then send the chat
            // history as well otherwise for sign-up empty list.
            chatHistory: (userData.authType === "sign-in")
                ? ChatHandler.CHAT_INDEX[userData.id]
                : []
          });
        } else {
          res.json({
            status: false,
            message: "Invalid Credentials."
          });
        }
      } else {
        // Return that the user exists, in case of normal user check.
        res.json({status: true});
      }
    } else {
      // Enter new user details.
      UserHandler.USER_INDEX[userData.id] = {
        "password": userData.password
      };
      ChatHandler.CHAT_INDEX[userData.id] = {};

      await UserHandler.updateUserIndexFile();
      await ChatHandler.updateChatIndexFile(null);
      res.json({ status: true });
    }
  } catch (err: any) {
    console.error('Error handling user:', err.message);
    res.status(400).json({status: false});
  }
});

router.post("/user/chat", async (req, res) => {
  try {
    const userData = req.body.body;
    if (authenticateCredentials(userData.id, userData.password)) {
      await ChatHandler.updateChatIndexFile(userData);
      res.status(200).json({status: true});
    } else {
      res.status(400).json({status: false});
    }
  } catch (err: any) {
    console.log(`Error Handling Chat Session: ${err.message}`);
    res.status(400).json({status: false});
  }
})

function authenticateCredentials(id: string, password: string) {
  if (!id || !password) return false;

  const userId = UserHandler.USER_INDEX[id];
  
  if (userId) {
    return (id in UserHandler.USER_INDEX && password === userId.password)
  } else 
    return false;
}

export { router };
