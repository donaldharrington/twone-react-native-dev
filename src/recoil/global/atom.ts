import { atom, AtomEffect } from 'recoil';

import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemToLocalStorage,
} from '~api/auth.actions';
import { GlobalStateTypes, LoadingTypes } from '~types/recoil.types';

const localStorageEffect: AtomEffect<GlobalStateTypes> = ({
  setSelf,
  trigger,
  onSet,
}) => {
  const loadPersisted = async () => {
    const savedValue = await getItemFromLocalStorage('@twone_global');

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue) as GlobalStateTypes);
    }
  };

  if (trigger === 'get') {
    void loadPersisted();
  }

  onSet(async (newValue, _, isReset) => {
    if (isReset) await removeItemFromLocalStorage('@twone_global');
    else await setItemToLocalStorage('@twone_global', JSON.stringify(newValue));
  });
};

export const globalAtom = atom({
  key: 'global_recoil_atom',
  default: {
    appState: 'twone',
    idToken: '',
    idTokenPayload: {},
    refreshToken: '',
    password: '',
  } as GlobalStateTypes,
  effects: [localStorageEffect],
});

export const loadingAtom = atom({
  key: 'loading_recoil_atom',
  default: {
    loading: false,
  } as LoadingTypes,
});
