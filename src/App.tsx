import { CometChat } from '@cometchat-pro/react-native-chat';
import { COMECHAT_APP_ID, COMECHAT_REGION } from '@env';
import React, { ReactNode, Suspense, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import { RecoilRoot } from 'recoil';

import { TWIcons, TWLoadingIndicator, TWToast } from '~components';
import AppNavigator from '~navigators/AppNavigator';
import { hasNotch, verticalScale } from '~utils/dimension';

const App: () => ReactNode = () => {
  const initComeChat = () => {
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(COMECHAT_REGION)
      .build();

    CometChat.init(COMECHAT_APP_ID, appSetting).then(
      () => {
        console.log('Initialization completed successfully');
        // You can now call login function.
      },
      error => {
        console.log('Initialization failed with error:', error);
        // Check the reason for error and take appropriate action.
      },
    );
  };

  useEffect(() => {
    initComeChat();
  }, []);

  return (
    <Suspense fallback={<TWLoadingIndicator visible={true} />}>
      <RecoilRoot>
        <SafeAreaProvider>
          <ToastProvider
            dangerIcon={<TWIcons.error />}
            renderToast={toastOpt => <TWToast {...toastOpt} />}
            offsetTop={verticalScale(hasNotch ? 44 : 30)}
          >
            <StatusBar barStyle={'dark-content'} />
            <AppNavigator />
          </ToastProvider>
        </SafeAreaProvider>
      </RecoilRoot>
    </Suspense>
  );
};

export default App;
