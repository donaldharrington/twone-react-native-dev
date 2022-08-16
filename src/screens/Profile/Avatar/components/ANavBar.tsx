import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { TWIcons, TWLabel } from '~components';
import { AppColors } from '~constants/colors';
import * as RootNav from '~navigators/NavigationRef';

import { compStyles } from './styles';

type Props = {
  hasNext?: boolean;
  backOverride?: () => void;
  nextAction?: () => void;
};

export const ANavBar = ({ hasNext, backOverride, nextAction }: Props) => {
  const onGoBack = () => {
    const nav = RootNav.navigationRef.current;
    if (nav) {
      if (nav.canGoBack()) {
        nav.goBack();
      }
    }
  };
  return (
    <View style={[compStyles.navCont, { marginTop: 60 }]}>
      <TouchableOpacity
        style={[compStyles.btn, compStyles.backBtn]}
        onPress={backOverride || onGoBack}
      >
        <TWIcons.backArrow fill={AppColors.text} />
      </TouchableOpacity>
      {hasNext && (
        <TouchableOpacity
          style={[compStyles.btn, compStyles.nextBtn]}
          onPress={nextAction}
        >
          <TWLabel size={18} weight="semiBold" color={AppColors.white}>
            Next
          </TWLabel>
        </TouchableOpacity>
      )}
    </View>
  );
};
