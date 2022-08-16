import { CometChat } from '@cometchat-pro/react-native-chat';
import { COMECHAT_AUTH_KEY } from '@env';
import React, { useCallback, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import PhoneInput from 'react-native-phone-number-input';
import { useRecoilValue } from 'recoil';

import {
  TWButton,
  TWButtonGroup,
  TWIcons,
  TWInput,
  TWLabel,
  TWScreen,
} from '~components/';
import { AppColors } from '~constants/colors';
import { loginUser, resendCode } from '~helpers/auth.helpers';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import { loggedInPhoneNumber } from '~recoil/global/withGlobal';
import { VerifyTypes } from '~types';
import { IdTokenPayload } from '~types/api/response.types';
import { AuthNavProps, AuthRouteProps } from '~types/navigation';
import { isValidEmail } from '~utils';
import { phoneStyles } from '../EnterPhone/styles';
import { forgotStyles } from '../Forgot/styles';

import { HeadLine } from '../HeadLine';

import { loginStyles } from './styles';

type Props = {
  navigation: AuthNavProps;
  route: AuthRouteProps;
};

const Tabs = [
  {
    value: 'phone',
    label: 'Phone',
  },
  {
    value: 'email',
    label: 'Email',
  },
];

const LoginScreen = ({ navigation, route }: Props) => {
  const { params } = route;
  const { setTokens, setLoginPassword, setIsLoading } = useGlobal();
  const usedPhoneNumber = useRecoilValue(loggedInPhoneNumber);
  const [phoneNumber, setPhoneNumber] = useState(usedPhoneNumber);
  const [password, setPassword] = useState('');
  const [showPlainPass, setShowPlainPass] = useState(false);
  const [tryCount, setTryCount] = useState(0);
  const { showToast } = useUtils();

  const [curType, setCurType] = useState<VerifyTypes>('phone');
  const [curEmail, setCurEmail] = useState<string>();
  const [curNumber, setCurNumber] = useState('');

  const phoneInput = useRef<PhoneInput>(null);

  const isValidNumber = () => {
    if (phoneInput.current) {
      return phoneInput.current.isValidNumber(curNumber);
    } else {
      return false;
    }
  };

  const onChangeType = useCallback(val => {
    setCurType(val as VerifyTypes);
  }, []);

  const onChangeEmail = useCallback((email: string) => {
    setCurEmail(email);
  }, []);

  const onChangePassword = useCallback((txt: string) => {
    setPassword(txt);
  }, []);

  const performLogin = async () => {
    setIsLoading(true);
    try {
      const loginData = await loginUser(curNumber!, password);

      const payload: IdTokenPayload =
        loginData?.authenticateUser?.idToken.payload;
      const idToken: string = loginData?.authenticateUser?.idToken?.jwtToken;
      const refreshToken: string =
        loginData?.authenticateUser?.refreshToken?.token;

      // CometChat login
      await CometChat.login(payload.sub, COMECHAT_AUTH_KEY);

      await setTokens(idToken, refreshToken, payload);
      setLoginPassword(password);

      setIsLoading(false);
    } catch (error) {
      setTryCount(tryCount + 1);
      showToast(
        `Incorrect log in information. Please try again or reset your password.`,
        'danger',
      );
    } finally {
      setIsLoading(false);
    }

    if (tryCount > 3) {
      setTryCount(0);
      navigation.navigate('EnterTrouble');
    }
  };

  const onForgot = () => {
    navigation.navigate('Forgot');
  };

  const onSignup = () => {
    navigation.navigate('EnterName');
  };

  return (
    <TWScreen enableScroll>
      <View animation="fadeInUp" delay={300} duration={500}>
        <HeadLine
          title={`Welcome back!`}
          description={''}
          icon={<TWIcons.heartIcon width={24} height={24} />}
        />
        <TWButtonGroup
          data={Tabs}
          align="space-evenly"
          isTab
          activeColor={AppColors.secondary}
          onChanged={onChangeType}
        />
        {curType === 'phone' && (
          <PhoneInput
            ref={phoneInput}
            defaultValue={curNumber}
            defaultCode="US"
            layout="first"
            onChangeText={text => {
              setCurNumber(text);
            }}
            onChangeFormattedText={text => {
              setCurNumber(text);
            }}
            renderDropdownImage={<TWIcons.dropDown />}
            autoFocus
            placeholder="(000) 000-0000"
            containerStyle={[phoneStyles.phoneWrap, forgotStyles.inputWrap]}
            textContainerStyle={phoneStyles.textWrap}
            codeTextStyle={phoneStyles.phoneText}
            textInputStyle={phoneStyles.phoneText}
            flagButtonStyle={phoneStyles.flagBtn}
            countryPickerProps={{
              withAlphaFilter: true,
              modalProps: {
                presentationStyle: 'formSheet',
              },
              closeButtonImageStyle: {
                width: 36,
                height: 36,
              },
            }}
          />
        )}
        {curType === 'email' && (
          <TWInput
            placeHolder="Email address"
            inputProps={{
              autoCapitalize: 'none',
              autoCorrect: false,
              autoComplete: 'email',
              textAlign: 'left',
            }}
            fontWeight={'500'}
            onChange={onChangeEmail}
            parentStyle={forgotStyles.inputWrap}
          />
        )}
        <View style={{ height: 20 }} />

        <View style={loginStyles.input}>
          <TWInput
            placeHolder="Password"
            parentStyle={loginStyles.inputField}
            isPassword={!showPlainPass}
            fontWeight={'500'}
            onChange={onChangePassword}
            inputProps={{
              autoCapitalize: 'none',
              keyboardType: 'email-address',
              textAlign: 'left',
            }}
          />
          <TouchableOpacity onPress={() => setShowPlainPass(!showPlainPass)}>
            {showPlainPass && <TWIcons.eyesOn width={24} height={24} />}
            {!showPlainPass && <TWIcons.eyesOff width={24} height={24} />}
          </TouchableOpacity>
        </View>
      </View>
      <View animation="fadeInUp" delay={500} duration={500}>
        {params.authType === 'login' && (
          <TouchableOpacity onPress={onForgot} style={loginStyles.toubleBtn}>
            <TWLabel weight="semiBold" size={14}>
              Forgot your password?
            </TWLabel>
          </TouchableOpacity>
        )}

        <TWButton
          title="Login"
          type="pink"
          disabled={
            curType === 'phone' ? !isValidNumber() : !isValidEmail(curEmail)
          }
          onClick={performLogin}
        />
        <View style={loginStyles.div}>
          <View style={loginStyles.divLine} />
          <TWLabel margin={{ left: 8, right: 8 }}>Or</TWLabel>
          <View style={loginStyles.divLine} />
        </View>
        <TWLabel styles={loginStyles.text}>
          Don't have an account?{' '}
          <TWLabel weight="semiBold" onClick={onSignup}>
            Sign up
          </TWLabel>
        </TWLabel>
      </View>
    </TWScreen>
  );
};

export default LoginScreen;
