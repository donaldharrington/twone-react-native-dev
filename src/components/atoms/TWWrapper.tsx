import React, { ReactNode } from 'react';
import { FlexAlignType, StyleSheet, View } from 'react-native';

import { AppColors } from '~constants/colors';
import { GapTypes } from '~types';
import { scale, verticalScale } from '~utils/dimension';

const styles = StyleSheet.create({
  whiteBg: {
    backgroundColor: AppColors.white,
  },
  itemWrap: {
    borderRadius: scale(12),
    marginBottom: verticalScale(24),
  },
  shadow: {
    shadowColor: AppColors.black,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 5,
  },
});

type Props = {
  children: ReactNode;
  margin?: GapTypes;
  padding?: GapTypes | number;
  radius?: number;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItem?: FlexAlignType;
  minHeight?: number;
  maxHeight?: number;
  hasShadow?: boolean;
};

const TWWrapper = ({
  children,
  margin,
  padding,
  radius = 12,
  flexDirection,
  justifyContent,
  alignItem,
  minHeight,
  maxHeight,
  hasShadow = true,
}: Props) => {
  return hasShadow ? (
    <View
      style={[
        styles.shadow,
        styles.whiteBg,
        styles.itemWrap,
        {
          marginLeft: scale(margin?.left || 0),
          marginRight: scale(margin?.right || 0),
          marginTop: scale(margin?.top || 0),
          marginBottom: scale(margin?.bottom || 24),
        },
        {
          flexDirection: flexDirection,
          justifyContent: justifyContent,
          alignItems: alignItem,
          borderRadius: radius,
          minHeight: minHeight && scale(minHeight),
          maxHeight: maxHeight && scale(maxHeight),
        },
        typeof padding === 'number'
          ? { padding: scale(padding) }
          : {
              paddingTop: scale(padding?.top || 0),
              paddingLeft: scale(padding?.left || 0),
              paddingRight: scale(padding?.right || 0),
              paddingBottom: scale(padding?.bottom || 0),
            },
      ]}
    >
      {children}
    </View>
  ) : (
    <View
      style={[
        { borderWidth: 1, borderColor: AppColors.boldDivider },
        styles.whiteBg,
        styles.itemWrap,
        {
          marginLeft: scale(margin?.left || 0),
          marginRight: scale(margin?.right || 0),
          marginTop: scale(margin?.top || 0),
          marginBottom: scale(margin?.bottom || 24),
        },
        {
          flexDirection: flexDirection,
          justifyContent: justifyContent,
          alignItems: alignItem,
          borderRadius: radius,
          minHeight: minHeight && scale(minHeight),
          maxHeight: maxHeight && scale(maxHeight),
        },
        typeof padding === 'number'
          ? { padding: scale(padding) }
          : {
              paddingTop: scale(padding?.top || 0),
              paddingLeft: scale(padding?.left || 0),
              paddingRight: scale(padding?.right || 0),
              paddingBottom: scale(padding?.bottom || 0),
            },
      ]}
    >
      {children}
    </View>
  );
};

export default TWWrapper;
