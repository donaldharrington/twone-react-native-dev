import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale, sWidth, verticalScale } from '~utils/dimension';

export const twoneStyles = StyleSheet.create({
  page: {
    flex: 1,
  },
  horiz: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  underLine: {
    borderBottomWidth: scale(1),
    borderBottomColor: AppColors.border,
  },
  innerItem: {
    padding: scale(16),
  },
  between: {
    justifyContent: 'space-between',
  },
  wrap: {
    marginTop: verticalScale(24),
  },
  mapSmall: {
    height: scale(147),
    width: sWidth - scale(32),
    overflow: 'hidden',
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
    // borderBottomLeftRadius: scale(8),
    // borderBottomRightRadius: scale(8),
    backgroundColor: AppColors.third,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
});
