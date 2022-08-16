import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale, verticalScale } from '~utils/dimension';

export const chatStyles = StyleSheet.create({
  header: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
  },
  avatarWrap: {
    width: verticalScale(60),
    height: verticalScale(60),
    borderRadius: verticalScale(30),
    overflow: 'hidden',
  },
  avatar: {
    width: verticalScale(60),
    height: verticalScale(60),
    resizeMode: 'contain',
  },
  roomWrap: {
    minHeight: verticalScale(100),
  },
  chatList: {},
  msgBackCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: scale(4),
  },
  msgDelBtn: {
    width: scale(75),
    height: '100%',
    backgroundColor: AppColors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCont: {
    alignItems: 'center',
    paddingTop: verticalScale(48),
    paddingHorizontal: scale(32),
  },
  noMsgImg: {
    width: verticalScale(96),
    height: verticalScale(96),
  },
});
