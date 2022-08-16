import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { TWBubble, TWButton, TWLabel } from '~components';
import TWAvatar from '~components/TWAvatar';
import { AppColors } from '~constants/colors';
import { Twone } from '~types/api/response.types';
import { MainNavProps } from '~types/navigation';

import { compStyles } from './styles';

type Props = {
  navigation: MainNavProps;
  twone: Twone;
};

export const ConnectCard = ({ navigation, twone }: Props) => {
  const onDetail = () => {
    navigation.navigate('ConnectDetail', { twone: twone });
  };

  const onConnect = () => {
    navigation.navigate('ProfileShare', { twone: twone });
  };

  return (
    <View style={[compStyles.connectCard, compStyles.shadow]}>
      <View style={[compStyles.horiz, compStyles.between]}>
        <TWLabel size={18} lineHeight={20} margin={{top: 6, bottom: -6}} weight="semiBold" color={AppColors.text}>
          {twone.owner?.avatar?.name}
        </TWLabel>
        {/* <TouchableOpacity onPress={onDetail}>
          <TWLabel>Details</TWLabel>
        </TouchableOpacity> */}
      </View>
      <View style={compStyles.horiz}>
        <TWAvatar {...twone.owner?.avatar} size={48}  />
        <TWBubble contents={twone.howWeMet} />
      </View>
      <TWButton
        title="CONNECT"
        type="pink"
        size="sm"
        onClick={onConnect}
      />
    </View>
  );
};
