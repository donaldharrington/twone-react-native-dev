import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale } from '~utils/dimension';

export const avatarStyles = StyleSheet.create({
  wrap: {
    width: scale(138),
    height: scale(138),
    borderRadius: scale(69),
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 3,
    alignSelf: 'center',
  },
  optionWrap: {
    marginTop: scale(26),
  },
  contentWrap: {
    paddingVertical: scale(16),
    flex: 1,
  },
  noTopPadding: {
    paddingTop: 0,
  },
});
