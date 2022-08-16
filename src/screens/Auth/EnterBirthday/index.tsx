import React, { useState } from 'react';
import { View } from 'react-native-animatable';
import DatePicker from 'react-native-date-picker';

import { TWButton, TWIcons, TWModal, TWScreen } from '~components/';
import useUser from '~recoil/user';
import { AuthNavProps } from '~types/navigation';
import {
  getAge,
  isFuture,
  today,
  todayNextYear,
  twentyYearsAgo,
} from '~utils/date';

import { HeadLine } from '../HeadLine';

import { styles } from './styles';

type Props = {
  navigation: AuthNavProps;
};

const EnterBirthScreen = ({ navigation }: Props) => {
  const { userState, setBirthday } = useUser();
  const birthday = userState.dob || today;
  const [isDateChanged, setIsDateChanged] = useState(!!userState.dob);
  const [modalVisible, setModalVisible] = useState(false);

  const onDateChange = (date: Date) => {
    setBirthday(date);
    setIsDateChanged(true);
    if (isFuture(date)) {
      setBirthday(today);
    }
  };

  const onContinue = () => {
    setModalVisible(true);
  };

  const onVerifyOk = () => {
    setModalVisible(false);

    const age = getAge(birthday);

    if (age >= 18) {
      navigation.navigate('EnterPhone', {
        authType: 'register',
      });
    } else {
      navigation.navigate('EnterBlock');
    }
  };

  const onVerifyCancel = () => {
    setModalVisible(false);
  };

  return (
    <TWScreen vAlign="space-between">
      <View animation="fadeInUp" delay={300} duration={500}>
        <HeadLine
          title={`Just between us,\nwhen's your birthday?`}
          description={`This won't be part of your public profile.`}
          icon={<TWIcons.birth width={24} height={24} />}
        />

        <View style={styles.pickerView}>
          <DatePicker
            date={birthday ? birthday : twentyYearsAgo}
            maximumDate={todayNextYear}
            mode="date"
            onDateChange={onDateChange}
          />
        </View>
      </View>

      <View animation="fadeInUp" delay={500} duration={500}>
        <TWButton
          title="Select your birthday"
          type="pink"
          disabled={!isDateChanged}
          onClick={onContinue}
        />
      </View>

      <TWModal
        isVisible={modalVisible}
        icon={<TWIcons.birthCircle width={48} height={48} />}
        title={`Are you ${getAge(birthday)} years old?`}
        description={`Please make sure your age is correct. You won't be able to change this later`}
        okTitle={`Confirm`}
        cancelTitle={`Cancel`}
        onOk={onVerifyOk}
        onCancel={onVerifyCancel}
      />
    </TWScreen>
  );
};

export default EnterBirthScreen;
