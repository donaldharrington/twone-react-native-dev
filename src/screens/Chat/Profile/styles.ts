import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { verticalScale, scale } from '~utils/dimension';

export const profStyles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: scale(18),
    paddingLeft: scale(2),
    borderBottomColor: AppColors.border,
    borderBottomWidth: 1,
  },
  navAction: {
    height: verticalScale(64),
    width: scale(56),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flexGrow: 1,
    flexShrink: 1,
  },
  div: {
    height: scale(1),
    marginBottom: verticalScale(16),
    backgroundColor: AppColors.border,
  },
  noBtn: {
    marginTop: verticalScale(24),
    alignItems: 'center',
  },
});
