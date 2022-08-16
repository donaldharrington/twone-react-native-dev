import React, { Fragment } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import { AppColors } from '~constants/colors';
import { scale, verticalScale } from '~utils/dimension';

import TWLabel from './atoms/TWLabel';

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: scale(270),
    backgroundColor: AppColors.white,
    borderRadius: scale(14),
    shadowColor: '#000',
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(4),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btn: {
    minHeight: scale(42),
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  isVisible: boolean;
  title: string;
  description?: string;
  type?: 'alert' | 'confirm';
  confirmColor?: string;
  confirmTitle?: string;
  cancelTitle?: string;
  onOk?: () => void;
  onConfirm?: () => void;
  onClose?: () => void;
};

const TWAlert = ({
  isVisible,
  title,
  description,
  type = 'confirm',
  confirmColor = AppColors.primary,
  confirmTitle,
  cancelTitle,
  onOk,
  onConfirm,
  onClose,
}: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="bounceIn"
      animationOut="bounceOut"
      onDismiss={onClose}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <TWLabel
            size={16}
            lineHeight={20}
            weight="bold"
            align="center"
            margin={{ left: 16, right: 16, bottom: !description ? 16 : 2 }}
          >
            {title}
          </TWLabel>
          {description && description.length > 0 && (
            <TWLabel
              size={12}
              lineHeight={16}
              weight="regular"
              align="center"
              margin={{ left: 16, right: 16, bottom: 16 }}
            >
              {description}
            </TWLabel>
          )}
          <View>
            {type === 'confirm' ? (
              <Fragment>
                <TouchableOpacity onPress={onClose} style={modalStyles.btn}>
                  <TWLabel size={16} weight="medium">
                    {cancelTitle || 'Cancel'}
                  </TWLabel>
                </TouchableOpacity>
                <TouchableOpacity onPress={onConfirm} style={modalStyles.btn}>
                  <TWLabel size={16} weight="medium" color={confirmColor}>
                    {confirmTitle || 'Confirm'}
                  </TWLabel>
                </TouchableOpacity>
              </Fragment>
            ) : (
              <TouchableOpacity onPress={onOk} style={modalStyles.btn}>
                <TWLabel size={16} weight="medium" color={AppColors.secondary}>
                  {cancelTitle || 'Okay'}
                </TWLabel>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TWAlert;
