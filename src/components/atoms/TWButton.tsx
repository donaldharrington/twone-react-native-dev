import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { AppColors } from '~constants/colors';
import { scale } from '~utils/dimension';

import TWLabel from './TWLabel';

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: scale(28),
    shadowColor: AppColors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 8, height: 8 },
    shadowRadius: 10,
    elevation: 5,
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(10),
  },
});

type Props = {
  title: string;
  disabled?: boolean;
  bgColor?: string;
  weight?: 'medium' | 'semiBold' | 'regular';
  type?: 'purple' | 'pink' | 'transparent' | 'solid' | 'twone';
  size?: 'lg' | 'md' | 'sm' | 'xsm';
  parentStyle?: ViewStyle;
  onClick?: () => void;
  isUppercase?: boolean;
  paddingHorizontal?: number;
};

const TWButton = ({
  weight = 'semiBold',
  title,
  type = 'purple',
  size = 'lg',
  disabled,
  bgColor,
  parentStyle,
  onClick,
}: Props) => {
  const dimension = {
    lg: { h: scale(56), r: scale(28), f: 18 },
    md: { h: scale(48), r: scale(24), f: 16 },
    sm: { h: scale(42), r: scale(24), f: 15 },
    xsm: { h: scale(34), r: scale(20), f: 14 },
  } as { [key: string]: { h: number; r: number; f: number } };

  return (
    <TouchableOpacity
      onPress={onClick}
      style={[styles.wrapper, parentStyle]}
      disabled={disabled}
      activeOpacity={0.6}
    >
      <LinearGradient
        style={[
          styles.inner,
          { minHeight: dimension[size].h, borderRadius: dimension[size].r },
        ]}
        start={type === 'twone' || disabled ? { x: 0, y: 1 } : { x: 0.9, y: 1 }}
        end={
          type === 'twone' || disabled ? { x: 0.5, y: 1 } : { x: 0.15, y: 0.5 }
        }
        locations={disabled ? [0, 1] : type !== 'pink' ? [0.9, 0] : [0, 1]}
        colors={
          disabled
            ? AppColors.gradientDisabled
            : type === 'purple'
            ? AppColors.gradientPurple
            : type === 'pink'
            ? AppColors.gradientPink
            : type === 'twone'
            ? AppColors.gradientTwonePurple
            : type === 'solid' && bgColor
            ? [bgColor, bgColor]
            : AppColors.gradientTransparent
        }
      >
        <TWLabel
          size={dimension[size].f}
          weight= {weight} 
          // paddingHorizontal={number} 
          color={
            disabled
              ? AppColors.gray
              : type === 'transparent'
              ? AppColors.darkGray
              : AppColors.white
          }
        >
          {title}
        </TWLabel>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default TWButton;
