import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { TWIcons, TWLabel } from '~components';
import { AppColors } from '~constants/colors';
import { scale } from '~utils/dimension';

export const styles = StyleSheet.create({
  itemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: scale(16),
    paddingRight: scale(16),
    paddingVertical: scale(16),
    borderBottomWidth: scale(1),
    borderBottomColor: AppColors.divider,
  },
  rightView: {
    flex: 1,
    paddingVertical: scale(16),
  },
  addressWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    paddingLeft: scale(12),
    paddingRight: scale(12),
  },
  address: {
    flex: 1,
  },
  divider: {
    borderBottomColor: AppColors.divider,
    borderBottomWidth: scale(1),
    marginTop: scale(16),
    opacity: 0.1,
  },
});

type Props = {
  address: string;
  subLine: string;
  distance: number;
  onPress: () => void;
};

const AddressItem = ({ address, subLine, distance, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.itemWrapper} onPress={onPress}>
      <TWIcons.whiteLocation width={24} height={24} />
      <View style={styles.addressWrapper}>
        <TWLabel color={AppColors.white} size={16} weight="medium">
          {address}
        </TWLabel>
        <TWLabel color={AppColors.white} size={12}>
          {subLine}
        </TWLabel>
      </View>
      {/* MARK: Removed distance for now */}
      {/* <TWLabel color={AppColors.white} size={12}>
        {distance}mi
      </TWLabel> */}
    </TouchableOpacity>
  );
};

export default AddressItem;
