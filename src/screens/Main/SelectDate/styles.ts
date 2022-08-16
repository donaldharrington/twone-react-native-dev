import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale } from '~utils/dimension';

export const dateStyles = StyleSheet.create({
  horiz: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeItem: {
    minHeight: scale(36),
    borderRadius: scale(18),
    backgroundColor: AppColors.bgGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(16),
  },
  timeActive: {
    backgroundColor: AppColors.primary,
  },
});
