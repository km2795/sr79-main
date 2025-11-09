import * as UserHandler from './handlers/UserHandler.ts';
import * as ChatHandler from './handlers/ChatHandler.ts';

export async function initSwish() {
  await UserHandler.checkDirectoryConfig();
  await ChatHandler.checkChatIndexFile();
}
