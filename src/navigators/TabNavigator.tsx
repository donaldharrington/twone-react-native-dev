import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import { TWIcons, TWTabBar } from '~components';
import { TwoneAnim } from '~constants/animations';
import { AppColors } from '~constants/colors';
import { getUserProfile } from '~helpers/profile.helpers';
import { getUserInfo } from '~helpers/user.helpers';
import useGlobal from '~recoil/global';
import useUser from '~recoil/user';
import ChatScreen from '~screens/Chat';
import MainTwoneScreen from '~screens/Main';
import ProfileScreen from '~screens/Profile';
import { UserTypes } from '~types';
import { AvatarType } from '~types/avatar';
import { TabStackList } from '~types/navigation';
import { ratio } from '~utils/dimension';

const Tab = createBottomTabNavigator<TabStackList>();

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
  hands: {
    transform: [{ scale: ratio }],
  },
  finger: {
    position: 'absolute',
    top: 14,
    left: 30,
  },
  heart: {
    position: 'absolute',
    top: 0,
    right: 46,
    transform: [
      {
        rotate: '-17deg',
      },
      {
        scale: 0.3,
      },
    ],
  },
  cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: { flex: 1 },
});

const TabNavigator = () => {
  const { refreshTokenIfExpired } = useGlobal();
  const [isAnimating, setAnimating] = useState(true);
  const { setUserInfo } = useUser();

  const getLoggedInUserInfo = async () => {
    try {
      const idToken = await refreshTokenIfExpired();
      const user = await getUserInfo(idToken);
      const userProfile = await getUserProfile(user.id, idToken);

      const avatar: AvatarType = {
        size: 138,
        skin: userProfile.avatarSkin,
        glass: userProfile.avatarAccessories,
        background: userProfile.avatarBackgroundColor,
        hair: userProfile.avatarHair,
        beard: userProfile.avatarFacialHair,
        color: userProfile.avatarHairColor,
        name: userProfile.avatar,
      };

      const userInfo: UserTypes = {
        id: user.id,
        profileId: userProfile.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        profilePhoto: user.profilePhoto,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        pronoun: user.pronoun,
        avatar: avatar,
        dob: moment(user.dob).toDate(),
        displayDOB: userProfile.displayDOB,
        displayGender: userProfile.displayGender,
        displayPronoun: userProfile.displayPronoun,
      };

      setUserInfo(userInfo);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log((error as Error).message);
    }
  };

  useEffect(() => {
    void getLoggedInUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {isAnimating ? (
        <View style={styles.page}>
          <View
            style={styles.hands}
            animation={TwoneAnim.handAnim}
            delay={100}
            duration={500}
            easing="ease-in-out-back"
          >
            <TWIcons.hand />
            <View
              style={styles.finger}
              animation={TwoneAnim.fingerAnim}
              delay={100}
              duration={400}
              easing="ease-out-back"
            >
              <TWIcons.finger />
            </View>
            <View
              style={styles.heart}
              delay={500}
              animation={TwoneAnim.heartAnim}
              duration={3000}
              easing="ease-out-cubic"
            >
              <TWIcons.heart />
            </View>
          </View>
          <View
            style={styles.cover}
            delay={2000}
            animation={TwoneAnim.coverAnim}
            duration={1500}
            onAnimationEnd={() => setAnimating(false)}
          >
            <LinearGradient
              colors={AppColors.gradientPurple}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.gradient}
            />
          </View>
        </View>
      ) : (
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Twone"
          tabBar={props => <TWTabBar {...props} />}
        >
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Twone" component={MainTwoneScreen} />
          <Tab.Screen name="Chat" component={ChatScreen} />
        </Tab.Navigator>
      )}
    </Fragment>
  );
};

export default TabNavigator;
