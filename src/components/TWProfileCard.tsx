import moment from 'moment';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppColors } from '~constants/colors';
import AppImages from '~constants/images';
import { UserTypes } from '~types';
import { calculateAge } from '~utils';
import { scale, verticalScale } from '~utils/dimension';

import TWLabel from './atoms/TWLabel';
import TWWrapper from './atoms/TWWrapper';
import TWAvatar from './TWAvatar';
import TWImage from './TWImage';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: verticalScale(420),
    backgroundColor: 'white',
    borderRadius: scale(8),
  },
  hCont: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    marginBottom: scale(20),
  },
  avatar: { marginRight: scale(12) },
});

type Props = {
  user: UserTypes;
};

const TWProfileCard = ({ user }: Props) => {
  const renderGenderAndPronoun = () => {
    let display = '';
    if (user.pronoun) {
      display = user.pronoun;

      if (user.gender) {
        display = `${display}, ${user.gender}`;
      }
    } else {
      if (user.gender) {
        display = user.gender;
      }
    }

    return display;
  };

  return (
    <TWWrapper padding={4}>
      <TWImage
        height={scale(480)}
        image={user.profilePhoto || AppImages.profile}
        styles={styles.image}
        resizeMode="cover"
      />
      <TWLabel
        size={28}
        lineHeight={36}
        color={AppColors.text}
        weight="semiBold"
        margin={{ left: 12, top: 16, bottom: 12 }}
      >
        {`${user.firstName}, ${calculateAge(moment(user.dob).toDate())}`}
      </TWLabel>
      <View style={styles.hCont}>
        <View style={styles.avatar}>
          <TWAvatar {...user.avatar} size={48} />
        </View>

        <View>
          <TWLabel size={18} weight="medium" lineHeight={24} color={AppColors.text}>
            {`${user.avatar?.name || 'Avatar'}`}
          </TWLabel>
          {(user.pronoun || user.gender) && (
            <TWLabel size={14} lineHeight={20} color={AppColors.placeholder} weight="regular">
              {renderGenderAndPronoun()}
            </TWLabel>
          )}
        </View>
      </View>
    </TWWrapper>
  );
};

export default TWProfileCard;
