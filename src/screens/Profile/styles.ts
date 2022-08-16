import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale, sWidth, verticalScale } from '~utils/dimension';

export const profileStyles = StyleSheet.create({
  page: {
    flex: 1,
  },
  horizWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shadow: {
    shadowColor: AppColors.black,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 5,
  },
  setting: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
  },
  avatarWrap: {
    alignSelf: 'center',
    marginTop: verticalScale(24),
    marginBottom: verticalScale(-80),
    zIndex: 2,
  },
  avatarImg: {
    width: scale(156),
    height: scale(156),
    borderRadius: scale(78),
    backgroundColor: AppColors.bgGray,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtn: {
    position: 'absolute',
    right: 0,
    top: scale(120),
    zIndex: 10,
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    justifyContent: 'flex-start',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(8),
  },
  twone: {
    backgroundColor: AppColors.white,
    padding: scale(8),
    borderRadius: scale(8),
    minHeight: scale(72),
  },
  textWrap: {
    flexShrink: 1,
    flexGrow: 1,
    paddingHorizontal: scale(10),
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  roundWrap: {
    flex: 1,
    backgroundColor: AppColors.white,
    borderTopRightRadius: sWidth * 1.5,
    borderTopLeftRadius: sWidth * 1.5,
    marginTop: scale(-6),
    paddingTop: verticalScale(120),
    width: sWidth * 1.2,
    alignSelf: 'center',
    shadowColor: AppColors.black,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -10 },
    shadowRadius: 18,
    elevation: 5,
  },
  roundInner: {
    width: sWidth,
    marginTop: scale(-22),
    paddingHorizontal: scale(16),
    alignSelf: 'center',
    marginBottom: verticalScale(-10),
    backgroundColor: 'white',
    flex: 1,
  },
  noProfile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    width: sWidth,
    alignItems: 'center',
    backgroundColor: AppColors.transparent,
    paddingBottom: scale(32),
  },
  centered: {
    textAlign: 'center',
  },
});
