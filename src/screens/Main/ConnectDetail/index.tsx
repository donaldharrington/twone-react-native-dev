import moment from 'moment';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { TWButton, TWLabel, TWScreen, TWWrapper } from '~components';
import TWAvatar from '~components/TWAvatar';
import { AppColors } from '~constants/colors';
import { createChat, createChatParticipant } from '~helpers/chat.helpers';
import { createReport } from '~helpers/report.helpers';
import { createTwoned } from '~helpers/twone.helpers';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import useTwone from '~recoil/twone';
import useUser from '~recoil/user';
import {
  ChatBody,
  ChatParticipantBody,
  ReportBody,
  TwonedBody,
} from '~types/api/request.types';
import { MainNavProps, MainRouteProps } from '~types/navigation';

import { conDetailStyles } from './styles';

type Props = {
  navigation: MainNavProps;
  route: MainRouteProps;
};

const ConnectDetailScreen = ({ navigation, route }: Props) => {
  const { twone } = route.params;
  const { showToast } = useUtils();
  const { twoneState } = useTwone();
  const { userState } = useUser();
  const { setIsLoading, refreshTokenIfExpired } = useGlobal();

  const onConnect = async () => {
    setIsLoading(true);
    if (!twoneState.location) return;

    try {
      const body = {
        user: userState.id,
        owner: userState.id,
        howWeMet: twoneState.label,
        twoneId: twone?.id,
        date: moment(twoneState.date).format('YYYY-MM-DD'),
        time: twoneState.time!.id,
        location: `${twoneState.address1!}\n${twoneState.address!}`,
        coordinates: `${twoneState.location.latitude},${twoneState.location.longitude}`,
      } as TwonedBody;

      const idToken = await refreshTokenIfExpired();
      await createTwoned(body, idToken);

      const chatBody = {
        twone: twone?.id,
        active: false,
      } as ChatBody;
      const chat = await createChat(chatBody, idToken);

      let participantBody = {
        chat: chat.id,
        user: twone?.owner?.id,
      } as ChatParticipantBody;
      await createChatParticipant(participantBody, idToken);

      participantBody = {
        chat: chat.id,
        user: userState.id,
      } as ChatParticipantBody;
      await createChatParticipant(participantBody, idToken);
      navigation.pop();
    } catch (error) {
      showToast((error as Error).message, 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const onReport = async () => {
    try {
      setIsLoading(true);
      const reportBody = {
        owner: userState.id,
        reportedUser: twone!.owner!.id,
        cause: '',
      } as ReportBody;

      const idToken = await refreshTokenIfExpired();
      await createReport(reportBody, idToken);
      navigation.pop();
    } catch (error) {
      showToast((error as Error).message, 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TWScreen title="Detail" vAlign="space-between">
      <View>
        <View style={conDetailStyles.avatarWrap}>
          <TWAvatar {...twone?.owner?.avatar} size={80} />
          <TWLabel>Ready</TWLabel>
        </View>

        <TWLabel margin={{ top: 32, bottom: 8 }} isUppercase>
          How we met
        </TWLabel>
        <TWWrapper padding={16} minHeight={200} margin={{ bottom: 8 }}>
          <TWLabel>{twone?.howWeMet}</TWLabel>
        </TWWrapper>
        <TWLabel size={10} align="right" color={AppColors.gray}>
          500
        </TWLabel>
      </View>

      <View>
        <TWButton type="pink" title="Connect" onClick={onConnect} size="md" />
        <TouchableOpacity style={conDetailStyles.reportBtn} onPress={onReport}>
          <TWLabel weight="semiBold" color={AppColors.error} size={16}>
            Report
          </TWLabel>
        </TouchableOpacity>
      </View>
    </TWScreen>
  );
};

export default ConnectDetailScreen;
