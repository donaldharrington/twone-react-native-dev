import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale, sWidth, verticalScale } from '~utils/dimension';

export const mainStyles = StyleSheet.create({
  page: { flex: 1 },
  mapView: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  topAction: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circleWrap: {
    backgroundColor: AppColors.white,
    width: scale(48),
    height: scale(48),
    borderRadius: scale(25),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: AppColors.black,
    shadowOpacity: 0.1,
    shadowRadius: scale(5),
    shadowOffset: { width: 0, height: 0 },
  },
  bottomShadow: {
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: scale(10),
    shadowOpacity: 0.1,
  },
  btnWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(8),
    marginBottom: verticalScale(16),
  },
  button: {
    flexGrow: 1,
    marginHorizontal: scale(8),
  },
  handle: {
    backgroundColor: AppColors.boldDivider,
  },
  mapImage: {
    width: sWidth,
    height: sWidth * 0.54,
    resizeMode: 'cover',
  },
  bottomInner: {
    paddingHorizontal: scale(30),
    marginTop: scale(-150),
    textAlign: 'center',
    alignItems: 'center',
  },
  settingBtn: {
    width: '100%',
    marginTop: scale(24),
  },
  modalClose: {
    position: 'absolute',
    right: scale(12),
    top: scale(12),
  },
  avatarMarker: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    zIndex: 1,
  },
  topWrap: {
    minHeight: verticalScale(72),
    borderRadius: scale(12),
    backgroundColor: AppColors.third,
    paddingVertical: verticalScale(12),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBtn: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
  },
  textWrap: {
    flexShrink: 1,
    flexGrow: 1,
  },
  carouselWrap: {
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
    backgroundColor: AppColors.clear,
    minHeight: 100,
  },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
    marginTop: verticalScale(10),
    minHeight: verticalScale(36),
    paddingHorizontal: scale(10),
    borderRadius: verticalScale(18),
    width: scale(100),
    alignSelf: 'center',
  },
  full: {
    width: '100%',
  },
  horiz: {
    flexDirection: 'row',
    marginHorizontal: scale(16),
  },

  meg: {
    align: 'left',
    flexDirection: 'row',
    alignContent: 'center',
    paddingTop: 1,
  },

  backHome: {
    margin: scale(16),
  },
});
