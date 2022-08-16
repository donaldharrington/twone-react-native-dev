import React, { useState } from 'react';
import { StyleSheet, View, Switch } from 'react-native';

import { TWLabel } from '~components';
import { AppColors } from '~constants/colors';

import { ItemWrapper } from '../components/ItemWrapper';

export const style = StyleSheet.create({
  item: {
    display: 'flex',
    padding: 16,
    flexDirection: 'row',
  },
  itemLabel: {
    flexGrow: 1,
  },
});

type Props = {
  title: string;
  onChange: (selected: boolean) => void;
};

const PushNotificationItem = ({ title, onChange }: Props) => {
  const [checked, setChecked] = useState(true);

  const toggleSwitch = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <ItemWrapper>
      <View style={style.item}>
        <TWLabel
          weight="medium"
          size={16}
          color={AppColors.black}
          lineHeight={24}
          styles={style.itemLabel}
        >
          {title}
        </TWLabel>
        <Switch
          trackColor={{ false: AppColors.bgGray, true: AppColors.primary }}
          thumbColor={AppColors.white}
          ios_backgroundColor={AppColors.bgGray}
          onValueChange={toggleSwitch}
          value={checked}
        />
      </View>
    </ItemWrapper>
  );
};

export default PushNotificationItem;
