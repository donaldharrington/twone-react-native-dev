import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';

import {
  TWAlert,
  TWIcons,
  TWInput,
  TWLabel,
  TWScreen,
  TWWrapper,
} from '~components';
import { AppColors } from '~constants/colors';
import { createReport } from '~helpers/report.helpers';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import useUser from '~recoil/user';
import { RoomType } from '~types';
import { ReportBody } from '~types/api/request.types';
import { MainNavProps, MainRouteProps } from '~types/navigation';
import { scale } from '~utils/dimension';

import { ChatHeader, ChatNavBar } from '../components';
import { chatStyles } from '../styles';

import { moreStyles } from './styles';

type Props = {
  navigation: MainNavProps;
  route: MainRouteProps;
};

const ChatMoreScreen = ({ navigation, route }: Props) => {
  const { chatInfo, twone } = route.params;
  const { setIsLoading, refreshTokenIfExpired } = useGlobal();
  const { userState } = useUser();
  const { showToast } = useUtils();

  const [showDisconnect, setShowDisconnect] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false);

  const onShowProfile = () => {
    const roomInfo = {
      id: '',
      user: chatInfo.userInfo,
    } as RoomType;
    navigation.navigate('SharedProfile', {
      isViewOnly: true,
      roomInfo: roomInfo,
    });
  };

  const onShowDisconnect = () => {
    setShowDisconnect(true);
  };

  const onDisconnect = () => {
    // TODO: stuff for disconnecting
    setShowDisconnect(false);
    setIsDisconnected(true);
  };

  const onReport = async () => {
    try {
      setIsLoading(true);
      const reportBody = {
        owner: userState.id,
        reportedUser: chatInfo.userInfo.id,
      } as ReportBody;

      const idToken = await refreshTokenIfExpired();
      await createReport(reportBody, idToken);
      navigation.goBack();
    } catch (error) {
      showToast((error as Error).message, 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TWScreen
      renderNav={
        <ChatNavBar
          navigation={navigation}
          info={chatInfo.userInfo}
          hideMore
          isDisconnected={isDisconnected}
        />
      }
      isFull
      enableScroll
      style={moreStyles.page}
      bgColor={AppColors.white}
    >
      <ChatHeader
        userInfo={chatInfo.userInfo}
        onShowProfile={onShowProfile}
        isMore
        isDisconnected={isDisconnected}
      />
      {isDisconnected ? (
        <View style={chatStyles.emptyCont}>
          <TWIcons.disconnect style={chatStyles.noMsgImg} />
          <TWLabel
            size={24}
            weight="semiBold"
            margin={{ top: 24, bottom: 8 }}
            align="center"
          >
            No messages... yet
          </TWLabel>
          <TWLabel size={16} color={AppColors.placeholder} align="center">
            Connect with your Twone to start chatting with them here.
          </TWLabel>
        </View>
      ) : (
        <View animation="fadeInUp" delay={300} duration={500}>
          <TWLabel isUppercase weight="semiBold" size={14} lineHeight={24} color={AppColors.third} margin={{ top: 0, bottom: 8 }}>
            How we met
          </TWLabel>
          <TWWrapper minHeight={100}>
            <TWInput
              multiline
              color={AppColors.third}
              numberOfLines={5}
              size={14}
              lineHeight={20}
              fontWeight="normal"
              italic={false}
              defaultValue={twone?.howWeMet}
            />
          </TWWrapper>

          <TWLabel isUppercase size={14} lineHeight={24} color={AppColors.third} weight="semiBold" margin={{ bottom: 8 }}>
            privacy & support
          </TWLabel>
          <TWWrapper minHeight={48} padding={12} >
            <TouchableOpacity style={moreStyles.buttton} onPress={onReport}>
              <TWIcons.alert />
              <TWLabel size={16} lineHeight={24} weight="medium" margin={{ left: 16 }} color={AppColors.text}>
                Report
              </TWLabel>
            </TouchableOpacity>
          </TWWrapper>

          <TouchableOpacity
            style={[moreStyles.buttton, moreStyles.disconnectBtn]}
            onPress={onShowDisconnect}
          >
            <TWIcons.exit />
            <TWLabel
              size={16}
              color={AppColors.error}
              weight="semiBold"
              margin={{ left: 10 }}
            >
              Disconnect
            </TWLabel>
          </TouchableOpacity>
        </View>
      )}

      <TWAlert
        isVisible={showDisconnect}
        title="Are you sure want to disconnect from Theo?"
        type="confirm"
        confirmTitle="Disconnect"
        confirmColor={AppColors.error}
        onClose={() => setShowDisconnect(false)}
        onConfirm={onDisconnect}
      />
    </TWScreen>
  );
};

export default ChatMoreScreen;
