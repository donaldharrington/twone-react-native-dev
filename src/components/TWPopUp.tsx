import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
// eslint-disable-next-line import/no-named-as-default
import ReactNativeModal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppColors } from '~constants/colors';
import { scale, verticalScale } from '~utils/dimension';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: AppColors.white,
    borderTopRightRadius: scale(14),
    borderTopLeftRadius: scale(14),
  },
  headerIcon: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    borderWidth: scale(2),
    borderColor: AppColors.white,
    shadowColor: AppColors.black,
    shadowOpacity: 0.2,
    shadowRadius: scale(7),
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: AppColors.golden,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -scale(32),
    marginBottom: scale(24),
  },
});

type Props = {
  children?: ReactNode;
  isVisible: boolean;
  noPadding?: boolean;
  disableBackDropClose?: boolean;
  disableSwipe?: boolean;
  containerStyle?: ViewStyle;
  icon?: ReactNode;
  onCloseModal?: () => void;
};

const TWPopUp = ({
  children,
  isVisible,
  noPadding,
  disableBackDropClose,
  disableSwipe,
  containerStyle,
  icon,
  onCloseModal,
}: Props) => {
  const { bottom } = useSafeAreaInsets();

  const dynamicStyles: ViewStyle = {
    paddingBottom: verticalScale(36) + bottom,
    paddingTop: icon ? 0 : scale(noPadding ? 0 : 24),
    paddingHorizontal: noPadding ? 0 : scale(30),
  };

  return (
    <ReactNativeModal
      style={styles.modal}
      avoidKeyboard
      isVisible={isVisible}
      onSwipeComplete={onCloseModal}
      onBackdropPress={disableBackDropClose ? undefined : onCloseModal}
      swipeDirection={disableSwipe ? undefined : 'down'}
    >
      <View style={[styles.content, dynamicStyles, containerStyle]}>
        {icon && <View style={styles.headerIcon}>{icon}</View>}
        {children}
      </View>
    </ReactNativeModal>
  );
};

export default TWPopUp;
