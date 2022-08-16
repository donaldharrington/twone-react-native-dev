import React, { useRef, useState } from 'react';
import { View } from 'react-native-animatable';
import PhoneInput from 'react-native-phone-number-input';

import { TWButton, TWIcons, TWScreen } from '~components/';
import useUser from '~recoil/user';
import { AuthNavProps, AuthRouteProps } from '~types/navigation';

import { HeadLine } from '../HeadLine';

import { phoneStyles } from './styles';

type Props = {
  navigation: AuthNavProps;
  route: AuthRouteProps;
};

const EnterPhoneScreen = ({ navigation, route }: Props) => {
  const { params } = route;
  const { userState, setPhoneNumber } = useUser();
  const { firstName } = userState;

  const [curNumber, setCurNumber] = useState('');
  const phoneInput = useRef<PhoneInput>(null);

  const isValidNumber = (num: string) => {
    if (phoneInput.current) {
      return phoneInput.current.isValidNumber(num);
    } else {
      return false;
    }
  };

  const onSubmitPhone = () => {
    if (curNumber) {
      setPhoneNumber(curNumber);

      navigation.navigate('EnterPassword', {
        authType: params.authType,
      });
    }
  };

  return (
    <TWScreen vAlign="space-between">
      <View animation="fadeInUp" delay={300} duration={500}>
        <HeadLine
          title={`Hey ${firstName}! What's your number?`}
          description="We will send you a text with a verification code. Message and data rates may apply. "
          icon={<TWIcons.phone width={24} height={24} />}
        />
        <PhoneInput
          ref={phoneInput}
          defaultValue={curNumber}
          defaultCode="US"
          layout="first"
          onChangeText={text => {
            setCurNumber(text);
          }}
          onChangeFormattedText={text => {
            setCurNumber(text);
            // setFormattedNumber(text);
          }}
          renderDropdownImage={<TWIcons.dropDown />}
          autoFocus
          placeholder="(000) 000-0000"
          containerStyle={phoneStyles.phoneWrap}
          textContainerStyle={phoneStyles.textWrap}
          codeTextStyle={phoneStyles.phoneText}
          textInputStyle={phoneStyles.phoneText}
          flagButtonStyle={phoneStyles.flagBtn}
          countryPickerProps={{
            withAlphaFilter: true,
            modalProps: {
              presentationStyle: 'formSheet',
            },
            closeButtonImageStyle: {
              width: 36,
              height: 36,
            },
          }}
        />
      </View>
      <View animation="fadeInUp" delay={500} duration={500}>
        <TWButton
          title="Continue"
          type="pink"
          disabled={!isValidNumber(curNumber)}
          onClick={onSubmitPhone}
        />
      </View>
    </TWScreen>
  );
};

export default EnterPhoneScreen;
