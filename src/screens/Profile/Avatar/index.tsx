import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { TWAssets, TWButtonGroup, TWLabel, TWScreen } from '~components';
import TWAvatar from '~components/TWAvatar';
import { AppColors } from '~constants/colors';
import useUser from '~recoil/user';
import { ColorType } from '~types';
import { AvatarNavProps } from '~types/navigation';
import { scale, sWidth } from '~utils/dimension';

import { ANavBar } from './components/ANavBar';
import { ColorPanel } from './components/ColorPanel';
import { OptSelection } from './components/OptSelection';
import { avatarStyles } from './styles';

const Kinds = [
  {
    label: 'Skin',
    value: 'skin',
  },
  {
    label: 'Hair',
    value: 'hair',
  },
  {
    label: 'Background',
    value: 'background',
  },
];
const Colors = [
  {
    color: 'golden',
    value: AppColors.avatar.golden,
  },
  {
    color: 'brown',
    value: AppColors.avatar.brown,
  },
  {
    color: 'black',
    value: AppColors.avatar.black,
  },
  {
    color: 'default',
    value: AppColors.avatar.default,
  },
] as ColorType[];
const itemWidth = (sWidth - scale(24) * 4) * 0.34;
const Skins = [
  {
    icon: <TWAssets.skinUI.white width={itemWidth} height={itemWidth} />,
    value: 'white',
  },
  {
    icon: <TWAssets.skinUI.yellow width={itemWidth} height={itemWidth} />,
    value: 'yellow',
  },
  {
    icon: <TWAssets.skinUI.brown width={itemWidth} height={itemWidth} />,
    value: 'brown',
  },
];
const Accessories = [
  {
    icon: <TWAssets.accessory.default width={itemWidth} height={itemWidth} />,
    value: 'none',
  },
  {
    icon: <TWAssets.accessory.default width={itemWidth} height={itemWidth} />,
    accessory: <TWAssets.glass width={itemWidth} height={itemWidth} />,
    value: 'default',
  },
];
const Backgrounds = [
  {
    icon: <TWAssets.background.default width={itemWidth} height={itemWidth} />,
    accessory: (
      <TWAssets.background.body width={itemWidth} height={itemWidth} />
    ),
    value: 'default',
  },
  {
    icon: <TWAssets.background.blue width={itemWidth} height={itemWidth} />,
    accessory: (
      <TWAssets.background.body width={itemWidth} height={itemWidth} />
    ),
    value: 'blue',
  },
  {
    icon: <TWAssets.background.purple width={itemWidth} height={itemWidth} />,
    accessory: (
      <TWAssets.background.body width={itemWidth} height={itemWidth} />
    ),
    value: 'purple',
  },
  {
    icon: <TWAssets.background.green width={itemWidth} height={itemWidth} />,
    accessory: (
      <TWAssets.background.body width={itemWidth} height={itemWidth} />
    ),
    value: 'green',
  },
  {
    icon: <TWAssets.background.aqua width={itemWidth} height={itemWidth} />,
    accessory: (
      <TWAssets.background.body width={itemWidth} height={itemWidth} />
    ),
    value: 'aqua',
  },
  {
    icon: <TWAssets.background.pink width={itemWidth} height={itemWidth} />,
    accessory: (
      <TWAssets.background.body width={itemWidth} height={itemWidth} />
    ),
    value: 'pink',
  },
  {
    icon: <TWAssets.background.gold width={itemWidth} height={itemWidth} />,
    accessory: (
      <TWAssets.background.body width={itemWidth} height={itemWidth} />
    ),
    value: 'gold',
  },
  {
    icon: <TWAssets.background.orange width={itemWidth} height={itemWidth} />,
    accessory: (
      <TWAssets.background.body width={itemWidth} height={itemWidth} />
    ),
    value: 'orange',
  },
];

type Props = {
  navigation: AvatarNavProps;
};

