import React, { useState } from 'react';
import { View } from 'react-native';

import { TWAlert, TWButton, TWLabel, TWScreen } from '~components';
import { AppColors } from '~constants/colors';
import { DELETE_ACCOUNT_REASON } from '~constants/config';
import { RadioType } from '~types';

import { ItemWrapper } from '../components/ItemWrapper';
import { TWRadioGroup } from '../components/RadioGroup';

const DeleteAccountScreen = () => {
  const reasons = DELETE_ACCOUNT_REASON.map((r, idx) => {
    return {
      id: `radio-id-${idx}`,
      value: `r-${idx}`,
      label: r,
      selected: false,
    } as RadioType;
  });

  const [curReason, setReason] = useState<RadioType>();
  const [showConfirm, setConfirm] = useState(false);

  const onChangeReason = (item: RadioType) => {
    setReason(item);
  };

  const onSubmit = () => {
    setConfirm(true);
  };

  const onConfirm = async () => {
    // const res: unknown = await deleteUser();
    // console.log('res', res);
    // await clearStorage();
    // setIsLoggedIn(false);
  };

  return (
    <TWScreen title="Delete Account" vAlign="space-between">
      <View>
        <TWLabel size={25} weight="bold">
          Why are you deleting your account?
        </TWLabel>
        <TWLabel
          isUppercase
          size={14}
          weight="medium"
          margin={{ top: 24, bottom: 12 }}
        >
          Because...
        </TWLabel>
        <ItemWrapper>
          <TWRadioGroup data={reasons} onChanged={onChangeReason} />
        </ItemWrapper>
      </View>

      <TWButton
        title="Submit"
        size="md"
        disabled={curReason === undefined}
        bgColor={AppColors.secondary}
        type="solid"
        onClick={onSubmit}
      />

      <TWAlert
        isVisible={showConfirm}
        title="Are you sure want to delete your account?"
        description="If you delete your account, you will permanetly lose your profile, messages, and Twones. This cannot be undone."
        confirmColor={AppColors.error}
        onConfirm={onConfirm}
        onClose={() => setConfirm(false)}
      />
    </TWScreen>
  );
};

export default DeleteAccountScreen;
