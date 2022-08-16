import React from 'react';

import { TWLabel, TWScreen } from '~components';
import { AppColors } from '~constants/colors';

import PushNotificationItem from './PushNotificationItem';
import { styles } from './styles';

const PushNotificationScreen = () => {
  return (
    <TWScreen
      title="Push Notifications"
      hideNav={false}
      bgColor={AppColors.bgGray}
    >
      <PushNotificationItem title="Chat" onChange={() => {}} />
      <TWLabel
        size={12}
        color={AppColors.gray}
        lineHeight={16}
        styles={styles.description}
      >
        Receive notifications when someone sends you a new message.
      </TWLabel>

      <PushNotificationItem title="New Connection" onChange={() => {}} />
      <TWLabel
        size={12}
        color={AppColors.gray}
        lineHeight={16}
        styles={styles.description}
      >
        Receive notifications when you Twoned person finds you and connects with
        {` `}you.
      </TWLabel>
    </TWScreen>
  );
};

export default PushNotificationScreen;
