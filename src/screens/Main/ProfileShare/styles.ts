import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale, verticalScale } from '~utils/dimension';

export const proShareStyles = StyleSheet.create({
  header: {
    minHeight: scale(60),
    borderBottomColor: AppColors.border,
    borderBottomWidth: 1,
  },
  horiz: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {
    padding: scale(16),
  },
  topAvatar: {
    height: scale(36),
    width: scale(36),
    marginLeft: scale(16),
    marginRight: scale(12),
  },
  editWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: AppColors.border,
    borderBottomWidth: 1,
    minHeight: verticalScale(60),
  },
  text: {
    flexGrow: 1,
    flexShrink: 1,
  },
  shareBtn: {
    marginVertical: verticalScale(10),
  },
});
