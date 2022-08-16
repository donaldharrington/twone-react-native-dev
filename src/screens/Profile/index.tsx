import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TWIconButton, TWIcons, TWImage, TWLabel, TWScreen } from '~components';
import TWAvatar from '~components/TWAvatar';
import { AppColors } from '~constants/colors';
import { BUTTON_ACTIVE_OPACITY } from '~constants/config';
import useUser from '~recoil/user';
import { MainNavProps } from '~types/navigation';
import { scale } from '~utils/dimension';

import { profileStyles } from './styles';

type Props = {
  navigation: MainNavProps;
};

const ProfileScreen = ({ navigation }: Props) => {
  const { userState } = useUser();
  const [hasAvatar, setHasAvatar] = useState(false);

  const onOpenSettings = () => {
    navigation.navigate('SettingsStack');
  };

  const onOpenAvatar = () => {
    if (userState.avatar?.name) {
      navigation.navigate('AvatarConfStack');
    } else {
      navigation.navigate('AvatarConfStack', { screen: 'StartUp' });
    }
  };

  const onOpenProfile = () => {
    navigation.navigate('ProfileEditStack');
  };

  useEffect(() => {
    setHasAvatar(false);
  }, []);

  const inset = useSafeAreaInsets();

  return (
    <TWScreen hideNav bgColor={AppColors.white} isFull enableScroll>
      <View style={[profileStyles.horizWrap, { paddingTop: scale(60) }]}>
        <TWLabel size={32} lineHeight={44} weight="bold" color={AppColors.text}>
          Profile
        </TWLabel>
        <TWIconButton
          icon={<TWIcons.settings width={scale(24)} height={scale(24)} />}
          onClick={onOpenSettings}
        />
      </View>
      <View style={profileStyles.avatarWrap}>
        <View style={profileStyles.avatarImg}>
          {userState?.profilePhoto ? (
            <TWImage
              image={userState?.profilePhoto || ''}
              styles={profileStyles.profileImage}
            />
          ) : (
            <TWIcons.camera width={scale(120)} height={scale(90)} />
          )}
        </View>
        <TWLabel align="center" size={20} weight="medium" margin={{ top: 20 }}>
          {userState?.firstName}
        </TWLabel>
        <TouchableOpacity
          style={profileStyles.editBtn}
          activeOpacity={BUTTON_ACTIVE_OPACITY}
          onPress={onOpenProfile}
        >
          <TWIcons.pencil width={scale(16)} height={scale(16)} />
        </TouchableOpacity>
      </View>
      <View style={profileStyles.roundWrap}>
        <View style={profileStyles.roundInner}>
          <View style={[profileStyles.horizWrap, profileStyles.section]}>
            <TWLabel
              isUppercase
              margin={{ right: 8 }}
              size={14}
              weight="medium"
            >
              My Twonie
            </TWLabel>
          </View>
          <TouchableOpacity
            style={[
              profileStyles.horizWrap,
              profileStyles.shadow,
              profileStyles.twone,
            ]}
            onPress={onOpenAvatar}
            activeOpacity={BUTTON_ACTIVE_OPACITY}
          >
            <TWAvatar {...userState.avatar} size={48} />
            <TWLabel size={16} weight="medium" styles={profileStyles.textWrap}>
              {userState.avatar?.name
                ? userState.avatar!.name
                : 'Create my Twonie'}
            </TWLabel>
            <TWIcons.rightArrow width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>
      {!userState.avatar && (
        <View style={profileStyles.noProfile}>
          <TWIcons.twoneHand width={36} height={36} />

          <TWLabel
            styles={profileStyles.centered}
            color={AppColors.black}
            lineHeight={28}
            size={18}
            weight={`bold`}
          >
            Complete your profile
          </TWLabel>

          <TWLabel
            color={AppColors.black}
            styles={profileStyles.centered}
            margin={{ top: 8 }}
            lineHeight={20}
            size={12}
          >
            You can start Twoning after adding a profile photo and creating your
            Twonie.
          </TWLabel>
        </View>
      )}
    </TWScreen>
  );
};

export default ProfileScreen;
