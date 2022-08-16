import React, { useState } from 'react';
import { View } from 'react-native';

import { TWIcons, TWInput, TWLabel, TWScreen } from '~components';
import { AppColors } from '~constants/colors';
import { submitCode } from '~helpers/auth.helpers';
import { updateUserInfo } from '~helpers/user.helpers';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import useUser from '~recoil/user';
import { UserBody } from '~types/api/request.types';
import { SettingsNavProps } from '~types/navigation';
import { isValidEmail } from '~utils';
import { scale } from '~utils/dimension';

import { PageInfo } from '../components/PageInfo';

import { styles } from './styles';

type Props = {
  navigation: SettingsNavProps;
};

const ConfirmEmailScreen = ({ navigation }: Props) => {
  const { setIsLoading, refreshTokenIfExpired, globalState } = useGlobal();
  const { showToast } = useUtils();
  const { userState, setEmail } = useUser();

  const [email, setUserEmail] = useState('');

  const onSaveUpdate = async () => {
    try {
      setIsLoading(true);
      //   const idToken = await refreshTokenIfExpired();

      //   const userBody: UserBody = {
      //     firstName: userState.firstName,
      //     username: globalState.idTokenPayload!.phone_number,
      //     password: globalState.password!,
      //     email: email,
      //   };

      //   await updateUserInfo(userBody, idToken);
      await submitCode(email, userState.email!);
      setEmail(email);
    } catch (error) {
      showToast((error as Error).message);
    } finally {
      setIsLoading(false);
    }
    navigation.pop(2);
  };

  const onChangeEmail = (emailAddress: string) => {
    setUserEmail(emailAddress);
  };

  return (
    <TWScreen
      title="Email"
      onSave={onSaveUpdate}
      bgColor={AppColors.bgGray}
      actionDisabled={email.length === 6}
      actionColor={email.length === 7 ? AppColors.primary : AppColors.gray}
    >
      <PageInfo
        title="Confirm your email"
        description="We sent a verification code to your email. Please enter the code below."
        icon={<TWIcons.email width={scale(24)} height={scale(24)} />}
      />
      <View style={styles.input}>
        <TWLabel weight="medium" size={12} color={AppColors.primary}>
          Verification code
        </TWLabel>
        <TWInput
          size={16}
          paddingHorizontal={0}
          fontWeight="500"
          placeHolder="000-000"
          defaultValue={email}
          onChange={onChangeEmail}
          //   inputProps={{
          //     autoCapitalize: 'none',
          //     keyboardType: 'email-address',
          //   }}
        />
      </View>
      {!userState.email && (
        <View style={styles.error}>
          <TWIcons.error width={scale(13)} height={scale(13)} />
          <TWLabel color={AppColors.error} margin={{ left: 9 }}>
            No email added yet
          </TWLabel>
        </View>
      )}
    </TWScreen>
  );
};

export default ConfirmEmailScreen;
