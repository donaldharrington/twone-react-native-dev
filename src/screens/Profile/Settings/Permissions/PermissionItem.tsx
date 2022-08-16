import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { TWIcons, TWLabel } from '~components';
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
    marginStart: 26,
  },
});

type Props = {
  title: string;
  icon: ReactNode;
  onPress: () => void;
};

const PermissionItem = ({ title, icon, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ItemWrapper>
        <View style={style.item}>
          {icon}
          <TWLabel
            weight="medium"
            size={16}
            color={AppColors.black}
            lineHeight={24}
            styles={style.itemLabel}
          >
            {title}
          </TWLabel>
          <TWIcons.rightArrow />
        </View>
      </ItemWrapper>
    </TouchableOpacity>
  );
};

export default PermissionItem;
