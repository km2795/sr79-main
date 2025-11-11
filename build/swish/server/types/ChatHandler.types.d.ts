/**
 * For individual message item.
 */
export interface MessageItem {
    direction: "self" | "recipient";
    timestamp: number | string;
    message: string;
}
/**
 * For a Chat or Thread (multiple messages to same recipient).
 */
export interface Thread {
    preview: string;
    timestamp: number | string;
    history: MessageItem[];
}
/**
 * For whole index.
 */
export interface ChatIndex {
    [userId: string]: {
        [recipientId: string]: Thread;
    };
}
/**
 * Chat Info received from the client.
 */
export interface ChatInfo {
    id: string;
    password: string;
    recipient: string;
    message: string;
    timestamp: string;
}
//# sourceMappingURL=ChatHandler.types.d.ts.map