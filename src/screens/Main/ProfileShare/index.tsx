import moment from 'moment';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import App from '~App';

import {
  TWButton,
  TWIcons,
  TWLabel,
  TWProfileCard,
  TWScreen,
  TWWrapper,
} from '~components';
import TWAvatar from '~components/TWAvatar';
import { AppColors } from '~constants/colors';
import { createChat, createChatParticipant } from '~helpers/chat.helpers';
import { createTwoned } from '~helpers/twone.helpers';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import useTwone from '~recoil/twone';
import useUser from '~recoil/user';
import {
  ChatBody,
  ChatParticipantBody,
  TwonedBody,
} from '~types/api/request.types';
import { MainNavProps, MainRouteProps } from '~types/navigation';
import { scale } from '~utils/dimension';

import { proShareStyles } from './styles';

type Props = {
  navigation: MainNavProps;
  route: MainRouteProps;
};

const ProfileShareScreen = ({ navigation, route }: Props) => {
  const { twone } = route.params;
  const { refreshTokenIfExpired, setIsLoading } = useGlobal();
  const { userState } = useUser();
  const { twoneState } = useTwone();
  const { showToast } = useUtils();

  const onShareProfile = async () => {
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

  return (
    <TWScreen
      isModal
      enableScroll
      isFull
      renderNav={
        <View style={[proShareStyles.header, proShareStyles.horiz]}>
          <View style={proShareStyles.horiz}>
            <View style={proShareStyles.topAvatar}>
              <TWAvatar {...twone!.owner?.avatar} size={36} />
            </View>

            <TWLabel size={16} lineHeight={24} weight="semiBold" color={AppColors.text}>
              {twone!.owner?.avatar?.name}
            </TWLabel>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={proShareStyles.closeBtn}
          >
            <TWIcons.close />
          </TouchableOpacity>
        </View>
      }
    >
      <TWLabel margin={{ top: 0, bottom:12 }} isUppercase>
        How we met
      </TWLabel>
      <TWWrapper  minHeight={50} margin={{ bottom: 24 }}>
        <TWLabel margin={{ vertical: 16, horizontal: 16}} size={16} lineHeight={22} weight="medium" color={AppColors.darkGray} >{twone?.howWeMet}
        </TWLabel>
      </TWWrapper>
      {/* <TWLabel size={24} weight="bold" margin={{ bottom: 16, top: 10 }}>
        Share your profile
      </TWLabel> */}

      {twone?.owner && <TWProfileCard user={userState} />}

      {/* <TWLabel isUppercase>Memo</TWLabel>
      <TouchableOpacity style={proShareStyles.editWrap}>
        <TWLabel>Add a message for your Twone</TWLabel>
        <TWIcons.rightArrow />
      </TouchableOpacity> */}

      <TWButton
        title="CONNECT"
        type= "pink"
        onClick={onShareProfile}
        size="md"
        parentStyle={proShareStyles.shareBtn}
      />
      {/* <TWLabel
        margin={{ top: 10, bottom: 8 }}
        align={'center'}
        size={10}
        color={AppColors.gray}
      >
        {`The ${twone?.owner?.avatar?.name} has to accept before you can start chatting.`}{' '}
      </TWLabel> */}
    </TWScreen>
  );
};

export default ProfileShareScreen;
