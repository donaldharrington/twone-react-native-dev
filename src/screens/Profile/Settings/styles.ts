import { StyleSheet } from 'react-native';

import { verticalScale } from '~utils/dimension';

export const settingStyle = StyleSheet.create({
  page: {
    paddingTop: verticalScale(7),
  },
  bottomAction: {
    paddingVertical: verticalScale(18),
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  delBtn: {
    marginTop: verticalScale(30),
    marginBottom: verticalScale(48),
  },
});
