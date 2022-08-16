import {
  chatEndpoints,
  participantEndpoints,
  userEndpoints,
} from '~api/config';
import { JSONResponse } from '~types/api';
import { ChatBody, ChatParticipantBody } from '~types/api/request.types';
import {
  ChatResponse,
  ChatsResponse,
  ParticipantResponse,
  ParticipantsResponse,
} from '~types/api/response.types';

export const createChat = async (params: ChatBody, idToken?: string) => {
  try {
    const url = chatEndpoints.chat;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken || ''}`,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params),
    });

    const result: JSONResponse = await response.json();
    if (response.ok) {
      return (result.data as ChatResponse).chat;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getChat = async (id: string, idToken?: string) => {
  try {
    const url = `${chatEndpoints.chat}/${id}`;

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
      return (result.data as ChatResponse).chat;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getChats = async (idToken?: string) => {
  try {
    const url = chatEndpoints.chatsByUser;

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
      return (result.data as ChatsResponse).chats;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};

export const makeChatAsActive = async (id: string, idToken?: string) => {
  try {
    const url = `${chatEndpoints.chat}/${id}`;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken || ''}`,
    });

    const response = await fetch(url, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({ active: true }),
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

export const deleteChat = async (id: string, idToken?: string) => {
  try {
    const url = `${chatEndpoints.chat}/${id}`;

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

export const createChatParticipant = async (
  params: ChatParticipantBody,
  idToken?: string,
) => {
  try {
    const url = participantEndpoints.participant;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken || ''}`,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(params),
    });

    const result: JSONResponse = await response.json();
    if (response.ok) {
      return (result.data as ParticipantResponse).participant;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getChatParticipants = async (chatId: string, idToken?: string) => {
  try {
    const url = `${chatEndpoints.chatParticipants}/${chatId}`;

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
      return (result.data as ParticipantsResponse).participants;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};

export const deleteChatParticipant = async (id: string, idToken?: string) => {
  try {
    const url = `${participantEndpoints.participant}/${id}`;

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

export const getParticipants = async (idToken?: string) => {
  try {
    const url = `${userEndpoints.user}/participant`;

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
      return (result.data as ParticipantsResponse).participants;
    } else {
      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
};
