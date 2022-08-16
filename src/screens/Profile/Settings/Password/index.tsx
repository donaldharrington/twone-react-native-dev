import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { TWIcons, TWInput, TWLabel, TWScreen } from '~components';
import { AppColors } from '~constants/colors';
import { resetPassword } from '~helpers/profile.helpers';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import useUser from '~recoil/user';
import { SettingsNavProps, SettingsRouteProps } from '~types/navigation';
import { scale } from '~utils/dimension';

import { styles } from './styles';

type Props = {
  navigation: SettingsNavProps;
  route: SettingsRouteProps;
};

const ResetPasswordScreen = ({ navigation }: Props) => {
  const { refreshTokenIfExpired, setIsLoading } = useGlobal();
  const { userState } = useUser();
  const [curPassword, setCurPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showCurPass, setShowCurPass] = useState(false);
  const [showPlainPass, setShowPlainPass] = useState(false);
  const [showPlainConfirmPass, setShowPlainConfirmPass] = useState(false);

  const { showToast } = useUtils();

  const onSaveUpdate = async () => {
    // TODO: stuff of save password
    try {
      setIsLoading(true);

      const idToken = await refreshTokenIfExpired();
      await resetPassword(
        userState.phoneNumber!,
        curPassword,
        password,
        idToken,
      );
      showToast('Password updated successfully', 'success');
      navigation.goBack();
    } catch (error) {
      showToast((error as Error).message, 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const onChangePassword = (txt: string) => {
    setPassword(txt);

    if (confirmPass === password) {
      return true;
    } else {
      return false;
    }
  };

  const onChangeConfirmPass = (txt: string) => {
    setConfirmPass(txt);
  };

  const isValidFirstRule = () => {
    return password.length >= 8;
  };

  const isValidSecondRule = () => {
    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\\[\]|\\:;"'<>,.?/_₹]).*$/;
    return isContainsSymbol.test(password);
  };

  const isValidThirdRule = () => {
    const atLeastOneNumber = /^(?=.*[0-9]).*$/;
    return atLeastOneNumber.test(password);
  };

  const isValidFourthRule = () => {
    const atLeastOneUpperCase = /^(?=.*[A-Z]).*$/;
    return atLeastOneUpperCase.test(password);
  };

  // check if passwords match
  const doPasswordsMatch = () => {
    if (
      password === confirmPass &&
      password.length > 7 &&
      isValidFirstRule() &&
      isValidSecondRule() &&
      isValidThirdRule() &&
      isValidFourthRule()
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    doPasswordsMatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, confirmPass]);

  return (
    <TWScreen
      title="Reset Password"
      onSave={onSaveUpdate}
      bgColor={AppColors.bgGray}
      actionDisabled={!doPasswordsMatch()}
      actionColor={doPasswordsMatch() ? AppColors.primary : AppColors.gray}
    >
      <View style={{ paddingBottom: scale(24) }}>
        <TWLabel
          weight="bold"
          size={20}
          lineHeight={24}
          color={AppColors.black}
        >
          Current Password
        </TWLabel>

        <View style={styles.input}>
          <TWInput
            italic={false}
            size={18}
            paddingHorizontal={0}
            parentStyle={styles.inputField}
            isPassword={!showCurPass}
            fontWeight="normal"
            placeHolder="Current password"
            onChange={setCurPassword}
            inputProps={{
              autoCapitalize: 'none',
              keyboardType: 'email-address',
              autoCorrect: false,
            }}
          />
          <TouchableOpacity onPress={() => setShowCurPass(!showCurPass)}>
            {showCurPass && <TWIcons.eyesOn width={24} height={24} />}
            {!showCurPass && <TWIcons.eyesOff width={24} height={24} />}
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <TWLabel
          weight="bold"
          size={20}
          lineHeight={24}
          color={AppColors.black}
        >
          Enter your new password
        </TWLabel>

        <View style={styles.input}>
          <TWInput
            italic={false}
            size={18}
            paddingHorizontal={0}
            parentStyle={styles.inputField}
            isPassword={!showPlainPass}
            fontWeight="normal"
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

        <View style={styles.input}>
          <TWInput
            italic={false}
            size={18}
            paddingHorizontal={0}
            parentStyle={styles.inputField}
            isPassword={!showPlainConfirmPass}
            fontWeight="normal"
            placeHolder="Confirm password"
            onChange={onChangeConfirmPass}
            inputProps={{
              autoCapitalize: 'none',
              keyboardType: 'email-address',
            }}
          />
          <TouchableOpacity
            onPress={() => setShowPlainConfirmPass(!showPlainConfirmPass)}
          >
            {showPlainConfirmPass && <TWIcons.eyesOn width={24} height={24} />}
            {!showPlainConfirmPass && (
              <TWIcons.eyesOff width={24} height={24} />
            )}
          </TouchableOpacity>
        </View>
        {!doPasswordsMatch() && password.length > 0 && (
          <View>
            <TWLabel color={AppColors.error} margin={{ top: 6, left: 9 }}>
              Passwords do not match
            </TWLabel>
          </View>
        )}
      </View>
    </TWScreen>
  );
};

export default ResetPasswordScreen;
