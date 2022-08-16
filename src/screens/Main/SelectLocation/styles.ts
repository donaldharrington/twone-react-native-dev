import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale, verticalScale, sWidth, sHeight } from '~utils/dimension';

import { mainStyles } from '../styles';

export const locationStyles = StyleSheet.create({
  ...mainStyles,
  mapView: {
    width: sWidth,
    height: sHeight,
    backgroundColor: 'grey',
  },
  bottomWrap: {
    position: 'absolute',
    bottom: 0,
    left: scale(16),
    right: scale(16),
  },
  actionWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressWrap: {
    borderRadius: scale(8),
    backgroundColor: AppColors.third,
    padding: scale(16),
    marginVertical: verticalScale(24),
    minHeight: verticalScale(70),
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinIcon: {
    marginRight: scale(16),
  },
  address: {
    flexShrink: 1,
    flexGrow: 1,
  },
  mapPinWrapper: {
    position: 'absolute',
    top: sHeight / 2.55 - 9,
    left: sWidth / 2.12 - 9,

    // original value
    // top: sHeight / 2 - 17,
    // left: sWidth / 2 - 9,
  },
});
