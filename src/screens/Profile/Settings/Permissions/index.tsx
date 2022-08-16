import React from 'react';
import { Linking } from 'react-native';

import { TWIcons, TWLabel, TWScreen } from '~components';
import { AppColors } from '~constants/colors';

import PermissionItem from './PermissionItem';
import { styles } from './styles';

const PermissionsScreen = () => {
  return (
    <TWScreen title="Permissions" hideNav={false} bgColor={AppColors.bgGray}>
      <PermissionItem
        title="Location Access"
        icon={
          <TWIcons.location width={24} height={24} fill={AppColors.primary} />
        }
        onPress={() => {
          void Linking.openURL('App-Prefs:root=Privacy&path=LOCATION');
        }}
      />
      <TWLabel
        size={12}
        color={AppColors.gray}
        lineHeight={16}
        styles={styles.description}
      >
        You can manage Twone's location access permissions at any time by going
        {` `}to your iOS Settings {`>`} Privacy {`>`} Location Services {`>`}
        {` `}Twone.
      </TWLabel>

      <PermissionItem
        title="Photo Access"
        icon={<TWIcons.photo width={24} height={24} />}
        onPress={() => {
          void Linking.openURL('App-Prefs:root=Privacy&path=PHOTOS');
        }}
      />
      <TWLabel
        size={12}
        color={AppColors.gray}
        lineHeight={16}
        styles={styles.description}
      >
        You can manage Twone's photo access permissions at any time by going
        {` `}to your iOS Settings {`>`} Privacy {`>`} Photos {`>`} Twone.
      </TWLabel>

      <PermissionItem
        title="Notifications"
        icon={<TWIcons.notification width={24} height={24} />}
        onPress={() => {
          void Linking.openURL('App-Prefs:root=Privacy&path=NOTIFICATIONS');
        }}
      />
      <TWLabel
        size={12}
        color={AppColors.gray}
        lineHeight={16}
        styles={styles.description}
      >
        You can manage the notifications permissions at any time by going
        {` `}to your iOS Settings {`>`} Notifications {`>`} Twone.
      </TWLabel>
    </TWScreen>
  );
};

export default PermissionsScreen;
