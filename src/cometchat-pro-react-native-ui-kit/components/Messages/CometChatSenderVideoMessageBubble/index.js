import React, { useState, createRef } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import VideoPlayer from 'react-native-video-controls';

import * as actions from '../../../utils/actions';
import * as enums from '../../../utils/enums';
import { CometChatMessageReactions } from '../../Messages/Extensions';
import CometChatReadReceipt from '../CometChatReadReceipt';
import CometChatThreadedMessageReplyCount from '../CometChatThreadedMessageReplyCount';

import style from './styles';

const CometChatSenderVideoMessageBubble = props => {
  const player = createRef();
  const [message] = useState({
    ...props.message,
    messageFrom: enums.MESSAGE_FROM_SENDER,
  });
  return (
    <View style={style.container}>
      <View style={style.messageWrapperStyle}>
        <TouchableOpacity
          style={{
            ...style.messageVideoWrapperStyle,
          }}
          onPress={() => {
            props.actionGenerated(actions.VIEW_ACTUAL_VIDEO, message);
          }}
          onLongPress={() =>
            props.actionGenerated(actions.OPEN_MESSAGE_ACTIONS, message)
          }
        >
          <VideoPlayer
            source={{
              uri: message.data.url,
            }} // Can be a URL or a local file.
            ref={player} // Store reference
            style={style.messageVideo}
            navigator={props.navigator}
            disableBack
            disableFullscreen
            disableVolume
            muted
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={style.messageInfoWrapperStyle}>
        <CometChatThreadedMessageReplyCount {...props} message={message} />
        <CometChatReadReceipt {...props} message={message} />
      </View>
      <CometChatMessageReactions
        theme={props.theme}
        {...props}
        message={message}
        showMessage={props?.showMessage}
      />
    </View>
  );
};
export default CometChatSenderVideoMessageBubble;
