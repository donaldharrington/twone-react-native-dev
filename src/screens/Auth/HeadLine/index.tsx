import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { TWLabel, TWTitle } from '~components';
import { AppColors } from '~constants/colors';
import { scale } from '~utils/dimension';

type Props = {
  title: string;
  description: string;
  icon: ReactNode;
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    marginBottom: scale(20),
  },
  icon: {
    paddingRight: scale(14),
    paddingTop: scale(7),
  },
  info: {
    flexShrink: 1,
    flexGrow: 1,
  },
});

export const HeadLine = ({ title, description, icon }: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.info}>
        <TWTitle>{title}</TWTitle>
        <TWLabel
          color={AppColors.gray}
          margin={{ top: 12 }}
          lineHeight={16}
          size={12}
        >
          {description}
        </TWLabel>
      </View>
    </View>
  );
};
