import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';

import { TWScreen, TWIcons, TWLabel } from '~components/';
import { AppColors } from '~constants/colors';

import { HeadLine } from '../HeadLine';

const EnterTroubleScreen = () => {
  const openMail = async () => {
    try {
      await Linking.openURL('mailto:support@twone.app');
    } catch (error) {}
  };

  return (
    <TWScreen vAlign="space-between">
      <View animation="fadeInUp" delay={300} duration={500}>
        <HeadLine
          title={`Having trouble\nlogging in?`}
          description=""
          icon={<TWIcons.person width={24} height={24} />}
        />

        <TWLabel
          color={AppColors.black}
          margin={{ top: 12 }}
          lineHeight={24}
          size={16}
        >
          If you're having trouble logging in for any reason, we canhelp recover
          your account.
        </TWLabel>

        <TWLabel
          color={AppColors.black}
          margin={{ top: 12 }}
          lineHeight={24}
          size={16}
        >
          Let us know by sending a brief description at{' '}
          <TouchableOpacity onPress={openMail}>
            <TWLabel
              color={AppColors.link}
              margin={{ top: 27 }}
              lineHeight={24}
              size={16}
            >
              support@twone.app
            </TWLabel>
          </TouchableOpacity>
        </TWLabel>
      </View>
    </TWScreen>
  );
};

export default EnterTroubleScreen;
