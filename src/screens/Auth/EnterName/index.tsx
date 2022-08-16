import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native-animatable';

import { TWButton, TWIcons, TWInput, TWScreen } from '~components/';
import { useUtils } from '~hooks/useUtils';
import useUser from '~recoil/user';
import { AuthNavProps } from '~types/navigation';

import { HeadLine } from '../HeadLine';

type Props = {
  navigation: AuthNavProps;
};

const EnterNameScreen = ({ navigation }: Props) => {
  const { setName } = useUser();
  const [value, setValue] = useState('');
  const [isValid, setValid] = useState(true);

  const { showToast } = useUtils();

  const onNext = () => {
    if (isValid) {
      setName(value);
      navigation.navigate('EnterBirth');
    }
  };

  const onChangeName = useCallback(
    (txt: string) => {
      if (txt.length === 0) {
        setValid(true);
      } else {
        const valid = /^[a-zA-Z]+$/.test(txt);
        setValid(valid);
      }
      if (isValid) {
        setValue(txt);
      }
    },
    [isValid],
  );

  useEffect(() => {
    if (!isValid) {
      showToast('We love unique, but letters only please.', 'danger');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid]);

  return (
    <TWScreen vAlign="space-between">
      <View animation="fadeInUp" delay={300} duration={500}>
        <HeadLine
          title={`My name is Twone! \nWhat's your name?`}
          description={`You won't be able to change this information later, and it won't be part of your public profile. `}
          icon={<TWIcons.person width={24} height={24} />}
        />
        <TWInput
          onChange={onChangeName}
          placeHolder="First Name"
          inputProps={{
            autoCapitalize: 'words',
            autoCorrect: false,
            autoComplete: 'name',
          }}
          mt={40}
          fontWeight="500"
          isInvalid={!isValid}
          textAlign="center"
        />
      </View>
      <View animation="fadeInUp" delay={500} duration={500}>
        <TWButton
          title="Continue"
          type="pink"
          disabled={value.length < 2}
          onClick={onNext}
        />
      </View>
    </TWScreen>
  );
};

export default EnterNameScreen;
