import { CometChat } from '@cometchat-pro/react-native-chat';
import { COMECHAT_AUTH_KEY } from '@env';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';

import { TWButton, TWIcons, TWInput, TWLabel, TWScreen } from '~components/';
import { AppColors } from '~constants/colors';
import { registerUser } from '~helpers/auth.helpers';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import useUser from '~recoil/user';
import { AuthNavProps } from '~types/navigation';
import { scale } from '~utils/dimension';

import { HeadLine } from '../HeadLine';

import { styles } from './styles';

type Props = {
  navigation: AuthNavProps;
};

const EnterPasswordScreen = ({ navigation }: Props) => {
  const { userState, setUserInfo } = useUser();
  const { setIsLoading } = useGlobal();
  const [password, setPassword] = useState('');
  const [showPlainPass, setShowPlainPass] = useState(false);
  const { showToast } = useUtils();
  const onChangePassword = (txt: string) => {
    setPassword(txt);
  };

  const isValidFirstRule = (): boolean => {
    return password.length >= 8;
  };

  const isValidSecondRule = (): boolean => {
    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\\[\]|\\:;"'<>,.?/_₹]).*$/;
    return isContainsSymbol.test(password);
  };

  const isValidThirdRule = (): boolean => {
    const atLeastOneNumber = /^(?=.*[0-9]).*$/;
    return atLeastOneNumber.test(password);
  };

  const isValidFourthRule = (): boolean => {
    const atLeastOneUpperCase = /^(?=.*[A-Z]).*$/;
    return atLeastOneUpperCase.test(password);
  };

  const onContinue = async () => {
    try {
      setIsLoading(true);
      const { phoneNumber, firstName, dob } = userState;
      setUserInfo({
        ...userState,
        password: password,
      });
      const data = await registerUser(phoneNumber!, firstName, dob!, password);

      // CometChat Signup
      const cometChatUser = new CometChat.User(data.cogitoUser.userSub);
      cometChatUser.setName(data.user.firstName);

      await CometChat.createUser(cometChatUser, COMECHAT_AUTH_KEY);

      navigation.navigate('EnterCode', {
        phoneNumber: phoneNumber!,
        authType: 'register',
        verify: 'phone',
      });
    } catch (error) {
      showToast((error as Error).message, 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TWScreen vAlign="space-between">
      <View animation="fadeInUp" delay={300} duration={500}>
        <HeadLine
          title={`Let's secure your\naccount now`}
          description={`Please enter your password to keep your account safe. You can change this anytime.`}
          icon={<TWIcons.secure width={24} height={24} />}
        />

        <View style={styles.input}>
          <TWInput
            size={18}
            paddingHorizontal={0}
            parentStyle={styles.inputField}
            isPassword={!showPlainPass}
            fontWeight="500"
            placeHolder="New password"
            onChange={onChangePassword}
            inputProps={{
              autoCapitalize: 'none',
              keyboardType: 'email-address',
            }}
          />
          <TouchableOpacity onPress={() => setShowPlainPass(!showPlainPass)}>
            {showPlainPass && <TWIcons.eyesOn width={24} height={24} />}
            {!showPlainPass && <TWIcons.eyesOff width={24} height={24} />}
          </TouchableOpacity>
        </View>

        <View style={styles.error}>
          {!isValidFirstRule() && (
            <TWIcons.deselected width={scale(16)} height={scale(16)} />
          )}

          {isValidFirstRule() && (
            <TWIcons.selected
              width={scale(16)}
              height={scale(16)}
              color={AppColors.primary}
            />
          )}

          <TWLabel color={AppColors.black} margin={{ left: 9 }}>
            Minimum 8 characters
          </TWLabel>
        </View>
        <View style={styles.error}>
          {!isValidFourthRule() && (
            <TWIcons.deselected width={scale(16)} height={scale(16)} />
          )}

          {isValidFourthRule() && (
            <TWIcons.selected
              width={scale(16)}
              height={scale(16)}
              color={AppColors.primary}
            />
          )}

          <TWLabel color={AppColors.black} margin={{ left: 9 }}>
            At least 1 uppercase letter
          </TWLabel>
        </View>
        <View style={styles.error}>
          {!isValidSecondRule() && (
            <TWIcons.deselected width={scale(16)} height={scale(16)} />
          )}

          {isValidSecondRule() && (
            <TWIcons.selected
              width={scale(16)}
              height={scale(16)}
              color={AppColors.primary}
            />
          )}
          <TWLabel color={AppColors.black} margin={{ left: 9 }}>
            At least 1 special character
          </TWLabel>
        </View>
        <View style={styles.error}>
          {!isValidThirdRule() && (
            <TWIcons.deselected width={scale(16)} height={scale(16)} />
          )}

          {isValidThirdRule() && (
            <TWIcons.selected
              width={scale(16)}
              height={scale(16)}
              color={AppColors.primary}
            />
          )}
          <TWLabel color={AppColors.black} margin={{ left: 9 }}>
            At least 1 number
          </TWLabel>
        </View>
      </View>

      <View animation="fadeInUp" delay={500} duration={500}>
        <TWButton
          title="Continue"
          type="pink"
          disabled={
            !isValidFirstRule() || !isValidSecondRule() || !isValidThirdRule()
          }
          onClick={onContinue}
        />
      </View>
    </TWScreen>
  );
};

export default EnterPasswordScreen;
