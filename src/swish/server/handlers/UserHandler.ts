import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import type { UserIndex } from "../types/UserHandler.types.ts";


// Setup present directory.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Data Store directory. */
const DATA_STORE_DIR = path.join(__dirname, "..", ".data_store");

/* User Index. */
const USER_INDEX_FILE = path.join(DATA_STORE_DIR, "user_index.json");

export let USER_INDEX: UserIndex = {};

/**
 * Updates the storage with user data.
 */
export async function updateUserIndexFile() {
  try {
    await fs.writeFile(USER_INDEX_FILE, JSON.stringify(USER_INDEX));
    console.log("\n---- USER INDEX updated... ---- \n");
  } catch (error: unknown) {
    if (error instanceof Error)
      console.log(`Internal error occurred: ${error.message})`);
    else 
      console.log(`Unknown error occurred: ${error}`)
  }
}
