import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';

import { TWButton, TWIcons, TWLabel, TWScreen } from '~components/';
import { AppColors } from '~constants/colors';
import useGlobal from '~recoil/global';
import { AuthNavProps } from '~types/navigation';

import { TermItem } from './TermItem';

const styles = StyleSheet.create({
  termsWrapper: {
    marginTop: 32,
    textAlign: 'left',
  },
  centered: {
    textAlign: 'center',
  },
});

type Props = {
  navigation: AuthNavProps;
};

const EnterBlockScreen = ({ navigation }: Props) => {
  const { setIsLoggedIn } = useGlobal();
  const handleAgree = () => {
    setIsLoggedIn(true);
    navigation.navigate('Main');
  };

  return (
    <TWScreen vAlign="space-between" hideNav={true}>
      <View animation="fadeInUp" delay={300} duration={500}>
        <TWLabel
          margin={{ top: 30 }}
          styles={styles.centered}
          color={AppColors.black}
          lineHeight={36}
          size={32}
          weight={`bold`}
        >
          Welcome to Twone
        </TWLabel>

        <TWLabel
          styles={styles.centered}
          color={AppColors.gray}
          margin={{ top: 11 }}
          lineHeight={24}
          size={15}
        >
          Everyone deserves to find true connections.{`\n`}Let's make that
          happen.
        </TWLabel>

        <View style={styles.termsWrapper}>
          <TermItem
            title={`You only need to be you.`}
            description={`Real memories with real people. The only thing you need? Being yourself.`}
            icon={<TWIcons.crown width={24} height={24} />}
          />

          <TermItem
            title={`Be kind.`}
            description={`You are valuable, and so are others.\nBe kind and respectful.`}
            icon={<TWIcons.heartIcon width={24} height={24} />}
          />

          <TermItem
            title={`Stay safe.`}
            description={`Fun is cool, but your safety is our priority. We'll always be here for you.`}
            icon={<TWIcons.shield width={24} height={24} />}
          />
        </View>
      </View>

      <View animation="fadeInUp" delay={500} duration={500}>
        <TWButton title="I Agree" onClick={handleAgree} />
      </View>
    </TWScreen>
  );
};

export default EnterBlockScreen;
