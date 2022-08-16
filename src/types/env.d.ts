declare module '@env' {
  export const ENV: 'local' | 'development' | 'staging' | 'production';
  export const API_URL_LOCAL: string;
  export const API_URL_DEV: string;
  export const API_URL_STAGING: string;
  export const API_URL_PRODUCTION: string;

  export const TWONE_TOC_URL: string;
  export const TWONE_PRIVACY_POLICY_URL: string;
  export const TWONE_COOKIE_POLICY_URL: string;

  export const MAPBOX_ACCESS_KEY: string;
  export const COMECHAT_APP_ID: string;
  export const COMECHAT_AUTH_KEY: string;
  export const COMECHAT_REGION: string;

  export const DEVELOPMENT_COGNITO_REGION: string;
  export const DEVELOPMENT_COGNITO_POOL_ID: string;
  export const DEVELOPMENT_COGNITO_CLIENT_ID: string;

  export const STAGING_COGNITO_REGION: string;
  export const STAGING_COGNITO_POOL_ID: string;
  export const STAGING_COGNITO_CLIENT_ID: string;

  export const PRODUCTION_COGNITO_REGION: string;
  export const PRODUCTION_COGNITO_POOL_ID: string;
  export const PRODUCTION_COGNITO_CLIENT_ID: string;
}
