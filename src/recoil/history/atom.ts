import { atom, AtomEffect } from 'recoil';

import { getItemFromLocalStorage } from '~api/auth.actions';
import { TwoneType } from '~types';

const localStorageEffect: AtomEffect<TwoneType[]> = ({ setSelf, trigger }) => {
  const loadPersisted = async () => {
    const savedValue = await getItemFromLocalStorage('@twone_history');

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue) as TwoneType[]);
    }
  };

  if (trigger === 'get') {
    void loadPersisted();
  }
};

export const historyAtom = atom({
  key: 'history_recoil_atom',
  default: [] as TwoneType[],
  effects: [localStorageEffect],
});
