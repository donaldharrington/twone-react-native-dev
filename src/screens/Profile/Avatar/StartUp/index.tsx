import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TWButton, TWIcons, TWLabel } from '~components';
import { AppColors } from '~constants/colors';
import { AvatarNavProps } from '~types/navigation';
import { sHeight, sWidth } from '~utils/dimension';

import { ANavBar } from '../components/ANavBar';

import { styles } from './styles';

type Props = {
  navigation: AvatarNavProps;
};

const AvatarStartUpScreen = ({ navigation }: Props) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={styles.page}>
      <View style={styles.bgWrap}>
        <TWIcons.avatarStartup
          width={sWidth}
          {...(bottom > 0 && { height: sHeight })}
        />
      </View>
      <View style={[styles.nav, { top: 0 }]}>
        <ANavBar />
      </View>
      <View style={[styles.bottomWrap, { bottom: bottom + 20 }]}>
        <TWLabel size={20} weight="semiBold" margin={{ bottom: 8 }}>
          Create Your Twonie
        </TWLabel>
        <TWLabel
          size={16}
          color={AppColors.placeholder}
          lineHeight={24}
          margin={{ bottom: 24 }}
        >
          Customize your avatar and nickname to create your very own Twonie.
        </TWLabel>
        <TWButton
          title="Get Started"
          size="sm"
          onClick={() => navigation.navigate('AvatarConfig')}
        />
      </View>
    </View>
  );
};

export default AvatarStartUpScreen;
