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

export let USER_INDEX: UserIndex = {};
export let CHAT_INDEX: ChatIndex = {};

export async function loadDirectoryConfig(): Promise<void> {
  try {
    // Check if ".data_store" exists.
    await fs.access(DATA_STORE_DIR);

    // Check and load User Index.
    await loadUserIndexFile();

    // Check and load Chat Index.
    await loadChatIndexFile();

  } catch (error: any) {
    if (error instanceof Error)
      console.log(`.data_store does not exists: ${error.message}\n`);
    else
      console.log(`Unknown error occurred while loading '.data_store': ${error}\n`);

    // Create the '.data_store' directory first.
    await fs.mkdir(DATA_STORE_DIR);

    console.log("\n----Data Store established... ----\n");

    // Create User Index file.
    await createUserIndexFile();

    // Create Chat Index file.
    await createChatIndexFile();
  }
  
  console.log("\n---- Directory Configurations Loaded ----\n");
}

async function loadUserIndexFile() {
  try {
    const data = await fs.readFile(USER_INDEX_FILE, "utf8");
    USER_INDEX = JSON.parse(data);
    console.log("\n----USER INDEX Setup successfully. ----\n");
  } catch (error: any) {
    if (error instanceof Error)
      console.log(`Internal error occurred: ${error.message}`);
    else
      console.log(`Unknown error occurred: ${error}`);
  }
}

async function loadChatIndexFile() {
  try {
    const data = await fs.readFile(CHAT_INDEX_FILE, "utf8");
    CHAT_INDEX = JSON.parse(data);
    console.log("\n----CHAT INDEX Setup successfully. ----\n");
  } catch (error: any) {
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
export async function createUserIndexFile() {
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
export async function createChatIndexFile() {
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
