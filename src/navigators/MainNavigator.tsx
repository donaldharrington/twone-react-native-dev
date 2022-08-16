import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';

import ChatDetailScreen from '~screens/Chat/Detail';
import ChatMoreScreen from '~screens/Chat/More';
import SharedProfileScreen from '~screens/Chat/Profile';
import ConnectDetailScreen from '~screens/Main/ConnectDetail';
import MyHistoryScreen from '~screens/Main/MyHistory';
import ProfileShareScreen from '~screens/Main/ProfileShare';
import SearchAddressScreen from '~screens/Main/SearchAddress';
import SelectDateTimeScreen from '~screens/Main/SelectDate';
import SelectLocationScreen from '~screens/Main/SelectLocation';
import TwoneScreen from '~screens/Main/Twone';
import TwonedScreen from '~screens/Main/Twoned';
import { MainStackList } from '~types/navigation';

import AvatarNavigator from './AvatarNavigator';
import ProfileNavigator from './ProfileNavigator';
import SettingsNavigator from './SettingsNavigator';
import TabNavigator from './TabNavigator';

const MainStack = createStackNavigator<MainStackList>();

const MainNavigator = () => (
  <MainStack.Navigator
    screenOptions={{ headerShown: false, gestureEnabled: false }}
  >
    <MainStack.Screen name="MainTab" component={TabNavigator} />
    <MainStack.Screen name="SettingsStack" component={SettingsNavigator} />
    <MainStack.Screen name="AvatarConfStack" component={AvatarNavigator} />
    <MainStack.Screen name="ProfileEditStack" component={ProfileNavigator} />
    <MainStack.Screen
      name="TwoneConf"
      component={TwoneScreen}
      options={{ animationEnabled: true }}
    />
    <MainStack.Screen
      name="TwonedConf"
      component={TwonedScreen}
      options={{ animationEnabled: true }}
    />
    <MainStack.Screen name="SearchAddress" component={SearchAddressScreen} />
    <MainStack.Group
      screenOptions={{
        presentation: 'modal',
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <MainStack.Screen name="SelectDate" component={SelectDateTimeScreen} />
      <MainStack.Screen name="ProfileShare" component={ProfileShareScreen} />
      <MainStack.Screen name="SharedProfile" component={SharedProfileScreen} />
    </MainStack.Group>
    <MainStack.Screen name="SelectLocation" component={SelectLocationScreen} />
    <MainStack.Screen name="MyHistory" component={MyHistoryScreen} />
    <MainStack.Screen name="ConnectDetail" component={ConnectDetailScreen} />
    <MainStack.Screen name="ChatDetail" component={ChatDetailScreen} />
    <MainStack.Screen
      name="ChatMore"
      component={ChatMoreScreen}
      options={{ animationEnabled: false }}
    />
  </MainStack.Navigator>
);

export default MainNavigator;
