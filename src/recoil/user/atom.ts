import { atom } from 'recoil';

import { UserTypes } from '~types';

export const userAtom = atom({
  key: 'user_recoil_atom',
  default: {
    id: undefined,
    profileId: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profilePhoto: '',
    dob: new Date(),
    avatar: {
      size: 138,
      skin: 'white',
      background: 'blue',
      beard: undefined,
      color: 'empty',
      glass: undefined,
      hair: 'default',
    },
    displayDOB: true,
    displayGender: true,
    displayPronoun: true,
  } as UserTypes,
});

export const draftUserAtom = atom({
  key: 'draft_user_recoil_atom',
  default: {
    id: undefined,
    profileId: '',
    firstName: '',
    lastName: '',
    email: '',
    photo: '',
    profilePhoto: '',
    phoneNumber: '',
    dob: new Date(),
    avatar: {
      name: '',
      size: 138,
      skin: 'white',
      background: 'blue',
      beard: undefined,
      color: 'empty',
      glass: undefined,
      hair: 'default',
    },
    displayDOB: true,
    displayGender: true,
    displayPronoun: true,
  } as UserTypes,
});
