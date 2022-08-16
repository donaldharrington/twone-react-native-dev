import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';

import ProfileEditScreen from '~screens/Profile/Edit';
import EditGenderSceen from '~screens/Profile/Edit/EditGender';
import EditPhoto from '~screens/Profile/Edit/EditPhoto';
import EditPronounsSceen from '~screens/Profile/Edit/EditPronouns';
import { ProfileStackList } from '~types/navigation';

const ProfileStack = createStackNavigator<ProfileStackList>();

const ProfileNavigator = () => (
  <ProfileStack.Navigator
    initialRouteName="ProfileEdit"
    screenOptions={{ headerShown: false, gestureEnabled: false }}
  >
    <ProfileStack.Screen name="ProfileEdit" component={ProfileEditScreen} />

    <ProfileStack.Group
      screenOptions={{
        presentation: 'modal',
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <ProfileStack.Screen name="EditGender" component={EditGenderSceen} />
      <ProfileStack.Screen name="EditPronouns" component={EditPronounsSceen} />
      <ProfileStack.Screen name="EditPhoto" component={EditPhoto} />
    </ProfileStack.Group>
  </ProfileStack.Navigator>
);

export default ProfileNavigator;
