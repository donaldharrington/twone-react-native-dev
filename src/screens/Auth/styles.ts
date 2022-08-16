import { StyleSheet } from 'react-native';

import { verticalScale } from '~utils/dimension';

export const authStyles = StyleSheet.create({
  page: { flex: 1 },
  logo: {
    alignSelf: 'center',
    marginTop: verticalScale(180),
  },
  createBtn: {
    alignSelf: 'center',
    marginTop: verticalScale(40),
    marginBottom: verticalScale(40),
  },
  whatBtn: {
    alignSelf: 'center',
    marginBottom: verticalScale(16),
  },
  mapCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  gradient: { flex: 1, width: '100%' },
  txtBtn: {
    textDecorationLine: 'underline',
  },
});
