import { CometChat } from '@cometchat-pro/react-native-chat';
import { COMECHAT_AUTH_KEY } from '@env';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { TWButton, TWIcons, TWLabel, TWScreen } from '~components/';
import { AppColors } from '~constants/colors';
import { OTP_CELL_COUNT } from '~constants/config';
import { loginUser, resendCode, submitCode } from '~helpers/auth.helpers';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import useUser from '~recoil/user';
import { LoginResponse } from '~types/api';
import { IdTokenPayload } from '~types/api/response.types';
import { AuthNavProps, AuthRouteProps } from '~types/navigation';

import { HeadLine } from '../HeadLine';

import { codeStyles } from './styles';

type Props = {
  navigation: AuthNavProps;
  route: AuthRouteProps;
};

const EnterCodeScreen = ({ navigation, route }: Props) => {
  const { params } = route;
  const { setTokens, setIsLoading, setLoginPassword } = useGlobal();
  const { userState, setUserInfo } = useUser();

  const [isResending, setResending] = useState(false);
  const [isWrongNumber, setWrongNumber] = useState(false);

  const [value, setValue] = useState<string>('');
  const ref = useBlurOnFulfill({ value, cellCount: OTP_CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const { showToast } = useUtils();

  const onResendCode = async () => {
    setResending(true);
    try {
      await resendCode(params.authType!, params.phoneNumber!);
    } catch (error) {
      showToast((error as Error).message, 'danger');
    }
    setTimeout(() => {
      setResending(false);
      setValue('');
    }, 2000);
  };

  const handleForgot = () => {
    setUserInfo({
      ...userState,
      code: value,
    });
    navigation.navigate('ResetPassword');
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      await submitCode(value, userState.phoneNumber!);

      const loginData: LoginResponse = await loginUser(
        userState.phoneNumber!,
        userState.password!,
      );

      const payload: IdTokenPayload =
        loginData?.authenticateUser?.idToken.payload;
      const idToken: string = loginData?.authenticateUser?.idToken?.jwtToken;
      const refreshToken: string =
        loginData?.authenticateUser?.refreshToken?.token;

      await CometChat.login(payload.sub, COMECHAT_AUTH_KEY);
      await setTokens(idToken, refreshToken, payload);
      setLoginPassword(userState.password!);
    } catch (error) {
      showToast((error as Error).message, 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyCode = async () => {
    setResending(true);

    if (params.authType === 'forgot') {
      handleForgot();
    } else {
      await handleRegister();
    }

    setTimeout(() => {
      setResending(false);
    }, 2000);
  };

  useEffect(() => {
    if (value.length < OTP_CELL_COUNT) {
      setWrongNumber(false);
    }
  }, [value]);

  return (
    <TWScreen vAlign="space-between">
      <View animation="fadeInUp" delay={300} duration={500}>
        <HeadLine
          title={
            params.authType === 'forgot'
              ? `Let’s make sure it’s you`
              : `Check your \nmessages from us!`
          }
          description={
            (params.authType === 'forgot'
              ? `Enter the confirmation code we sent to `
              : `Your verification code has been sent to `) +
            `${userState.phoneNumber || 'No PhoneNumber'}`
          }
          icon={<TWIcons.message width={24} height={24} />}
        />
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={OTP_CELL_COUNT}
          rootStyle={codeStyles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              style={[
                codeStyles.cellWrapper,
                isWrongNumber && value.length === OTP_CELL_COUNT
                  ? codeStyles.wrongCell
                  : index < value.length
                  ? codeStyles.filledCell
                  : {},
              ]}
              key={index}
            >
              <TWLabel
                styles={codeStyles.cell}
                textProps={{ onLayout: () => getCellOnLayoutHandler(index) }}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </TWLabel>
            </View>
          )}
        />
        <TouchableOpacity
          onPress={onResendCode}
          disabled={isResending}
          style={codeStyles.resendBtn}
        >
          {isResending ? (
            <ActivityIndicator size="small" color={AppColors.primary} />
          ) : (
            <TWLabel size={14} weight="semiBold">
              Resend code
            </TWLabel>
          )}
        </TouchableOpacity>
      </View>
      <View animation="fadeInUp" delay={500} duration={500}>
        <TWButton
          title="Continue"
          type="pink"
          disabled={value.length < OTP_CELL_COUNT}
          onClick={onVerifyCode}
        />
      </View>
    </TWScreen>
  );
};

export default EnterCodeScreen;
