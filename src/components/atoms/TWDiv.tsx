import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale, verticalScale } from '~utils/dimension';

const styles = StyleSheet.create({
  div: {
    height: 1,
    backgroundColor: AppColors.border,
  },
});

type Props = {
  left?: number;
  right?: number;
  space?: number;
};

const TWDiv = ({ left, right, space }: Props) => {
  return (
    <View
      style={[
        styles.div,
        {
          marginLeft: left && scale(left),
          marginRight: right && scale(right),
          marginVertical: space && verticalScale(space),
        },
      ]}
    />
  );
};

export default TWDiv;
