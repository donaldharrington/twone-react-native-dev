import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale, verticalScale } from '~utils/dimension';

export const moreStyles = StyleSheet.create({
  page: {
    paddingVertical: 0,
  },
  bottom: {
    backgroundColor: AppColors.white,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
  },
  chatActionWrap: {
    backgroundColor: AppColors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: verticalScale(36),
    borderRadius: verticalScale(18),
    paddingRight: scale(16),
  },
  chatInput: {
    flexGrow: 1,
    paddingVertical: verticalScale(10),
  },
  innerWrap: {
    flexGrow: 1,
    paddingHorizontal: scale(8),
    backgroundColor: AppColors.clear,
  },
  newPopup: {
    paddingHorizontal: scale(16),
    paddingTop: 0,
  },
  newAvatarCont: {
    marginTop: verticalScale(-34),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newAvatar: {
    width: verticalScale(64),
    height: verticalScale(64),
    borderRadius: verticalScale(32),
    borderWidth: scale(2),
    borderColor: AppColors.clear,
  },
  avatarMine: {
    borderColor: AppColors.white,
    marginRight: verticalScale(-10),
    zIndex: 1,
  },
  buttton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disconnectBtn: {
    justifyContent: 'center',
    marginTop: verticalScale(36),
  },
});
