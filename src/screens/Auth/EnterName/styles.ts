import { Dimensions, StyleSheet } from 'react-native';

import { OTP_CELL_COUNT } from '~/constants/config';
import { AppColors } from '~constants/colors';
import { scale, verticalScale } from '~utils/dimension';

const cellWidth =
  (Dimensions.get('screen').width - scale(40)) / OTP_CELL_COUNT - scale(4);

export const codeStyles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: verticalScale(36),
  },
  cell: {
    height: cellWidth,
    width: cellWidth,
    textAlign: 'center',
    fontSize: scale(20),
    lineHeight: verticalScale(37),
    fontWeight: '600',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cellWrapper: {
    borderBottomColor: AppColors.underline,
    borderBottomWidth: 1,
  },
  filledCell: {
    borderBottomWidth: 0,
  },
  wrongCell: {
    borderBottomColor: AppColors.error,
  },
  resendBtn: {
    alignSelf: 'center',
    marginTop: verticalScale(32),
  },
});
