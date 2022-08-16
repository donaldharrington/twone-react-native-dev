import Geolocation from '@react-native-community/geolocation';
import Mapbox from '@rnmapbox/maps';
import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { GeoCoordinates } from 'react-native-geolocation-service';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TWButton, TWIcons, TWLabel, TWScreen } from '~components';
import { AppColors } from '~constants/colors';
import { geocodingAddress } from '~helpers/mapbox.helpers';
import useTwone from '~recoil/twone';
import { Address } from '~types';
import { LocationProps, MainNavProps } from '~types/navigation';
import { iconSize, verticalScale } from '~utils/dimension';

import { locationStyles } from './styles';

type Props = {
  navigation: MainNavProps;
  route: LocationProps;
};

const SelectLocationScreen = ({ route, navigation }: Props) => {
  const { location, isTwoned } = route.params;
  const { bottom } = useSafeAreaInsets();
  const { setTwoneLocation, setTwoneLabel } = useTwone();
  const [address, setAddress] = useState<Address | undefined>(location);
  const [isCentered, setIsCentered] = useState(false);

  const [mapLocation, setMapLocation] = useState<GeoCoordinates>({
    latitude: location?.latitude,
    longitude: location?.longitude,
    accuracy: 0,
    // accuracy: 100,
    // altitude: null,
    // heading: null,
    // speed: null,
  } as GeoCoordinates);

  const cameraRef = useRef<Mapbox.Camera | null>(null);

  const onGoBack = () => {
    navigation.goBack();
  };

  const onMyPosition = () => {
    setIsCentered(true);
    Geolocation.getCurrentPosition(
      position => {
        cameraRef.current?.moveTo(
          [position.coords.longitude, position.coords.latitude],
          200,
        );
      },
      _ => {},
      { enableHighAccuracy: true, timeout: 150, maximumAge: 10000 },
    );
  };

  const onSaveLocation = () => {
    setTwoneLocation(mapLocation);
    setTwoneLabel(location!.text);
    // navigation.pop(2);

    if (isTwoned) {
      navigation.navigate('TwonedConf', {
        isTwoned: true,
      });
    } else {
      navigation.navigate('TwoneConf', {
        isTwoned: false,
      });
    }
  };

  const onEditPosition = () => {
    navigation.push('SearchAddress', { isTwoned });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const regionChange = async (feature: any) => {
    if (
      address &&
      address.latitude === feature.geometry.coordinates[1] &&
      address.longitude === feature.geometry.coordinates[0]
    ) {
      return;
    }

    try {
      const result = await geocodingAddress(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        feature.geometry.coordinates[1],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        feature.geometry.coordinates[0],
      );

      const coordinates: GeoCoordinates = {
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
        accuracy: 100,
        altitude: null,
        heading: 200,
        speed: null,
      };
      setMapLocation(coordinates);
      setAddress(result);
    } catch (error) {}
  };

  return (
    <TWScreen hideNav isFull noPadding>
      <View style={locationStyles.mapView}>
        <Mapbox.MapView
          style={locationStyles.mapView}
          onRegionWillChange={regionChange}
          onRegionDidChange={regionChange}
          pitchEnabled={false}
          rotateEnabled={false}
          compassEnabled={false}
          scaleBarEnabled={false}
          onTouchStart={() => {
            setIsCentered(false);
          }}
        >
          {location && (
            <Mapbox.Camera
              ref={cameraRef}
              zoomLevel={17}
              followUserMode="course"
              centerCoordinate={[location.longitude, location.latitude]}
              animationDuration={0}

            />
          )}
        </Mapbox.MapView>
        <View style={locationStyles.mapPinWrapper}>
          <TWIcons.bubblePin 
            width={48} 
            height={64} 
          />
        </View>  
      </View> 

      <View
        style={[
          locationStyles.bottomWrap,
          { marginBottom: bottom + verticalScale(32) },
        ]}
      >
        <View style={locationStyles.actionWrap}>
          <TouchableOpacity
            style={locationStyles.circleWrap}
            onPress={onGoBack}
          >
            <TWIcons.backArrow {...iconSize} fill={AppColors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              locationStyles.circleWrap,
              {
                backgroundColor: `${
                  isCentered ? AppColors.buttonActive : AppColors.white
                }`,
              },
            ]}
            onPress={onMyPosition}
          >
            <TWIcons.locationArrow {...iconSize} />
          </TouchableOpacity>
        </View>

        <View
          // onPress={onEditPosition}
          style={locationStyles.addressWrap}
        >
          <TWIcons.pin {...iconSize} style={locationStyles.pinIcon} />
          <View style={locationStyles.address}>
            <TWLabel size={12} color={AppColors.white} weight="regular" lineHeight={16}>
            Location
            </TWLabel>
            <TWLabel size={16} color={AppColors.white} weight="medium" lineHeight={24}>
            {address?.place_name.split(" ")[0]} {address?.text} 
            </TWLabel>
          </View>
        </View>

        <TWButton size="md" title="Done" onClick={onSaveLocation} />
      </View>
    </TWScreen>
  );
};

export default SelectLocationScreen;
