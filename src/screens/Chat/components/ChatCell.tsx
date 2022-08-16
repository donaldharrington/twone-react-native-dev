import { CometChat } from '@cometchat-pro/react-native-chat';
import moment from 'moment';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { TWAvatar, TWImage, TWLabel } from '~components';
import { AppColors } from '~constants/colors';
import AppImages from '~constants/images';
import { ChatType } from '~types';
import { scale, verticalScale } from '~utils/dimension';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // maxHeight: verticalScale(84),
    backgroundColor: AppColors.white,
    paddingHorizontal: scale(16),
    paddingVertical: scale(0),
  },
  inner: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
    minHeight: verticalScale(80),
  },
  avatar: {
    height: verticalScale(60),
    width: verticalScale(60),
    borderRadius: verticalScale(6),
  },
  textWrap: {
    flexShrink: 1,
    flexGrow: 1,
    paddingRight: scale(14),
    paddingLeft: scale(12),
  },
  endWrap: {
    alignItems: 'flex-end',
  },
  badge: {
    marginTop: scale(10),
    minWidth: scale(24),
    height: scale(24),
    alignItems: 'center',
    justifyContent: 'flex-end' ,
    backgroundColor: AppColors.pink,
    borderRadius: scale(12),
    
  },
});

type Props = {
  data: ChatType;
  isAdmin?: boolean;
  onClick?: () => void;
};

export const ChatCell = ({ data, isAdmin = false, onClick }: Props) => {
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={onClick}
      activeOpacity={1}
    >
      {isAdmin ? (
        <TWImage image={AppImages.logo} />
      ) : (
        // <TWImage image={data?.userInfo || AppImages.avatar} />
        <TWAvatar {...data.userInfo.avatar} size={58} />
      )}
      <View style={styles.inner}>
        <View style={styles.textWrap}>
          <TWLabel
            size={16}
            color={AppColors.text}
            weight="semiBold"
            lineHeight={24}
            margin={{ bottom: 4 }}
          >
            {`${data.userInfo.firstName} ${data.userInfo.lastName || ''}`}
          </TWLabel>
          <TWLabel size={14} lineHeight={18} maxHeight={26} weight="regular" color={AppColors.placeholder}>
            {(
              data.conversation?.getLastMessage() as CometChat.TextMessage
            )?.getText()}
          </TWLabel>
        </View>
        <View style={styles.endWrap}>
          <TWLabel size={12} lineHeight={16} weight="regular" color={AppColors.placeholder} >
            {data.conversation &&
              moment(
                (
                  data.conversation?.getLastMessage() as CometChat.TextMessage
                ).getSentAt() * 1000,
              ).format('hh:mma')}
          </TWLabel>
          {data.conversation && data.conversation.getUnreadMessageCount() > 0 && (
            <View style={styles.badge}>
              <TWLabel paddingHorizontal={8}  size={12} weight="medium" align="center" color={AppColors.white}>
                {data.conversation.getUnreadMessageCount()}
              </TWLabel>
            </View>
          )}
          {/* {!data.conversation && (
            <View style={styles.badge}>
              <TWLabel color={AppColors.white}>New</TWLabel>
            </View>
          )} */}
        </View>
      </View>
    </TouchableOpacity>
  );
};
