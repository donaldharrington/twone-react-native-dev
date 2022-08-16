import { CometChat } from '@cometchat-pro/react-native-chat';

export class UserListManager {
  usersRequest: CometChat.UsersRequest | null = null;

  userListenerId = `userlist_${new Date().getTime()}`;

  constructor() {
    this.intializeUserRequest();
  }

  intializeUserRequest() {
    this.usersRequest = new CometChat.UsersRequestBuilder()
      .setLimit(30)
      .friendsOnly(true)
      .build();
  }

  fetchNextUsers() {
    return this.usersRequest?.fetchNext();
  }

  attachListeners(callback: (arg0: unknown) => void) {
    CometChat.addUserListener(
      this.userListenerId,
      new CometChat.UserListener({
        onUserOnline: (onlineUser: unknown) => {
          /* when someuser/friend comes online, user will be received here */
          callback(onlineUser);
        },
        onUserOffline: (offlineUser: unknown) => {
          /* when someuser/friend went offline, user will be received here */
          callback(offlineUser);
        },
      }),
    );
  }

  removeListeners() {
    CometChat.removeUserListener(this.userListenerId);
  }
}