const AvatarConfigScreen = ({ navigation }: Props) => {
  const { userState, draftUserState, setDraftUserInfo } = useUser();
  const [curOption, setCurOption] = useState(Kinds[0].value);
  const [hairOption, setHairOption] = useState(
    `${
      userState.avatar?.color === 'default'
        ? '#AE3114'
        : userState.avatar?.color === 'golden'
        ? '#FACF76'
        : userState.avatar?.color === 'brown'
        ? '#883F0E'
        : userState.avatar?.color === 'black'
        ? '#291505'
        : '#FACF76'
    }`,
  );

  const Hairs = [
    {
      icon: <TWAssets.accessory.default width={itemWidth} height={itemWidth} />,
      value: 'none',
    },
    {
      icon: <TWAssets.hair.body width={itemWidth} height={itemWidth} />,
      accessory: (
        <TWAssets.hair.middle
          width={itemWidth}
          height={itemWidth}
          fill={hairOption}
        />
      ),
      value: 'middle',
    },
    {
      icon: <TWAssets.hair.body width={itemWidth} height={itemWidth} />,
      accessory: (
        <TWAssets.hair.long
          width={itemWidth}
          height={itemWidth}
          fill={hairOption}
        />
      ),
      value: 'long',
    },
    {
      icon: <TWAssets.hair.body width={itemWidth} height={itemWidth} />,
      accessory: (
        <TWAssets.hair.short
          width={itemWidth}
          height={itemWidth}
          fill={hairOption}
        />
      ),
      value: 'short',
    },
    {
      icon: <TWAssets.hair.body width={itemWidth} height={itemWidth} />,
      accessory: (
        <TWAssets.hair.cut
          width={itemWidth}
          height={itemWidth}
          fill={hairOption}
        />
      ),
      value: 'cut',
    },
    {
      icon: <TWAssets.hair.body width={itemWidth} height={itemWidth} />,
      accessory: (
        <TWAssets.hair.wool
          width={itemWidth}
          height={itemWidth}
          fill={hairOption}
        />
      ),
      value: 'wool',
    },
    {
      icon: <TWAssets.hair.body width={itemWidth} height={itemWidth} />,
      accessory: (
        <TWAssets.hair.old
          width={itemWidth}
          height={itemWidth}
          fill={hairOption}
        />
      ),
      value: 'old',
    },
    {
      icon: <TWAssets.hair.body width={itemWidth} height={itemWidth} />,
      accessory: (
        <TWAssets.hair.sports
          width={itemWidth}
          height={itemWidth}
          fill={hairOption}
        />
      ),
      value: 'sports',
    },
  ];

  const Beards = [
    {
      icon: <TWAssets.accessory.default width={itemWidth} height={itemWidth} />,
      value: 'none',
    },
    {
      icon: <TWAssets.accessory.default width={itemWidth} height={itemWidth} />,
      accessory: (
        <TWAssets.beard
          width={itemWidth}
          height={itemWidth}
          fill={AppColors.avatar[draftUserState.avatar?.color || 'golden']}
        />
      ),
      value: 'default',
    },
  ];

  const onChagnedOptions = (opt: string) => {
    setCurOption(opt);
  };

  const onChangeSkin = useCallback(
    skin => {
      setDraftUserInfo({
        ...draftUserState,
        avatar: {
          ...draftUserState.avatar,
          skin,
        },
      });
    },
    [draftUserState, setDraftUserInfo],
  );

  const onChangeColor = useCallback(
    (colorObj: ColorType) => {
      setHairOption(colorObj.value);

      setDraftUserInfo({
        ...draftUserState,
        avatar: {
          ...draftUserState.avatar,
          color: colorObj.color,
        },
      });
    },
    [draftUserState, setDraftUserInfo],
  );

  const onChangeHair = useCallback(
    hair => {
      setDraftUserInfo({
        ...draftUserState,
        avatar: {
          ...draftUserState.avatar,
          hair,
        },
      });
    },
    [draftUserState, setDraftUserInfo],
  );

  const onChangeBackground = useCallback(
    background => {
      setDraftUserInfo({
        ...draftUserState,
        avatar: {
          ...draftUserState.avatar,
          background,
        },
      });
    },
    [draftUserState, setDraftUserInfo],
  );

  const onChangeAccessories = useCallback(
    glass => {
      setDraftUserInfo({
        ...draftUserState,
        avatar: {
          ...draftUserState.avatar,
          glass: glass === 'none' ? undefined : glass,
        },
      });
    },
    [draftUserState, setDraftUserInfo],
  );

  const onChangeBeard = useCallback(
    beard => {
      setDraftUserInfo({
        ...draftUserState,
        avatar: {
          ...draftUserState.avatar,
          beard: beard === 'none' ? undefined : beard,
        },
      });
    },
    [draftUserState, setDraftUserInfo],
  );

  const goNext = () => {
    navigation.navigate('AvatarProfile');
  };

  useEffect(() => {
    const draftUserInfo = userState;
    setDraftUserInfo(draftUserInfo);
    console.log('draft avatar: ', draftUserInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TWScreen
      renderNav={<ANavBar hasNext nextAction={goNext} />}
      isFull
      style={{ marginBottom: 100 }}
    >
      <View style={avatarStyles.wrap}>
        <TWAvatar {...draftUserState.avatar} />
      </View>
      <TWButtonGroup
        data={Kinds}
        parentStyles={avatarStyles.optionWrap}
        onChanged={onChagnedOptions}
      />
      {curOption === 'skin' && (
        <ScrollView contentContainerStyle={avatarStyles.contentWrap}>
          <TWLabel size={18} weight="semiBold" margin={{ bottom: 16, top: 18 }}>
            Skin
          </TWLabel>
          <OptSelection
            data={Skins}
            curValue={userState.avatar?.skin || Skins[0].value}
            onSelected={onChangeSkin}
          />
          <TWLabel size={18} weight="semiBold" margin={{ top: 18, bottom: 16 }}>
            Accessories
          </TWLabel>
          <OptSelection
            data={Accessories}
            curValue={userState.avatar?.glass || Accessories[0].value}
            onSelected={onChangeAccessories}
          />
        </ScrollView>
      )}
      {curOption === 'hair' && (
        <View style={[avatarStyles.contentWrap, avatarStyles.noTopPadding]}>
          <View>
            <ColorPanel
              colors={Colors}
              curValue={draftUserState.avatar?.color || Colors[0].color}
              onChangeColor={onChangeColor}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TWLabel
              size={18}
              weight="semiBold"
              margin={{ bottom: 16, top: 18 }}
            >
              Hairstyles
            </TWLabel>
            <OptSelection
              data={Hairs}
              curValue={draftUserState.avatar?.hair || Hairs[0].value}
              onSelected={onChangeHair}
            />
            <TWLabel
              size={18}
              weight="semiBold"
              margin={{ top: 18, bottom: 16 }}
            >
              Facial Hair
            </TWLabel>
            <OptSelection
              data={Beards}
              curValue={draftUserState.avatar?.beard || Beards[0].value}
              onSelected={onChangeBeard}
            />
          </ScrollView>
        </View>
      )}
      {curOption === 'background' && (
        <ScrollView contentContainerStyle={avatarStyles.contentWrap}>
          <OptSelection
            data={Backgrounds}
            curValue={draftUserState.avatar?.background || Backgrounds[0].value}
            onSelected={onChangeBackground}
          />
        </ScrollView>
      )}
    </TWScreen>
  );
};

export default AvatarConfigScreen;
