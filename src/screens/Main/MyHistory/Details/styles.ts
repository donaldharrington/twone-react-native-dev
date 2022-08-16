import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { verticalScale, scale } from '~utils/dimension';

export const detailStyles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: scale(16),
  },
  mapview: {
    minHeight: verticalScale(228),
    backgroundColor: AppColors.whiteBg,
    borderTopRightRadius: scale(10),
    borderTopLeftRadius: scale(10),
  },
  infoWrap: {
    minHeight: verticalScale(100),
    backgroundColor: AppColors.white,
    borderBottomLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
  },
  handle: {
    alignSelf: 'center',
    marginTop: verticalScale(8),
    width: scale(36),
    height: scale(4),
    borderRadius: scale(2),
    backgroundColor: AppColors.bgGray,
  },
  horiz: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    minHeight: verticalScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: verticalScale(10),
    backgroundColor: AppColors.primary,
    paddingHorizontal: scale(7),
    marginLeft: scale(8),
  },
  between: {
    justifyContent: 'space-between',
  },
  icon: {
    width: scale(24),
    height: scale(24),
  },
  iconSmall: {
    width: scale(12),
    height: scale(12),
  },
  editBtn: {
    flexDirection: 'row',
    minHeight: verticalScale(24),
    paddingHorizontal: scale(8),
    borderRadius: verticalScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: AppColors.primary,
    borderWidth: 1,
  },
  top: {
    paddingVertical: verticalScale(20),
  },
  mapView: {
    flex: 1,
  },
});
