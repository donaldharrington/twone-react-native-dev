import { selector } from 'recoil';

import { draftUserAtom } from '../user/atom';

import { globalAtom } from './atom';

export const withGlobalState = selector({
  key: 'global_recoil_selector',
  get: ({ get }) => {
    const global = get(globalAtom);
    return global;
  },
});

export const isLoggedIn = selector({
  key: 'is_loggedin_selector',
  get: ({ get }) => {
    const global = get(globalAtom);
    return !!global.idToken;
  },
});

export const loggedInPhoneNumber = selector({
  key: 'logged_in_phone_number_selector',
  get: ({ get }) => {
    const global = get(globalAtom);
    return global.idTokenPayload?.phone_number;
  },
});

export const hasProfileState = selector({
  key: 'has_profile_selector',
  get: ({ get }) => {
    const user = get(draftUserAtom);
    return !!user.profilePhoto;
  },
});
