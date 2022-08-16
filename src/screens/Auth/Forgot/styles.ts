import { StyleSheet } from 'react-native';
import { AppColors } from '~constants/colors';

import { scale, verticalScale } from '~utils/dimension';

export const forgotStyles = StyleSheet.create({
  inputWrap: {
    marginTop: verticalScale(20),
    backgroundColor: AppColors.white,
    borderRadius: scale(8),
  },
});
