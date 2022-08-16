import React, { useState } from 'react';
import { View } from 'react-native';

import { TWIcons, TWInput, TWLabel, TWScreen } from '~components';
import { AppColors } from '~constants/colors';
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

const AddEmailScreen = ({ navigation }: Props) => {
  const { setIsLoading, refreshTokenIfExpired, globalState } = useGlobal();
  const { showToast } = useUtils();
  const { userState, setEmail } = useUser();
  const [email, setUserEmail] = useState(userState.email || '');

  const onSaveUpdate = async () => {
    try {
      setIsLoading(true);
      const idToken = await refreshTokenIfExpired();

      const userBody: UserBody = {
        firstName: userState.firstName,
        username: globalState.idTokenPayload!.phone_number,
        password: globalState.password!,
        email: email,
      };

      await updateUserInfo(userBody, idToken);
      setEmail(email);
    } catch (error) {
      showToast((error as Error).message);
    } finally {
      setIsLoading(false);
    }
    // navigation.goBack();
    navigation.navigate('ConfirmEmail');
  };

  const onChangeEmail = (emailAddress: string) => {
    setUserEmail(emailAddress);
  };

  return (
    <TWScreen
      title="Email"
      onSave={onSaveUpdate}
      bgColor={AppColors.bgGray}
      actionDisabled={!isValidEmail(email)}
      actionColor={isValidEmail(email) ? AppColors.primary : AppColors.gray}
    >
      <PageInfo
        title="Add your email"
        description="Your email address can be used to log in and help recover your account if you change your phone number. We promise not to spam."
        icon={<TWIcons.email width={scale(24)} height={scale(24)} />}
      />
      <View style={styles.input}>
        <TWLabel weight="medium" size={12} color={AppColors.primary}>
          Email Address
        </TWLabel>
        <TWInput
          size={16}
          paddingHorizontal={0}
          fontWeight="500"
          placeHolder="twone@example.com"
          defaultValue={email}
          onChange={onChangeEmail}
          inputProps={{
            autoCapitalize: 'none',
            keyboardType: 'email-address',
          }}
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

export default AddEmailScreen;
