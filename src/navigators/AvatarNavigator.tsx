import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AvatarConfigScreen from '~screens/Profile/Avatar';
import AvatarProfileScreen from '~screens/Profile/Avatar/AvatarProfile';
import AvatarStartUpScreen from '~screens/Profile/Avatar/StartUp';
import { AvatarStackList } from '~types/navigation';

const AvatarStack = createStackNavigator<AvatarStackList>();

const AvatarNavigator = () => (
  <AvatarStack.Navigator
    initialRouteName="AvatarConfig"
    screenOptions={{ headerShown: false, gestureEnabled: false }}
  >
    <AvatarStack.Screen name="AvatarConfig" component={AvatarConfigScreen} />
    <AvatarStack.Screen name="StartUp" component={AvatarStartUpScreen} />
    <AvatarStack.Screen name="AvatarProfile" component={AvatarProfileScreen} />
  </AvatarStack.Navigator>
);

export default AvatarNavigator;
