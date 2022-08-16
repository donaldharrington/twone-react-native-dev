import { useFocusEffect } from '@react-navigation/native';
import Mapbox from '@rnmapbox/maps';
import moment from 'moment';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TouchableOpacity, View } from 'react-native';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';

import { TWDiv, TWIcons, TWInput, TWLabel, TWScreen } from '~components';
import { AppColors } from '~constants/colors';
import { geocodingAddress } from '~helpers/mapbox.helpers';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import useHistory from '~recoil/history';
import useTwone from '~recoil/twone';
import { TwoneType } from '~types';
import { MainNavProps, MainRouteProps } from '~types/navigation';
import { scale } from '~utils/dimension';

import { TIME_SLOTS } from '../SelectDate';

import { SectionBlock } from './SectionBlock';
import { twoneStyles } from './styles';

type Props = {
  navigation: MainNavProps;
  route: MainRouteProps;
};

const TwonedScreen = ({ route, navigation }: Props) => {
  const today = moment();

  const { setIsLoading, setAppState } = useGlobal();
  const { showToast } = useUtils();
  const { twoneState, setTwoneDate, setTwoneTime, setTwone } = useTwone();
  const { isTwoned } = route.params;

  const { addToHistory } = useHistory();
  const [location, setLocation] = useState<GeoCoordinates | undefined>(
    twoneState.location,
  );
  const [label, setLabel] = useState(twoneState.label);
  const [hasChangedLocation, setHasChangedLocation] = useState(false);

  const cameraRef = useRef<Mapbox.Camera | null>(null);
  const markerRef = useRef<Mapbox.PointAnnotation | null>(null);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords);

        cameraRef.current?.setCamera({
          centerCoordinate: [
            position.coords.longitude,
            position.coords.latitude,
          ],
          zoomLevel: 14,
          animationDuration: 2000,
        });
      },
      _ => {},
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const getTimeSlotOfCurrentDate = () => {
    setTwoneDate(new Date());
    const now = Date.now();
    let date1 = moment(`${moment(now).format('YYYY-MM-DD')}T00:00:00`)
      .toDate()
      .getTime();

    let date2 = moment(`${moment(now).format('YYYY-MM-DD')}T04:59:59`)
      .toDate()
      .getTime();

    if (date1 <= now && date2 >= now) {
      setTwoneTime(TIME_SLOTS.find(slot => slot.id === 'time-slot-01')!);
    }

    date1 = moment(`${moment(now).format('YYYY-MM-DD')}T05:00:00`)
      .toDate()
      .getTime();

    date2 = moment(`${moment(now).format('YYYY-MM-DD')}T11:59:59`)
      .toDate()
      .getTime();

    if (date1 <= now && date2 >= now) {
      setTwoneTime(TIME_SLOTS.find(slot => slot.id === 'time-slot-02')!);
    }

    date1 = moment(`${moment(now).format('YYYY-MM-DD')}T12:00:00`)
      .toDate()
      .getTime();

    date2 = moment(`${moment(now).format('YYYY-MM-DD')}T17:59:59`)
      .toDate()
      .getTime();

    if (date1 <= now && date2 >= now) {
      setTwoneTime(TIME_SLOTS.find(slot => slot.id === 'time-slot-03')!);
    }

    date1 = moment(`${moment(now).format('YYYY-MM-DD')}T18:00:00`)
      .toDate()
      .getTime();

    date2 = moment(`${moment(now).format('YYYY-MM-DD')}T23:59:59`)
      .toDate()
      .getTime();

    if (date1 <= now && date2 >= now) {
      setTwoneTime(TIME_SLOTS.find(slot => slot.id === 'time-slot-04')!);
    }
  };

  const onPost = async () => {
    setIsLoading(true);
    try {
      if (!location) return;
      const address = await geocodingAddress(
        twoneState.location?.latitude,
        twoneState.location?.longitude,
      );

      if (!address) {
        throw Error("Address can't be found");
      }

      const twoneType: TwoneType = {
        ...twoneState,
        location: twoneState.location,
        address: address.text,
        address1: address.place_name,
        label: label?.trim(),
        isTwoned: true,
        created_at: Date.now(),
      };

      setTwone(twoneType);
      await addToHistory(twoneType);
      setAppState('search');

      navigation.popToTop();
    } catch (error) {
      showToast((error as Error).message, 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const onEditTime = () => {
    navigation.navigate('SelectDate');
  };

  const onEditPosition = () => {
    setHasChangedLocation(true);
    navigation.push('SearchAddress', { isTwoned });
  };

  const onChangeLocation = async () => {
    try {
      const result = await Geolocation.requestAuthorization('whenInUse');
      if (result === 'granted') {
        getCurrentLocation();
      }
      //  else if (result === 'disabled' || result === 'denied') {
      //   await Linking.openSettings();
      // }
    } catch (error) {}
  };

  useEffect(() => {
    if (twoneState.location) {
      setLocation(twoneState.location);
      cameraRef.current?.moveTo(
        [twoneState.location.longitude, twoneState.location.latitude],
        200,
      );
    }
    setHasChangedLocation(false);
  }, [twoneState.location]);

  useEffect(() => {
    if (!twoneState.location) {
      getCurrentLocation();
      getTimeSlotOfCurrentDate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (twoneState.location) {
      setLocation(twoneState.location);
      cameraRef.current?.setCamera({
        centerCoordinate: [
          twoneState.location.longitude,
          twoneState.location.latitude,
        ],
        zoomLevel: 14,
        animationDuration: 2000,
      });
    }
  }, [twoneState.location]);

  useFocusEffect(
    useCallback(() => {
      // console.log('The new address is:', twoneState.location);
      if (twoneState.location) {
        setLocation(twoneState.location);
        cameraRef.current?.forceUpdate();

        cameraRef.current?.setCamera({
          centerCoordinate: [
            twoneState.location.longitude,
            twoneState.location.latitude,
          ],
          zoomLevel: 14,
          animationDuration: 2000,
        });

        setHasChangedLocation(false);
      } else {
        getCurrentLocation();
      }
    }, []),
  );

  return (
    <TWScreen
      bgColor={AppColors.whiteBg}
      enableScroll
      onSave={onPost}
      title={'Twoned'}
      actionColor={AppColors.primary}
      actionTitle={'Search'}
    >
      <SectionBlock
        title="Label"
        labelColor={AppColors.primary}
        hasShadow={false}
      >
        <TWInput
          fontWeight="400"
          color={AppColors.text}
          size={14}
          lineHeight={20}
          italic={false}
          maxLength={500}
          parentStyle={{ padding: scale(16) }}
          placeHolder="Ex. Dodgers Blue cap, eating tacos"
          onChange={(txt: string) => setLabel(txt)}
          inputProps={{
            value: label,
          }}
        />
      </SectionBlock>

      <SectionBlock title="When we met" topSpace={24} onEdit={onEditTime} labelColor={AppColors.third} >
        <TouchableOpacity
          onPress={onEditTime}
          style={[twoneStyles.horiz, twoneStyles.innerItem]}
        >
          <TWIcons.calendar width={scale(24)} height={scale(24)} />
          <TWLabel margin={{ left: 12 }} weight='medium' size={16}>
            {twoneState.date
              ? `${moment(twoneState.date).format('ddd, D MMM YYYY')}`
              : `${moment(today.toDate()).format('ddd, D MMM YYYY')}`}
          </TWLabel>
        </TouchableOpacity>
        <TWDiv left={30} />
        <TouchableOpacity
          onPress={onEditTime}
          style={[twoneStyles.horiz, twoneStyles.innerItem]}
        >
          <TWIcons.clock width={scale(24)} height={scale(24)} />
          <View>
            {twoneState.time ? (
              <Fragment>
                <TWLabel margin={{ left: 12 }} weight={'medium'} size={16}>
                  {twoneState.time?.label}
                </TWLabel>
                {twoneState.time?.label !== 'All Day' ?? (
                  <TWLabel
                    size={12}
                    margin={{ left: 12 }}
                    color={AppColors.placeholder}
                  >
                    {`${twoneState.time?.value[0]}${twoneState.time?.noon} - ${twoneState.time?.value[1]}${twoneState.time?.noon}`}
                  </TWLabel>
                )}
              </Fragment>
            ) : (
              <TWLabel lineHeight={24} size={16} weight={'medium'} margin={{ left: 12 }}>All Day</TWLabel>
            )}
          </View>
        </TouchableOpacity>
      </SectionBlock>

      <SectionBlock title="Where we met" topSpace={24} onEdit={onEditPosition}>
        <TouchableOpacity
          style={[twoneStyles.mapSmall]}
          onPress={onEditPosition}
        >
          {location ? (
            !hasChangedLocation && (
              <Mapbox.MapView
                style={twoneStyles.mapView}
                pitchEnabled={false}
                rotateEnabled={false}
                compassEnabled={false}
                scaleBarEnabled={false}
                zoomEnabled={false}
                scrollEnabled={false}
              >
                <Mapbox.Camera
                  ref={cameraRef}
                  zoomLevel={14}
                  followUserMode="course"
                  animationDuration={0}
                  centerCoordinate={[
                    twoneState.location?.longitude,
                    twoneState.location?.latitude,
                  ]}
                />

                <Mapbox.PointAnnotation
                  id="my-location"
                  key="my-location"
                  ref={markerRef}
                  coordinate={[
                    twoneState.location?.longitude,
                    twoneState.location?.latitude,
                  ]}
                >
                  <TWIcons.bubblePin width={24} height={32} zIndex={10} />
                </Mapbox.PointAnnotation>
              </Mapbox.MapView>
            )
          ) : (
            <Fragment>
              <TWIcons.noLocation width={scale(123)} height={scale(100)} />
              <TWLabel size={12} color={AppColors.white} align="center">
                No current location available
              </TWLabel>
            </Fragment>
          )}
        </TouchableOpacity>
        <View style={[twoneStyles.horiz, twoneStyles.innerItem]}>
          <TWIcons.location
            width={scale(24)}
            height={scale(24)}
            fill={AppColors.gray}
          />
          <TouchableOpacity onPress={onChangeLocation}>
            <TWLabel
              color={AppColors.primary}
              margin={{ left: 12 }}
              weight="medium"
            >
              {twoneState.label ? twoneState.label : 'Current Location'}
            </TWLabel>
          </TouchableOpacity>
        </View>
      </SectionBlock>
    </TWScreen>
  );
};

export default TwonedScreen;
