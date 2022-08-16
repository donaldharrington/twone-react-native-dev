import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AppColors } from '~constants/colors';
import * as RootNav from '~navigators/NavigationRef';
import { scale, verticalScale } from '~utils/dimension';

import TWLabel from './atoms/TWLabel';
import TWIcons from './TWIcons';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: scale(46),
    paddingHorizontal: scale(20),
  },
  title: {
    flexShrink: 1,
    flexGrow: 1,
  },
  fake: {
    width: scale(60),
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
    paddingBottom: scale(12),
  },
});

type Props = {
  title?: string;
  isModal?: boolean;
  actionColor?: string;
  actionTitle?: string;
  actionDisabled?: boolean;
  hasBorder?: boolean;
  onSave?: () => void;
  onBack?: () => void;
};

const TWNavBar = ({
  title,
  isModal,
  actionColor,
  actionTitle,
  actionDisabled,
  hasBorder,
  onBack,
  onSave,
}: Props) => {
  const onGoBack = () => {
    const nav = RootNav.navigationRef.current;
    if (nav) {
      if (nav.canGoBack()) {
        nav.goBack();
      }
    }
  };
  return (
    <View
      style={[
        styles.wrapper,
        isModal && { paddingTop: verticalScale(16) },
        hasBorder && styles.bottomBorder,
      ]}
    >
      <TouchableOpacity
        onPress={onBack || onGoBack}
        style={{ width: scale(60) }}
      >
        <TWIcons.backArrow width={24} height={24} fill={AppColors.text} />
      </TouchableOpacity>
      {title && (
        <TWLabel size={18} weight="semiBold" align="center">
          {title}
        </TWLabel>
      )}
      {onSave ? (
        <TouchableOpacity
          disabled={actionDisabled}
          onPress={onSave}
          style={{ width: scale(60) }}
        >
          <TWLabel
            size={16}
            weight="medium"
            color={actionColor || AppColors.gray}
            styles={{ justifyContent: 'flex-end', textAlign: 'right' }}
          >
            {actionTitle || 'Save'}
          </TWLabel>
        </TouchableOpacity>
      ) : (
        <View style={styles.fake} />
      )}
    </View>
  );
};

export default TWNavBar;
