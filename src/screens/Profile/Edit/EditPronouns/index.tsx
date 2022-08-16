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

const EditPronounsSceen = ({ navigation }: Props) => {
  const { draftUserState, setDraftUserInfo } = useUser();

  const savePronouns = () => {
    navigation.pop();
  };

  return (
    <TWScreen title="Pronouns" bgColor={AppColors.white} isModal isFull>
      <View style={styles.wrapper}>
        <View>
          <TWLabel
            size={14}
            lineHeight={24}
            weight="semiBold"
            color={AppColors.darkGray}
          >
            MY PRONOUNS ARE...
          </TWLabel>

          <TouchableOpacity
            onPress={() =>
              setDraftUserInfo({ ...draftUserState, pronoun: 'She/Her/Hers' })
            }
          >
            <View style={styles.item}>
              <TWLabel size={14} lineHeight={20} color={AppColors.black}>
                She/Her/Hers
              </TWLabel>
              {draftUserState.pronoun === 'She/Her/Hers' && <TWIcons.chevron />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setDraftUserInfo({ ...draftUserState, pronoun: 'He/Him/His' })
            }
          >
            <View style={styles.item}>
              <TWLabel size={14} lineHeight={20} color={AppColors.black}>
                He/Him/His
              </TWLabel>
              {draftUserState.pronoun === 'He/Him/His' && <TWIcons.chevron />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setDraftUserInfo({
                ...draftUserState,
                pronoun: 'They/Them/Theirs',
              })
            }
          >
            <View style={styles.item}>
              <TWLabel size={14} lineHeight={20} color={AppColors.black}>
                They/Them/Theirs
              </TWLabel>
              {draftUserState.pronoun === 'They/Them/Theirs' && (
                <TWIcons.chevron />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setDraftUserInfo({
                ...draftUserState,
                pronoun: 'Other',
              })
            }
          >
            <View style={styles.item}>
              <TWLabel size={14} lineHeight={20} color={AppColors.black}>
                Other
              </TWLabel>
              {draftUserState.pronoun === 'Other' && <TWIcons.chevron />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setDraftUserInfo({
                ...draftUserState,
                pronoun: 'Prefer not to say',
              })
            }
          >
            <View style={styles.item}>
              <TWLabel size={14} lineHeight={20} color={AppColors.black}>
                Prefer not to say
              </TWLabel>
              {draftUserState.pronoun === 'Prefer not to say' && (
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
              Are we missing your pronouns?{`\n`}
              Please let us know!
            </TWLabel>
          </TouchableOpacity>
        </View>

        <TWButton title="Save" type="purple" size="md" onClick={savePronouns} />
      </View>
    </TWScreen>
  );
};

export default EditPronounsSceen;
