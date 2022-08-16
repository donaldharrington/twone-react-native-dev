import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { TWIcons, TWInput, TWLabel, TWScreen } from '~components';
import { AppColors } from '~constants/colors';
import { confirmNewPassword } from '~helpers/auth.helpers';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import useUser from '~recoil/user';
import { SettingsNavProps } from '~types/navigation';
import { scale } from '~utils/dimension';

import { styles } from './styles';

type Props = {
  navigation: SettingsNavProps;
};

const ResetPasswordScreen = ({ navigation }: Props) => {
  const { userState } = useUser();
  const { showToast } = useUtils();
  const { setIsLoading } = useGlobal();
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPlainPass, setShowPlainPass] = useState(false);
  const [showPlainConfirmPass, setShowPlainConfirmPass] = useState(false);
  const [confirmPassTouched, setConfirmPassTouched] = useState(false);

  const onSaveUpdate = async () => {
    try {
      setIsLoading(true);
      await confirmNewPassword(
        userState.code!,
        userState.phoneNumber!,
        password,
      );
      navigation.pop(3);
      showToast('Your password was reset successfully. Please login.');
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
    setConfirmPassTouched(true);
    setConfirmPass(txt);
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

  // check if passwords match
  const doPasswordsMatch = () => {
    return (
      password === confirmPass &&
      password.length > 7 &&
      isValidFirstRule() &&
      isValidSecondRule() &&
      isValidThirdRule()
    );
  };

  useEffect(() => {
    doPasswordsMatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, confirmPass]);

  return (
    <TWScreen
      title="Reset Password"
      actionDisabled={!doPasswordsMatch()}
      actionColor={doPasswordsMatch() ? AppColors.primary : AppColors.gray}
      onSave={onSaveUpdate}
      bgColor={AppColors.bgGray}
    >
      <TWLabel weight="bold" size={22} lineHeight={32} color={AppColors.black}>
        Enter your new password
      </TWLabel>

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
        {isValidFourthRule() ? (
          <TWIcons.selected
            width={scale(16)}
            height={scale(16)}
            color={AppColors.primary}
          />
        ) : (
          <TWIcons.deselected width={scale(16)} height={scale(16)} />
        )}

        <TWLabel color={AppColors.black} margin={{ left: 9 }}>
          At least 1 uppercase letter
        </TWLabel>
      </View>

      <View style={styles.error}>
        {isValidSecondRule() ? (
          <TWIcons.selected
            width={scale(16)}
            height={scale(16)}
            color={AppColors.primary}
          />
        ) : (
          <TWIcons.deselected width={scale(16)} height={scale(16)} />
        )}

        <TWLabel color={AppColors.black} margin={{ left: 9 }}>
          At least 1 special character
        </TWLabel>
      </View>

      <View style={styles.error}>
        {isValidThirdRule() ? (
          <TWIcons.selected
            width={scale(16)}
            height={scale(16)}
            color={AppColors.primary}
          />
        ) : (
          <TWIcons.deselected width={scale(16)} height={scale(16)} />
        )}

        <TWLabel color={AppColors.black} margin={{ left: 9 }}>
          At least 1 number
        </TWLabel>
      </View>

      <View style={styles.input}>
        <TWInput
          size={18}
          paddingHorizontal={0}
          parentStyle={styles.inputField}
          isPassword={!showPlainConfirmPass}
          fontWeight="500"
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
          {!showPlainConfirmPass && <TWIcons.eyesOff width={24} height={24} />}
        </TouchableOpacity>
      </View>
      {!doPasswordsMatch() && confirmPassTouched && (
        <TWLabel color={AppColors.error} margin={{ left: 9, top: scale(5) }}>
          Passwords do not match. Please check both fields
        </TWLabel>
      )}
    </TWScreen>
  );
};

export default ResetPasswordScreen;
