import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast';

import { AppColors } from '~constants/colors';
import { scale, sWidth, verticalScale } from '~utils/dimension';

import TWLabel from './atoms/TWLabel';
import TWIcons from './TWIcons';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: sWidth - scale(32),
    alignSelf: 'center',
    borderRadius: scale(8),
    shadowColor: AppColors.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    minHeight: verticalScale(50),
    padding: scale(16),
  },
  textWrap: {
    flexShrink: 1,
    flexGrow: 1,
    paddingLeft: scale(16),
  },
});

const TWToast = ({ type, message }: ToastProps) => {
  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor:
            type === 'danger' ? AppColors.errorBg : AppColors.bgGray,
        },
      ]}
    >
      {type === 'danger' ? <TWIcons.error /> : <TWIcons.error />}
      <TWLabel styles={styles.textWrap} color={AppColors.error}>
        {message}
      </TWLabel>
    </View>
  );
};

export default TWToast;
