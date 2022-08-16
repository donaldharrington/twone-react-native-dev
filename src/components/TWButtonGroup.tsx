import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { AppColors } from '~constants/colors';
import { scale } from '~utils/dimension';

import TWLabel from './atoms/TWLabel';

const styles = StyleSheet.create({
  optionWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  underLine: {
    borderBottomWidth: scale(2),
    borderBottomColor: AppColors.border,
  },
  kindBtn: {
    paddingRight: scale(20),
    minHeight: scale(48),
    justifyContent: 'center',
  },
});

type Props = {
  data: { label: string; value: string }[];
  align?: 'space-evenly' | 'space-between' | 'flex-start';
  parentStyles?: ViewStyle;
  underLine?: boolean;
  textStyle?: TextStyle;
  activeColor?: string;
  isTab?: boolean;
  onChanged?: (val: string) => void;
};

const TWButtonGroup = ({
  data,
  align = 'flex-start',
  parentStyles,
  underLine = true,
  isTab = false,
  textStyle,
  activeColor,
  onChanged,
}: Props) => {
  const [curKind, setKind] = useState<string>(data[0].value);

  const onChangeKind = useCallback(
    (kind: string) => {
      setKind(kind);
      if (onChanged) {
        onChanged(kind);
      }
    },
    [onChanged],
  );

  const dStyle = useCallback(
    (value: string) => {
      return {
        paddingRight: align === 'flex-start' ? scale(36) : 0,
        borderBottomWidth: 2,
        borderBottomColor:
          curKind === value ? activeColor || 'transparent' : 'transparent',
        flexGrow: isTab ? 1 : 0,
      };
    },
    [activeColor, align, isTab, curKind],
  );

  return (
    <View
      style={[
        styles.optionWrap,
        { justifyContent: align },
        parentStyles,
        underLine && !isTab && styles.underLine,
      ]}
    >
      {data.map(({ label, value }) => (
        <TouchableOpacity
          key={value}
          onPress={() => onChangeKind(value)}
          style={[styles.kindBtn, dStyle(value)]}
        >
          <TWLabel
            size={isTab ? 14 : 20}
            weight="medium"
            color={
              curKind === value
                ? activeColor || AppColors.secondary
                : AppColors.text
            }
            align={isTab ? 'center' : 'left'}
            styles={textStyle}
          >
            {label}
          </TWLabel>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TWButtonGroup;
