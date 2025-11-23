import path from "path";
import fs from "fs/promises";
import {fileURLToPath} from "url";
import type { ChatIndex, ChatInfo } from "../types/ChatHandler.types";

// Setup present directory.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Data Store directory. */
const DATA_STORE_DIR = path.join(__dirname, "..", ".data_store");

/* Chat Index. */
const CHAT_INDEX_FILE = path.join(DATA_STORE_DIR, "chat_index.json");

export let CHAT_INDEX: ChatIndex = {};


/**
 * Updates the storage with the recent Chat data.
 */
export async function updateChatIndexFile(chat: ChatInfo | null) {
  try {
    if (chat) {
      const userId = CHAT_INDEX[chat.id];
      if (userId) {
        const recipientId = userId[chat.recipient];
        if (recipientId && chat.recipient in userId) {
          recipientId["preview"] = chat.message;
          recipientId["timestamp"] = chat.timestamp;
          recipientId["history"].push({
            "direction": "self",
            "timestamp": chat.timestamp,
            "message": chat.message
          });
        } else {
          userId[chat.recipient] = {
            "preview": chat.message,
            "timestamp": chat.timestamp,
            "history": [{
              "direction": "self",
              "timestamp": chat.timestamp,
              "message": chat.message
            }]
          }
        }
      }
      
      const recipientId = CHAT_INDEX[chat.recipient];
      if (recipientId) {
        const userId = recipientId[chat.id];
        if (userId && chat.id in recipientId) {
          if (userId && chat.id in recipientId)
          userId["preview"] = chat.message;
          userId["timestamp"] = chat.timestamp;
          userId["history"].push({
            "direction": "recipient",
            "timestamp": chat.timestamp,
            "message": chat.message
          });
        } else {
          recipientId[chat.id] = {
            "preview": chat.message,
            "timestamp": chat.timestamp,
            "history": [{
              "direction": "recipient",
              "timestamp": chat.timestamp,
              "message": chat.message
            }]
          }
        }
      }
    }

    await fs.writeFile(CHAT_INDEX_FILE, JSON.stringify(CHAT_INDEX));
    console.log("\n---- CHAT INDEX Updated... ---- \n");
  } catch (err: unknown) {
    if (err instanceof Error)
      console.log(`Error Updating Chat Index: ${err.message}`);
    else
      console.log(`Unknown error occurred: ${err}`);
  }
}
