import React, { Fragment, ReactNode } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { TWIcons, TWLabel, TWWrapper } from '~components';
import { AppColors } from '~constants/colors';
import { scale } from '~utils/dimension';

import { twoneStyles } from './styles';

type Props = {
  title: string;
  subInfo?: string;
  children: ReactNode;
  topSpace?: number;
  minHeight?: number;
  maxHeight?: number;
  onInfo?: () => void;
  onEdit?: () => void;
  labelColor?: string;
  hasShadow: boolean;
};

export const SectionBlock = ({
  title,
  subInfo,
  children,
  topSpace,
  minHeight,
  maxHeight,
  onInfo,
  onEdit,
  labelColor,
  hasShadow = true,
}: Props) => {
  return (
    <Fragment>
      <View
        style={[
          twoneStyles.horiz,
          twoneStyles.between,
          { marginTop: topSpace && scale(topSpace) },
        ]}
      >
        <View style={twoneStyles.horiz}>
          <TWLabel margin={{ right: 7 }} color={labelColor} isUppercase>
            {title}
          </TWLabel>
          {onInfo && (
            <TouchableOpacity onPress={onInfo}>
              <TWIcons.info width={scale(20)} height={scale(20)} />
            </TouchableOpacity>
          )}
        </View>
        {onEdit && (
          <TouchableOpacity onPress={onEdit}>
            <TWLabel weight="semiBold" color={AppColors.primary} size={14} lineHeight={24}>
              Edit
            </TWLabel>
          </TouchableOpacity>
        )}
      </View>
      <TWWrapper
        margin={{ top: 10, bottom: 8 }}
        radius={8}
        minHeight={minHeight}
        maxHeight={maxHeight}
        hasShadow={hasShadow}
      >
        {children}
      </TWWrapper>
      {subInfo && (
        <TWLabel align="right" color={AppColors.placeholder} size={12}>
          {subInfo}
        </TWLabel>
      )}
    </Fragment>
  );
};
