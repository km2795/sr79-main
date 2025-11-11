import path from "path";
import fs from "fs/promises";
import {fileURLToPath} from "url";
import type {UserIndex } from "../types/UserHandler.types.ts";


// Setup present directory.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Data Store directory. */
const DATA_STORE_DIR = path.join(__dirname, "..", ".data_store");

/* User Index. */
const USER_INDEX_FILE = path.join(DATA_STORE_DIR, "user_index.json");

export let USER_INDEX: UserIndex = {};

/**
 * Checks if the directory are in order.
 */
export async function checkDirectoryConfig(): Promise<void> {
  try {
    // Check if ".data_store" exists.
    await fs.access(DATA_STORE_DIR);

    try {
      const data = await fs.readFile(USER_INDEX_FILE, "utf8");
      USER_INDEX = JSON.parse(data);
      console.log("\n----USER INDEX Setup successfully. ----\n");

    } catch (error: unknown) {
      if (error instanceof Error)
        console.log(`user_index.json not found: ${error.message}`);
      else
        console.log(`Unknown error occurred: ${error}`);
      
      /* At least create the file, If not sure what needs to be done. */
      await createUserIndexFile();
    }
  } catch (error: unknown) {
    if (error instanceof Error)
      console.log(`.data_store does not exists: ${error.message}`);
    else
      console.log(`Unknown error occurred: ${error}`);
    await createUserIndexFile();
  }

  console.log("\n---- Directory Configurations Loaded ----\n");
}

/**
 * Creates the user index file and data store directory
 * if not already created.
 */
export async function createUserIndexFile() {
  try {
    await fs.mkdir(DATA_STORE_DIR);
    console.log("\n----Data Store established... ----\n");

    await fs.writeFile(USER_INDEX_FILE, JSON.stringify(USER_INDEX), "utf8");
    console.log("\n---- User Index created... ----\n");
  } catch (error: unknown) {
    if (error instanceof Error)
      console.log(`Internal error occurred: ${error.message}`);
    else
      console.log(`Unknown error occurred: ${error}`);
  }
}

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
