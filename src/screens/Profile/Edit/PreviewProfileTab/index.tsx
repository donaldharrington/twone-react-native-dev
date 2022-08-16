import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';

import { TWAvatar, TWIcons, TWImage, TWLabel, TWScreen } from '~components';
import { AppColors } from '~constants/colors';
import AppImages from '~constants/images';
import { hasProfileState } from '~recoil/global/withGlobal';
import useUser from '~recoil/user';
import { calculateAge } from '~utils';
import { scale } from '~utils/dimension';

import { styles } from './styles';

const PreviewProfile = () => {
  const { draftUserState, userState } = useUser();
  const { displayDOB, displayGender, displayPronoun } = draftUserState;
  const hasProfile = useRecoilValue<boolean>(hasProfileState);

  const isValid = (type: string) => {
    // if display setting is true and value is not empty, display value
    switch (type) {
      case 'dob':
        return displayDOB && !!draftUserState.dob;
      case 'gender':
        return displayGender && !!draftUserState.gender;
      case 'pronoun':
        return displayPronoun && !!draftUserState.pronoun;
      default:
        return false;
    }
  };

  const renderGenderAndPronoun = () => {
    let display = '';
    if (draftUserState.pronoun) {
      display = draftUserState.pronoun;

      if (draftUserState.gender) {
        display = `${display}, ${draftUserState.gender}`;
      }
    } else {
      if (draftUserState.gender) {
        display = draftUserState.gender;
      }
    }

    return display;
  };

  const inset = useSafeAreaInsets();

  return (
    <>
      {!hasProfile && (
        <View style={styles.noPreviewWrapper}>
          <TWIcons.cryingEmoticon
            width={scale(72)}
            height={scale(72)}
            color={AppColors.gray}
          />

          <TWLabel
            margin={{ top: 30 }}
            styles={styles.centered}
            color={AppColors.black}
            lineHeight={36}
            size={20}
            weight={`bold`}
          >
            Nothing to see here!
          </TWLabel>

          <TWLabel
            styles={styles.centered}
            color={AppColors.black}
            margin={{ top: 11 }}
            lineHeight={24}
            size={14}
          >
            Complete your profile and Twonie to see your preview.
          </TWLabel>
        </View>
      )}
      {hasProfile && (
        <TWScreen
          hideNav
          enableScroll
          isFull
          style={[styles.previewWrapper, , { marginTop: inset.top / 2 }]}
        >
          <View style={[styles.profileWrapper]}>
            {draftUserState?.profilePhoto ? (
              <TWImage
                image={draftUserState.profilePhoto}
                styles={styles.profileImg}
                resizeMode="cover"
              />
            ) : (
              <TWImage
                image={AppImages.profile}
                styles={styles.profileImg}
                resizeMode="cover"
              />
            )}
          </View>

          <TWLabel
            margin={{ top: 11 }}
            size={20}
            lineHeight={24}
            weight="semiBold"
            color={AppColors.black}
          >
            {draftUserState.firstName}

            {isValid('dob') && `, ${calculateAge(draftUserState.dob!)}`}
          </TWLabel>

          <View style={styles.profileInfo}>
            <View style={styles.avatarWrapper}>
              {userState.avatar ? (
                <TWAvatar {...userState.avatar} size={48} />
              ) : (
                <TWImage image={AppImages.avatar} styles={styles.avatarImg} />
              )}
            </View>

            <View>
              <TWLabel
                size={16}
                lineHeight={24}
                weight="semiBold"
                color={AppColors.black}
              >
                {draftUserState.username || draftUserState.avatar?.name || ''}
              </TWLabel>

              <TWLabel
                size={14}
                lineHeight={20}
                weight="regular"
                color={AppColors.gray}
              >
                {renderGenderAndPronoun()}
              </TWLabel>
            </View>
          </View>
        </TWScreen>
      )}
    </>
  );
};

export default PreviewProfile;
