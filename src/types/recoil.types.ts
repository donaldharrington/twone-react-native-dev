import { TwoneHistoryType } from '~types';

import { IdTokenPayload } from './api/response.types';

export type UserStateTypes = {
  id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
};

export type GlobalStateTypes = {
  appState?: TwoneHistoryType;
  idToken?: string;
  refreshToken?: string;
  idTokenPayload?: IdTokenPayload;
  password?: string;
};

export type LoadingTypes = {
  loading?: boolean;
};
