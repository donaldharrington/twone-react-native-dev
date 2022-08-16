import { selector } from 'recoil';

import { userAtom } from './atom';

export const withUserState = selector({
  key: 'user_recoil_selector',
  get: ({ get }) => {
    const user = get(userAtom);
    return user;
  },
});

export const avatarName = selector({
  key: 'avatar_name_selector',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.avatar?.name || '';
  },
});
