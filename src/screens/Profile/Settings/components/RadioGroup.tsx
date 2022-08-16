import React, { Fragment, useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { TWIcons, TWLabel } from '~components';
import { AppColors } from '~constants/colors';
import { BUTTON_ACTIVE_OPACITY } from '~constants/config';
import { RadioType } from '~types';
import { verticalScale, scale } from '~utils/dimension';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: verticalScale(48),
    marginLeft: scale(16),
    paddingRight: scale(16),
  },
  icon: {
    width: scale(32),
    height: scale(32),
    resizeMode: 'contain',
  },
  locked: {
    opacity: 0.3,
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
});

type Props = {
  data: Array<RadioType>;
  onChanged?: (item: RadioType) => void;
};

export const TWRadioGroup = ({ data, onChanged }: Props) => {
  const [curItem, setCurItem] = useState<RadioType>();

  const onSelect = useCallback(
    (item: RadioType) => {
      if (onChanged) {
        onChanged(item);
      }
      setCurItem(item);
    },
    [onChanged],
  );

  return (
    <Fragment>
      {data.map((item, idx) => (
        <View key={item.id}>
          <TouchableOpacity
            activeOpacity={BUTTON_ACTIVE_OPACITY}
            style={[styles.item, idx < data.length - 1 && styles.underline]}
            onPress={() => onSelect(item)}
          >
            <TWLabel margin={{ right: 12 }}>{item.label}</TWLabel>
            {!curItem || curItem.value !== item.value ? (
              <TWIcons.radio />
            ) : (
              <TWIcons.radioActive />
            )}
          </TouchableOpacity>
        </View>
      ))}
    </Fragment>
  );
};
