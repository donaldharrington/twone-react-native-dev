import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AuthScreen from '~screens/Auth';
import EnterBirthScreen from '~screens/Auth/EnterBirthday';
import EnterBlockScreen from '~screens/Auth/EnterBlock';
import EnterCodeScreen from '~screens/Auth/EnterCode';
import EnterNameScreen from '~screens/Auth/EnterName';
import EnterPasswordScreen from '~screens/Auth/EnterPassword';
import EnterPhoneScreen from '~screens/Auth/EnterPhone';
import EnterTroubleScreen from '~screens/Auth/EnterTrouble';
import EnterWelcomeScreen from '~screens/Auth/EnterWelcome';
import ForgotPasswordScreen from '~screens/Auth/Forgot';
import LoginScreen from '~screens/Auth/Login';
import ResetPasswordScreen from '~screens/Auth/ResetPassword';
import { AuthStackList } from '~types/navigation';

import MainNavigator from './MainNavigator';

const AuthStack = createStackNavigator<AuthStackList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animationEnabled: false,
      }}
    >
      <AuthStack.Screen name="AuthScreen" component={AuthScreen} />
      <AuthStack.Screen name="EnterName" component={EnterNameScreen} />
      <AuthStack.Screen name="EnterBirth" component={EnterBirthScreen} />
      <AuthStack.Screen name="EnterBlock" component={EnterBlockScreen} />
      <AuthStack.Screen name="EnterPhone" component={EnterPhoneScreen} />
      <AuthStack.Screen name="EnterPassword" component={EnterPasswordScreen} />
      <AuthStack.Screen name="EnterCode" component={EnterCodeScreen} />
      <AuthStack.Screen name="EnterTrouble" component={EnterTroubleScreen} />
      <AuthStack.Screen name="EnterWelcome" component={EnterWelcomeScreen} />
      <AuthStack.Screen name="Main" component={MainNavigator} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="Forgot" component={ForgotPasswordScreen} />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
