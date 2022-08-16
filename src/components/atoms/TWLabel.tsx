import React, { ReactNode } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

import { AppColors } from '~constants/colors';
import { AppFonts } from '~constants/fonts';
import { scale, verticalScale } from '~utils/dimension';

type Props = {
  children: ReactNode;
  size?: number;
  color?: string;
  weight?:
    | 'black'
    | 'bold'
    | 'extraBold'
    | 'extraLight'
    | 'light'
    | 'medium'
    | 'regular'
    | 'semiBold'
    | 'thin';
  lineHeight?: number;
  align?: 'center' | 'right' | 'left';
  isUppercase?: boolean;
  styles?: TextStyle;
  margin?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    horizontal?: number;
    vertical?: number;
  };
  textProps?: TextProps;
  onClick?: () => void;
  maxHeight?: number;
};

const TWLabel = ({
  children,
  size = 14,
  weight = 'semiBold',
  align = 'left',
  color = AppColors.third,
  lineHeight = 24,
  styles,
  margin,
  isUppercase,
  textProps,
  maxHeight,
  onClick,
  // paddingHorizontal,
}: Props) => {
  return (
    <Text
      onPress={onClick}
      style={{
        // paddingHorizontal: paddingHorizontal,
        fontFamily: AppFonts[weight],
        lineHeight: lineHeight && scale(lineHeight),
        fontSize: scale(size),
        marginLeft: margin?.left && scale(margin?.left),
        marginRight: margin?.right && scale(margin?.right),
        marginTop: margin?.top && verticalScale(margin?.top),
        marginBottom: margin?.bottom && verticalScale(margin?.bottom),
        marginHorizontal: margin?.horizontal && scale(margin?.horizontal),
        marginVertical: margin?.vertical && verticalScale(margin?.vertical),
        color: color,
        textAlign: align,
        maxHeight: maxHeight,
        ...styles,
      }}
      {...textProps}
    >
      {typeof children === 'string' && isUppercase
        ? children.toUpperCase()
        : children}
    </Text>
  );
};

export default TWLabel;
