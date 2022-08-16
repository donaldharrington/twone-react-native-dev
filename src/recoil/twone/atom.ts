import { atom } from 'recoil';

import { TwoneType } from '~types';

export const twoneAtom = atom({
  key: 'twone_recoil_atom',
  default: {
    date: undefined,
    time: undefined,
    location: undefined,
    twones: [],
    address: undefined,
    address1: undefined,
    label: undefined,
  } as TwoneType,
});
