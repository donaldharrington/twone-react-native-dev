import { CometChat } from '@cometchat-pro/react-native-chat';

class CometChatManager {
  loggedInUser: CometChat.User | null = null;

  isUserLoggedIn!: NodeJS.Timer;

  getLoggedInUser(): Promise<CometChat.User | null> {
    const timerCounter = 10000;
    let timer = 0;

    return new Promise((resolve, reject) => {
      if (timerCounter === timer) reject(`timer reached ${timerCounter}`);

      if (this.loggedInUser) resolve(this.loggedInUser);

      if (!CometChat.isInitialized()) reject('CometChat not initialized');

      this.isUserLoggedIn = setInterval(() => {
        CometChat.getLoggedinUser().then(
          (user: CometChat.User | null) => {
            this.loggedInUser = user;
            clearInterval(this.isUserLoggedIn);
            resolve(user);
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error: any) => {
            reject(error);
          },
        );

        timer += 100;
      }, 100);
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  static blockUsers = (userList: string[]): Promise<Object> => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const promise = new Promise<Object>((resolve, reject) => {
      CometChat.blockUsers(userList).then(
        // eslint-disable-next-line @typescript-eslint/ban-types
        (list: Object) => resolve(list),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error: any) => reject(error),
      );
    });

    return promise;
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  static unblockUsers = (userList: string[]): Promise<Object> => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const promise = new Promise<Object>((resolve, reject) => {
      CometChat.unblockUsers(userList).then(
        // eslint-disable-next-line @typescript-eslint/ban-types
        (list: Object) => resolve(list),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error: any) => reject(error),
      );
    });

    return promise;
  };
}

export default CometChatManager;
