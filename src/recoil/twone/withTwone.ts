import { selector } from 'recoil';

import { twoneAtom } from './atom';

export const withTwoneState = selector({
  key: 'twone_recoil_selector',
  get: ({ get }) => {
    const twone = get(twoneAtom);
    return twone;
  },
});
