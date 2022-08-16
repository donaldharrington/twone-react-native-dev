import moment from 'moment';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';

import { TWAvatar, TWButton, TWIcons, TWImage, TWLabel } from '~components';
import { AppColors } from '~constants/colors';
import AppImages from '~constants/images';
import { UserTypes } from '~types';
import { scale, verticalScale } from '~utils/dimension';

const styles = StyleSheet.create({
  avatarWrap: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: verticalScale(24),
  },
  avatar: {
    width: verticalScale(80),
    height: verticalScale(80),
    borderRadius: verticalScale(60),
    overflow: 'hidden',
  },
  subAvatar: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: scale(2),
    borderColor: AppColors.white,
  },
});

type Props = {
  userInfo: UserTypes;
  isMore?: boolean;
  top?: number;
  isDisconnected?: boolean;
  onShowProfile?: () => void;
};

export const ChatHeader = ({
  userInfo,
  isMore = false,
  top = 0,
  isDisconnected,
  onShowProfile,
}: Props) => {
  const posAnim = useRef(new Animated.Value(0)).current;

  const onChangePos = useCallback(
    (pos: number) => {
      Animated.timing(posAnim, {
        toValue: pos,
        duration: 200,
        useNativeDriver: false,
      }).start();
    },
    [posAnim],
  );

  useEffect(() => {
    onChangePos(top);
  }, [onChangePos, top]);

  return useMemo(
    () => (
      <Animated.View style={{ marginTop: posAnim, marginBottom: scale(28) }}>
        {!isMore && (
          <TWLabel
            size={12}
            lineHeight={20}
            weight="regular"
            align="center"
            color={AppColors.placeholder}
            margin={{ top: verticalScale(16), bottom: verticalScale(-4) }}
          >
            {`You connected with ${userInfo.firstName} on ${moment(
              userInfo.connectedDate,
            ).format('MM/DD/YYYY')}`}
          </TWLabel>
        )}
        <View style={styles.avatarWrap}>
          <View>
            {isDisconnected ? (
              <TWIcons.noProfile />
            ) : (
              <Fragment>
                <TWImage
                  image={userInfo.profilePhoto || AppImages.profile}
                  styles={styles.avatar}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.subAvatar}>
                  <TWAvatar {...userInfo.avatar} size={28} />
                </View>
              </Fragment>
            )}
          </View>
          <TWLabel
            size={20}
            lineHeight={24}
            weight="semiBold"
            margin={{ top: 14, bottom: 20 }}
            color={AppColors.text}
          >
            {userInfo.firstName}
          </TWLabel>
          {!isDisconnected && (
            <TWButton title="View Profile" size="xsm" weight='medium' inUppercase='false' onClick={onShowProfile} type='purple' />
          )}
        </View>
      </Animated.View>
    ),
    [
      posAnim,
      isMore,
      userInfo.firstName,
      userInfo.connectedDate,
      userInfo.profilePhoto,
      userInfo.avatar,
      isDisconnected,
      onShowProfile,
    ],
  );
};
