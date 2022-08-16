import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TWButton, TWInput, TWLabel } from '~components';
import TWAvatar from '~components/TWAvatar';
import { AppColors } from '~constants/colors';
import { updateUserProfile } from '~helpers/profile.helpers';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import useUser from '~recoil/user';
import { ProfileBody } from '~types/api/request.types';
import { AvatarNavProps } from '~types/navigation';

import { ANavBar } from '../components/ANavBar';

import { styles } from './styles';

type Props = {
  navigation: AvatarNavProps;
};

const AvatarProfileScreen = ({ navigation }: Props) => {
  const { draftUserState, setUserInfo, setDraftUserInfo } = useUser();
  const { showToast } = useUtils();
  const { setIsLoading, refreshTokenIfExpired } = useGlobal();
  const { top } = useSafeAreaInsets();

  const onChange = (txt: string) => {
    setDraftUserInfo({
      ...draftUserState,
      avatar: {
        ...draftUserState.avatar,
        name: txt,
      },
    });
  };

  const isValidFirstRule = (): boolean => {
    if (draftUserState.avatar?.name) {
      return draftUserState.avatar.name.trim().length <= 15;
    }
    return false;
  };

  const isValidSecondRule = (): boolean => {
    if (draftUserState.avatar?.name) {
      const isContainsSymbol =
        /^(?=.*[~`!@#$%^&*()--+={}\\[\]|\\:;"'<>,.?/_₹]).*$/;
      return !isContainsSymbol.test(draftUserState.avatar.name.trim());
    }
    return false;
  };

  const saveAvatar = async () => {
    setIsLoading(true);
    try {
      const profileBody: ProfileBody = {
        avatar: draftUserState.avatar?.name,
        avatarSkin: draftUserState.avatar?.skin,
        avatarBackgroundColor: draftUserState.avatar?.background,
        avatarAccessories: draftUserState.avatar?.glass,
        avatarHair: draftUserState.avatar?.hair,
        avatarFacialHair: draftUserState.avatar?.beard,
        avatarHairColor: draftUserState.avatar?.color,
      };

      const idToken = await refreshTokenIfExpired();
      await updateUserProfile(draftUserState.profileId, profileBody, idToken);

      setUserInfo(draftUserState);

      navigation.navigate('Profile');
    } catch (error) {
      showToast(`${(error as Error).message}`, 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.pageWrap}>
      <View style={[styles.nav, { top: top }]}>
        <ANavBar />
      </View>

      <View style={styles.profileWrap}>
        <View style={styles.avatarWrap}>
          <TWAvatar {...draftUserState.avatar} size={170} />
        </View>

        <TWLabel size={22} lineHeight={32} weight="bold">
          THE TWONE AND ONLY
        </TWLabel>

        <TWInput
          size={18}
          paddingHorizontal={0}
          fontWeight="500"
          placeHolder="Nickname"
          onChange={onChange}
          inputProps={{
            autoCapitalize: 'none',
            keyboardType: 'ascii-capable',
            value: draftUserState.avatar?.name,
          }}
        />

        {(!isValidFirstRule() || !isValidSecondRule()) && (
          <View style={styles.divider} />
        )}

        <TWLabel size={12} lineHeight={16} color={AppColors.error}>
          {!isValidFirstRule() && draftUserState.avatar?.name?.length > 0
            ? `Maixmum 15 characters`
            : !isValidSecondRule() && draftUserState.avatar?.name?.length > 0
            ? `No special characters`
            : ``}
        </TWLabel>
      </View>

      <View style={styles.bottomWrap}>
        <TWLabel
          size={14}
          color={AppColors.black}
          lineHeight={24}
          margin={{ bottom: 24 }}
          align={'center'}
        >
          Be you, and be save. This is your public profile until you connect
          with your Twone.
        </TWLabel>
        <TWButton
          title="Save"
          size="sm"
          disabled={!isValidFirstRule() || !isValidSecondRule()}
          onClick={saveAvatar}
        />
      </View>
    </View>
  );
};

export default AvatarProfileScreen;
