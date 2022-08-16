import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';

import { TWAvatar, TWLabel } from '~components';
import { AppColors } from '~constants/colors';
import { RoomType } from '~types';
import { scale, verticalScale } from '~utils/dimension';

const styles = StyleSheet.create({
  wrapper: {
    maxHeight: verticalScale(90),
    marginRight: scale(12),
    paddingTop: verticalScale(14),
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: verticalScale(32),
    
  },
  avatar: {
    height: verticalScale(60),
    width: verticalScale(60),
    borderRadius: verticalScale(30),
    marginBottom: verticalScale(6),
   
    
  },
});

type Props = {
  data: RoomType;
  onClick?: () => void;
};

export const RoomCell = ({ data, onClick }: Props) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onClick}>
      <View
        style={[
          styles.avatar,
          { height: verticalScale(60), width: verticalScale(60), alignItems: 'center' },
        ]}
      >
        <TWAvatar {...data.user.avatar} size={60} />
      </View>

      <TWLabel size={15} lineHeight={24} weight="regular" color={AppColors.text} align="center" >
        {data.user.firstName}
      </TWLabel>
    </TouchableOpacity>
  );
};
