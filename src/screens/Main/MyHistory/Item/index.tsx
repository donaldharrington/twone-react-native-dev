import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { TWLabel, TWIcons } from '~components';
import { AppColors } from '~constants/colors';
import useGlobal from '~recoil/global';
import useTwone from '~recoil/twone';
import { TwoneHistoryType, TwoneType } from '~types';
import { MainNavProps } from '~types/navigation';
import { scale } from '~utils/dimension';

import { TwoneDetail } from '../Details';

import { itemStyles } from './styles';

type Props = {
  navigation: MainNavProps;
  type?: string;
  twone: TwoneType;
  hasBorder?: boolean;
  onTwone?: (type: TwoneHistoryType) => void;
};

export const HistoryItem = ({ navigation, twone, type, hasBorder }: Props) => {
  const { setAppState } = useGlobal();
  const { setTwone } = useTwone();
  const [showDetail, setShowDetail] = useState(false);

  const onClickDetail = () => {
    if (type === 'search') {
      setTwone(twone);
      setAppState('search');
      return;
    }
    setShowDetail(true);
  };

  const searchTwone = () => {
    setTwone(twone);
    setAppState('search');
    setShowDetail(false);
    navigation.pop();
  };

  const onEdit = () => {
    setTwone(twone);
    setShowDetail(false);
    navigation.navigate('TwonedConf', {
      isTwoned: true,
    });
  };

  return (
    <TouchableOpacity style={itemStyles.wrapper} onPress={onClickDetail}>
      <View style={itemStyles.iconWrap}>
        <TWIcons.location
          width={scale(24)}
          height={scale(24)}
          fill={AppColors.primary}
        />
      </View>
      <View
        style={[
          itemStyles.wrapper,
          itemStyles.textWrap,
          itemStyles.inner,
          hasBorder && itemStyles.border,
        ]}
      >
        <View style={[itemStyles.textWrap, { paddingRight: scale(20) }]}>
          <TWLabel size={14} weight="semiBold">
            {twone.address}
          </TWLabel>
          <TWLabel size={12} margin={{ top: 2 }}>
            {twone.address1}
          </TWLabel>
        </View>
        {type === 'search' ? (
          <View style={[itemStyles.wrapper, { paddingRight: scale(12) }]}>
            <TWLabel>Search</TWLabel>
            <TWIcons.chevronRight />
          </View>
        ) : twone.isTwoned ? (
          <View style={[itemStyles.btn, { borderColor: AppColors.pink }]}>
            <TWLabel size={12} color={AppColors.pink}>
              Twoned
            </TWLabel>
          </View>
        ) : (
          <View style={[itemStyles.btn, { borderColor: AppColors.primary }]}>
            <TWLabel size={12} color={AppColors.primary}>
              Twone
            </TWLabel>
          </View>
        )}
      </View>

      <TwoneDetail
        isVisible={showDetail}
        twone={twone}
        onClose={() => setShowDetail(false)}
        onSearch={searchTwone}
        onEdit={onEdit}
      />
    </TouchableOpacity>
  );
};
