import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { TWLabel } from '~components';
import { AppColors } from '~constants/colors';
import { scale } from '~utils/dimension';

export const styles = StyleSheet.create({
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: AppColors.boldDivider,
    paddingVertical: scale(8),
    marginHorizontal: scale(-20),
    // marginBottom: scale(24),
  },
  tabItem: {
    width: '50%',
    flexGrow: scale(1),
  },
  tabText: {
    width: '100%',
    textAlign: 'center',
  },
  verticalDivider: {
    width: scale(1),
    height: scale(24),
    backgroundColor: AppColors.boldDivider,
  },
});

type Props = {
  onSelectedTab: (tabIndex: number) => void;
};

const Tab = ({ onSelectedTab }: Props) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => {
          setSelectedTab(0);
          onSelectedTab(0);
        }}
      >
        <TWLabel
          weight="semiBold"
          size={14}
          lineHeight={16}
          color={selectedTab === 0 ? AppColors.primary : AppColors.gray}
          styles={styles.tabText}
        >
          Edit
        </TWLabel>
      </TouchableOpacity>

      <View style={styles.verticalDivider} />

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => {
          setSelectedTab(1);
          onSelectedTab(1);
        }}
      >
        <TWLabel
          weight="semiBold"
          size={14}
          lineHeight={16}
          color={selectedTab === 1 ? AppColors.primary : AppColors.gray}
          styles={styles.tabText}
        >
          Preview
        </TWLabel>
      </TouchableOpacity>
    </View>
  );
};

export default Tab;
