import { twonedEndpoints, twoneEndpoints } from '~api/config';
import { JSONResponse } from '~types/api';
import { TwoneBody, TwonedBody } from '~types/api/request.types';
import {
  NearbyTwonesResponse,
  TwonedResponse,
  TwoneResponse,
  TwonesResponse,
} from '~types/api/response.types';

export const getNearByTwones = async (
  lat: number,
  lon: number,
  idToken?: string,
) => {
  try {
    const url = `${twoneEndpoints.twones}/nearby`;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken || ''}`,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ lat, lon }),
    });

    const result: JSONResponse = await response.json();
    if (response.ok) {
      return (result.data as NearbyTwonesResponse).nearByTwones;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getAllTwones = async (idToken?: string) => {
  try {
    const url = twoneEndpoints.twones;

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
      return (result.data as TwonesResponse).twones;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};

export const createTwone = async (twone: TwoneBody, idToken?: string) => {
  try {
    const url = twoneEndpoints.twone;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken || ''}`,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(twone),
    });

    const result: JSONResponse = await response.json();
    if (response.ok) {
      return (result.data as TwoneResponse).twone;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};

export const createTwoned = async (twone: TwonedBody, idToken?: string) => {
  try {
    const url = twonedEndpoints.twoned;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken || ''}`,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(twone),
    });

    const result: JSONResponse = await response.json();
    if (response.ok) {
      return (result.data as TwoneResponse).twone;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getTwoned = async (id: string, idToken?: string) => {
  try {
    const url = `${twonedEndpoints.twoned}/${id}`;

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
      return (result.data as TwonedResponse).twoned;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getMyTwones = async (idToken?: string) => {
  try {
    const url = twoneEndpoints.ownerTwones;

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
      return (result.data as TwonesResponse).twone!;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};

export const deleteTwoned = async (id: string, idToken?: string) => {
  try {
    const url = `${twonedEndpoints.twoned}/${id}`;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken || ''}`,
    });

    const response = await fetch(url, {
      method: 'DELETE',
      headers: headers,
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

export const approveTwoned = async (id: string, idToken?: string) => {
  try {
    const url = `${twonedEndpoints.twoned}/${id}`;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken || ''}`,
    });

    const response = await fetch(url, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({ approved: true }),
    });

    const result: JSONResponse = await response.json();
    if (response.ok) {
      return (result.data as TwonedResponse).twoned;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};
