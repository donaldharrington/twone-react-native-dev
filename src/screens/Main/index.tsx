import { MAPBOX_ACCESS_KEY } from '@env';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Mapbox from '@rnmapbox/maps';
import moment from 'moment';
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import Geolocation, {
  GeoCoordinates,
  GeoPosition,
} from 'react-native-geolocation-service';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '~cometchat-pro-react-native-ui-kit/components/Shared/CometChatAvatar/styles';

import {
  TWBubble,
  TWButton,
  TWIcons,
  TWImage,
  TWLabel,
  TWLoadingIndicator,
  TWPopUp,
  TWScreen,
} from '~components';
import TWAvatar from '~components/TWAvatar';
import { AppColors } from '~constants/colors';
import AppImages from '~constants/images';
import { getUserProfile } from '~helpers/profile.helpers';
import { getAllTwones, getNearByTwones } from '~helpers/twone.helpers';
import { useUtils } from '~hooks/useUtils';
import { useGlobal } from '~recoil/global/useGlobal';
import useHistory from '~recoil/history';
import useTwone from '~recoil/twone';
import useUser from '~recoil/user';
import { chatDetailStyles } from '~screens/Chat/Detail/styles';
import { TwoneType } from '~types';
import { Twone } from '~types/api/response.types';
import { MainNavProps, MainRouteProps } from '~types/navigation';
import { scale, sWidth, verticalScale } from '~utils/dimension';

import { ConnectCard } from './components/ConnectCard';
import { HistoryItem } from './MyHistory/Item';
import { mainStyles } from './styles';

Mapbox.setAccessToken(MAPBOX_ACCESS_KEY);

type Props = {
  navigation: MainNavProps;
  route: MainRouteProps;
};

