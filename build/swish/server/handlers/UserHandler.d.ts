import type { UserIndex } from "../types/UserHandler.types.ts";
export declare let USER_INDEX: UserIndex;
/**
 * Checks if the directory are in order.
 */
export declare function checkDirectoryConfig(): Promise<void>;
/**
 * Creates the user index file and data store directory
 * if not already created.
 */
export declare function createUserIndexFile(): Promise<void>;
export declare function updateUserIndexFile(): Promise<void>;
//# sourceMappingURL=UserHandler.d.ts.map