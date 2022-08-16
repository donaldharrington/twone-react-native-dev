import React, { useEffect, useState } from 'react';

import { TWScreen } from '~components';
import { AppColors } from '~constants/colors';
import { updateUserProfile } from '~helpers/profile.helpers';
import { updateUserInfo, uploadPhoto } from '~helpers/user.helpers';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import useUser from '~recoil/user';
import { ProfileBody, UserBody } from '~types/api/request.types';
import { ProfileNavProps } from '~types/navigation';

import EditProfile from './EditProfileTab';
import PreviewProfile from './PreviewProfileTab';
import Tab from './Tab';

type Props = {
  navigation: ProfileNavProps;
};

const ProfileEditScreen = ({ navigation }: Props) => {
  const { showToast } = useUtils();
  const { setIsLoading, refreshTokenIfExpired, globalState } = useGlobal();
  const { userState, draftUserState, setUserInfo, setDraftUserInfo } =
    useUser();
  const [selectedTab, setSelectedTab] = useState(0);

  const saveProfile = async () => {
    try {
      setIsLoading(true);

      const idToken = await refreshTokenIfExpired();
      if (
        draftUserState.profilePhoto &&
        draftUserState.profilePhoto.length > 0 &&
        draftUserState.profilePhoto.indexOf('http') !== 0
      ) {
        const user = await uploadPhoto(draftUserState.profilePhoto, idToken);
        draftUserState.profilePhoto = user.profilePhoto;
      }

      const userBody: UserBody = {
        firstName: draftUserState.firstName,
        pronoun: draftUserState.pronoun,
        gender: draftUserState.gender,
        username: globalState.idTokenPayload!.phone_number,
        password: globalState.password!,
      };

      await updateUserInfo(userBody, idToken);

      const profileBody: ProfileBody = {
        displayDOB: draftUserState.displayDOB,
        displayGender: draftUserState.displayGender,
        displayPronoun: draftUserState.displayPronoun,
      };

      await updateUserProfile(draftUserState.profileId, profileBody, idToken);

      setUserInfo(draftUserState);
      navigation.goBack();
    } catch (error) {
      showToast((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const draftUserInfo = userState;
    setDraftUserInfo(draftUserInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TWScreen
      title="Edit Profile"
      bgColor={AppColors.whiteBg}
      actionTitle="Done"
      actionColor={
        !!draftUserState.gender && !!draftUserState.pronoun
          ? AppColors.primary
          : AppColors.gray
      }
      actionDisabled={!draftUserState.gender || !draftUserState.pronoun}
      onSave={saveProfile}
    >
      <Tab onSelectedTab={index => setSelectedTab(index)} />

      {selectedTab === 0 && <EditProfile navigation={navigation} />}
      {selectedTab === 1 && <PreviewProfile />}
    </TWScreen>
  );
};

export default ProfileEditScreen;
