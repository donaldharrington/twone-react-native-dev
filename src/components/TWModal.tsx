import React, { Fragment, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';

import { scale, verticalScale } from '~utils/dimension';

import TWButton from './atoms/TWButton';
import TWLabel from './atoms/TWLabel';

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(22),
  },
  modalView: {
    width: '100%',
    margin: scale(10),
    backgroundColor: 'white',
    borderRadius: scale(20),
    padding: scale(24),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    marginTop: verticalScale(24),
  },
  full: {
    width: '100%',
  },
  okBtn: {
    width: '100%',
    marginTop: verticalScale(40),
    marginBottom: verticalScale(10),
  },
});

type Props = {
  isVisible: boolean;
  icon?: ReactNode;
  title?: string;
  description?: string;
  okTitle?: string;
  cancelTitle?: string;
  containerStyle?: ViewStyle;
  children?: ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
};

const TWModal = ({
  isVisible,
  icon,
  title,
  description,
  children,
  containerStyle,
  okTitle,
  cancelTitle,
  onOk,
  onCancel,
}: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="bounceIn"
      animationOut="bounceOut"
    >
      <View style={modalStyles.centeredView}>
        <View style={[modalStyles.modalView, containerStyle]}>
          {children ? (
            children
          ) : (
            <Fragment>
              {icon && icon}
              {title && (
                <TWLabel
                  size={18}
                  lineHeight={24}
                  weight="bold"
                  margin={{ top: 24, bottom: 24 }}
                >
                  {title}
                </TWLabel>
              )}

              {description && (
                <TWLabel size={14} lineHeight={20} weight="regular">
                  {description}
                </TWLabel>
              )}

              <TWButton
                title={okTitle || 'Ok'}
                type="pink"
                onClick={onOk}
                parentStyle={modalStyles.okBtn}
              />
              <TWButton
                title={cancelTitle || 'Cancel'}
                type="transparent"
                onClick={onCancel}
              />
            </Fragment>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default TWModal;
