import path from "path";
import fs from "fs/promises";
import {fileURLToPath} from "url";


// Setup present directory.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Data Store directory. */
const DATA_STORE_DIR = path.join(__dirname, ".data_store");

/* User Index. */
const USER_INDEX_FILE = path.join(DATA_STORE_DIR, "user_index.json");


class UserHandler {

  constructor() {}

  /**
   * Checks if the directory are in order.
   */
  async checkDirectoryConfig(userIndex: {}) {
    try {
      // Check if ".data_store" exists.
      await fs.access(DATA_STORE_DIR);

      try {
        const data = await fs.readFile(USER_INDEX_FILE, "utf8");
        userIndex = JSON.parse(data);
        console.log("\n----user index setup successfully. ----\n");
        return userIndex;
      } catch (err) {
        console.log(`user_index.json not found: ${err.message}`);
        await this.createUserIndexFile({});
      }
    } catch (err) {
      console.log(`.data_store does not exists: ${err}`);
      await this.createUserIndexFile({});
    }

    console.log("\n---- Directory Configurations Loaded ----\n");
  }

  /**
   * Creates the user index file and data store directory
   * if not already created.
   */
  async createUserIndexFile(userIndex) {
    try {
      await fs.mkdir(DATA_STORE_DIR);
      console.log("\n----Data Store established... ----\n");

      await fs.writeFile(USER_INDEX_FILE, JSON.stringify(userIndex), "utf8");
      console.log("\n---- User Index created... ----\n");
    } catch (err) {
      console.log(`Internal error occurred: ${err.message}`);
    }
  }

  async updateUserIndexFile(userIndex) {
    try {
      await fs.writeFile(USER_INDEX_FILE, JSON.stringify(userIndex));
      console.log("\n---- USER INDEX updated... ---- \n");
    } catch (err) {
      console.log(`Internal error occurred: ${err.message})`);
    }
  }
}


export default UserHandler;
