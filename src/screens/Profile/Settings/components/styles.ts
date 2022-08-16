import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale, verticalScale } from '~utils/dimension';

export const styles = StyleSheet.create({
  whiteBg: {
    backgroundColor: AppColors.white,
  },
  itemWrap: {
    borderRadius: scale(12),
    marginBottom: verticalScale(24),
  },
  horizWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItem: {
    minHeight: verticalScale(48),
    marginLeft: scale(16),
    paddingRight: scale(16),
  },
  bottomLine: {
    borderBottomColor: AppColors.border,
    borderBottomWidth: 1,
  },
  alignEnd: {
    justifyContent: 'flex-end',
  },
  alignStart: {
    justifyContent: 'flex-start',
  },
  chevron: {
    marginLeft: scale(16),
  },
  mb12: {
    marginBottom: scale(12),
  },
});
