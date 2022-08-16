import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale, verticalScale } from '~utils/dimension';

export const chatDetailStyles = StyleSheet.create({
  page: {
    paddingVertical: 0,
  },
  chatList: {
    flex: 0.9,
    overflow: 'hidden',
  },
  
  // done
  bottom: {
    flex: 0.11,
    backgroundColor: AppColors.white,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(16),
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  chatActionWrap: {
    backgroundColor: AppColors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: verticalScale(40),
    borderRadius: verticalScale(30),
    paddingRight: scale(16),
  },
  chatInput: {
    flexShrink: 1,
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
    marginTop: verticalScale(-32),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // avatarOverlap: {
  //   // justifyContent: 'space-between',
  //   // alignItems: ''
  //   paddingHorizontal: scale(100),
  //   // flexWrap: 'wrap',
  //   flexDirection: 'row',
  //   // paddingHorizontal: scale(),
  // },

  newAvatar: {
    width: verticalScale(64),
    height: verticalScale(64),
    borderRadius: verticalScale(32),
    borderWidth: scale(2),
    borderColor: AppColors.clear,
  },
  avatarMine: {
    borderColor: AppColors.white,
    // marginRight: verticalScale(-10),
    zIndex: 1,
  },
});
