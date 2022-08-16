import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale } from '~utils/dimension';

export const styles = StyleSheet.create({
  previewWrapper: {
    backgroundColor: AppColors.white,
    display: 'flex',
    flexDirection: 'column',
    padding: scale(12),
    borderRadius: scale(12),
  },
  noPreviewWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '65%',
    backgroundColor: AppColors.whiteBg,
  },
  profileWrapper: {
    width: '100%',
    height: scale(350),
    borderRadius: scale(12),
    marginBottom: scale(8),
  },
  profileImg: {
    width: '100%',
    height: '100%',
    borderRadius: scale(12),
  },
  profileInfo: {
    marginTop: scale(8),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: scale(48),
    height: scale(48),
    marginRight: scale(8),
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  centered: {
    textAlign: 'center',
  },
});
