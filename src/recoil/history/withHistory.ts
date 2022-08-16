import { selector } from 'recoil';

import { historyAtom } from './atom';

export const withHistoryState = selector({
  key: 'history_recoil_selector',
  get: ({ get }) => {
    const twone = get(historyAtom);
    return twone;
  },
});
