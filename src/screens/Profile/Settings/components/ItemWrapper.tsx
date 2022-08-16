import React, { ReactNode } from 'react';
import { FlexAlignType, View } from 'react-native';

import { profileStyles } from '~screens/Profile/styles';
import { GapTypes } from '~types';

import { styles } from './styles';

type Props = {
  children: ReactNode;
  margin?: GapTypes;
  padding?: GapTypes;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItem?: FlexAlignType;
};

export const ItemWrapper = ({
  children,
  margin,
  padding,
  flexDirection,
  justifyContent,
  alignItem,
}: Props) => {
  return (
    <View
      style={[
        profileStyles.shadow,
        styles.whiteBg,
        styles.itemWrap,
        {
          marginLeft: margin?.left,
          marginRight: margin?.right,
          marginTop: margin?.top,
          paddingTop: padding?.top,
          paddingLeft: padding?.left,
          paddingRight: padding?.right,
          paddingBottom: padding?.bottom,
        },
        {
          flexDirection: flexDirection,
          justifyContent: justifyContent,
          alignItems: alignItem,
        },
      ]}
    >
      {children}
    </View>
  );
};
