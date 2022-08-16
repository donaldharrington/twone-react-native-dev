import Mapbox from '@rnmapbox/maps';
import moment from 'moment';
import React, { Fragment } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { TWButton, TWIcons, TWLabel, TWPopUp, TWWrapper } from '~components';
import { AppColors } from '~constants/colors';
import { TwoneType } from '~types';
import { verticalScale } from '~utils/dimension';

import { detailStyles } from './styles';

type Props = {
  twone: TwoneType;
  isVisible: boolean;
  onClose: () => void;
  onSearch: () => void;
  onEdit: () => void;
};

export const TwoneDetail = ({
  twone,
  isVisible,
  onClose,
  onSearch,
  onEdit,
}: Props) => {
  return (
    <TWPopUp
      isVisible={isVisible}
      noPadding
      onCloseModal={onClose}
      containerStyle={detailStyles.wrapper}
    >
      <View style={detailStyles.handle} />
      {!twone.isTwoned && (
        <Fragment>
          <TWLabel
            size={14}
            margin={{ top: 26, bottom: 8 }}
            weight="semiBold"
            isUppercase
          >
            How we met
          </TWLabel>
          <TWWrapper padding={12} margin={{ bottom: verticalScale(24) }}>
            <TWLabel margin={{ top: 4, bottom: 4 }}>{twone.label}</TWLabel>
          </TWWrapper>
        </Fragment>
      )}
      {twone.isTwoned && (
        <Fragment>
          <View
            style={[detailStyles.horiz, detailStyles.between, detailStyles.top]}
          >
            <View style={detailStyles.horiz}>
              <TWIcons.badge {...detailStyles.icon} />
              <TWLabel size={16} weight="semiBold" margin={{ left: 10 }}>
                Past Search
              </TWLabel>
            </View>
            <TouchableOpacity style={detailStyles.editBtn} onPress={onEdit}>
              <TWIcons.edit {...detailStyles.iconSmall} />
              <TWLabel size={14} color={AppColors.primary}>
                Edit
              </TWLabel>
            </TouchableOpacity>
          </View>
        </Fragment>
      )}
      <TWWrapper margin={{ bottom: verticalScale(38) }}>
        <View style={detailStyles.mapview}>
          <Mapbox.MapView
            style={detailStyles.mapView}
            pitchEnabled={false}
            rotateEnabled={false}
            compassEnabled={false}
            scaleBarEnabled={false}
          >
            <Mapbox.Camera
              zoomLevel={14}
              animationDuration={0}
              followUserMode="course"
              centerCoordinate={[
                twone.location?.longitude,
                twone.location?.latitude,
              ]}
            />

            <Mapbox.PointAnnotation
              id="my-location"
              key="my-location"
              coordinate={[twone.location?.longitude, twone.location?.latitude]}
            >
              <TWIcons.bubblePin width={24} height={32} />
            </Mapbox.PointAnnotation>
          </Mapbox.MapView>
        </View>
        <View style={detailStyles.infoWrap}>
          <TWLabel styles={{ marginBottom: verticalScale(8) }}>
            {`${twone.address!}, \n${twone.address1!}`}
          </TWLabel>
          <View style={detailStyles.horiz}>
            <TWLabel>{moment(twone.date).format('MMMM, DD, YYYY')}</TWLabel>
            <View style={detailStyles.time}>
              <TWLabel color={AppColors.white} size={10}>
                {twone.time?.label}
              </TWLabel>
            </View>
          </View>
        </View>
      </TWWrapper>
      {twone.isTwoned && (
        <TWButton title="Search Again" size="md" onClick={onSearch} />
      )}
    </TWPopUp>
  );
};
