import express from 'express';
import * as UserHandler from "../UserHandler.ts";

const router = express.Router();

// Serve Swish index
router.get('/', (req, res) => {
  res.sendFile('index.html', { root: './src/swish' });
});

// Handle user operations
router.post('/user', async (req, res) => {
  try {
    const userData = req.body.body;

    if (userData.id in UserHandler.USER_INDEX) {
      // If password field exists in the payload, then check for authenticity.
      if ("password" in userData) {
        if (UserHandler.USER_INDEX[userData.id] === userData.password) {
          res.json({
            status: true,
            message: "User Authenticated."
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
      UserHandler.USER_INDEX[userData.id] = userData.password;
      await UserHandler.updateUserIndexFile();
      res.json({ status: true });
    }
  } catch (error) {
    console.error('Error handling user:', error);
    res.status(400).json({ status: false });
  }
});

export { router };