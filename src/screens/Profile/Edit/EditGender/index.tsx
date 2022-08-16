import React from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';

import { TWIcons, TWLabel, TWScreen, TWButton } from '~components';
import { AppColors } from '~constants/colors';
import useUser from '~recoil/user';
import { ProfileNavProps } from '~types/navigation';

import { styles } from './styles';

type Props = {
  navigation: ProfileNavProps;
};

const EditGenderSceen = ({ navigation }: Props) => {
  const { draftUserState, setDraftUserInfo } = useUser();

  const saveGender = () => {
    navigation.pop();
  };

  return (
    <TWScreen title="Gender" bgColor={AppColors.white} isModal isFull>
      <View style={styles.wrapper}>
        <View>
          <TWLabel
            size={14}
            lineHeight={24}
            weight="semiBold"
            color={AppColors.darkGray}
          >
            I IDENTIFY AS...
          </TWLabel>

          <TouchableOpacity
            onPress={() =>
              setDraftUserInfo({ ...draftUserState, gender: 'Female' })
            }
          >
            <View style={styles.item}>
              <TWLabel size={14} lineHeight={20} color={AppColors.black}>
                Female
              </TWLabel>
              {draftUserState.gender === 'Female' && <TWIcons.chevron />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setDraftUserInfo({ ...draftUserState, gender: 'Male' })
            }
          >
            <View style={styles.item}>
              <TWLabel size={14} lineHeight={20} color={AppColors.black}>
                Male
              </TWLabel>
              {draftUserState.gender === 'Male' && <TWIcons.chevron />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setDraftUserInfo({ ...draftUserState, gender: 'Non-binary' })
            }
          >
            <View style={styles.item}>
              <TWLabel size={14} lineHeight={20} color={AppColors.black}>
                Non-binary
              </TWLabel>
              {draftUserState.gender === 'Non-binary' && <TWIcons.chevron />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setDraftUserInfo({ ...draftUserState, gender: 'Other' })
            }
          >
            <View style={styles.item}>
              <TWLabel size={14} lineHeight={20} color={AppColors.black}>
                Other
              </TWLabel>
              {draftUserState.gender === 'Other' && <TWIcons.chevron />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setDraftUserInfo({
                ...draftUserState,
                gender: 'Prefer not to say',
              })
            }
          >
            <View style={styles.item}>
              <TWLabel size={14} lineHeight={20} color={AppColors.black}>
                Prefer not to say
              </TWLabel>
              {draftUserState.gender === 'Prefer not to say' && (
                <TWIcons.chevron />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.missing}
            onPress={() => Linking.openURL('mailto:support@twone.app')}
          >
            <TWLabel
              size={14}
              lineHeight={20}
              color={AppColors.buttonActive}
              styles={styles.missingText}
            >
              Are we missing your gender?{`\n`}
              Please let us know!
            </TWLabel>
          </TouchableOpacity>
        </View>

        <TWButton title="Save" type="purple" size="md" onClick={saveGender} />
      </View>
    </TWScreen>
  );
};

export default EditGenderSceen;
