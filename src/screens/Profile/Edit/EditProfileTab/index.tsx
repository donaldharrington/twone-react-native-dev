import React, { useCallback, useState } from 'react';
import { Switch, TouchableOpacity, View } from 'react-native';
import { openCamera, openPicker } from 'react-native-image-crop-picker';

import {
  TWBottomAction,
  TWIcons,
  TWImage,
  TWInput,
  TWLabel,
  TWScreen,
} from '~components';
import { AppColors } from '~constants/colors';
import { MAX_IMAGE_SIZE } from '~constants/config';
import { useUtils } from '~hooks/useUtils';
import useUser from '~recoil/user';
import { ProfileNavProps } from '~types/navigation';
import { calculateAge } from '~utils';
import { scale } from '~utils/dimension';

import { styles } from './styles';

type Props = {
  navigation: ProfileNavProps;
};

const EditProfile = ({ navigation }: Props) => {
  const { showToast } = useUtils();
  const { draftUserState, setDraftUserInfo } = useUser();
  const { displayDOB, displayGender, displayPronoun } = draftUserState;
  const [showActionSheet, setShowActionSheet] = useState(false);

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

  const onSelectImageCallback = useCallback(
    resp => {
      // const { data, mime, path, sourceURL } = resp;
      const { path } = resp;
      if (path) {
        setDraftUserInfo({
          ...draftUserState,
          profilePhoto: path,
        });
      }
      setShowActionSheet(false);
    },
    [draftUserState, setDraftUserInfo],
  );

  const onOpenCamera = async () => {
    try {
      const image = await openCamera({
        cropping: true,
        width: MAX_IMAGE_SIZE.w,
        height: MAX_IMAGE_SIZE.h,
        mediaType: 'photo',
        includeBase64: true,
        forceJpg: true,
        avoidEmptySpaceAroundImage: true,
        cropperCircleOverlay: true,
        useFrontCamera: true,
      });
      onSelectImageCallback(image);
      setShowActionSheet(false);
    } catch (error) {
      showToast((error as Error).message, 'danger');
    }
  };

  const onOpenLibrary = async () => {
    try {
      const image = await openPicker({
        mediaType: 'photo',
        height: MAX_IMAGE_SIZE.h,
        width: MAX_IMAGE_SIZE.w,
        forceJpg: true,
        cropping: true,
        includeBase64: true,
        avoidEmptySpaceAroundImage: true,
        cropperCircleOverlay: true,
      });
      onSelectImageCallback(image);
      setShowActionSheet(false);
    } catch (error) {
      showToast((error as Error).message, 'danger');
    }
  };

  const handleRemoveImage = () => {
    if (draftUserState) {
      setDraftUserInfo({
        ...draftUserState,
        profilePhoto: '',
      });
      setShowActionSheet(false);
    }
  };

  const renderActionSheet = () => {
    const actionItems = [
      {
        label: 'Remove Current Photo',
        onPress: () => handleRemoveImage(),
      },
      {
        label: 'Take photo',
        onPress: () => onOpenCamera(),
      },
      {
        label: 'Choose from library',
        onPress: () => onOpenLibrary(),
      },
    ];
    return (
      <TWBottomAction
        detached
        isVisible={showActionSheet}
        actionItems={actionItems}
        onCancel={() => setShowActionSheet(false)}
      />
    );
  };

  return (
    <TWScreen hideNav enableScroll isFull>
      <View style={styles.avatarWrapper}>
        <TouchableOpacity
          onPress={() => setShowActionSheet(true)}
          style={styles.avatarImg}
        >
          {draftUserState?.profilePhoto ? (
            <TWImage
              image={draftUserState.profilePhoto}
              styles={styles.profileImage}
            />
          ) : (
            <TWIcons.camera width={scale(90)} height={scale(60)} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowActionSheet(true)}>
          <TWLabel color={AppColors.buttonActive} size={16} weight="medium">
            Edit
          </TWLabel>
        </TouchableOpacity>
      </View>

      <View>
        <TWLabel
          color={AppColors.darkGray}
          size={14}
          lineHeight={24}
          weight="medium"
        >
          NAME
        </TWLabel>

        <View style={styles.inputWrapper}>
          <TWInput
            size={16}
            multiline={true}
            numberOfLines={10}
            paddingHorizontal={0}
            parentStyle={styles.input}
            fontWeight="500"
            placeHolder="Your name"
            italic={false}
            inputProps={{
              autoCapitalize: 'none',
              keyboardType: 'default',
              value: draftUserState?.firstName,
            }}
            onChange={txt =>
              setDraftUserInfo({ ...draftUserState, firstName: txt })
            }
          />
        </View>
      </View>

      <View>
        <TWLabel
          color={AppColors.darkGray}
          size={14}
          lineHeight={24}
          weight="medium"
        >
          AGE
        </TWLabel>

        <View style={styles.inputWrapper}>
          <TWLabel
            color={AppColors.black}
            size={14}
            lineHeight={24}
            weight="medium"
          >
            {calculateAge(draftUserState.dob!)}
          </TWLabel>

          <Switch
            trackColor={{ false: AppColors.bgGray, true: AppColors.primary }}
            thumbColor={AppColors.white}
            ios_backgroundColor={AppColors.bgGray}
            onValueChange={b =>
              setDraftUserInfo({ ...draftUserState, displayDOB: b })
            }
            value={isValid('dob')}
          />
        </View>
      </View>

      <View>
        <View style={styles.inputDesc}>
          <TWLabel
            color={AppColors.darkGray}
            size={14}
            lineHeight={24}
            weight="medium"
          >
            GENDER
          </TWLabel>

          <TouchableOpacity onPress={() => navigation.push('EditGender')}>
            <TWLabel color={AppColors.primary} size={14} weight="medium">
              Edit
            </TWLabel>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.push('EditGender')}
          style={styles.inputWrapper}
        >
          <TWLabel
            color={AppColors.black}
            size={14}
            lineHeight={24}
            weight="medium"
          >
            {draftUserState.gender || 'Select your gender'}
          </TWLabel>

          <Switch
            trackColor={{ false: AppColors.bgGray, true: AppColors.primary }}
            thumbColor={AppColors.white}
            ios_backgroundColor={AppColors.bgGray}
            onValueChange={b => {
              if (draftUserState.gender) {
                setDraftUserInfo({ ...draftUserState, displayGender: b });
              } else {
                navigation.push('EditGender');
              }
            }}
            value={isValid('gender')}
          />
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.inputDesc}>
          <TWLabel
            color={AppColors.darkGray}
            size={14}
            lineHeight={24}
            weight="medium"
          >
            PRONOUNS
          </TWLabel>

          <TouchableOpacity onPress={() => navigation.push('EditPronouns')}>
            <TWLabel color={AppColors.primary} size={14} weight="medium">
              Edit
            </TWLabel>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.push('EditPronouns')}
          style={styles.inputWrapper}
        >
          <TWLabel
            color={AppColors.black}
            size={14}
            lineHeight={24}
            weight="medium"
          >
            {draftUserState.pronoun || 'Select your pronouns'}
          </TWLabel>

          <Switch
            trackColor={{ false: AppColors.bgGray, true: AppColors.primary }}
            thumbColor={AppColors.white}
            ios_backgroundColor={AppColors.bgGray}
            onValueChange={b => {
              if (draftUserState.pronoun) {
                setDraftUserInfo({ ...draftUserState, displayPronoun: b });
              } else {
                navigation.push('EditPronouns');
              }
            }}
            value={isValid('pronoun')}
          />
        </TouchableOpacity>
      </View>

      {showActionSheet && renderActionSheet()}
    </TWScreen>
  );
};

export default EditProfile;
