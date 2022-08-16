import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale, verticalScale } from '~utils/dimension';

export const styles = StyleSheet.create({
  pageWrap: {
    backgroundColor: AppColors.white,
    height: '100%',
  },
  profileWrap: {
    position: 'absolute',
    width: '100%',
    top: '14%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: scale(16),
  },
  avatarWrap: {
    width: scale(170),
    height: scale(170),
    borderRadius: scale(69),
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 3,
    alignSelf: 'center',
    marginBottom: scale(40),
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
  divider: {
    width: '100%',
    borderBottomColor: AppColors.error,
    borderBottomWidth: scale(1),
    marginBottom: verticalScale(8),
  },
});
