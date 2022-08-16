import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TWIcons, TWImage, TWLabel } from '~components';
import { AppColors } from '~constants/colors';
import AppImages from '~constants/images';
import { UserTypes } from '~types';
import { MainNavProps } from '~types/navigation';
import { scale } from '~utils/dimension';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    zIndex: 10,
  },
  horiz: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topAvatar: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    marginLeft: scale(4),
    marginRight: scale(12),
    overflow: 'hidden',
  },
  
  topAction: {
    // width: scale(48),
    height: scale(48),
    marginHorizontal: scale(12),
    marginBottom: scale(6),
    alignItems: 'center',
    justifyContent: 'center',
    // color: AppColors.placeholder,
  },
});

type Props = {
  navigation: MainNavProps;
  info: UserTypes;
  onClickMore?: () => void;
  onClickProfile?: () => void;
  hideMore?: boolean;
  isDisconnected?: boolean;
};

export const ChatNavBar = ({
  navigation,
  info,
  hideMore,
  isDisconnected,
  onClickMore,
  onClickProfile,
}: Props) => {
  const inset = useSafeAreaInsets();

  return useMemo(
    () => (
      <View style={[styles.header, { paddingTop: inset.top }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.topAction}
        >
          <TWIcons.backArrow fill={AppColors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onClickProfile} style={styles.horiz}>
          <TWImage
            image={info.profilePhoto || AppImages.profile}
            styles={styles.topAvatar}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View>
            <TWLabel color={AppColors.text} size={15} lineHeight={16} margin={{bottom: 0}} weight="semiBold">{info.firstName}</TWLabel>
            {!isDisconnected && (
              <TWLabel color={AppColors.placeholder} size={12} lineHeight={16} weight="regular">
                {info.avatar?.name}
              </TWLabel>
            )}
          </View>
        </TouchableOpacity>
        {!hideMore && (
          <TouchableOpacity style={styles.topAction} onPress={onClickMore}>
            <TWIcons.more/>
          </TouchableOpacity>
        )}
      </View>
    ),
    [navigation, info, hideMore, onClickMore, isDisconnected],
  );
};
