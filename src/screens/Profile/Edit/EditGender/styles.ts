import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale } from '~utils/dimension';

export const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(12),
    borderBottomWidth: scale(1),
    borderBottomColor: AppColors.boldDivider,
  },
  missing: {
    marginTop: scale(24),
  },
  missingText: {
    textAlign: 'center',
  },
});
