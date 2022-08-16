import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { TWButton, TWIcons, TWInput, TWLabel, TWScreen } from '~components';
import { AppColors } from '~constants/colors';

import { styles } from './styles';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop: 8,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E5EC',
    borderRadius: 56,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    marginTop: 8,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#E5E5EC',
    borderRadius: 56,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 21,
    right: 15,
  },
});

const FeedbackScreen = () => {
  return (
    <TWScreen title="Send Feedback" isModal>
      <View style={styles.wrapper}>
        <View>
          <View style={styles.header}>
            <TWLabel size={22} lineHeight={32} weight="bold">
              Send Feedback
            </TWLabel>
            <TWLabel
              size={14}
              lineHeight={16}
              color={AppColors.gray}
              styles={styles.headerDescription}
            >
              If you have any comments, concerns, or suggestions, please let us
              {` `}know! Your feedback is valuable and will help us improve
              Twone
              {` `}for everyone.
            </TWLabel>
          </View>

          <View style={styles.input}>
            <TWLabel weight="medium" size={14} lineHeight={24}>
              TYPE OF ISSUE
            </TWLabel>

            <RNPickerSelect
              placeholder={{
                label: 'Please Select',
                value: null,
                color: AppColors.gray,
              }}
              style={pickerSelectStyles}
              onValueChange={value => {
                // eslint-disable-next-line no-console
                console.log(value);
              }}
              items={[
                { label: 'General Question', value: 'general' },
                { label: 'Account Problem', value: 'account' },
                { label: 'Payment Question', value: 'payment' },
              ]}
              Icon={() => {
                return <TWIcons.chevronDown width={20} height={20} />;
              }}
            />
          </View>

          <View style={styles.input}>
            <TWLabel weight="medium" size={14} lineHeight={24}>
              DESCRIPTION
            </TWLabel>

            <TWInput
              size={16}
              multiline={true}
              numberOfLines={10}
              parentStyle={styles.description}
              paddingHorizontal={0}
              fontWeight="500"
              placeHolder="What's on your mind"
              inputProps={{
                autoCapitalize: 'none',
                keyboardType: 'email-address',
              }}
            />
          </View>
        </View>

        <TWButton title="Submit" type="pink" size="md" />
      </View>
    </TWScreen>
  );
};

export default FeedbackScreen;
