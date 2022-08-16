import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { verticalScale, scale } from '~utils/dimension';

export const styles = StyleSheet.create({
  description: {
    paddingVertical: verticalScale(10),
  },
  input: {
    padding: scale(16),
    backgroundColor: AppColors.white,
    borderRadius: scale(8),
  },
  error: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
});
