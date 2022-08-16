import { authEndpoints, userEndpoints } from '~api/config';
import { JSONResponse, LoginResponse, SignUpResponse } from '~types/api';
import { LoginBody, SendCodeBody, SignUpBody } from '~types/api/request.types';

export const registerUser = async (
  phoneNumber: string,
  firstName: string,
  birthday: Date,
  password: string,
): Promise<SignUpResponse> => {
  try {
    const url: string = authEndpoints.signup;
    const body: SignUpBody = {
      name: phoneNumber,
      password: password,
      givenName: firstName,
      username: phoneNumber,
      phoneNumber: phoneNumber,
      dob: birthday.toISOString(),
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result: JSONResponse = await response.json();
    if (response.ok) {
      return result.data as SignUpResponse;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};

export const resendCode = async (
  sendType: string,
  phoneNumber: string,
): Promise<string> => {
  try {
    const url: string =
      sendType === 'forgot'
        ? authEndpoints.forgotPassword
        : authEndpoints.resentCode;
    const body: SendCodeBody = {
      username: phoneNumber,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export const submitCode = async (
  code: string,
  phoneNumber: string,
): Promise<string> => {
  try {
    const url: string = authEndpoints.confirmCode;
    const body: SendCodeBody = {
      code: code,
      username: phoneNumber,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export const confirmNewPassword = async (
  confirmCode: string,
  phoneNumber: string,
  password: string,
): Promise<string> => {
  try {
    const url: string = authEndpoints.confirmPassword;

    const body: SendCodeBody = {
      code: confirmCode,
      username: phoneNumber,
      newPassword: password,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export const deleteUser = async (
  phoneNumber: string,
  password: string,
  idToken: string,
): Promise<string> => {
  try {
    const url: string = userEndpoints.user;
    const body: LoginBody = {
      name: phoneNumber,
      password: password,
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

export const loginUser = async (
  phoneNumber: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const url = authEndpoints.login;
    const body: LoginBody = {
      name: phoneNumber,
      password: password,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result: JSONResponse = await response.json();
    if (response.ok) {
      return result.data as LoginResponse;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};
