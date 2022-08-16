import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { TWLabel } from '~components/';
import { AppColors } from '~constants/colors';

type Props = {
  title: string;
  description: string;
  icon: ReactNode;
};

const styles = StyleSheet.create({
  term: {
    flexDirection: 'row',
    marginTop: 16,
  },
  termDesc: {
    marginLeft: 10,
  },
});

export const TermItem = ({ title, description, icon }: Props) => (
  <View style={styles.term}>
    {icon}
    <View style={styles.termDesc}>
      <TWLabel
        color={AppColors.black}
        weight={`semiBold`}
        lineHeight={24}
        size={18}
      >
        {title}
      </TWLabel>
      <TWLabel
        color={AppColors.black}
        lineHeight={24}
        size={16}
        margin={{ top: 11 }}
      >
        {description}
      </TWLabel>
    </View>
  </View>
);
