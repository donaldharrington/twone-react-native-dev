import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native-animatable';
import PhoneInput from 'react-native-phone-number-input';

import {
  TWButton,
  TWButtonGroup,
  TWIcons,
  TWInput,
  TWScreen,
} from '~components';
import { AppColors } from '~constants/colors';
import { resendCode } from '~helpers/auth.helpers';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import useUser from '~recoil/user';
import { VerifyTypes } from '~types';
import { AuthNavProps } from '~types/navigation';
import { isValidEmail } from '~utils';

import { phoneStyles } from '../EnterPhone/styles';
import { HeadLine } from '../HeadLine';

import { forgotStyles } from './styles';

const Tabs = [
  {
    value: 'phone',
    label: 'Phone',
  },
  {
    value: 'email',
    label: 'Email',
  },
];

type Props = {
  navigation: AuthNavProps;
};

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const { setPhoneNumber } = useUser();
  const { setIsLoading } = useGlobal();
  const { showToast } = useUtils();

  const [curType, setCurType] = useState<VerifyTypes>('phone');
  const [curEmail, setCurEmail] = useState<string>();
  const [curNumber, setCurNumber] = useState('');

  const phoneInput = useRef<PhoneInput>(null);

  const isValidNumber = () => {
    if (phoneInput.current) {
      return phoneInput.current.isValidNumber(curNumber);
    } else {
      return false;
    }
  };

  const onChangeType = useCallback(val => {
    setCurType(val as VerifyTypes);
  }, []);

  const onChangeEmail = useCallback((email: string) => {
    setCurEmail(email);
  }, []);

  const onContinue = async () => {
    try {
      setIsLoading(true);
      await resendCode('forgot', curNumber);
      setPhoneNumber(curNumber.trim());
      navigation.navigate('EnterCode', {
        phoneNumber: curNumber.trim(),
        authType: 'forgot',
        verify: 'phone',
      });
    } catch (error) {
      showToast((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TWScreen vAlign="space-between">
      <View animation="fadeInUp" delay={300} duration={500}>
        <HeadLine
          title={`Forgot your password?`}
          description="Enter your phone number or email to verify your identity and we can help reset your password."
          icon={<TWIcons.lock width={24} height={24} />}
        />
        <TWButtonGroup
          data={Tabs}
          align="space-evenly"
          isTab
          activeColor={AppColors.secondary}
          onChanged={onChangeType}
        />
        {curType === 'phone' && (
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
            }}
            renderDropdownImage={<TWIcons.dropDown />}
            autoFocus
            placeholder="(000) 000-0000"
            containerStyle={[phoneStyles.phoneWrap, forgotStyles.inputWrap]}
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
        )}
        {curType === 'email' && (
          <TWInput
            placeHolder="Email address"
            inputProps={{
              autoCapitalize: 'none',
              autoCorrect: false,
              autoComplete: 'email',
            }}
            fontWeight={'500'}
            onChange={onChangeEmail}
            parentStyle={forgotStyles.inputWrap}
          />
        )}
      </View>
      <View animation="fadeInUp" delay={500} duration={500}>
        <TWButton
          title="Continue"
          type="pink"
          disabled={
            curType === 'phone' ? !isValidNumber() : !isValidEmail(curEmail)
          }
          onClick={onContinue}
        />
      </View>
    </TWScreen>
  );
};

export default ForgotPasswordScreen;
