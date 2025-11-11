import type { ChatIndex, ChatInfo } from "../types/ChatHandler.types";
export declare let CHAT_INDEX: ChatIndex;
/**
 * Checks if the directory are in order.
 */
export declare function checkChatIndexFile(): Promise<void>;
/**
 * Creates the user index file and data store directory
 * if not already created.
 */
export declare function createChatIndexFile(): Promise<void>;
/**
 * Updates the storage with the recent Chat data.
 */
export declare function updateChatIndexFile(chat: ChatInfo | null): Promise<void>;
//# sourceMappingURL=ChatHandler.d.ts.map