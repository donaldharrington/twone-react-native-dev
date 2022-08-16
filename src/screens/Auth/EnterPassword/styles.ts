import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { verticalScale, scale } from '~utils/dimension';

export const styles = StyleSheet.create({
  description: {
    paddingVertical: verticalScale(10),
  },
  input: {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(4),
    paddingStart: scale(10),
    paddingEnd: scale(10),
    backgroundColor: AppColors.white,
    borderRadius: scale(8),
  },
  inputField: {
    flexGrow: 1,
  },
  error: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
});
