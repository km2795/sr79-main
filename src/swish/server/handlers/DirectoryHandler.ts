import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import type { UserIndex } from "../types/UserHandler.types";
import type { ChatIndex } from "../types/ChatHandler.types";

// Setup present directory.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Data Store directory. */
const DATA_STORE_DIR = path.join(__dirname, "..", ".data_store");

/* User Index. */
const USER_INDEX_FILE = path.join(DATA_STORE_DIR, "user_index.json");

/* Chat Index. */
const CHAT_INDEX_FILE = path.join(DATA_STORE_DIR, "chat_index.json");

export async function loadDirectoryConfig(): Promise<{ userIndex: UserIndex, chatIndex: ChatIndex }> {
  let userIndex: UserIndex = {};
  let chatIndex: ChatIndex = {};

  try {
    // Check if ".data_store" exists.
    await fs.access(DATA_STORE_DIR);

    // Check and load User Index.
    userIndex = await loadUserIndexFile();

    // Check and load Chat Index.
    chatIndex = await loadChatIndexFile();

  } catch (error: any) {
    if (error instanceof Error)
      console.log(`.data_store does not exists: ${error.message}\n`);
    else
      console.log(`Unknown error occurred while loading '.data_store': ${error}\n`);

    // Create the '.data_store' directory first.
    await fs.mkdir(DATA_STORE_DIR, { recursive: true });

    console.log("\n----Data Store established... ----\n");

    // Create User Index file.
    await createUserIndexFile(userIndex);

    // Create Chat Index file.
    await createChatIndexFile(chatIndex);
  }

  console.log("\n---- Directory Configurations Loaded ----\n");
  return { userIndex, chatIndex };
}

async function loadUserIndexFile(): Promise<UserIndex> {
  try {
    const data = await fs.readFile(USER_INDEX_FILE, "utf8");
    const index = JSON.parse(data);
    console.log("\n----USER INDEX Setup successfully. ----\n");
    return index;
  } catch (error: any) {
    if (error instanceof Error)
      console.log(`Internal error occurred: ${error.message}`);
    else
      console.log(`Unknown error occurred: ${error}`);
    throw error;
  }
}

async function loadChatIndexFile(): Promise<ChatIndex> {
  try {
    const data = await fs.readFile(CHAT_INDEX_FILE, "utf8");
    const index = JSON.parse(data);
    console.log("\n----CHAT INDEX Setup successfully. ----\n");
    return index;
  } catch (error: any) {
    if (error instanceof Error)
      console.log(`Internal error occurred: ${error.message}`);
    else
      console.log(`Unknown error occurred: ${error}`);
    throw error;
  }
}

/**
 * Creates the user index file and data store directory
 * if not already created.
 */
export async function createUserIndexFile(USER_INDEX: UserIndex) {
  try {
    await fs.writeFile(USER_INDEX_FILE, JSON.stringify(USER_INDEX), "utf8");
    console.log("\n---- USER INDEX created... ----\n");
  } catch (error: unknown) {
    if (error instanceof Error)
      console.log(`Internal error occurred: ${error.message}`);
    else
      console.log(`Unknown error occurred: ${error}`);
  }
}

/**
 * Creates the user index file and data store directory
 * if not already created.
 */
export async function createChatIndexFile(CHAT_INDEX: ChatIndex) {
  try {
    await fs.writeFile(CHAT_INDEX_FILE, JSON.stringify(CHAT_INDEX), "utf8");
    console.log("\n---- CHAT INDEX Created... ----\n");
  } catch (err: unknown) {
    if (err instanceof Error)
      console.log(`Internal error occurred: ${err.message}`);
    else
      console.log(`Unknown error occurred: ${err}`);
  }
}
