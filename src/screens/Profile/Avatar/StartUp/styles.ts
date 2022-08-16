import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale, verticalScale } from '~utils/dimension';

export const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  bgWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  bottomWrap: {
    position: 'absolute',
    left: scale(16),
    right: scale(16),
    backgroundColor: AppColors.white,
    bottom: verticalScale(27),
    borderRadius: scale(16),
    padding: scale(16),
  },
  nav: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: scale(16),
  },
});
