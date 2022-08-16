import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppColors } from '~constants/colors';
import { scale, verticalScale } from '~utils/dimension';

import TWIcons from './TWIcons';

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: AppColors.third,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    paddingTop: verticalScale(14),
  },
});

const TWTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { minHeight: scale(57) + bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const icon =
          route.name === 'Twone' ? (
            <TWIcons.twone
              width={scale(28)}
              height={scale(28)}
              fill={isFocused ? AppColors.whiteBg : AppColors.gray}
            />
          ) : route.name === 'Profile' ? (
            <TWIcons.profile
              width={scale(28)}
              height={scale(28)}
              fill={isFocused ? AppColors.whiteBg : AppColors.gray}
            />
          ) : (
            <TWIcons.chat
              width={scale(28)}
              height={scale(28)}
              fill={isFocused ? AppColors.whiteBg : AppColors.gray}
            />
          );

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: route.name,
              merge: true,
              params: {},
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.btn}
            key={route.name}
          >
            {icon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TWTabBar;
