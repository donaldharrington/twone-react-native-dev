import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale, verticalScale } from '~utils/dimension';

import TWLabel from './atoms/TWLabel';

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    marginTop: scale(2),
    paddingVertical: verticalScale(10),
    marginBottom: scale(8),
    flexShrink: 1,
    flexGrow: 1,
    height: verticalScale(84),
  },
  left: {
    borderTopRightRadius: 0,
    marginRight: scale(12),
  },
  right: {
    borderTopLeftRadius: 0,
    marginLeft: scale(12),
  },
});

type Props = {
  direction?: 'left' | 'right';
  contents?: string;
  color?: string;
  renderContents?: ReactNode;
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
  align?: 'center' | 'right' | 'left';
};

const TWBubble = ({
  direction = 'right',
  contents,
  color = AppColors.primary,
  renderContents,
  weight = 'regular',
  align = 'left',
}: Props) => {
  return (
    <View
      style={[styles.wrapper, styles[direction], { backgroundColor: color }]}
    >
      {contents && (
        <TWLabel
          size={15}
          lineHeight={20}
          color={AppColors.white}
          weight="regular"
          align={align}
        >
          {contents}
        </TWLabel>
      )}
      {renderContents && renderContents}
    </View>
  );
};

export default TWBubble;
