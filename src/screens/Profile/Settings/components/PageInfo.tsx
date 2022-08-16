import React, { Fragment, ReactNode } from 'react';
import { View } from 'react-native';

import { TWLabel } from '~components';
import { AppColors } from '~constants/colors';

import { styles } from './styles';

type Props = {
  title: string;
  description: string;
  icon: ReactNode;
};

export const PageInfo = ({ title, description, icon }: Props) => {
  return (
    <Fragment>
      <View style={[styles.horizWrap, styles.alignStart, styles.mb12]}>
        {icon}
        <TWLabel size={24} weight="bold" margin={{ left: 18 }}>
          {title}
        </TWLabel>
      </View>
      <TWLabel
        size={14}
        lineHeight={20}
        color={AppColors.placeholder}
        margin={{ bottom: 24 }}
      >
        {description}
      </TWLabel>
    </Fragment>
  );
};
