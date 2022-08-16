import React, { Fragment } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { TWIcons, TWLabel } from '~components';
import { AppColors } from '~constants/colors';
import { BUTTON_ACTIVE_OPACITY } from '~constants/config';

import { styles } from './styles';

type Props = {
  label: string;
  value?: string;
  hasLine?: boolean;
  hasDetail?: boolean;
  type?: 'email' | string;
  onEdit?: () => void;
};

export const ListItem = ({
  label,
  value,
  hasLine = true,
  hasDetail = false,
  type,
  onEdit,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={!hasDetail ? true : false}
      onPress={onEdit}
      activeOpacity={BUTTON_ACTIVE_OPACITY}
      style={[styles.horizWrap, styles.listItem, hasLine && styles.bottomLine]}
    >
      <TWLabel size={16} weight="medium">
        {label}
      </TWLabel>
      <View style={[styles.horizWrap, styles.alignEnd]}>
        {value ? (
          <TWLabel>{value}</TWLabel>
        ) : (
          <Fragment>
            {type === 'email' && (
              <Fragment>
                <TWLabel color={AppColors.placeholder} margin={{ right: 18 }}>
                  Add your email
                </TWLabel>
                <TWIcons.error />
              </Fragment>
            )}
          </Fragment>
        )}
        {hasDetail && <TWIcons.rightArrow style={styles.chevron} />}
      </View>
    </TouchableOpacity>
  );
};
