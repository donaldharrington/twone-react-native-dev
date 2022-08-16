import { BlurView } from '@react-native-community/blur';
import React, { useCallback, useEffect, useState } from 'react';
import { Animated, Linking, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import { TWAlert, TWButton, TWIcons, TWLabel, TWScreen } from '~components';
import { AppColors } from '~constants/colors';
import AppImages from '~constants/images';
import { AuthNavProps, AuthRouteProps } from '~types/navigation';
import { scale } from '~utils/dimension';

import { legalEndpoints } from '../../api/config';

import { authStyles } from './styles';

type Props = {
  navigation: AuthNavProps;
  route: AuthRouteProps;
};

const AuthScreen = ({ navigation, route }: Props) => {
  const zoomOut = {
    0: {
      opacity: 0,
      scale: 1.044,
    },
    1: {
      opacity: 1,
      scale: 1,
    },
  };

  const fadeGradient = {
    0: { opacity: 0 },
    1: { opacity: 1 },
  };

  const slideAnimationOpacity = {
    0: { opacity: 0, marginTop: 10 },
    1: { opacity: 1, marginTop: 0 },
  };

  const slideButtonAnimationOpacity = {
    0: { opacity: 0, marginBottom: -10 },
    1: { opacity: 1, marginBottom: 0 },
  };

  const buttonAnimation = {
    0: { paddingLeft: 20, paddingRight: 20 },
    1: { paddingLeft: 0, paddingRight: 0 },
  };

  const [showDeleteAccount, setDeleteAccount] = useState(
    route?.params?.isAccountDeleted || false,
  );

  const onGoLogin = () => {
    navigation.navigate('LoginScreen', { authType: 'login' });
  };

  const onGoRegister = () => {
    navigation.navigate('EnterName');
  };

  const handlePress = useCallback(async (url: string) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      await Linking.openURL(url);
    } else {
      // console.log(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  useEffect(() => {
    if (!route?.params) {
      return;
    }
    const { isAccountDeleted } = route?.params;
    if (isAccountDeleted) {
      setDeleteAccount(true);
    }
  }, [route]);

  return (
    <View style={authStyles.page}>
      <Animatable.Image
        source={AppImages.map}
        animation={zoomOut}
        style={authStyles.mapCover}
        easing="ease-out"
        duration={1000}
      />
      <Animatable.View
        style={authStyles.page}
        animation={fadeGradient}
        delay={200}
        duration={500}
        easing="ease-out"
      >
        <LinearGradient
          colors={AppColors.gradientBackground}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          locations={[0.35, 0.7]}
          style={authStyles.gradient}
        />
        <BlurView
          blurType="light"
          style={[authStyles.mapCover]}
          blurAmount={50}
        />
        <View style={authStyles.mapCover}>
          <TWScreen hideNav vAlign="space-between" bgColor="transparent">
            <Animatable.View
              animation={slideAnimationOpacity}
              delay={1200}
              easing="ease-out"
              duration={600}
            >
              <TWIcons.logoText height={scale(42)} style={authStyles.logo} />
            </Animatable.View>
            <Animatable.View
              animation={slideButtonAnimationOpacity}
              delay={1900}
              easing="ease-out"
              duration={600}
            >
              <TWLabel
                align="center"
                size={12}
                lineHeight={16}
                margin={{ bottom: 20 }}
                color={AppColors.gray}
              >
                {'By signing up for Twone, you agree to our '}
                <TWLabel
                  size={12}
                  lineHeight={16}
                  margin={{ top: 20 }}
                  textProps={{
                    onPress: () => handlePress(legalEndpoints.toc),
                  }}
                  color={AppColors.gray}
                  styles={authStyles.txtBtn}
                >
                  Terms.
                </TWLabel>
                {` Learn how we use your data in our `}
                <TWLabel
                  size={12}
                  lineHeight={16}
                  margin={{ top: 20 }}
                  textProps={{
                    onPress: () => handlePress(legalEndpoints.privacyPolicy),
                  }}
                  color={AppColors.gray}
                  styles={authStyles.txtBtn}
                >
                  Privacy Policy
                </TWLabel>
                {` and `}
                <TWLabel
                  size={12}
                  lineHeight={16}
                  margin={{ top: 20 }}
                  color={AppColors.gray}
                  textProps={{
                    onPress: () => handlePress(legalEndpoints.cookiePolicy),
                  }}
                  styles={authStyles.txtBtn}
                >
                  Cookies Policy.
                </TWLabel>
              </TWLabel>
              <Animatable.View
                animation={buttonAnimation}
                delay={1900}
                duration={800}
                style={{
                  justifyContent: 'center',
                  // alignItems: 'center',
                  alignContent: 'center',
                }}
              >
                <TWButton
                  title="Create Account"
                  onClick={onGoRegister}
                  type="twone"
                />
              </Animatable.View>
              <TouchableOpacity
                onPress={onGoLogin}
                style={authStyles.createBtn}
              >
                <TWLabel weight="medium" color={AppColors.primary} size={18}>
                  Login
                </TWLabel>
              </TouchableOpacity>
            </Animatable.View>
          </TWScreen>
        </View>
      </Animatable.View>

      <TWAlert
        type="alert"
        isVisible={showDeleteAccount}
        title="Account Deleted"
        description="Your Twone account was deleted"
        onOk={() => setDeleteAccount(false)}
      />
    </View>
  );
};

export default AuthScreen;
