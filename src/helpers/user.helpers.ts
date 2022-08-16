import { userEndpoints } from '~api/config';
import { JSONResponse } from '~types/api';
import { UserBody } from '~types/api/request.types';
import { UserResponse } from '~types/api/response.types';

export const getUserInfo = async (idToken?: string) => {
  try {
    const url = userEndpoints.user;

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
      return (result.data as UserResponse).user;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};

export const updateUserInfo = async (params: UserBody, idToken?: string) => {
  try {
    const url = userEndpoints.user;

    const headers = new Headers({
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
      return (result.data as UserResponse).user;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};

export const uploadPhoto = async (filePath: string, idToken: string) => {
  try {
    const cleanPath = filePath.replace('file://', '');
    const url = userEndpoints.uploadPhoto;

    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data;',
      Authorization: `Bearer ${idToken || ''}`,
    });

    const formData = new FormData();
    formData.append('profile', {
      uri: cleanPath,
      name: 'photo',
      type: 'image/jpg',
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: formData,
    });

    const result: JSONResponse = await response.json();
    if (response.ok) {
      return (result.data as UserResponse).user;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};
