import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { AppColors } from '~constants/colors';

const styles = StyleSheet.create({
  loading: {
    flex: 1,
  },
  background: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  container: {
    backgroundColor: AppColors.transparent,
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textContainer: {
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textContent: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 50,
    top: 80,
  },
});

type Props = {
  cancelable?: boolean;
  color?: string;
  animation?: 'none' | 'slide' | 'fade';
  overlayColor?: string;
  size?: 'small' | 'large' | number; //size props does not support value normal
  textContent?: string;
  textStyle?: TextStyle;
  visible?: boolean;
  indicatorStyle?: ViewStyle;
  custom?: React.ReactNode;
  children?: React.ReactNode;
  spinnerKey?: string;
};

const TWLoadingIndicator = ({
  cancelable = false,
  color = AppColors.primary,
  animation = 'none',
  overlayColor = 'rgba(255, 255, 255, 0.65)',
  size = 'large',
  textContent = '',
  textStyle,
  visible = false,
  indicatorStyle,
  custom,
  children,
  spinnerKey,
}: Props) => {
  const [spinnerVisible, setLoadingVisibility] = useState(visible);
  const close = () => {
    setLoadingVisibility(false);
  };

  const handleOnRequestClose = () => {
    if (cancelable) {
      close();
    }
  };

  useEffect(() => {
    setLoadingVisibility(visible);
  }, [visible]);

  const renderDefaultContent = () => {
    return (
      <View style={styles.background}>
        {custom || (
          <ActivityIndicator
            color={color}
            size={size}
            style={[styles.loading, { ...indicatorStyle }]}
          />
        )}
        <View style={[styles.textContainer, { ...indicatorStyle }]}>
          <Text style={[styles.textContent, textStyle]}>{textContent}</Text>
        </View>
      </View>
    );
  };

  const renderLoader = () => {
    const spinner = (
      <View
        style={[styles.container, { backgroundColor: overlayColor }]}
        key={spinnerKey || `spinner_${Date.now()}`}
      >
        {children || renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        animationType={animation}
        onRequestClose={() => handleOnRequestClose()}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={spinnerVisible}
        statusBarTranslucent={true}
      >
        {spinner}
      </Modal>
    );
  };

  return renderLoader();
};

export default TWLoadingIndicator;
