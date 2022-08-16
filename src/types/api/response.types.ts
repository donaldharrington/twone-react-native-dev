import { Gender, Pronouns, UserTypes } from '~types';
import {
  AvatarAccessories,
  AvatarBackgroundColor,
  AvatarColor,
  AvatarFacialHair,
  AvatarHair,
  AvatarSkin,
} from '~types/avatar';

export type LoginResponse = {
  authenticateUser: TokenData;
  clockDrift: number;
};

export type TokenData = {
  idToken: {
    jwtToken: string;
    payload: IdTokenPayload;
  };
  refreshToken: {
    token: string;
  };
  accessToken: {
    jwtToken: string;
    payload: AccessTokenPayload;
  };
};

export type AccessTokenPayload = {
  sub: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  iss: string;
  exp: number;
  iat: number;
  jti: string;
  client_id: string;
  username: string;
};

export type IdTokenPayload = {
  sub: string;
  email_verified: boolean;
  iss: string;
  phone_number_verified: boolean;
  'cognito:username': string;
  preferred_username: string;
  given_name: string;
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: number;
  name: string;
  phone_number: string;
  exp: number;
  iat: number;
  family_name: string;
  email: string;
};

export type SignUpResponse = {
  cogitoUser: CogitoUser;
  user: User;
  profile: Profile;
};

export type UserResponse = {
  user: User;
};

export type ProfileResponse = {
  profile: Profile;
};

export type NearbyTwonesResponse = {
  nearByTwones: Array<Twone>;
};

export type TwonesResponse = {
  twones: Array<Twone>;
  twone?: Array<Twone>;
};

export type TwoneResponse = {
  twone: Twone;
};

export type TwonedResponse = {
  twoned: Twoned;
};

export type ChatResponse = {
  chat: Chat;
};

export type ChatsResponse = {
  chats: Chat[];
};

export type ParticipantResponse = {
  participant: Participant;
};

export type ParticipantsResponse = {
  participants: Participant[];
};

type Profile = {
  avatar?: string;
  avatarSkin?: AvatarSkin;
  owner: string;
  avatarBackgroundColor?: AvatarBackgroundColor;
  avatarAccessories?: AvatarAccessories;
  avatarHair?: AvatarHair;
  avatarFacialHair: AvatarFacialHair;
  avatarHairColor: AvatarColor;
  deleteAt?: string;
  id: string;
  displayDOB: boolean;
  displayGender: boolean;
  displayPronoun: boolean;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  email: string;
  profilePhoto?: string;
  pronoun?: Pronouns;
  dob?: string;
  gender?: Gender;
  deleteAt?: string;
  createdAt: string;
  updatedAt: string;
};

type CogitoUser = {
  user: {
    username: string;
    pool: {
      userPoolId: string;
      clientId: string;
      client: Client;
      advancedSecurityDataCollectionFlag: boolean;
    };
    Session?: Record<string, never>;
    client: Client;
    signInUserSession?: Record<string, never>;
    authenticationFlowType: string;
    keyPrefix: string;
    userDataKey: string;
  };
  userConfirmed: boolean;
  userSub: string;
  codeDeliveryDetails: {
    AttributeName: string;
    DeliveryMedium: string;
    Destination: string;
  };
};

type Client = {
  endpoint: string;
  fetchOptions: FetchOptions;
};

export type Twone = {
  id: string;
  howWeMet: string;
  date: string;
  time: string;
  location: string;
  coordinates?: string;
  createdAt: string;
  updatedat: string;
  deleteAt?: string;
  owner?: UserTypes;
  twoneds?: Twoned[];
  chats?: Chat[];
};

export type Twoned = {
  id: string;
  howWeMet: string;
  date: string;
  time: string;
  location: string;
  coordinates?: string;
  createdAt: string;
  updatedat: string;
  deleteAt?: string;
  owner?: UserTypes;
  user?: User;
  approved: boolean;
};

export type Chat = {
  id: string;
  active: boolean;
  owner: User;
  twone: Twone;
  deleteAt: string;
  createdAt: string;
  updatedAt: string;
  participants?: Participant[];
};

export type Participant = {
  id: string;
  user: string | User;
  chat: string | Chat;
  deleteAt: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Report = {
  cause: string;
  owner: string;
  chat: string;
  reportedUser: string;
  deleteAt: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type ReportResponse = {
  report: Report;
};

type FetchOptions = Record<string, unknown>;
