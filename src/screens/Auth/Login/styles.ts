import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale, verticalScale } from '~utils/dimension';

export const loginStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  toubleBtn: {
    alignSelf: 'center',
    marginVertical: verticalScale(32),
  },
  div: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(32),
  },
  divLine: {
    flexGrow: 1,
    height: scale(1),
    backgroundColor: AppColors.border,
  },
  text: {
    alignSelf: 'center',
  },
  input: {
    marginTop: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: scale(12),
    paddingEnd: scale(12),
    backgroundColor: AppColors.white,
    borderRadius: scale(8),
  },
  inputField: {
    flexGrow: 1,
  },
});
