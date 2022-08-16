import { StyleSheet } from 'react-native';

import { scale, sHeight } from '~utils/dimension';

export const searchStyles = StyleSheet.create({
  noResultView: {
    height: sHeight,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(-100),
  },
});
