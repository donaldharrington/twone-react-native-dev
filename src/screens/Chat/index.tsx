import { CometChat } from '@cometchat-pro/react-native-chat';
import { useFocusEffect } from '@react-navigation/core';
import moment from 'moment';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

import { TWIcons, TWLabel, TWScreen } from '~components';
import { AppColors } from '~constants/colors';
import { getChatParticipants, getParticipants } from '~helpers/chat.helpers';
import CometChatManager from '~helpers/chat/CometChatManager';
import { ConversationListManager } from '~helpers/chat/ConversationListManager';
import { getUserProfile } from '~helpers/profile.helpers';
import { getMyTwones, getTwoned } from '~helpers/twone.helpers';
// import { getUserInfo } from '~helpers/user.helpers';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import useUser from '~recoil/user';
import {
  ChatType,
  CUSTOM_MESSAGE_RECEIVED,
  MEDIA_MESSAGE_RECEIVED,
  RoomType,
  TEXT_MESSAGE_RECEIVED,
  UserTypes,
  USER_OFFLINE,
  USER_ONLINE,
} from '~types';
import { Chat, User } from '~types/api/response.types';
import { MainNavProps } from '~types/navigation';
import { scale, verticalScale } from '~utils/dimension';

import { ChatCell } from './components/ChatCell';
import { RoomCell } from './components/RoomCell';
import { chatStyles } from './styles';

type Props = {
  navigation: MainNavProps;
};

