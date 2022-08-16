import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { AppColors } from '~constants/colors';
import { ColorType } from '~types';

import { compStyles } from './styles';

type Props = {
  colors: ColorType[];
  curValue: ColorType['color'];
  onChangeColor?: (color: ColorType) => void;
};

export const ColorPanel = ({
  colors,
  curValue = 'empty',
  onChangeColor,
}: Props) => {
  const [curColor, setCurColor] = useState(curValue);

  const onChange = (color: ColorType) => {
    setCurColor(color.color);
    if (onChangeColor) {
      onChangeColor(color);
    }
  };

  return (
    <View style={compStyles.colorPanel}>
      {colors.map(({ value, color }) => (
        <LinearGradient
          key={color}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0.01, 0.03, 1]}
          colors={
            curColor === color
              ? AppColors.gradientPink
              : ['transparent', 'transparent', 'transparent']
          }
          style={[compStyles.colorItemWrap]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={[compStyles.colorItem, { backgroundColor: value }]}
            onPress={() => onChange({ value, color })}
          />
        </LinearGradient>
      ))}
    </View>
  );
};
