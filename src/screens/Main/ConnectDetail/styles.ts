import { StyleSheet } from 'react-native';

import { scale, verticalScale } from '~utils/dimension';

export const conDetailStyles = StyleSheet.create({
  avatarWrap: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: scale(80),
    height: scale(80),
    marginBottom: verticalScale(12),
  },
  reportBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(26),
  },
});