const MainTwoneScreen = ({ navigation }: Props) => {
  const { top, bottom } = useSafeAreaInsets();
  const { globalState, setAppState, refreshTokenIfExpired } = useGlobal();
  const { historyState } = useHistory();
  const { twoneState, clearTwone, setTwoneLocation } = useTwone();
  const { userState } = useUser();

  const [showAllowLocation, setShowAllowLocation] = useState(false);
  const [location, setLocation] = useState<GeoPosition | null>(null);
  const [twones, setTwones] = useState<Twone[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isCentered, setIsCentered] = useState(true);
  const [hasAvatar, setHasAvatar] = useState(true);

  const mapViewRef = useRef<Mapbox.MapView | null>(null);
  const markerRef = useRef<Mapbox.PointAnnotation | null>(null);
  const cameraRef = useRef<Mapbox.Camera | null>(null);
  const locationRef = useRef<Mapbox.PointAnnotation | null>(null);

  const bottomSnapPoints = useMemo(
    () =>
      historyState.filter(item => item.isTwoned).length > 1
        ? [verticalScale(180 - bottom), verticalScale(375 - bottom)]
        : historyState.filter(item => item.isTwoned).length === 1
        ? [verticalScale(180 - bottom), verticalScale(260 - bottom)]
        : historyState.length > 0
        ? [verticalScale(180 - bottom), verticalScale(214 - bottom)]
        : [verticalScale(180 - bottom)],
    [bottom, historyState],
  );

  const nowTwoneBottomSnapPoints = useMemo(
    () => [verticalScale(275 - bottom),(28)],
    [bottom],
  );

  const moveToTwonedLocation = () => {
    cameraRef.current?.setCamera({
      centerCoordinate: [
        twoneState.location?.longitude,
        twoneState.location?.latitude,
      ],
      zoomLevel: 14,
      animationDuration: 2000,
      // animationMode: "flyTo",
    });
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);

        cameraRef.current?.setCamera({
          centerCoordinate: [
            position.coords.longitude,
            position.coords.latitude,
          ],
          zoomLevel: 14,
          animationDuration: 2000,
          // animationMode: "easeTo",

        });
      },
      _ => {},
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const requestLocationAuthorization = async () => {
    try {
      const result = await Geolocation.requestAuthorization('whenInUse');
      if (result === 'granted') {
        getCurrentLocation();
      } else if (result === 'disabled' || result === 'denied') {
        setShowAllowLocation(true);
      }
    } catch (error) {}
  };

  const showMyLocation = () => {
    setIsCentered(true);
    void requestLocationAuthorization();
  };

  const checkLocationPermission = () => {
    check(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
          case RESULTS.LIMITED:
            break;
          case RESULTS.DENIED:
            setShowAllowLocation(true);
            break;
          case RESULTS.BLOCKED:
            void requestLocationAuthorization();
            break;
          case RESULTS.GRANTED:
            getCurrentLocation();
            break;
        }
      })
      .catch(_ => {});
  };

  const onTwone = () => {
    if (checkIfHasAvatar()) {
      clearTwone();

      const newAddress: GeoCoordinates = {
        latitude: location!.coords.latitude,
        longitude: location!.coords.longitude,
        accuracy: 1,
      //   altitude: null,
      //   heading: null,
      //   speed: null,
      };

      setTwoneLocation(newAddress);
      navigation.navigate('TwoneConf', {
        isTwoned: false,
      });
    }
    //   const newAddress: Address = {
    //     latitude: location!.coords.latitude,
    //     longitude: location!.coords.longitude,
    //     id: '',
    //     text: 'Current Location',
    //     place_name: 'Current Location.',
    //   };

    //   navigation.push('SelectLocation', {
    //     location: newAddress,
    //     isTwoned: false,
    //   });
    // }
  };

  const onTwoned = () => {
    if (checkIfHasAvatar()) {
      clearTwone();

      const newAddress: GeoCoordinates = {
        latitude: location!.coords.latitude,
        longitude: location!.coords.longitude,
        accuracy: 1,
        // altitude: null,
        // heading: null,
        // speed: null,
      };

      setTwoneLocation(newAddress);

      navigation.navigate('TwonedConf', {
        isTwoned: true,
      });
    }
    //   const newAddress: Address = {
    //     latitude: location!.coords.latitude,
    //     longitude: location!.coords.longitude,
    //     id: '',
    //     text: 'Current Location',
    //     place_name: 'Current Location.',
    //   };

    //   navigation.push('SelectLocation', {
    //     location: newAddress,
    //     isTwoned: true,
    //   });
    // }
  };

  const onGoHistory = () => {
    navigation.navigate('MyHistory');
  };

  const onOpenSettings = async () => {
    try {
      const result = await Geolocation.requestAuthorization('whenInUse');

      if (result === 'granted') {
        getCurrentLocation();
        setShowAllowLocation(false);
      } else if (result === 'disabled' || result === 'denied') {
        await Linking.openSettings();
      }
    } catch (error) {}
  };

  const renderTwonesMarker = () => {
    const items = twones
      .filter(twone => !!twone.coordinates)
      .map(twone => (
        <Mapbox.PointAnnotation
          id={`twone-${twone.id}`}
          key={`twone-${twone.id}`}
          ref={markerRef}
          coordinate={[
            Number(twone.coordinates?.split(',')[1]),
            Number(twone.coordinates?.split(',')[0]),
          ]}
        >
          {twone.owner?.avatar ? (
            <View style={mainStyles.avatarMarker}>
              <TWAvatar {...twone.owner?.avatar} size={30} />
            </View>
          ) : null}
        </Mapbox.PointAnnotation>
      ));

    return items;
  };

  const renderMarkers = () => {
    return (
      <>
        {renderTwonesMarker()}
        <Mapbox.PointAnnotation
          id="my-location"
          key="my-location"
          coordinate={[location!.coords.longitude, location!.coords.latitude]}
          ref={locationRef}
          selected
        >
          <View style={{ zIndex: 100, flex: 1 }}>
            <TWIcons.bubblePin width={48} height={64} />
          </View>
        </Mapbox.PointAnnotation>
      </>
    );
  };

  const groupByOwner = (
    _twones: Array<Twone>,
  ): { [id: string]: Array<Twone> } => {
    const result: { [id: string]: Array<Twone> } = {};
    _twones.forEach(twone => {
      if (twone.owner?.id) {
        if (result[twone.owner.id]) {
          result[twone.owner.id].push(twone);
        } else {
          result[twone.owner.id] = [twone];
        }
      }
    });
    return result;
  };

  const getTwones = async () => {
    setIsRefresh(true);
    setTwones([]);
    try {
      const idToken = await refreshTokenIfExpired();
      let _twones = await getAllTwones(idToken);
      _twones = _twones.filter(twone => twone.owner?.id !== userState.id);
      const twonesByOwner = groupByOwner(_twones);

      for (let i = 0; i < Object.keys(twonesByOwner).length; i++) {
        const userId: string = Object.keys(twonesByOwner)[i];
        try {
          const profile = await getUserProfile(userId, idToken);
          _twones
            .filter(twone => twone.owner?.id === userId)
            .map(twone => {
              if (twone.owner) {
                // eslint-disable-next-line no-param-reassign
                twone.owner = {
                  ...twone.owner,
                  avatar: {
                    name: profile.avatar,
                    skin: profile.avatarSkin,
                    glass: profile.avatarAccessories,
                    background: profile.avatarBackgroundColor,
                    hair: profile.avatarHair,
                    beard: profile.avatarFacialHair,
                    color: profile.avatarHairColor,
                  },
                };
              }
            });
          if (_twones.length > 0) {
            setTwones(_twones);
          }
        } catch (err) {
          // showToast((err as Error).message, 'danger');
        }
      }
    } catch (error) {
      // showToast((error as Error).message, 'danger');
    } finally {
      setIsRefresh(false);
    }
  };

  const searchTwones = async () => {
    setTwones([]);
    moveToTwonedLocation();

    // Geolocation.getCurrentPosition(
    //   position => {
    //     setLocation(position.coords);

    //     cameraRef.current?.setCamera({
    //       centerCoordinate: [
    //         position.coords.longitude,
    //         position.coords.latitude,
    //       ],
    //       zoomLevel: 14,
    //       animationDuration: 2000,
    //     });
    //   },
    //   _ => {},
    //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    // );

    try {
      setIsRefresh(true);
      const idToken = await refreshTokenIfExpired();
      let _twones = await getNearByTwones(
        twoneState.location!.latitude,
        twoneState.location!.longitude,
        idToken,
      );

      _twones = _twones
        .filter(twone => twone.owner?.id !== userState.id)
        .filter(
          twone =>
            moment(twone.date).format('YYYY-MM-DD') ===
            moment(twoneState.date).format('YYYY-MM-DD'),
        );
      const twonesByOwner = groupByOwner(_twones);

      for (let i = 0; i < Object.keys(twonesByOwner).length; i++) {
        const userId: string = Object.keys(twonesByOwner)[i];
        try {
          const profile = await getUserProfile(userId, idToken);

          _twones
            .filter(twone => twone.owner?.id === userId)
            .map(twone => {
              if (twone.owner) {
                // eslint-disable-next-line no-param-reassign
                twone.owner = {
                  ...twone.owner,
                  avatar: {
                    name: profile.avatar,
                    skin: profile.avatarSkin,
                    glass: profile.avatarAccessories,
                    background: profile.avatarBackgroundColor,
                    hair: profile.avatarHair,
                    beard: profile.avatarFacialHair,
                    color: profile.avatarHairColor,
                  },
                };
              }
            });
        } catch (err) {}
      }
      setIsRefresh(false);
      setTwones(_twones);
    } catch (error) {
      setIsRefresh(false);
      // showToast((error as Error).message, 'danger');
    }
  };

  const checkIfHasAvatar = () => {
    if (userState.avatar?.name) {
      setHasAvatar(true);
      return true;
    } else {
      setHasAvatar(false);
      return false;
    }
  };

  useEffect(() => {
    if (globalState.appState === 'search') {
      void searchTwones();
    } else if (globalState.appState === 'twone') {
      void getTwones();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalState.appState]);

  // useEffect(() => {
  //   markerRef.current?.refresh();
  // }, [userState.avatar]);

  useEffect(() => {
    // checkLocationPermission();
    setAppState('twone');

    const unsubscribe = navigation.addListener('focus', () => {
      checkLocationPermission();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    // Removes the add location warning.
    requestLocationAuthorization();
  }, [twones]);

  return (
    <TWScreen
      hideNav
      noPadding
      isFull
      renderNav={
        <View
          style={[mainStyles.topAction, {paddingHorizontal: (16), paddingTop: verticalScale(10) + top }]}
        >
          {(globalState.appState === 'search' ||
            globalState.appState === 'search_hide') && (
            <View style={mainStyles.full}>
              <View style={mainStyles.topWrap}>
                <TouchableOpacity
                  onPress={() => setAppState('twone')}
                  style={mainStyles.iconBtn}
                >
                  <TWIcons.backArrow fill={AppColors.white} />
                </TouchableOpacity>
                <View style={mainStyles.textWrap}>
                  <TWLabel color={AppColors.white} size={16} weight="medium" lineHeight={24} margin={{left: 4}}>
                    {twoneState.address1?.split(" ")[0]} {twoneState?.address}
                  </TWLabel>
                    <View style= {mainStyles.meg}>
                      <TWLabel color={AppColors.white} size={14} weight="regular" lineHeight={20} margin={{left: 4}}>
                        {moment(twoneState.date).format('MMMM DD, YYYY')} {' '}
                      </TWLabel>
                      <TWLabel color={AppColors.golden} size={14} weight="regular" lineHeight={20} margin={{left: 4}}>
                        {twoneState.time?.label}
                      </TWLabel>
                    </View>
                </View>
                <TouchableOpacity
                  style={mainStyles.iconBtn}
                  onPress={() => setAppState('search_hide')}
                >
                  <TWIcons.map />
                </TouchableOpacity>
              </View>
              {isRefresh && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[mainStyles.refreshBtn, mainStyles.bottomShadow]}
                >
                  <TWIcons.redo />
                  <TWLabel margin={{ left: scale(8) }}>Refresh</TWLabel>
                </TouchableOpacity>
              )}
            </View>
          )}
          {globalState.appState === 'twone' && (
            <Fragment>
              <TouchableOpacity
                style={mainStyles.circleWrap}
                
                onPress={() => {
                  navigation.navigate('ProfileEditStack');
                }}
              >
                <TWAvatar {...userState.avatar} size={scale(48) } />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: `${
                    isCentered ? AppColors.buttonActive : AppColors.white
                  }`,
                  width: scale(48),
                  height: scale(48),
                  borderRadius: scale(24),
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: AppColors.black,
                  shadowOpacity: 0.1,
                  shadowRadius: scale(5),
                  shadowOffset: { width: 0, height: 0 },
                }}
                onPress={showMyLocation}
              >
                <TWIcons.locationArrow width={scale(27)} height={scale(27)} />
              </TouchableOpacity>
            </Fragment>
          )}
        </View>
      }
    >
      <View style={mainStyles.mapView}>
        {globalState.appState === 'search' && !isRefresh ? (
          <Mapbox.MapView
            ref={mapViewRef}
            style={mainStyles.mapView}
            pitchEnabled={false}
            rotateEnabled={false}
            compassEnabled={false}
            scaleBarEnabled={false}
            onTouchStart={() => {
              // console.log('Camera is moving');
              setIsCentered(false);
            }}
          >
            {/* <Mapbox.UserLocation visible showsUserHeadingIndicator /> */}
            <Mapbox.Camera
              ref={cameraRef}
              zoomLevel={13}
              followUserMode="course"
              centerCoordinate={[
                twoneState.location?.longitude,
                twoneState.location?.latitude,
              ]}
            />
          </Mapbox.MapView>
        ) : location ? (
          <Mapbox.MapView
            ref={mapViewRef}
            style={mainStyles.mapView}
            pitchEnabled={false}
            rotateEnabled={false}
            compassEnabled={false}
            scaleBarEnabled={false}
            onTouchStart={() => {
              // console.log('Camera is moving');
              setIsCentered(false);
            }}
          >
            {/* <Mapbox.UserLocation visible showsUserHeadingIndicator /> */}
            <Mapbox.Camera
              ref={cameraRef}
              zoomLevel={13}
              followUserMode="course"
              centerCoordinate={[
                location.coords.longitude,
                location.coords.latitude,
              ]}
            />
            {renderMarkers()}
          </Mapbox.MapView>
        ) : twones.length === 0 ? (
          <TWLoadingIndicator
            color={AppColors.pink}
            visible={twones.length === 0}
          />
        ) : (
          <View
            style={{
              marginTop: verticalScale(94) + top,
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                alignSelf: 'center',
                width: sWidth * 0.8,
                marginBottom: 50,
              }}
            >
              <TWIcons.pinGroup width={'100%'} />
            </View>
            <TWLabel
              size={24}
              weight="semiBold"
              margin={{ bottom: 12, left: 16, right: 16 }}
            >
              Never miss your moment
            </TWLabel>
            <TWLabel size={16} lineHeight={24} margin={{ left: 16, right: 16 }}>
              Allow access to your location and capture the moment as it’s
              happening.
            </TWLabel>
          </View>
        )}
      </View>
      {globalState.appState === 'twone' && (
        <BottomSheet
          snapPoints={bottomSnapPoints}
          handleIndicatorStyle={mainStyles.handle}
          style={mainStyles.bottomShadow}
        >
          <BottomSheetView>
            <TWLabel
              size={24}
              weight="semiBold"
              margin={{ bottom: 16, left: 16, right: 16 }}
            >
              Hi, {userState.firstName}
            </TWLabel>

            <View style={mainStyles.btnWrap}>
              <TWButton
                title="TWONE"
                type="twone"
                size="md"
                parentStyle={mainStyles.button}
                onClick={onTwone}
              />
              <TWButton
                title="TWONED"
                type="pink"
                size="md"
                parentStyle={mainStyles.button}
                onClick={onTwoned}
              />
            </View>

            {historyState
              .filter(item => item.isTwoned)
              .slice(0, 2)
              .map((twone: TwoneType, index: number) => (
                <HistoryItem
                  navigation={navigation}
                  key={index}
                  twone={twone}
                  type="search"
                  hasBorder={index === 0}
                />
              ))}
            {historyState.length > 0 && (
              <TouchableOpacity onPress={onGoHistory}>
                <TWLabel
                  align="center"
                  weight="semiBold"
                  color={AppColors.primary}
                  margin={{ top: verticalScale(16) }}
                >
                  View My History
                </TWLabel>
              </TouchableOpacity>
            )}
          </BottomSheetView>
        </BottomSheet>
      )}

      {globalState.appState === 'search' &&
        !isRefresh &&
        (twones.length === 0 ? (
          <BottomSheet
            index={0}
            snapPoints={nowTwoneBottomSnapPoints}

            handleIndicatorStyle={mainStyles.handle}
            style={mainStyles.bottomShadow}
          >
            <BottomSheetView>
              <TWLabel
                size={18}
                lineHeight={24}
                weight="semiBold"
                margin={{ bottom: 16, left: 16, right: 16 }}
              >
                Twone Team
              </TWLabel>
              <View style={mainStyles.horiz}>
                <View style={mainStyles.circleWrap}>
                  <TWIcons.pinkTwone
                    width={scale(27)}
                    height={scale(27)}
                    color={AppColors.pink}
                  />
                </View>
                  <TWBubble
                    weight="semiBold"
                    align="left"
                    contents={`Seems like your twone isn't here yet...\nBut you can search again later by going to My History!`}
                  />
                
              </View>
              <TWButton
                title="BACK TO HOME"
                type="pink"
                size="sm"
                parentStyle={mainStyles.backHome}
                onClick={() => setAppState('twone')}
              />
            </BottomSheetView>
          </BottomSheet>
        ) : (
          <View style={mainStyles.carouselWrap}>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: scale(8) }}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              snapToAlignment="start"
              decelerationRate="fast"
              snapToInterval={sWidth - scale(32)}
            >
              {twones.map(twone => (
                <ConnectCard
                  navigation={navigation}
                  twone={twone}
                  key={twone.id}
                />
              ))}
            </ScrollView>
          </View>
        ))}

      <TWPopUp
        isVisible={showAllowLocation}
        noPadding
        onCloseModal={() => setShowAllowLocation(false)}
      >
        <TWImage image={AppImages.mapImage} styles={mainStyles.mapImage} />
        <View style={mainStyles.bottomInner}>
          <TWIcons.navigator width={scale(100)} height={scale(100)} />
          <TWLabel size={16} margin={{ top: 34, bottom: 8 }} weight="semiBold">
            Enable Location
          </TWLabel>
          <TWLabel align="center">
            Twoning is easier with location on. Enable your location to Twone in
            real-time and maximize your chances of connecting with your person.
          </TWLabel>
          <TWButton
            title="Allow only while using the app"
            size="md"
            parentStyle={mainStyles.settingBtn}
            onClick={onOpenSettings}
          />
        </View>
        <TouchableOpacity
          style={mainStyles.modalClose}
          onPress={() => setShowAllowLocation(false)}
        >
          <TWIcons.closeCircle width={scale(24)} height={scale(24)} />
        </TouchableOpacity>
      </TWPopUp>

      <TWPopUp isVisible={!hasAvatar && !showAllowLocation}>
        <View style={chatDetailStyles.newAvatarCont}>
          <TWImage
            image={AppImages.avatar}
            styles={[
              // chatDetailStyles.newAvatar,
              chatDetailStyles.avatarMine,
              {
                height: scale(120),
                width: scale(120),
                borderRadius: scale(120) / 2,
              },
            ]}
          />
        </View>
        <TWLabel
          margin={{ top: 24, bottom: 8 }}
          size={18}
          lineHeight={24}
          align="center"
          weight="semiBold"
        >
          Complete Your Profile Avatar
        </TWLabel>
        <TWLabel
          margin={{ bottom: 24 }}
          size={14}
          lineHeight={16}
          align="center"
        >
          You must add a profile photo and create your Twonie to start Twoning.
        </TWLabel>

        <TWButton
          title="Go to Profile"
          onClick={() => {
            setHasAvatar(true);
            navigation.navigate('Profile');
          }}
          size="md"
          type="purple"
        />
      </TWPopUp>
    </TWScreen>
  );
};

export default MainTwoneScreen;
