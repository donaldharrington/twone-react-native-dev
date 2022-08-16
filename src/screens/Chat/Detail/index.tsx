import { CometChat } from '@cometchat-pro/react-native-chat';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardEvent,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  TWAvatar,
  TWButton,
  TWImage,
  TWInput,
  TWLabel,
  TWPopUp,
  TWScreen,
} from '~components';
import { AppColors } from '~constants/colors';
import AppImages from '~constants/images';
import { getChat } from '~helpers/chat.helpers';
import CometChatManager from '~helpers/chat/CometChatManager';
import { MessageListManager } from '~helpers/chat/MessageListManager';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import useUser from '~recoil/user';
import {
  MESSAGE_DELIVERED,
  MESSAGE_READ,
  TEXT_MESSAGE_RECEIVED,
  MEDIA_MESSAGE_RECEIVED,
  RoomType,
} from '~types';
import { MainNavProps, MainRouteProps } from '~types/navigation';
import { scale } from '~utils/dimension';

import { ChatHeader, ChatNavBar, MessageBubble } from '../components';

import { chatDetailStyles } from './styles';
import { StyleSheet, FlexStyle } from 'react-native';

type Props = {
  navigation: MainNavProps;
  route: MainRouteProps;
};

const ChatDetailScreen = ({ navigation, route }: Props) => {
  const { chatInfo, isNew } = route.params;
  const { refreshTokenIfExpired, setIsLoading } = useGlobal();
  const { showToast } = useUtils();
  const { userState } = useUser();

  const [messages, setMessages] = useState<CometChat.BaseMessage[]>([]);
  const [showNewStart, setNewStart] = useState(false);
  const [message, setMessage] = useState('');
  const [profileTop, setProfileTop] = useState(0);

  const chatListRef = useRef<FlatList<CometChat.BaseMessage>>(null);
  const isLoading = useRef(false);
  const lastFetchedTime = useRef<Date | null>(null);
  const messageListManager = useMemo(
    () => new MessageListManager(chatInfo.cometUser),
    [chatInfo.cometUser],
  );

  const scrollToBottom = () => {
    setTimeout(
      () => chatListRef.current?.scrollToEnd({ animated: false }),
      500,
    );
  };

  const getMessagesCallback = useCallback(
    async (scrollToTop = false) => {
      isLoading.current = true;

      try {
        const cometChatManager = new CometChatManager();
        const loggedInUser = await cometChatManager.getLoggedInUser();
        if (loggedInUser) {
          const messageList = await messageListManager.fetchPreviousMessages();
          if (messageList && messageList.length > 0) {
            if (scrollToTop) {
              setMessages(state => [...messageList, ...state]);
            } else {
              setMessages(state => [...state, ...messageList]);
            }

            messageList.forEach(_message => {
              if (
                _message.getSender().getUid() !== userState.id &&
                !_message.getReadAt()
              ) {
                CometChat.markAsRead(
                  _message.getId().toString(),
                  _message.getSender().getUid(),
                  _message.getReceiverType(),
                  _message.getSender().getUid(),
                );
              }
            });
          } else {
            setMessage([]);
            setNewStart(true);
          }

          if (!scrollToTop) {
            scrollToBottom();
          }
        }
      } catch (error) {
        showToast((error as Error).message, 'danger');
      } finally {
        isLoading.current = false;
      }
    },
    [messageListManager, showToast, userState.id],
  );
  // const getMessages = async (scrollToTop = false) => {};

  const messageReceived = (newMsg: CometChat.BaseMessage) => {
    setMessages(state => [...state, newMsg]);
    scrollToBottom();
    CometChat.markAsRead(
      newMsg.getId().toString(),
      newMsg.getSender().getUid(),
      newMsg.getReceiverType(),
      newMsg.getSender().getUid(),
    );
  };

  const messageUpdated = (key: string, item: unknown) => {
    switch (key) {
      case MESSAGE_DELIVERED:
      case MESSAGE_READ:
        // this.messageReadAndDelivered(message);
        break;
      case TEXT_MESSAGE_RECEIVED:
      case MEDIA_MESSAGE_RECEIVED:
        // this.newMsgComponent();
        messageReceived(item as CometChat.BaseMessage);
        break;
      default:
        break;
    }
  };

  const onChangeMessage = (txt: string) => {
    setMessage(txt);
  };

  const onSendMessage = async () => {
    try {
      if (message.trim().length === 0) return;
      const textMessage = new CometChat.TextMessage(
        chatInfo.cometUser.getUid(),
        message,
        CometChat.RECEIVER_TYPE.USER,
      );

      const msg: CometChat.BaseMessage = await CometChat.sendMessage(
        textMessage,
      );
      setMessages(state => [...state, msg]);
      // this.playAudio();
      setMessage('');
      scrollToBottom();
    } catch (error) {
      showToast((error as Error).message, 'danger');
    }
  };

  const onStartChat = () => {
    setNewStart(false);
    // TODO: stuff for starting chat with new user
  };

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

  const onGoMore = async () => {
    try {
      setIsLoading(true);
      const idToken = await refreshTokenIfExpired();
      const chat = await getChat(chatInfo.chatId, idToken);
      navigation.navigate('ChatMore', { chatInfo, twone: chat.twone });
    } catch (error) {
      showToast((error as Error).message, 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const onScroll = (vPos: number) => {
    if (vPos < 0 && !isLoading.current) {
      if (
        !lastFetchedTime.current ||
        Date.now() - lastFetchedTime.current.getTime() > 1000
      ) {
        lastFetchedTime.current = new Date();
        void getMessagesCallback(true);
      }
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardWillShow',
      (e: KeyboardEvent) => {
        setProfileTop(-e.endCoordinates.height);
      },
    );
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setProfileTop(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    messageListManager.attachListeners(messageUpdated);
    lastFetchedTime.current = new Date();
    void getMessagesCallback();
    return () => {
      messageListManager.removeListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chatInputUI = (
    <View style={chatDetailStyles.bottom}>
      <View style={chatDetailStyles.chatActionWrap}>
        <TWInput
          placeHolder="Message..."
          size={16}
          lineHeight={20}
          fontWeight="500"
          parentStyle={chatDetailStyles.chatInput}
          inputProps={{
            value: message,
          }}
          onChange={onChangeMessage}
        />
        <TouchableOpacity onPress={onSendMessage}>
          <TWLabel
            size={16}
            lineHeight={20}
            weight="bold"
            color={message.length > 0 ? AppColors.pink : AppColors.gray}
          >
            Send
          </TWLabel>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <TWScreen
      renderNav={
        <ChatNavBar
          navigation={navigation}
          info={chatInfo.userInfo}
          onClickMore={onGoMore}
          onClickProfile={onShowProfile}
        />
      }
      style={chatDetailStyles.page}
      noPadding
      isFull
      bgColor={AppColors.bgGray}
    >
      <View style={chatDetailStyles.chatList}>
        <FlatList
          ref={chatListRef}
          contentContainerStyle={chatDetailStyles.innerWrap}
          data={messages}
          ListHeaderComponent={
            <ChatHeader
              userInfo={chatInfo.userInfo}
              onShowProfile={onShowProfile}
              top={profileTop}
            />
          }
          renderItem={({ item }) => (
            <MessageBubble
              key={item.getId()}
              data={item}
              avatar={chatInfo.userInfo.avatar}
            />
          )}
          // onContentSizeChange={
          //   () => chatListRef.current?.scrollToEnd({ animated: true })
          //   // chatListRef.current?.scrollToOffset({
          //   //   animated: false,
          //   //   offset: scrollPosRef.current,
          //   // })
          // }
          onScroll={e => onScroll(e.nativeEvent.contentOffset.y)}
        />
      </View>
      {chatInputUI}

      <TWPopUp
        isVisible={showNewStart}
        onCloseModal={onStartChat}
        containerStyle={chatDetailStyles.newPopup}
        disableBackDropClose
      >
        <View style={chatDetailStyles.newAvatarCont} >
          {/* <View style={chatDetailStyles.avatarOverlap} > */}
            <TWAvatar {...chatInfo.userInfo.avatar } size={scale(64)} />
            <TWAvatar {...userState.avatar} size={scale(64)} />
          </View>   
            
          {/* <TWImage
            image={AppImages.avatar}
            styles={[chatDetailStyles.newAvatar, chatDetailStyles.avatarMine]}
          />
          <TWImage
            image={AppImages.avatar}
            styles={chatDetailStyles.newAvatar}
          /> */}
        {/* </View> */}
        <TWLabel
          margin={{ top: 24, bottom: 8 }}
          size={18}
          lineHeight={24}
          align="center"
          weight="semiBold"
        >
          You’re connected with Theo!
        </TWLabel>
        <TWLabel
          margin={{ bottom: 24 }}
          size={14}
          lineHeight={16}
          align="center"
        >
          Start chatting and check out their profile.
        </TWLabel>

        <TWButton
          title="Start Chatting"
          onClick={onStartChat}
          size="md"
          type="pink"
        />
      </TWPopUp>
    </TWScreen>
  );
};

export default ChatDetailScreen;
