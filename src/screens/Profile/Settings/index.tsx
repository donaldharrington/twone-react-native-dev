import React, { useCallback } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';

import { legalEndpoints } from '~api/config';
import { TWButton, TWLabel, TWScreen } from '~components';
import { AppColors } from '~constants/colors';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import useUser from '~recoil/user';
import { SettingsNavProps } from '~types/navigation';
import { formatPhoneNumber } from '~utils';

import { ItemWrapper } from './components/ItemWrapper';
import { ListItem } from './components/ListItem';
import { settingStyle } from './styles';

type Props = {
  navigation: SettingsNavProps;
};

const SettingsScreen = ({ navigation }: Props) => {
  const { showToast } = useUtils();
  const { userState } = useUser();
  const { setTokens } = useGlobal();

  const onLogOut = async () => {
    await setTokens('', '');
  };

  const onDeleteAccount = () => {
    navigation.navigate('DeleteAccount');
  };

  const handlePress = useCallback(
    async (url: string) => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        await Linking.openURL(url);
      } else {
        showToast(`Don't know how to open this URL: ${url}`, 'danger');
      }
    },
    [showToast],
  );

  return (
    <TWScreen
      bgColor={AppColors.whiteBg}
      style={[settingStyle.page]}
      enableScroll
    >
      <TWLabel size={32} lineHeight={44} weight="bold" margin={{ bottom: 32 }} color={AppColors.text}>
        Settings
      </TWLabel>
      <ItemWrapper>
        <ListItem
          label="Name"
          value={`${userState.firstName} ${userState.lastName || ''}`}
        />
        <ListItem
          label="Birthday"
          value={`${userState.dob!.toLocaleDateString()}`}
        />
        <ListItem
          label="Phone"
          value={`${formatPhoneNumber(userState.phoneNumber!)}`}
        />
        <ListItem
          label="Email"
          type="email"
          hasLine={true}
          hasDetail
          value={userState.email !== 'twone@example.com' ? userState.email : ''}
          onEdit={() => navigation.navigate('AddEmail')}
        />
        <ListItem
          label="Reset Password"
          type="password"
          hasDetail
          onEdit={() =>
            navigation.navigate('ResetPassword', { authType: 'reset' })
          }
        />
      </ItemWrapper>

      <ItemWrapper>
        <ListItem
          label="Permissions"
          hasDetail
          hasLine={false}
          onEdit={() => navigation.navigate('Permissions')}
        />
      </ItemWrapper>

      <ItemWrapper>
        <ListItem
          label="Push Notifications"
          hasDetail
          hasLine={false}
          onEdit={() => navigation.navigate('PushNotification')}
        />
      </ItemWrapper>

      <ItemWrapper>
        <ListItem label="Watch Tutorial" hasDetail />
        <ListItem label="FAQ" hasDetail />
        <ListItem
          label="Send Feedback"
          hasDetail
          onEdit={() => navigation.navigate('Feedback')}
        />
        <ListItem label="Invite a Friend" hasDetail hasLine={false} />
      </ItemWrapper>

      <ItemWrapper>
        <ListItem
          label="Privacy Policy"
          hasDetail
          onEdit={() => handlePress(legalEndpoints.privacyPolicy)}
        />
        <ListItem
          label="Terms of Service"
          hasDetail
          onEdit={() => handlePress(legalEndpoints.toc)}
        />
        <ListItem
          label="Cookie Policy"
          hasDetail
          hasLine={false}
          onEdit={() => handlePress(legalEndpoints.cookiePolicy)}
        />
      </ItemWrapper>

      <View style={settingStyle.bottomAction}>
        <TWButton
          title="Log Out"
          type="solid"
          size="md"
          bgColor={AppColors.secondary}
          onClick={onLogOut}
        />
        <TouchableOpacity
          onPress={onDeleteAccount}
          style={[settingStyle.delBtn, settingStyle.alignCenter]}
        >
          <TWLabel color={AppColors.error}>Delete Account</TWLabel>
        </TouchableOpacity>
        <TWLabel
          align="center"
          color={AppColors.gray}
          size={12}
        >{`Twone v1.00.00 \nBorn in California`}</TWLabel>
      </View>
    </TWScreen>
  );
};

export default SettingsScreen;
