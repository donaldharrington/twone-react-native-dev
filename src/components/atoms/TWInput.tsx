import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import { AppColors } from '~constants/colors';
import { scale } from '~utils/dimension';

const styles = StyleSheet.create({
  text: {
    fontWeight: '700',
  },
  wrong: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.error,
  },
});

type Props = {
  onChange?: (value: string) => void;
  placeHolder?: string;
  parentStyle?: ViewStyle;
  isInvalid?: boolean;
  isPassword?: boolean;
  size?: number;
  lineHeight: number;
  color?: string;
  mt?: number;
  mb?: number;
  defaultValue?: string;
  paddingHorizontal?: number;
  inputProps?: TextInputProps;
  textAlign?: 'center' | 'right' | 'left';
  fontWeight?: 'normal' | '700' | '500' | '400' | '600';
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  italic?: boolean;
};

const TWInput = ({
  onChange,
  placeHolder,
  parentStyle,
  isInvalid,
  isPassword,
  size = 20,
  color,
  // paddingHorizontal =16,
  mt,
  mb,
  defaultValue,
  inputProps,
  textAlign,
  fontWeight = '400',
  lineHeight,
  multiline = false,
  numberOfLines,
  maxLength,
  // italic = true,
}: Props) => {
  // const [isItalic, setItalic] = useState(italic);
  // const italicStyle = isItalic ? 'italic' : 'normal';

  const onChangeText = useCallback(
    (txt: string) => {
      if (onChange) {
        onChange(txt);
      }
    },
    [onChange],
  );

  return (
    <View
      style={[
        {
          paddingHorizontal: scale(16),
          marginTop: scale(mt || 0),
          marginBottom: scale(mb || 0),
          paddingVertical: scale(12),
        },
        parentStyle,
        isInvalid && styles.wrong,
      ]}
    >
      <TextInput
        {...inputProps}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholder={placeHolder}
        secureTextEntry={isPassword}
        defaultValue={defaultValue}
        maxLength={maxLength}
        style={[
          styles.text,
          {
            fontSize: scale(size),
            color: color,
            textAlign,
            fontWeight,
            lineHeight,
            // fontStyle: italicStyle,
          },
        ]}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TWInput;