const styles = StyleSheet.create({
  wrapper: {
    maxHeight: verticalScale(90),
    marginRight: scale(12),
    paddingTop: verticalScale(6),
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  avatar: {
    height: verticalScale(60),
    width: verticalScale(60),
    borderRadius: verticalScale(30),
    marginBottom: verticalScale(6),
    backgroundColor: AppColors.border,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: AppColors.boldDivider,
    shadowColor: AppColors.transparent,
  },
});

const ChatScreen = ({ navigation }: Props) => {
  const { showToast } = useUtils();
  const { refreshTokenIfExpired } = useGlobal();
  const { userState } = useUser();
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [chats, _setChats] = useState<ChatType[]>([]);
  const [allIds, setAllIDs] = useState<(string | undefined)[]>([]);

  const chatsRef = useRef(chats);
  const setChats = (data: ChatType[]) => {
    chatsRef.current = data;
    // _setChats(data);
    removeDuplicateChats(data);
  };

  function removeDuplicateChats(data: ChatType[]) {
    let allUsersIDs: (string | undefined)[] = [];
    let tempRooms: RoomType[] = [];
    let tempChats: ChatType[] = [];

    if (data.length > 0) {
      data.forEach(c => {
        if (!allUsersIDs.includes(c.userInfo.id)) {
          allUsersIDs.push(c.userInfo.id);
          tempChats.push(c);
        }
      });
      _setChats(tempChats);
      chatsRef.current = tempChats;
    }

    if (rooms.length > 0) {
      rooms.forEach(r => {
        if (!allUsersIDs.includes(r.user.id)) {
          // allUsersIDs.push(r.user.id);
          tempRooms.push(r);
        }
      });

      setAllIDs(allUsersIDs);
      setRooms(tempRooms);
    }
    getWaitingRoomUsers();
  }

  function removeDuplicateRooms(data: RoomType[]) {
    let allUsersIDs: (string | undefined)[] = [];
    let tempRooms: RoomType[] = [];

    if (data.length > 0) {
      data.forEach(r => {
        if (!allIds.includes(r.user.id) && !allUsersIDs.includes(r.user.id)) {
          allUsersIDs.push(r.user.id);
          tempRooms.push(r);
        }
      });

      // setAllIDs(allUsersIDs);
      setRooms(tempRooms);
    }
  }

  const conversationListManager = useMemo(
    () => new ConversationListManager(),
    [],
  );

  const onGoSharedProfile = useCallback(
    (roomInfo: RoomType) => {
      navigation.navigate('SharedProfile', { roomInfo: roomInfo });
    },
    [navigation],
  );

  const onGoMessage = (chatInfo: ChatType) => {
    navigation.navigate('ChatDetail', { chatInfo });
  };



  const renderHeaderUI = useMemo(
    () => (
      <View style={{paddingHorizontal: scale(16), paddingTop: scale(34)}}>
        <TWLabel
          size={32}
          weight="bold"
          lineHeight={44}
          margin={{ bottom: 32 }}
          color={AppColors.text}
        >
          Chat
        </TWLabel>
        {rooms.length > 0 ? (
          <>
            <TWLabel
              size={14}
              lineHeight={24}
              weight="semiBold"
              color={AppColors.primary}
              isUppercase
            >
              Pending Twones
            </TWLabel>
            <ScrollView
              horizontal
              contentContainerStyle={chatStyles.roomWrap}
              showsHorizontalScrollIndicator={false}
            >
              {rooms.map(r => (
                <RoomCell
                  key={r.id}
                  data={r}
                  onClick={() => onGoSharedProfile(r)}
                />
              ))}
            </ScrollView>
          </>
        ) : (
          <View style={{ marginBottom: scale(24) }}>
            <TWLabel
              size={14}
              lineHeight={24}
              weight="semiBold"
              color={AppColors.primary}
              isUppercase
              margin={{bottom: 8}}
            >
              Pending Twones
            </TWLabel>
            <View style={styles.wrapper}>
              <View
                style={[
                  styles.avatar,
                  { justifyContent: 'center', alignItems: 'center' },
                ]}
              />

              <TWLabel size={15} lineHeight={24} align="center" weight="regular" color={AppColors.text}>
                None
              </TWLabel>
            </View>
          </View>
        )}
        <TWLabel
          size={14}
          lineHeight={24}
          weight="semiBold"
          color={AppColors.primary}
          margin={{ top: 6, bottom: 12}}
          isUppercase
        >
          Messages
        </TWLabel>
      </View>
    ),
    [onGoSharedProfile, rooms],
  );

  /**
   * Retrieve unread message count from conversation
   * @param conversation : conversation object
   * @param operator : extra option to handle decrease in unread message count
   */
  const makeUnreadMessageCount = (
    conversation: CometChat.Conversation | undefined,
    operator: string,
  ) => {
    if (!conversation || Object.keys(conversation).length === 0) {
      return 1;
    }

    let unreadMessageCount = conversation.getUnreadMessageCount();
    if (operator && operator === 'decrement') {
      unreadMessageCount = unreadMessageCount ? unreadMessageCount - 1 : 0;
    } else {
      unreadMessageCount += 1;
    }

    return unreadMessageCount;
  };

  const getConversationsCallback = useCallback(async () => {
    try {
      const cometChatManager = new CometChatManager();
      const loggedInUser = await cometChatManager.getLoggedInUser();
      if (loggedInUser) {
        const idToken = await refreshTokenIfExpired();
        const participants = await getParticipants(idToken);
        const _chats = participants
          .filter(participant => (participant.chat as Chat).active)
          .map(participant => participant.chat as Chat);

        const _chatRooms = [];
        for (let i = 0; i < _chats.length; i++) {
          const chatParticipants = await getChatParticipants(
            _chats[i].id,
            idToken,
          );

          const otherParty = chatParticipants.find(
            participant => (participant.user as User).id !== userState.id,
          );

          if (!otherParty) continue;

          const otherPartyProfile = await getUserProfile(
            (otherParty.user as User).id,
            idToken,
          );

          const user: UserTypes = {
            id: (otherParty.user as User).id,
            profileId: (otherParty.user as User).id,
            firstName: (otherParty.user as User).firstName,
            lastName: (otherParty.user as User).lastName,
            username: (otherParty.user as User).username,
            email: (otherParty.user as User).email,
            profilePhoto: (otherParty.user as User).profilePhoto,
            phoneNumber: (otherParty.user as User).phoneNumber,
            gender: (otherParty.user as User).gender,
            pronoun: (otherParty.user as User).pronoun,
            avatar: {
              size: 138,
              skin: otherPartyProfile.avatarSkin,
              glass: otherPartyProfile.avatarAccessories,
              background: otherPartyProfile.avatarBackgroundColor,
              hair: otherPartyProfile.avatarHair,
              beard: otherPartyProfile.avatarFacialHair,
              color: otherPartyProfile.avatarHairColor,
              name: otherPartyProfile.avatar,
            },
            dob: moment((otherParty.user as User).dob).toDate(),
            displayDOB: otherPartyProfile.displayDOB,
            displayGender: otherPartyProfile.displayGender,
            displayPronoun: otherPartyProfile.displayPronoun,
            connectedDate: _chats[i].updatedAt,
          };

          _chatRooms.push({
            chatId: _chats[i].id,
            user: user,
          });
        }

        conversationListManager.refreshRequest();
        let conversationList: CometChat.Conversation[] = [];
        let conversations =
          await conversationListManager.fetchNextConversation();
        while (conversations && conversations.length > 0) {
          conversationList = [...conversationList, ...conversations];
          conversations = await conversationListManager.fetchNextConversation();
        }

        const chatList = _chatRooms.map(chatRoom => {
          return {
            chatId: chatRoom.chatId,
            cometUser: new CometChat.User(chatRoom.user.id),
            conversation: conversationList?.find(
              conversation =>
                (
                  conversation.getConversationWith() as CometChat.User
                ).getUid() === chatRoom.user.id,
            ),
            userInfo: chatRoom.user,
          } as ChatType;
        });
        setChats(chatList);
      }
    } catch (error) {
      showToast((error as Error).message, 'danger');
    }
  }, [conversationListManager, refreshTokenIfExpired, showToast, userState.id]);

  const updateConversationCallback = useCallback(
    async (message: CometChat.BaseMessage) => {
      try {
        const conversation =
          await CometChat.CometChatHelper.getConversationFromMessage(message);
        const chatList = [...chatsRef.current];
        const chatKey = chatList.findIndex(
          c =>
            c.conversation?.getConversationId() ===
            conversation.getConversationId(),
        );

        if (chatKey > -1) {
          const unreadMessageCount = makeUnreadMessageCount(
            chatList[chatKey].conversation,
            '',
          );

          conversation.setLastMessage(message);
          conversation.setUnreadMessageCount(unreadMessageCount);

          const newChatObj: ChatType = {
            ...chatList[chatKey],
            conversation: conversation,
          };

          chatList.splice(chatKey, 1);
          chatList.unshift(newChatObj);
          setChats(chatList);

          // if (notification) {
          //   this.playAudio(message);
          // }
        } else {
          void getConversationsCallback();
          // if (notification) {
          //   this.playAudio(message);
          // }
        }
      } catch (error) {
        showToast((error as Error).message, 'danger');
      }
    },
    [getConversationsCallback, showToast],
  );

  const conversationUpdated = (
    key: string,
    item: CometChat.User | null,
    message: CometChat.BaseMessage | null,
  ) => {
    try {
      switch (key) {
        case USER_ONLINE:
        case USER_OFFLINE:
          // updateUser(item);
          break;
        case TEXT_MESSAGE_RECEIVED:
        case MEDIA_MESSAGE_RECEIVED:
        case CUSTOM_MESSAGE_RECEIVED:
          void updateConversationCallback(message!);
          break;
        default:
          break;
      }
    } catch (error) {
      showToast((error as Error).message, 'danger');
    }
  };

  const getWaitingRoomUsers = useCallback(async () => {
    try {
      const waitingRoomUsers: RoomType[] = [];
      const idToken = await refreshTokenIfExpired();
      const twones = await getMyTwones(idToken);

      for (let i = 0; i < twones.length; i++) {
        if (!twones[i].twoneds || twones[i].twoneds?.length === 0) continue;

        const twoneds = twones[i].twoneds!.filter(twoned => !twoned.approved);
        for (let j = 0; j < twoneds.length; j++) {
          const twoned = await getTwoned(twoneds[j].id, idToken);

          if (!twoned.user) continue;
          const userProfile = await getUserProfile(twoned.user?.id, idToken);

          const user: UserTypes = {
            id: twoned.user?.id,
            profileId: userProfile.id,
            firstName: twoned.user?.firstName,
            lastName: twoned.user?.lastName,
            username: twoned.user?.username,
            email: twoned.user?.email,
            profilePhoto: twoned.user?.profilePhoto,
            phoneNumber: twoned.user?.phoneNumber,
            gender: twoned.user?.gender,
            pronoun: twoned.user?.pronoun,
            avatar: {
              size: 138,
              skin: userProfile.avatarSkin,
              glass: userProfile.avatarAccessories,
              background: userProfile.avatarBackgroundColor,
              hair: userProfile.avatarHair,
              beard: userProfile.avatarFacialHair,
              color: userProfile.avatarHairColor,
              name: userProfile.avatar,
            },
            dob: moment(twoned.user?.dob).toDate(),
            displayDOB: userProfile.displayDOB,
            displayGender: userProfile.displayGender,
            displayPronoun: userProfile.displayPronoun,
          };

          waitingRoomUsers.push({
            id: twones[i].chats![j].id,
            user: user,
            twoned: twoned,
          });
        }
      }

      // setRooms(waitingRoomUsers);
      removeDuplicateRooms(waitingRoomUsers);
    } catch (error) {
      showToast((error as Error).message);
    }
  }, [refreshTokenIfExpired, showToast]);

  const refreshConversations = useCallback(async () => {
    try {
      conversationListManager.refreshRequest();
      let conversationList: CometChat.Conversation[] = [];
      let conversations = await conversationListManager.fetchNextConversation();
      while (conversations && conversations.length > 0) {
        conversationList = [...conversationList, ...conversations];
        conversations = await conversationListManager.fetchNextConversation();
      }

      const chatList = [...chats];
      chatList.map(chat => {
        if (chat.conversation) {
          const conversation = conversationList.find(
            _conversation =>
              _conversation.getConversationId() ===
              chat.conversation?.getConversationId(),
          );

          if (conversation) {
            // eslint-disable-next-line no-param-reassign
            chat.conversation = conversation;
          }
        } else {
          const conversation = conversationList.find(
            _conversation =>
              (_conversation.getLastMessage() as CometChat.TextMessage)
                .getSender()
                .getUid() === chat.userInfo.id,
          );
          // eslint-disable-next-line no-param-reassign
          chat.conversation = conversation;
        }
      });

      setChats(chatList);
    } catch (error) {
      showToast((error as Error).message);
    }
  }, [chats, conversationListManager, showToast]);

  const onDeleteMessage = (/*userId: string*/) => {
    // TODO: stuff for delete
  };

  useEffect(() => {
    if (conversationListManager) {
      conversationListManager.removeListeners();
    }
    conversationListManager.attachListeners(conversationUpdated);
    void getConversationsCallback();
    return () => {
      conversationListManager.removeListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      void refreshConversations();
      // void getWaitingRoomUsers();
    });
    return unsubscribe;
  }, [navigation, refreshConversations]);

  return (
    <TWScreen hideNav renderNav={renderHeaderUI} noPadding>
      {chats.length > 0 ? (
        <SwipeListView
          data={chats}
          disableScrollViewPanResponder
          keyExtractor={data => data.cometUser.getUid()}
          renderItem={({ item }) => (
            <SwipeRow
              closeOnRowPress={true}
              disableRightSwipe
              rightOpenValue={scale(-75)}
              leftActivationValue={100}
            >
              <View style={chatStyles.msgBackCont} key={item.userInfo?.id}>
                <TouchableOpacity
                  style={chatStyles.msgDelBtn}
                  activeOpacity={0.8}
                  onPress={() => onDeleteMessage(/*item.cometUser.getUid()*/)}
                >
                  <TWIcons.trash />
                  <TWLabel size={14} color={AppColors.white}>
                    Delete
                  </TWLabel>
                </TouchableOpacity>
              </View>
              <ChatCell data={item} onClick={() => onGoMessage(item)} />
            </SwipeRow>
          )}
          closeOnRowBeginSwipe={true}
          closeOnScroll={true}
          closeOnRowPress={true}
        />
      ) : (
        <View style={chatStyles.emptyCont}>
          <TWIcons.noMessage style={chatStyles.noMsgImg} />
          <TWLabel
            size={24}
            lineHeight={32}
            weight="semiBold"
            margin={{ top: 24, bottom: 8 }}
            align="center"
            color={AppColors.text}
          >
            No messages... yet
          </TWLabel>
          <TWLabel size={16} lineHeight={24} color={AppColors.placeholder} align="center">
            Connect with your Twone to start chatting with them here.
          </TWLabel>
        </View>
      )}
    </TWScreen>
  );
};

export default ChatScreen;
