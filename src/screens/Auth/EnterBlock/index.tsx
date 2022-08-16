import React from 'react';
import { Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';

import { TWIcons, TWLabel, TWScreen } from '~components/';
import { AppColors } from '~constants/colors';

import { HeadLine } from '../HeadLine';

const styles = StyleSheet.create({
  centered: {
    textAlign: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

const EnterBlockScreen = () => {
  const onContactUs = async () => {
    try {
      await Linking.openURL('mailto:support@twone.app');
    } catch (error) {}
  };

  return (
    <TWScreen vAlign="space-between">
      <View animation="fadeInUp" delay={300} duration={500}>
        <HeadLine
          title={`Unable to create\naccount`}
          description={``}
          icon={<TWIcons.block width={24} height={24} />}
        />

        <TWLabel
          margin={{ left: 35 }}
          color={AppColors.black}
          lineHeight={16}
          size={12}
        >
          We're sorry to stop you here, but you must be 18 years old to join
          Twone. Enjoy your time until then and we'll see you soon!
        </TWLabel>

        <TWLabel
          margin={{ top: 20, left: 35 }}
          color={AppColors.black}
          lineHeight={16}
          size={12}
        >
          To learn more about our age restriction policy, please read our{` `}
          <TWLabel styles={styles.underline} lineHeight={16} size={12}>
            Terms of Service
          </TWLabel>
          {` `}and{` `}
          <TWLabel styles={styles.underline} lineHeight={16} size={12}>
            Privacy Polic
          </TWLabel>
          .
        </TWLabel>
      </View>

      <View animation="fadeInUp" delay={500} duration={500}>
        <TouchableOpacity onPress={onContactUs}>
          <TWLabel
            styles={{ ...styles.centered, ...styles.underline }}
            color={AppColors.black}
            weight={`semiBold`}
            lineHeight={16}
            size={14}
          >
            Was this a mistake? Contact us
          </TWLabel>
        </TouchableOpacity>
      </View>
    </TWScreen>
  );
};

export default EnterBlockScreen;
