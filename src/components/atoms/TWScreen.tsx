import React, { Fragment, ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
  SafeAreaView,
} from 'react-native';

import { AppColors } from '~constants/colors';
import { scale, verticalScale } from '~utils/dimension';

import TWNavBar from '../TWNavbar';

type Props = {
  children: ReactNode;
  style?: ViewStyle;
  enableScroll?: boolean;
  hideNav?: boolean;
  vAlign?: 'flex-start' | 'center' | 'space-between';
  bgColor?: string;
  title?: string;
  actionColor?: string;
  actionTitle?: string;
  actionDisabled?: boolean;
  isModal?: boolean;
  isFull?: boolean;
  noPadding?: boolean;
  isHeadBorder?: boolean;
  renderNav?: ReactNode;
  renderBottom?: ReactNode;
  onSave?: () => void;
  onBackOverride?: () => void;
};

const TWScreen = ({
  children,
  style,
  enableScroll = false,
  hideNav = false,
  vAlign = 'flex-start',
  bgColor = AppColors.whiteBg,
  title,
  actionColor,
  actionTitle,
  actionDisabled,
  isModal,
  isFull,
  renderNav,
  renderBottom,
  noPadding,
  isHeadBorder,
  onSave,
  onBackOverride,
}: Props) => {
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: AppColors.whiteBg,
    },
    container: {
      paddingHorizontal: noPadding ? 0 : scale(16),
      height: enableScroll ? 'auto' : '100%',
      paddingVertical: noPadding ? 0 : verticalScale(20),
      justifyContent: vAlign,
    },
  });

  const renderContentUI = (
    <Fragment>
      {renderNav && renderNav}
      {!hideNav && !renderNav && (
        <TWNavBar
          onBack={onBackOverride}
          title={title}
          onSave={onSave}
          actionColor={actionColor}
          actionTitle={actionTitle}
          actionDisabled={actionDisabled}
          isModal={isModal}
          hasBorder={isHeadBorder}
        />
      )}
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding' })}
        style={[styles.wrapper, { backgroundColor: bgColor }]}
      >
        {enableScroll ? (
          <ScrollView
            contentContainerStyle={[styles.container, style]}
            showsVerticalScrollIndicator={false}
            scrollEnabled={enableScroll}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.container, style]}>{children}</View>
        )}
      </KeyboardAvoidingView>
      {renderBottom && renderBottom}
    </Fragment>
  );

  return (
    <Fragment>
      {isFull ? (
        <View style={[styles.wrapper, { backgroundColor: bgColor }]}>
          {renderContentUI}
        </View>
      ) : (
        <SafeAreaView style={[styles.wrapper]}>{renderContentUI}</SafeAreaView>
      )}
    </Fragment>
  );
};

export default TWScreen;
