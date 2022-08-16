import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TWIcons, TWInput, TWLabel } from '~components';
import { AppColors } from '~constants/colors';
import { scale, verticalScale } from '~utils/dimension';

export const styles = StyleSheet.create({
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(30),
    backgroundColor: AppColors.third,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: AppColors.darkGray,
    paddingHorizontal: scale(12),
    borderRadius: 100,
    marginRight: scale(12),
  },
  inputbox: {
    flex: 1,
    paddingVertical: scale(10),
  },
});

type Props = {
  isFullScreen?: boolean;
  onChange: (search: string) => void;
  onClear: () => void;
  onCancel: () => void;
};

const SearchBox = ({ isFullScreen, onChange, onClear, onCancel }: Props) => {
  const { top } = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const onChangeText = (str: string) => {
    setSearch(str);
    onChange(str);
  };

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.searchWrapper, { marginTop: isFullScreen ? top : 0 }]}
    >
      <View style={styles.inputWrapper}>
        <TWIcons.search width={16} height={16} />
        <TWInput
          size={14}
          placeHolder="Search"
          parentStyle={styles.inputbox}
          color={AppColors.white}
          inputProps={{
            value: search,
            placeholderTextColor: AppColors.gray,
          }}
          onChange={onChangeText}
        />
        <TouchableOpacity
          onPress={() => {
            setSearch('');
            onClear();
          }}
        >
          <TWIcons.clear width={16} height={16} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onCancel}>
        <TWLabel
          size={16}
          lineHeight={20}
          weight="semiBold"
          color={AppColors.white}
        >
          Cancel
        </TWLabel>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;
