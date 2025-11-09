import path from "path";
import fs from "fs/promises";
import {fileURLToPath} from "url";

// Setup present directory.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Data Store directory. */
const DATA_STORE_DIR = path.join(__dirname, ".data_store");

/* Chat Index. */
const CHAT_INDEX_FILE = path.join(DATA_STORE_DIR, "chat_index.json");

export let CHAT_INDEX = {};

/**
 * Checks if the directory are in order.
 */
export async function checkChatIndexFile() {
  try {
    const data = await fs.readFile(CHAT_INDEX_FILE, "utf8");
    CHAT_INDEX = JSON.parse(data);
    console.log("\n----CHAT INDEX Setup successfully. ----\n");

  } catch (err) {
    console.log(`chat_index.json not found: ${err.message}`);
    await this.createChatIndexFile({});
  }
}

/**
 * Creates the user index file and data store directory
 * if not already created.
 */
export async function createChatIndexFile() {
  try {
    await fs.writeFile(CHAT_INDEX_FILE, JSON.stringify(CHAT_INDEX), "utf8");
    console.log("\n---- CHAT INDEX Created... ----\n");
  } catch (err) {
    console.log(`Internal error occurred: ${err.message}`);
  }
}

/**
 * Updates the storage with the recent Chat data.
 */
export async function updateChatIndexFile(chat) {
  try {
    if (chat) {
      if (chat.recipient in CHAT_INDEX[chat.id]) {
        CHAT_INDEX[chat.id][chat.recipient]["preview"] = chat.message;
        CHAT_INDEX[chat.id][chat.recipient]["timestamp"] = chat.timestamp;
        CHAT_INDEX[chat.id][chat.recipient]["history"].push({
          "direction": "self",
          "timestamp": chat.timestamp,
          "message": chat.message
        });
      } else {
        CHAT_INDEX[chat.id][chat.recipient] = {
          "preview": chat.message,
          "timestamp": chat.timestamp,
          "history": [{
            "direction": "self",
            "timestamp": chat.timestamp,
            "message": chat.message
          }]
        }
      }

      if (chat.id in CHAT_INDEX[chat.recipient]) {
        CHAT_INDEX[chat.recipient][chat.id]["preview"] = chat.message;
        CHAT_INDEX[chat.recipient][chat.id]["timestamp"] = chat.timestamp;
        CHAT_INDEX[chat.recipient][chat.id]["history"].push({
          "direction": "recipient",
          "timestamp": chat.timestamp,
          "message": chat.message
        });
      } else {
        CHAT_INDEX[chat.recipient][chat.id] = {
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

    await fs.writeFile(CHAT_INDEX_FILE, JSON.stringify(CHAT_INDEX));
    console.log("\n---- CHAT INDEX Updated... ---- \n");
  } catch (err) {
    console.log(`Error Updating Chat Index: ${err.message}`);
  }
}
