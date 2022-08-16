import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  Address,
  AuthTypes,
  ChatType,
  RoomType,
  TwoneHistoryType,
  VerifyTypes,
} from '~types';

import { Twone } from './api/response.types';

export type AuthStackList = {
  AuthScreen?: {
    isAccountDeleted?: boolean;
  };
  EnterName: undefined;
  EnterBirth: undefined;
  EnterBlock: undefined;
  EnterPhone: {
    authType?: AuthTypes;
  };
  EnterCode: {
    phoneNumber?: string;
    authType?: AuthTypes;
    verify?: VerifyTypes;
  };
  EnterPassword: {
    authType?: AuthTypes;
    verify?: VerifyTypes;
  };
  LoginScreen: {
    authType?: AuthTypes;
    resetTryCount?: boolean;
  };
  Forgot: undefined;
  ResetPassword: undefined;
  EnterTrouble: undefined;
  EnterWelcome: undefined;
  Main: undefined;
};

export type AuthNavProps = NativeStackNavigationProp<
  AuthStackList,
  'EnterPhone'
>;

export type AuthRouteProps = RouteProp<{
  params: {
    isAccountDeleted?: boolean;
    authType?: AuthTypes;
    phoneNumber?: string;
    verify?: VerifyTypes;
  };
}>;

export type MainStackList = {
  MainTab: undefined;
  SettingsStack: undefined;
  AvatarConfStack?: { screen: string; hasAvatar?: boolean };
  ProfileEditStack: undefined;
  TwoneConf: { isTwoned: boolean };
  TwonedConf: { isTwoned: boolean };
  SearchAddress: { isTwoned: boolean };
  SelectDate: undefined;
  SelectLocation: { location: Address; isTwoned: boolean };
  MyHistory: undefined;
  ConnectDetail: { twone: Twone };
  ProfileShare: { twone: Twone };
  ChatDetail: { chatInfo?: ChatType; isNew?: boolean };
  ChatMore: { chatInfo: ChatType; twone: Twone };
  SharedProfile: { roomInfo?: RoomType; isViewOnly?: boolean };
};

export type MainNavProps = NativeStackNavigationProp<MainStackList, 'MainTab'>;

export type MainRouteProps = RouteProp<{
  params: {
    isTwoned: boolean;
    pageType?: TwoneHistoryType;
    chatInfo: ChatType;
    roomInfo: RoomType;
    isNew?: boolean;
    isViewOnly?: boolean;
    twone?: Twone;
  };
}>;

export type LocationProps = RouteProp<{
  params: {
    location?: Address;
    isTwoned: boolean;
  };
}>;

export type TabStackList = {
  Twone: undefined;
  Profile: undefined;
  Chat: undefined;
};

export type TabNavProps = NativeStackNavigationProp<TabStackList, 'Twone'>;

export type SettingsStackList = {
  Settings: undefined;
  AddEmail?: {
    email?: string;
  };
  ConfirmEmail: undefined;
  ResetPassword: { authType?: AuthTypes };
  // EnterCode: { authType?: AuthTypes };
  Permissions: undefined;
  PushNotification: undefined;
  DeleteAccount: undefined;
  Feedback: undefined;
};

export type SettingsNavProps = NativeStackNavigationProp<
  SettingsStackList,
  'Settings'
>;

export type SettingsRouteProps = RouteProp<{
  params: {
    email?: string;
    authType?: AuthTypes;
  };
}>;

export type ProfileStackList = {
  ProfileEdit: undefined;
  EditGender: undefined;
  EditPhoto: undefined;
  EditPronouns: undefined;
};

export type ProfileNavProps = NativeStackNavigationProp<
  ProfileStackList,
  'ProfileEdit'
>;

export type AvatarStackList = {
  AvatarConfig: undefined;
  StartUp: undefined;
  AvatarProfile: undefined;
  Profile: undefined;
};

export type AvatarNavProps = NativeStackNavigationProp<
  AvatarStackList,
  'AvatarConfig'
>;
