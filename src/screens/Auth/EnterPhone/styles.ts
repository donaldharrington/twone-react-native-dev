import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { verticalScale } from '~utils/dimension';

export const phoneStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  phoneWrap: {
    width: '100%',
    marginTop: verticalScale(40),
  },
  textWrap: {
    backgroundColor: AppColors.white,
  },
  flagBtn: {
    justifyContent: 'flex-start',
    width: 54,
  },
  phoneText: {
    fontSize: 20,
  },
  toubleBtn: {
    alignSelf: 'center',
    marginBottom: verticalScale(32),
  },
});
