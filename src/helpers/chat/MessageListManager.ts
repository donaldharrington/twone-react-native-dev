import { CometChat } from '@cometchat-pro/react-native-chat';

import {
  MEDIA_MESSAGE_RECEIVED,
  MESSAGE_DELIVERED,
  MESSAGE_READ,
  TEXT_MESSAGE_RECEIVED,
} from '~types';

export class MessageListManager {
  item = {};

  categories = [
    CometChat.CATEGORY_MESSAGE,
    CometChat.CATEGORY_CUSTOM,
    CometChat.CATEGORY_ACTION,
    CometChat.CATEGORY_CALL,
  ];

  types = [
    CometChat.MESSAGE_TYPE.TEXT,
    CometChat.MESSAGE_TYPE.IMAGE,
    CometChat.MESSAGE_TYPE.VIDEO,
    CometChat.MESSAGE_TYPE.AUDIO,
    CometChat.MESSAGE_TYPE.FILE,
    CometChat.CALL_TYPE.AUDIO,
    CometChat.CALL_TYPE.VIDEO,
  ];

  limit = 30;

  msgListenerId = `message_${new Date().getTime()}`;

  messageRequest: CometChat.MessagesRequest | undefined;

  constructor(item: CometChat.User) {
    this.item = item;

    this.buildRequestBuilder(item);
  }

  buildRequestBuilder = (item: CometChat.User) => {
    // const messageFilterManager = new MessageFilter(context);
    // const categories = await messageFilterManager.getCategories();
    // const types = messageFilterManager.getTypes();
    this.messageRequest = new CometChat.MessagesRequestBuilder()
      .setUID(item.getUid())
      .setCategories(this.categories)
      .setTypes(this.types)
      .hideReplies(true)
      .setLimit(this.limit)
      .build();
  };

  fetchPreviousMessages() {
    return this.messageRequest?.fetchPrevious();
  }

  attachListeners(callback: (key: string, item: unknown) => void) {
    CometChat.addMessageListener(
      this.msgListenerId,
      new CometChat.MessageListener({
        onTextMessageReceived: (textMessage: CometChat.BaseMessage) => {
          callback(TEXT_MESSAGE_RECEIVED, textMessage);
        },
        onMediaMessageReceived: (mediaMessage: CometChat.BaseMessage) => {
          callback(MEDIA_MESSAGE_RECEIVED, mediaMessage);
        },
        onMessagesDelivered: (messageReceipt: CometChat.User) => {
          callback(MESSAGE_DELIVERED, messageReceipt);
        },
        onMessagesRead: (messageReceipt: CometChat.User) => {
          callback(MESSAGE_READ, messageReceipt);
        },
      }),
    );
  }

  removeListeners() {
    CometChat.removeMessageListener(this.msgListenerId);
  }
}
