import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale } from '~utils/dimension';

export const styles = StyleSheet.create({
  avatarWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: scale(24),
  },
  avatarImg: {
    width: scale(105),
    height: scale(105),
    marginBottom: scale(8),
    borderRadius: scale(78),
    backgroundColor: AppColors.bgGray,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  inputDesc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: scale(12),
    marginTop: scale(8),
    marginBottom: scale(24),
    paddingHorizontal: scale(12),
    height: scale(44),
  },
  input: {
    paddingVertical: 10,
  },
});
