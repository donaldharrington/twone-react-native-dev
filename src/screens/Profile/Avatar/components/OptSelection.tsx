import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { AppColors } from '~constants/colors';
import { IconOptsTypes } from '~types';
import { scale, sWidth } from '~utils/dimension';

import { compStyles } from './styles';

type Props = {
  data: IconOptsTypes[];
  curValue: string;
  onSelected?: (ret: string) => void;
};

export const OptSelection = ({ data, curValue, onSelected }: Props) => {
  const itemWidth = (sWidth - scale(16) * 4) * 0.33;

  const [curItem, setCurItem] = useState(curValue);

  const onSelect = (val: string) => {
    setCurItem(val);
    if (onSelected) {
      onSelected(val);
    }
  };

  const getGap = (idx: number) => {
    return idx % 3 < 2 ? scale(16) : 0;
  };

  return (
    <View style={compStyles.optWrap}>
      {data.map(({ icon, accessory, value }, idx) => (
        <LinearGradient
          key={value}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0.01, 0.03, 1]}
          colors={
            curItem === value
              ? AppColors.gradientPink
              : ['transparent', 'transparent', 'transparent']
          }
          style={[
            compStyles.gradiWrap,
            {
              width: itemWidth,
              height: itemWidth,
              borderRadius: itemWidth * 0.5,
              marginRight: getGap(idx),
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => onSelect(value)}
            style={[
              compStyles.optItem,
              {
                borderRadius: itemWidth * 0.5,
              },
            ]}
            activeOpacity={1}
          >
            {icon}
            {accessory && (
              <View style={compStyles.optItemAddon}>{accessory}</View>
            )}
          </TouchableOpacity>
        </LinearGradient>
      ))}
    </View>
  );
};
