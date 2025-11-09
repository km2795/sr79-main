import path from "path";
import fs from "fs/promises";
import {fileURLToPath} from "url";


// Setup present directory.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Data Store directory. */
const DATA_STORE_DIR = path.join(__dirname, "..", ".data_store");

/* User Index. */
const USER_INDEX_FILE = path.join(DATA_STORE_DIR, "user_index.json");

export let USER_INDEX = {};

/**
 * Checks if the directory are in order.
 */
export async function checkDirectoryConfig() {
  try {
    // Check if ".data_store" exists.
    await fs.access(DATA_STORE_DIR);

    try {
      const data = await fs.readFile(USER_INDEX_FILE, "utf8");
      USER_INDEX = JSON.parse(data);
      console.log("\n----USER INDEX Setup successfully. ----\n");

    } catch (err) {
      console.log(`user_index.json not found: ${err.message}`);
      await createUserIndexFile();
    }
  } catch (err) {
    console.log(`.data_store does not exists: ${err}`);
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
  } catch (err) {
    console.log(`Internal error occurred: ${err.message}`);
  }
}

export async function updateUserIndexFile() {
  try {
    await fs.writeFile(USER_INDEX_FILE, JSON.stringify(USER_INDEX));
    console.log("\n---- USER INDEX updated... ---- \n");
  } catch (err) {
    console.log(`Internal error occurred: ${err.message})`);
  }
}
