import { CometChat } from '@cometchat-pro/react-native-chat';
import React, { Fragment, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import {
  TWButton,
  TWIcons,
  TWLabel,
  TWProfileCard,
  TWScreen,
} from '~components';
import { AppColors } from '~constants/colors';
import {
  deleteChat,
  deleteChatParticipant,
  getChatParticipants,
  makeChatAsActive,
} from '~helpers/chat.helpers';
import { createReport } from '~helpers/report.helpers';
import { approveTwoned, deleteTwoned } from '~helpers/twone.helpers';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import useUser from '~recoil/user';
import { ChatType } from '~types';
import { ReportBody } from '~types/api/request.types';
import { MainNavProps, MainRouteProps } from '~types/navigation';
import { scale } from '~utils/dimension';

import { profStyles } from './styles';

type Props = {
  navigation: MainNavProps;
  route: MainRouteProps;
};

const SharedProfileScreen = ({ navigation, route }: Props) => {
  const { roomInfo, isViewOnly } = route.params;
  const { setIsLoading, refreshTokenIfExpired } = useGlobal();
  const { userState } = useUser();
  const { showToast } = useUtils();

  const onClose = () => {
    navigation.goBack();
  };

  const onReport = async () => {
    try {
      setIsLoading(true);
      const reportBody = {
        owner: userState.id,
        reportedUser: roomInfo?.user.id,
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

  const onNotMine = async () => {
    try {
      setIsLoading(true);
      const idToken = await refreshTokenIfExpired();
      const chatParticipants = await getChatParticipants(roomInfo.id, idToken);
      for (let i = 0; i < chatParticipants.length; i++) {
        await deleteChatParticipant(chatParticipants[i].id, idToken);
      }
      await deleteChat(roomInfo.id, idToken);
      await deleteTwoned(roomInfo.twoned.id, idToken);
      navigation.goBack();
    } catch (error) {
      showToast((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const onConnect = async () => {
    try {
      setIsLoading(true);
      const idToken = await refreshTokenIfExpired();
      await makeChatAsActive(roomInfo.id, idToken);
      await approveTwoned(roomInfo.twoned.id, idToken);
      navigation.pop();

      const cometChatUser = new CometChat.User(roomInfo.user.id);
      const chatInfo = {
        cometUser: cometChatUser,
        userInfo: roomInfo?.user,
      } as ChatType;

      setTimeout(() => {
        navigation.navigate('ChatDetail', { chatInfo });
      }, 100);
    } catch (error) {
      showToast((error as Error).message, 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const renderNavUI = useMemo(
    () => (
      <View style={profStyles.nav}>
        <TouchableOpacity onPress={onClose} style={profStyles.navAction} >
          <TWIcons.close />
        </TouchableOpacity>
        <TWLabel
          size={18}
          lineHeight={24}
          color={AppColors.black}
          weight="semiBold"
          styles={profStyles.title}
          align="center"
        >
          {isViewOnly ? 'View Profile' : 'Shared Profile'}
        </TWLabel>
        <TouchableOpacity onPress={onReport} style={profStyles.navAction}>
          <TWLabel color= {AppColors.primary} align="right" weight="semiBold" size={16} lineHeight={24}>
            Report
          </TWLabel>
        </TouchableOpacity>
      </View>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isViewOnly],
  );

  return (
    <TWScreen isModal renderNav={renderNavUI} enableScroll>
      {roomInfo && <TWProfileCard user={roomInfo.user} />}
      {!isViewOnly && (
        <Fragment>
          <View style={profStyles.div} />
          {/* <TWLabel weight="semiBold" size={14} isUppercase>
            Memo
          </TWLabel>
          <TWLabel lineHeight={20} margin={{ top: 20, bottom: 44 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat
            senectus placerat lacus nunc ullamcorper proin eget et quam.
          </TWLabel> */}

          <TWButton title="ACCEPT" type="pink" size="md" onClick={onConnect} />
          <TouchableOpacity onPress={onNotMine} style={profStyles.noBtn}>
            <TWLabel
              isUppercase
              color={AppColors.error}
              size={16}
              lineHeight={20}
              weight="medium"
              align="center"
            >
              Not my Twone
            </TWLabel>
          </TouchableOpacity>
        </Fragment>
      )}
    </TWScreen>
  );
};

export default SharedProfileScreen;
