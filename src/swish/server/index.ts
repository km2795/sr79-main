import * as UserHandler from './handlers/UserHandler';
import * as ChatHandler from './handlers/ChatHandler';

export async function initSwish() {
  await UserHandler.checkDirectoryConfig();
  await ChatHandler.checkChatIndexFile();
}
