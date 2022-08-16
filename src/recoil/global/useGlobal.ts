import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { useRecoilState } from 'recoil';

import { removeItemFromLocalStorage } from '~api/auth.actions';
import { COGNITO_POOL_ID, COGNITO_CLIENT_ID } from '~api/config';
import { TwoneHistoryType } from '~types';
import { IdTokenPayload } from '~types/api/response.types';

import { globalAtom, loadingAtom } from './atom';

export const useGlobal = () => {
  const [globalState, setGlobalState] = useRecoilState(globalAtom);
  const [loadingState, setLoadingState] = useRecoilState(loadingAtom);

  async function setTokens(
    idToken: string,
    _refreshToken: string,
    idTokenPayload?: IdTokenPayload,
  ) {
    setGlobalState(state => ({
      ...state,
      idToken,
      refreshToken: _refreshToken,
      idTokenPayload,
    }));

    if (!idToken) {
      await removeItemFromLocalStorage('@twone_global');
    }
  }

  function setLoginPassword(password: string) {
    setGlobalState(state => ({
      ...state,
      password,
    }));

    // console.log(globalState)
    // await setItemToLocalStorage(
    //   '@twone_global',
    //   JSON.stringify({
    //     ...globalState,
    //     password,
    //   }),
    // );
  }

  function setVisited(hasVisited: boolean) {
    setGlobalState(state => ({
      ...state,
      hasVisited,
    }));
  }

  function setIsLoggedIn(isLoggedIn: boolean) {
    setGlobalState(state => ({
      ...state,
      isLoggedIn,
    }));
  }

  function setAppState(appState: TwoneHistoryType) {
    setGlobalState(state => ({
      ...state,
      appState,
    }));
  }

  function setIsLoading(bLoading: boolean) {
    setLoadingState(state => ({
      ...state,
      loading: bLoading,
    }));
  }

  function refreshTokenIfExpired(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (
        globalState.idTokenPayload?.phone_number &&
        globalState.refreshToken
      ) {
        const diff = globalState.idTokenPayload.exp * 1000 - Date.now();
        if (diff > 15 * 60 * 1000) {
          // eslint-disable-next-line no-console
          // console.log('token not expired yet.');
          return resolve(globalState.idToken || '');
        }
        // eslint-disable-next-line no-console
        // console.log('refresh token');
        const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
          RefreshToken: globalState.refreshToken,
        });

        const poolData = {
          UserPoolId: COGNITO_POOL_ID,
          ClientId: COGNITO_CLIENT_ID,
        };

        const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

        const userData = {
          Username: globalState.idTokenPayload?.phone_number,
          Pool: userPool,
        };

        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.refreshSession(RefreshToken, async (err, session) => {
          if (err) {
            await setTokens('', '');
            reject(Error('Session Expired. Please login again.'));
          } else {
            setGlobalState(state => ({
              ...state,
              idToken: session.idToken.jwtToken,
              refreshToken: session.refreshToken.token,
              idTokenPayload: session.idToken.payload,
            }));
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            resolve(session.idToken.jwtToken);
          }
        });
      } else {
        reject(Error('Session Expired. Please login again.'));
      }
    });
  }

  return {
    globalState,
    loadingState,
    setVisited,
    setIsLoggedIn,
    setAppState,
    setTokens,
    setLoginPassword,
    setIsLoading,
    refreshTokenIfExpired,
  };
};
