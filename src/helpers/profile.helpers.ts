import { userEndpoints } from '~api/config';
import { JSONResponse } from '~types/api';
import { ProfileBody, ResetPasswordBody } from '~types/api/request.types';
import { ProfileResponse } from '~types/api/response.types';

export const getUserProfile = async (userId: string, idToken?: string) => {
  try {
    const url = `${userEndpoints.userProfile}/${userId}`;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken || ''}`,
    });

    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    const result: JSONResponse = await response.json();
    if (response.ok) {
      return (result.data as ProfileResponse).profile;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (
  profileId: string,
  params: ProfileBody,
  idToken?: string,
) => {
  try {
    const url = `${userEndpoints.profileById}/${profileId}`;

    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken || ''}`,
    });

    const response = await fetch(url, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(params),
    });

    const result: JSONResponse = await response.json();
    if (response.ok) {
      return (result.data as ProfileResponse).profile;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (
  phoneNumber: string,
  oldPassword: string,
  newPassword: string,
  idToken?: string,
): Promise<string> => {
  try {
    const url: string = userEndpoints.resetPassword;

    const body: ResetPasswordBody = {
      username: phoneNumber,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken || ''}`,
      },
      body: JSON.stringify(body),
    });

    const result: JSONResponse = await response.json();
    if (response.ok) {
      return result.message;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};
