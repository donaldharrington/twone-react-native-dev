import { CometChat } from '@cometchat-pro/react-native-chat';

import {
  CUSTOM_MESSAGE_RECEIVED,
  MEDIA_MESSAGE_RECEIVED,
  TEXT_MESSAGE_RECEIVED,
  USER_OFFLINE,
  USER_ONLINE,
} from '~types';

export class ConversationListManager {
  conversationRequest: CometChat.ConversationsRequest | null = null;

  conversationListenerId = `chatlist_${new Date().getTime()}`;

  userListenerId = `chatlist_user_${new Date().getTime()}`;

  constructor() {
    this.conversationRequest = new CometChat.ConversationsRequestBuilder()
      .setConversationType(CometChat.ACTION_TYPE.TYPE_USER)
      .setLimit(30)
      .build();
  }

  refreshRequest() {
    this.conversationRequest = new CometChat.ConversationsRequestBuilder()
      .setConversationType(CometChat.ACTION_TYPE.TYPE_USER)
      .setLimit(30)
      .build();
  }

  fetchNextConversation() {
    return this.conversationRequest?.fetchNext();
  }

  attachListeners(
    callback: (
      key: string,
      user: CometChat.User | null,
      item: CometChat.BaseMessage | null,
    ) => void,
  ) {
    CometChat.addUserListener(
      this.userListenerId,
      new CometChat.UserListener({
        onUserOnline: (onlineUser: CometChat.User) => {
          /* when someuser/friend comes online, user will be received here */
          callback(USER_ONLINE, onlineUser, null);
        },
        onUserOffline: (offlineUser: CometChat.User) => {
          /* when someuser/friend went offline, user will be received here */
          callback(USER_OFFLINE, offlineUser, null);
        },
      }),
    );

    CometChat.addMessageListener(
      this.conversationListenerId,
      new CometChat.MessageListener({
        onTextMessageReceived: (textMessage: CometChat.BaseMessage) => {
          callback(TEXT_MESSAGE_RECEIVED, null, textMessage);
        },
        onMediaMessageReceived: (mediaMessage: CometChat.BaseMessage) => {
          callback(MEDIA_MESSAGE_RECEIVED, null, mediaMessage);
        },
        onCustomMessageReceived: (customMessage: CometChat.BaseMessage) => {
          callback(CUSTOM_MESSAGE_RECEIVED, null, customMessage);
        },
      }),
    );
  }

  removeListeners() {
    CometChat.removeMessageListener(this.conversationListenerId);
    CometChat.removeUserListener(this.userListenerId);
  }
}
