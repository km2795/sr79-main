import http from "http";
import { Server } from "socket.io";
import express from 'express';
import * as DirectoryHandler from "../handlers/DirectoryHandler";
import * as ChatHandler from "../handlers/ChatHandler";
import * as UserHandler from "../handlers/UserHandler";

const router = express.Router();

let socketIo: Server | null = null;

/*
 * Serve Swish index
 */
router.get('/', (_req, res) => {
  res.sendFile('index.html', { root: './src/swish/dist' });
});

/**
 * Initialize the Swish service router.
 */
export async function initSwish(server: http.Server) {

  /*
   * Load the directory configurations.
   */
  await DirectoryHandler.loadDirectoryConfig();
  
  socketIo = new Server(server, {
    path: "/swish/user/chat",
    cors: { origin: "*" }
  });
  
  // On receiving a connection.
  socketIo.on("connection", (socket) => {
    console.log(`Socket Connected: ${socket.id}`);
 
    /*
     * User authentication event.
     */
    socket.on("chat:user", async (payload: any) => {
      try {
        const userData = payload;
        const reqUserId = userData.id;
        const UserId = UserHandler.USER_INDEX[userData.id]

        if (reqUserId && UserId && userData.id in UserHandler.USER_INDEX) {
          if ("password" in userData) {
            if (UserId["password"] === userData.password) {
              socket.join(reqUserId);
              socket.emit("chat:user", {
                status: true,
                message: "User Authenticated.",

                // If the authType is sign-in, then send the chat
                // history as well otherwise for sign-up empty list.
                chatHistory: (userData.authType === "sign-in")
                  ? ChatHandler.CHAT_INDEX[userData.id]
                  : []
              });
            } else {
              socket.emit("chat:user", { status: false, message: "Invalid Credentials." });
            }
          } else {
            // Return that the user exists, in case of normal user check.
            socket.emit("chat:user", { status: true });
          }
        } else {
          // Enter new user details.
          UserHandler.USER_INDEX[userData.id] = { "password": userData.password };
          ChatHandler.CHAT_INDEX[userData.id] = {};

          await UserHandler.updateUserIndexFile();
          await ChatHandler.updateChatIndexFile(null);

          socket.join(reqUserId);
          socket.emit("chat:user", { status: true });
        }
      } catch (err: any) {
        console.error('Error handling user:', err.message);
        socket.emit("chat:user", {status: false});
      }
    });
    
    /*
     * User exists check event.
     */
    socket.on("chat:checkUser", async (payload: any) => {
      try {
        if (payload.recipient in UserHandler.USER_INDEX) {
          socket.emit("chat:checkUser", { status: true });
        } else {
          socket.emit("chat:checkUser", { status: false });
        }
      } catch (error: any) {
        if (error instanceof Error) {
          console.log(`[chat:checkUser] Error accessing USER_INDEX: ${error.message}`);          
        } else {
          console.log(`[chat:checkUser] Unknown error occurred: ${error}`);
        }
        socket.emit("chat:checkUser", { status: null });
      }
    });
    
    /* 
     * Chat message receiving event.
     */
    socket.on("chat:message", async (payload: any) => {
      try {
        if (authenticateCredentials(payload.id, payload.password)) {
          await ChatHandler.updateChatIndexFile(payload);
          if (socketIo) {

            // Update the direction of the message before sending to the 
            // intended recipient.
            payload.direction = "recipient";

            // Relay to the intended recipient.
            socketIo.to(payload.recipient).emit("chat:message", payload);
          }
        } else {
          ;
        }
      } catch (err: any) {
        console.log(`Error Handling Chat Session: ${err.message}`);
      }
    });
  });
}

function authenticateCredentials(id: string, password: string) {
  if (!id || !password) return false;

  const userId = UserHandler.USER_INDEX[id];
  
  if (userId) {
    return (id in UserHandler.USER_INDEX && password === userId.password)
  } else 
    return false;
}

export { router };
