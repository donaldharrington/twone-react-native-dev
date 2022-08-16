import { CometChat } from '@cometchat-pro/react-native-chat';
import { ReactNode } from 'react';
import { GeoCoordinates } from 'react-native-geolocation-service';

import { Twone, Twoned } from './api/response.types';
import { AvatarType } from './avatar';

export type AuthTypes = 'login' | 'register' | 'forgot' | 'reset';

export type Gender =
  | 'None'
  | 'Female'
  | 'Male'
  | 'Non-binary'
  | 'Other'
  | 'Prefer not to say';

export type Pronouns =
  | 'None'
  | 'She/Her/Hers'
  | 'He/Him/His'
  | 'They/Them/Theirs'
  | 'Other'
  | 'Prefer not to say';

export type UserTypes = {
  id?: string;
  profileId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  username?: string;
  email?: string;
  profilePhoto?: string;
  phoneNumber?: string;
  gender?: Gender;
  avatar?: AvatarType;
  dob?: Date;
  pronoun?: Pronouns;
  displayDOB: boolean;
  displayGender: boolean;
  displayPronoun: boolean;
  password?: string;
  code?: string;
  connectedDate?: string;
};

export type GapTypes = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

export type RadioType = {
  id: string;
  value: string;
  label: string;
  selected?: boolean;
};

export type ColorType = {
  value: string;
  color: 'golden' | 'brown' | 'black' | 'red' | 'default' | 'empty';
};

export type AvatarModifyTypes = 'hair' | 'skin' | 'background';

export type IconOptsTypes = {
  icon: ReactNode;
  accessory?: ReactNode;
  value: string;
  label?: string;
};

export type VerifyTypes = 'email' | 'phone';

export type TimeSlotType = {
  id: string;
  value: string[];
  noon: 'am' | 'pm' | 'all';
  label: string;
};

export type TwoneType = {
  date?: Date;
  time?: TimeSlotType;
  location?: GeoCoordinates;
  address?: string;
  address1?: string;
  label?: string;
  twones?: Twone[];
  isTwoned?: boolean;
  created_at?: number;
};

export type Address = {
  id: string;
  text: string;
  place_name: string;
  latitude: number;
  longitude: number;
};

export type TwoneHistoryType = 'search' | 'twone' | 'twoned' | 'search_hide';

export type MessageType = {
  id: string;
  user?: UserTypes;
  content: string;
  created_at: string;
};

export type ChatType = {
  chatId: string;
  cometUser: CometChat.User;
  conversation?: CometChat.Conversation;
  userInfo: UserTypes;
};

export type RoomType = {
  id: string;
  user: UserTypes;
  twoned: Twoned;
};

export type ProfileType = {
  id?: string;
  name: string;
  age: number;
  avatar?: number | string;
  avatarName: string;
  title?: string;
};

export const TEXT_MESSAGE_RECEIVED = 'onTextMessageReceived';
export const MEDIA_MESSAGE_RECEIVED = 'onMediaMessageReceived';
export const CUSTOM_MESSAGE_RECEIVED = 'onCustomMessageReceived';
export const MESSAGE_DELIVERED = 'onMessagesDelivered';
export const MESSAGE_READ = 'onMessagesRead';
export const MESSAGE_DELETED = 'onMessageDeleted';
export const MESSAGE_EDITED = 'onMessageEdited';

export const USER_ONLINE = 'onUserOnline';
export const USER_OFFLINE = 'onUserOffline';
