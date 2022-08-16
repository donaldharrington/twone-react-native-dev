import { useFocusEffect } from '@react-navigation/core';
import Mapbox from '@rnmapbox/maps';
import moment from 'moment';
import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { TouchableOpacity, View } from 'react-native';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';

import {
  TWButton,
  TWDiv,
  TWIcons,
  TWInput,
  TWLabel,
  TWPopUp,
  TWScreen,
} from '~components';
import { AppColors } from '~constants/colors';
import { geocodingAddress } from '~helpers/mapbox.helpers';
import { createTwone } from '~helpers/twone.helpers';
import { useUtils } from '~hooks/useUtils';
import useGlobal from '~recoil/global';
import useHistory from '~recoil/history';
import useTwone from '~recoil/twone';
import useUser from '~recoil/user';
import { Address, TwoneType } from '~types';
import { TwoneBody } from '~types/api/request.types';
import { MainNavProps, MainRouteProps } from '~types/navigation';
import { scale } from '~utils/dimension';

import { SectionBlock } from './SectionBlock';
import { twoneStyles } from './styles';

type Props = {
  navigation: MainNavProps;
  route: MainRouteProps;
};

const TwoneScreen = ({ route, navigation }: Props) => {
  const today = moment();

  const { twoneState } = useTwone();
  const { userState } = useUser();
  const { setIsLoading, refreshTokenIfExpired } = useGlobal();
  const { addToHistory } = useHistory();
  const { isTwoned } = route.params;
  const [location, setLocation] = useState<GeoCoordinates | undefined>(
    twoneState.location,
  );

  const [hasChangedLocation, setHasChangedLocation] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [howWeMet, setHowWeMet] = useState('');
  const { showToast } = useUtils();

  const mapViewRef = useRef<Mapbox.MapView | null>(null);
  const cameraRef = useRef<Mapbox.Camera | null>(null);
  const markerRef = useRef<Mapbox.PointAnnotation | null>(null);

  const [textInputLenght, setTextInputLenght] = useState('500');

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

  const onPost = async () => {
    setIsLoading(true);
    try {
      if (!location) return;

      const address = await geocodingAddress(
        twoneState.location.latitude,
        twoneState.location.longitude,
      );

      if (!address) {
        throw Error("Address can't be found");
      }
      let date = moment(today.toDate()).format('YYYY-MM-DD');

      const twone: TwoneBody = {
        owner: userState.id!,
        howWeMet: howWeMet.trim(),
        date: twoneState.date
          ? moment(twoneState.date).format('YYYY-MM-DD')
          : date,
        time: twoneState.time?.id ? twoneState.time!.id : 'Twone Search',
        location: address.place_name + '\n' + address.text,
        coordinates: `${twoneState.location.latitude},${twoneState.location.longitude}`,
      };

      const idToken = await refreshTokenIfExpired();
      await createTwone(twone, idToken);

      const twoneType: TwoneType = {
        ...twoneState,
        location: location,
        address: address.text,
        address1: address.place_name,
        label: howWeMet.trim(),
        isTwoned: false,
        created_at: Date.now(),
      };
      await addToHistory(twoneType);

      setIsLoading(false);
      navigation.popToTop();
    } catch (error) {
      showToast((error as Error).message, 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  const onInfor = () => {
    setShowInfo(true);
  };
  const onEditTime = () => {
    navigation.navigate('SelectDate');
  };
  const onEditPosition = () => {
    setHasChangedLocation(true);
    navigation.push('SearchAddress', { isTwoned });
  };

  const canPost = (): boolean => {
    return howWeMet.trim().length > 0 && !!location;
  };

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
      title={isTwoned ? 'Twoned' : 'Twone'}
      actionTitle={isTwoned ? 'Submit' : 'Post'}
      actionColor={canPost() ? AppColors.primary : AppColors.gray}
      actionDisabled={!canPost()}
    >
      <SectionBlock 
        title="How we met"
        onInfo={onInfor}
        subInfo={textInputLenght}
        minHeight={120}
        maxHeight={120}
        hasShadow={false}
        
      >
        <TWInput
          multiline
          fontWeight="400"
          size={14}
          lineHeight={20}
          color={AppColors.text}
          maxLength={500}
          parentStyle={{ paddingBottom: scale(16) }}
          placeHolder="E.g. I was working on my laptop at the cafe when you walked in wearing
          a green jumpsuit..."
          onChange={(txt: string) => {
            setHowWeMet(txt);
            setTextInputLenght(`${500 - txt.length}`);
          }}
          italic={false}
        />
      </SectionBlock>

      <SectionBlock title="When we met" topSpace={12} onEdit={onEditTime} labelColor={AppColors.third}>
        <TouchableOpacity
          style={[twoneStyles.horiz, twoneStyles.innerItem]}
          onPress={onEditTime}
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
          onPress={onEditPosition}
          style={[twoneStyles.mapSmall]}
        >
          {location ? (
            !hasChangedLocation && (
              <Mapbox.MapView
                style={twoneStyles.mapView}
                ref={mapViewRef}
                pitchEnabled={false}
                rotateEnabled={false}
                compassEnabled={false}
                zoomEnabled={false}
                scaleBarEnabled={false}
                scrollEnabled={false}
              >
                <Mapbox.Camera
                  ref={cameraRef}
                  zoomLevel={16}
                  animationDuration={0}
                  followUserMode="course"
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
                  <TWIcons.bubblePin width={24} height={32} />
                </Mapbox.PointAnnotation>
              </Mapbox.MapView>
            )
          ) : (
            <Fragment>
              <TWIcons.noLocation width={scale(123)} height={scale(100)} />
              <TWLabel size={12} color={AppColors.white} align="center">
                Tap to enter location
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
          <View>
            <TWLabel
              color={AppColors.primary}
              margin={{ left: 12 }}
              weight="medium"
            >
              {twoneState.label ? twoneState.label : 'Current Location'}
            </TWLabel>
          </View>
        </View>
      </SectionBlock>

      <TWPopUp
        isVisible={showInfo}
        onCloseModal={() => setShowInfo(false)}
        icon={<TWIcons.light width={scale(30)} height={scale(30)} />}
      >
        <TWLabel
          size={18}
          weight="semiBold"
          align="center"
          margin={{ bottom: 8 }}
        >
          How we met
        </TWLabel>
        <TWLabel align="center" margin={{ bottom: 24 }} size={14}>
          Add more details when you explain how you met your person.This will
          make it easier for them to find and connect with you!
        </TWLabel>
        <TWButton
          title="Got it!"
          size="md"
          onClick={() => setShowInfo(false)}
        />
      </TWPopUp>
    </TWScreen>
  );
};

export default TwoneScreen;
