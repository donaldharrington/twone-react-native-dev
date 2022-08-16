import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale } from '~utils/dimension';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: AppColors.white,
    shadowColor: AppColors.black,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 5,
    width: scale(48),
    height: scale(48),
    borderRadius: scale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  icon: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

const TWIconButton = ({ icon, disabled, onClick }: Props) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={styles.wrapper}
      disabled={disabled}
      activeOpacity={0.6}
    >
      {icon}
    </TouchableOpacity>
  );
};

export default TWIconButton;
