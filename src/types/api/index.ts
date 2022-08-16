import { LoginBody, SendCodeBody, SignUpBody } from './request.types';
import {
  ChatResponse,
  ChatsResponse,
  LoginResponse,
  NearbyTwonesResponse,
  ParticipantResponse,
  ParticipantsResponse,
  ProfileResponse,
  ReportResponse,
  SignUpResponse,
  TokenData,
  TwonedResponse,
  TwoneResponse,
  TwonesResponse,
  UserResponse,
} from './response.types';

type JSONResponse = {
  status: string;
  success?: boolean;
  message: string;
  data?:
    | LoginResponse
    | SignUpResponse
    | UserResponse
    | ProfileResponse
    | TwonesResponse
    | NearbyTwonesResponse
    | TwoneResponse
    | TwonedResponse
    | ChatResponse
    | ChatsResponse
    | ParticipantResponse
    | ParticipantsResponse
    | ReportResponse;
};

export type RequestBody = SignUpBody | SendCodeBody | LoginBody;

export {
  JSONResponse,
  TokenData,
  SignUpBody,
  SendCodeBody,
  LoginBody,
  LoginResponse,
  SignUpResponse,
};
