import {
  AvatarAccessories,
  AvatarBackgroundColor,
  AvatarColor,
  AvatarFacialHair,
  AvatarHair,
  AvatarSkin,
} from '~types/avatar';

export type SignUpBody = {
  name: string;
  password: string;
  email?: string;
  preferredUsername?: string;
  givenName?: string;
  familyName?: string;
  username: string;
  phoneNumber?: string;
  dob?: string;
};

export type SendCodeBody = {
  code?: string;
  username: string;
  newPassword?: string;
};

export type LoginBody = {
  name: string;
  password: string;
};

export type UserBody = {
  firstName?: string;
  pronoun?: string;
  gender?: string;
  profilePhoto?: string;
  username: string;
  password: string;
  email?: string;
};

export type ProfileBody = {
  avatar?: string;
  avatarSkin?: AvatarSkin;
  avatarBackgroundColor?: AvatarBackgroundColor;
  avatarAccessories?: AvatarAccessories;
  avatarHair?: AvatarHair;
  avatarFacialHair?: AvatarFacialHair;
  avatarHairColor?: AvatarColor;
  displayDOB?: boolean;
  displayGender?: boolean;
  displayPronoun?: boolean;
};

export type ResetPasswordBody = {
  username: string;
  oldPassword: string;
  newPassword: string;
};

export type TwoneBody = {
  owner: string;
  howWeMet: string;
  date: string;
  time: string;
  location: string;
  coordinates: string;
};

export type TwonedBody = {
  user: string;
  owner: string;
  howWeMet: string;
  twoneId: string;
  date: string;
  time: string;
  location: string;
  coordinates: string;
};

export type ChatBody = {
  twone: string;
  active: boolean;
};

export type ChatParticipantBody = {
  chat: string;
  user: string;
};

export type ReportBody = {
  owner: string;
  chat: string;
  reportedUser: string;
  cause: string;
};
