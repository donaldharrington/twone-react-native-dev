import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';

import SettingsScreen from '~screens/Profile/Settings';
import DeleteAccountScreen from '~screens/Profile/Settings/DeleteAccount';
import AddEmailScreen from '~screens/Profile/Settings/Email';
import ConfirmEmailScreen from '~screens/Profile/Settings/Email/ConfirmEmailScreen';
import FeedbackScreen from '~screens/Profile/Settings/Feedback';
import ResetPasswordScreen from '~screens/Profile/Settings/Password';
import PermissionsScreen from '~screens/Profile/Settings/Permissions';
import PushNotificationScreen from '~screens/Profile/Settings/PushNotification';
import { SettingsStackList } from '~types/navigation';

const SettingStack = createStackNavigator<SettingsStackList>();

const SettingsNavigator = () => (
  <SettingStack.Navigator
    initialRouteName="Settings"
    screenOptions={{ headerShown: false }}
  >
    <SettingStack.Screen name="Settings" component={SettingsScreen} />
    <SettingStack.Screen name="AddEmail" component={AddEmailScreen} />
    <SettingStack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />

    <SettingStack.Screen name="Permissions" component={PermissionsScreen} />
    <SettingStack.Screen
      name="PushNotification"
      component={PushNotificationScreen}
    />
    <SettingStack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
    <SettingStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    <SettingStack.Group
      screenOptions={{
        presentation: 'modal',
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <SettingStack.Screen name="Feedback" component={FeedbackScreen} />
    </SettingStack.Group>
  </SettingStack.Navigator>
);

export default SettingsNavigator;
