import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale, sWidth, verticalScale } from '~utils/dimension';

export const compStyles = StyleSheet.create({
  connectCard: {
    backgroundColor: AppColors.white,
    minHeight: verticalScale(208),
    width: sWidth - scale(42),
    marginHorizontal: scale(6),
    borderRadius: scale(12),
    paddingHorizontal: scale(14),
    paddingBottom: scale(20),
    paddingVertical: scale(12),
    marginVertical: scale(24),
    justifyContent: 'space-between',
    // paddingTop: scale(18),
    marginLeft: scale(8),
  },
  shadow: {
    shadowColor: AppColors.black,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 4,
  },
  horiz: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  between: {
    paddingBottom: scale(6),
    justifyContent: 'space-between',
  },
});
