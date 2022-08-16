import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppColors } from '~constants/colors';
import { scale } from '~utils/dimension';

import TWPopUp from './TWPopUp';

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',

    backgroundColor: AppColors.transparent,
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
  },
  actionSheetView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: scale(8),
    margin: scale(25),
  },
  actionSheetText: {
    padding: scale(18),
    backgroundColor: AppColors.white,
    borderRadius: scale(16),
    width: '100%',
    fontSize: scale(32),
    flexDirection: 'row',
    color: AppColors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type ActionItems = {
  label: string;
  onPress: () => void;
};

type Props = {
  isVisible: boolean;
  detached?: boolean;
  actionItems: Array<ActionItems>;
  onCancel: () => void;
  actionTextColor?: string;
};

const TWBottomAction = ({
  isVisible,
  actionItems,
  onCancel,
  actionTextColor = AppColors.black,
}: Props) => {
  const { bottom } = useSafeAreaInsets();

  const actionSheetItems = [...actionItems];
  return (
    <TWPopUp isVisible={isVisible} containerStyle={styles.modalView}>
      <View style={[styles.actionSheetView]}>
        {actionSheetItems.map((actionItem, index) => {
          return (
            <TouchableHighlight
              style={[
                styles.actionSheetText,
                {
                  borderBottomColor: AppColors.gray,
                  borderBottomStartRadius:
                    index === actionSheetItems.length - 1 ? 12 : 0,
                  borderBottomEndRadius:
                    index === actionSheetItems.length - 1 ? 12 : 0,
                  borderTopStartRadius: index === 0 ? 12 : 0,
                  borderTopEndRadius: index === 0 ? 12 : 0,
                },
              ]}
              underlayColor={AppColors.bgGray}
              key={index}
              onPress={actionItem.onPress}
            >
              <Text allowFontScaling={true} style={{ fontSize: 20 }}>
                {actionItem.label}
              </Text>
            </TouchableHighlight>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: 'row',
          // margin: scale(4),
          margin: scale(-25),
          backgroundColor: AppColors.white,
          borderRadius: scale(12),
          // padding: scale(4),
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <TouchableHighlight
          style={styles.actionSheetText}
          underlayColor={AppColors.bgGray}
          key={'cancel'}
          onPress={onCancel}
        >
          <Text
            allowFontScaling={true}
            style={{ fontSize: 20, color: actionTextColor, fontWeight: 'bold' }}
          >
            Cancel
          </Text>
        </TouchableHighlight>
      </View>
    </TWPopUp>
  );
};

export default TWBottomAction;
