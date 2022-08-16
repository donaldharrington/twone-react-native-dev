import { JSONResponse } from '../types/api';

import { getItemFromLocalStorage } from './auth.actions';
import { userEndpoints } from './config';

// patch user email
export const updateUserEmail = async () => {
  // if token is expired, login again silently
  // await loginUser();
  const phoneNumber = await getItemFromLocalStorage('@twone_phoneNumber');
  const firstName = await getItemFromLocalStorage('@twone_name');

  const birthday = await getItemFromLocalStorage('@twone_birthday');
  const password = await getItemFromLocalStorage('@twone_password');

  const idToken = await getItemFromLocalStorage('@twone_idToken');
  console.log(idToken);

  try {
    // first get user info from db or localStorage so doesn't overwrite as NULL in db (? doesn't PATCH only update one? idk)
    const url: string = userEndpoints.user;

    const updatedUserEmail = await getItemFromLocalStorage('@twone_email');
    const body: unknown = {
      username: phoneNumber!,
      firstName: firstName,
      phoneNumber: phoneNumber,
      email: updatedUserEmail,
      dob: birthday,
      password: password,
    };
    const updatedUserResponse = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(body),
    });

    const updatedUserResult: JSONResponse = await updatedUserResponse.json();
    console.log({ body, updatedUserResult });
    return await Promise.resolve(updatedUserResult);
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
};

// get user info from db
export const getUserInfo = async () => {
  const idToken = await getItemFromLocalStorage('@twone_idToken');
  try {
    const url: string = userEndpoints.user;
    const userResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    const userResult: JSONResponse = await userResponse.json();
    console.log({ userResult });
    return await Promise.resolve(userResult);
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
};
