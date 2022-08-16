import {
  API_URL_DEV,
  API_URL_LOCAL,
  API_URL_PRODUCTION,
  API_URL_STAGING,
  ENV,
  TWONE_COOKIE_POLICY_URL,
  TWONE_PRIVACY_POLICY_URL,
  TWONE_TOC_URL,
  DEVELOPMENT_COGNITO_CLIENT_ID,
  DEVELOPMENT_COGNITO_POOL_ID,
  STAGING_COGNITO_CLIENT_ID,
  STAGING_COGNITO_POOL_ID,
  PRODUCTION_COGNITO_CLIENT_ID,
  PRODUCTION_COGNITO_POOL_ID,
} from '@env';

export const legalEndpoints = {
  toc: TWONE_TOC_URL,
  privacyPolicy: TWONE_PRIVACY_POLICY_URL,
  cookiePolicy: TWONE_COOKIE_POLICY_URL,
};

// console.log(ENV);
// return the correct API URL based on the current environment
export const API_URL: string = {
  local: API_URL_LOCAL,
  development: API_URL_DEV,
  staging: API_URL_STAGING,
  production: API_URL_PRODUCTION,
}[ENV];

// console.log(ENV);
// return the correct API URL based on the current environment
export const COGNITO_CLIENT_ID: string = {
  local: DEVELOPMENT_COGNITO_CLIENT_ID,
  development: DEVELOPMENT_COGNITO_CLIENT_ID,
  staging: STAGING_COGNITO_CLIENT_ID,
  production: PRODUCTION_COGNITO_CLIENT_ID,
}[ENV];

// console.log(ENV);
// return the correct API URL based on the current environment
export const COGNITO_POOL_ID: string = {
  local: DEVELOPMENT_COGNITO_POOL_ID,
  development: DEVELOPMENT_COGNITO_POOL_ID,
  staging: STAGING_COGNITO_POOL_ID,
  production: PRODUCTION_COGNITO_POOL_ID,
}[ENV];

const api_v1 = '/api/v1';

//  auth routes
export const authEndpoints = {
  base: `${API_URL.substring(0, API_URL.indexOf(api_v1))}`,
  login: `${API_URL}/auth/login`,
  signup: `${API_URL}/auth/signup`,
  confirmCode: `${API_URL}/auth/confirm`,
  resentCode: `${API_URL}/auth/resent`,
  forgotPassword: `${API_URL}/auth/password`,
  confirmPassword: `${API_URL}/auth/confirm/password`,
};

// user routes
export const userEndpoints = {
  user: `${API_URL}/user`,
  forgotPassword: `${API_URL}/user/password`,
  uploadPhoto: `${API_URL}/user/upload`,
  logout: `${API_URL}/user/logout`,
  userProfile: `${API_URL}/user/profile`,
  profileById: `${API_URL}/profile`,
  resetPassword: `${API_URL}/user/password`,
};

/** TODO: Add these endpoints
// /owner/twone
// /twone/`${UUID}`
// /twoned
// /user/twoned/`${UUID}`
// /twone/twoned/`${UUID}`
// /twoned/`${UUID}`
 * */

export const twoneEndpoints = {
  twone: `${API_URL}/twone`,
  twones: `${API_URL}/twones`,
  ownerTwones: `${API_URL}/owner/twone`,
};

export const twonedEndpoints = {
  twoned: `${API_URL}/twoned`,
};

/** TODO: Add these endpoints
// /chat
// /user/chat
// /chat/`${UUID}`
// /participant
// /user/participant
// /chat/participants/`${UUID}`
// /participant/`${UUID}`
// /message
// /chat/messages/`${UUID}`
// /participant/messages/`${UUID}`
// /message/`${UUID}`
  * */

export const chatEndpoints = {
  chat: `${API_URL}/chat`,
  chatParticipants: `${API_URL}/chat/participants`,
  chatsByUser: `${API_URL}/user/chat`,
};

export const participantEndpoints = {
  participant: `${API_URL}/participant`,
  participantsByUser: `${API_URL}/user/participant`,
};

export const reportEndpoints = {
  report: `${API_URL}/report`,
  reportedByUser: `${API_URL}/user/reports`,
  reportsOfUser: `${API_URL}/user/reports/records`,
};
