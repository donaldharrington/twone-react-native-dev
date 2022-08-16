import { useRecoilState } from 'recoil';

import { UserTypes } from '~types';
import { AvatarType } from '~types/avatar';

import { draftUserAtom, userAtom } from './atom';

export const useUser = () => {
  const [userState, setUserState] = useRecoilState(userAtom);
  const [draftUserState, setDraftUserState] = useRecoilState(draftUserAtom);

  function setDraftUserInfo(user: UserTypes) {
    setDraftUserState(state => ({
      ...state,
      ...user,
    }));
  }

  function setUserInfo(user: UserTypes) {
    setUserState(state => ({
      ...state,
      ...user,
    }));
  }

  function setPhoneNumber(phoneNumber: string) {
    setUserState(state => ({
      ...state,
      phoneNumber,
    }));
  }

  function setEmail(email: string) {
    setUserState(state => ({
      ...state,
      email,
    }));
  }

  function setName(name: string) {
    if (name.length === 0) return;
    const nameAry = name.trim().split(' ');
    if (nameAry.length === 1) {
      setUserState(state => ({
        ...state,
        firstName: nameAry[0],
      }));
    } else if (nameAry.length === 2) {
      setUserState(state => ({
        ...state,
        firstName: nameAry[0],
        lastName: nameAry[1],
      }));
    } else {
      setUserState(state => ({
        ...state,
        firstName: nameAry[0],
        lastName: nameAry[2],
        middleName: nameAry[1],
      }));
    }
  }

  function setBirthday(dob: Date) {
    setUserState(state => ({
      ...state,
      dob,
    }));
  }

  function setAvatar(avatar: AvatarType) {
    setUserState(state => ({
      ...state,
      avatar,
    }));
  }

  return {
    userState,
    setUserInfo,
    setPhoneNumber,
    setEmail,
    setName,
    setBirthday,
    setAvatar,

    draftUserState,
    setDraftUserInfo,
  };
};
