import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale, verticalScale } from '~utils/dimension';

export const itemStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: AppColors.border,
    marginHorizontal: scale(16),
  },
  textWrap: {
    flexGrow: 1,
    flexShrink: 1,
  },
  inner: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.clear,
    paddingVertical: verticalScale(10),
  },
  border: {
    borderBottomColor: AppColors.border,
  },
  btn: {
    minHeight: scale(24),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(8),
    borderWidth: 1,
    marginRight: scale(16),
  },
});
