import { CometChat } from '@cometchat-pro/react-native-chat';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';

import { TWAvatar, TWLabel } from '~components';
import { AppColors } from '~constants/colors';
import useUser from '~recoil/user';
import { AvatarType } from '~types/avatar';
import { scale, sWidth, verticalScale } from '~utils/dimension';

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: sWidth * 0.88,
    flexShrink: 1,
    flexGrow: 1,
    marginVertical: verticalScale(16),
    marginHorizontal: verticalScale(0)
  },
  left: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    borderLeftWidth: scale(4),
    borderLeftColor: AppColors.primary,
    paddingLeft: scale(10),
  },
  right: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    borderRightWidth: scale(4),
    borderRightColor: AppColors.pink,
    paddingRight: scale(10),
  },
  system: {
    borderLeftColor: AppColors.pink,
  },
  horiz: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: scale(26),
    height: scale(26),
  },
});

type Props = {
  avatar?: AvatarType;
  data: CometChat.BaseMessage;
};

export const MessageBubble = ({ avatar, data }: Props) => {
  const { userState } = useUser();

  return (
    <View
      style={[
        styles.wrapper,
        userState.id === data.getSender().getUid() ? styles.right : styles.left,
      ]}
    >
      <View style={[styles.horiz, { marginBottom: verticalScale(6) }]}>
        {userState.id !== data.getSender().getUid() && (
          <TWAvatar {...avatar} size={26} />
        )}
        <TWLabel
          color={
            userState.id === data.getSender().getUid()
              ? AppColors.pink
              : AppColors.primary
          }
          margin={{ left: scale(8), right: scale(8) }}
          isUppercase
        >
          {userState.id === data.getSender().getUid()
            ? `Me`
            : `${data.getSender().getName()}`}
        </TWLabel>
        {userState.id === data.getSender().getUid() && (
          <TWAvatar {...userState.avatar} size={26} />
        )}
      </View>
      <TWLabel size={16} lineHeight={24} weight="medium" color={AppColors.text}>
        {(data as CometChat.TextMessage).getText()}
      </TWLabel>
    </View>
  );
};
