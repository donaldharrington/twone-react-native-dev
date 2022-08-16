import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useRecoilValue } from 'recoil';

import useGlobal from '~recoil/global';
import { isLoggedIn } from '~recoil/global/withGlobal';

import TWLoadingIndicator from '../components/TWLoadingIndicator';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import * as RootNav from './NavigationRef';

const AppNavigator = () => {
  const IsUserLoggedIn = useRecoilValue(isLoggedIn);
  const { loadingState } = useGlobal();

  return (
    <NavigationContainer ref={RootNav.navigationRef}>
      {loadingState.loading && <TWLoadingIndicator visible={true} />}
      {IsUserLoggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
