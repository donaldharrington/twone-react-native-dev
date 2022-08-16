import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppColors } from '~constants/colors';
import { AvatarType } from '~types/avatar';
import { scale } from '~utils/dimension';

import TWAssets from './TWAssets';

const styles = StyleSheet.create({
  pos: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

const TWAvatar = ({
  size = 138,
  skin = 'white',
  background = 'blue',
  beard,
  color = 'empty',
  glass,
  hair = 'default',
}: AvatarType) => {
  const renderBgUI = useMemo(() => {
    switch (background) {
      case 'aqua':
        return (
          <TWAssets.background.aqua
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
          />
        );
      case 'blue':
        return (
          <TWAssets.background.blue
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
          />
        );
      case 'gold':
        return (
          <TWAssets.background.gold
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
          />
        );
      case 'green':
        return (
          <TWAssets.background.green
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
          />
        );
      case 'orange':
        return (
          <TWAssets.background.orange
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
          />
        );
      case 'pink':
        return (
          <TWAssets.background.pink
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
          />
        );
      case 'purple':
        return (
          <TWAssets.background.purple
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
          />
        );

      default:
        return (
          <TWAssets.background.default
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
          />
        );
    }
  }, [size, background]);

  const renderSkinUI = useMemo(() => {
    switch (skin) {
      case 'white':
        return (
          <TWAssets.skins.white
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
          />
        );
      case 'yellow':
        return (
          <TWAssets.skins.yellow
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
          />
        );
      case 'brown':
        return (
          <TWAssets.skins.brown
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
          />
        );

      default:
        return (
          <TWAssets.skins.default
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
          />
        );
    }
  }, [size, skin]);

  const renderHairUI = useMemo(() => {
    switch (hair) {
      case 'cut':
        return (
          <TWAssets.hair.cut
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
            fill={AppColors.avatar[color]}
          />
        );
      case 'long':
        return (
          <TWAssets.hair.long
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
            fill={AppColors.avatar[color]}
          />
        );
      case 'wool':
        return (
          <TWAssets.hair.wool
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
            fill={AppColors.avatar[color]}
          />
        );
      case 'old':
        return (
          <TWAssets.hair.old
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
            fill={AppColors.avatar[color]}
          />
        );
      case 'short':
        return (
          <TWAssets.hair.short
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
            fill={AppColors.avatar[color]}
          />
        );
      case 'sports':
        return (
          <TWAssets.hair.sports
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
            fill={AppColors.avatar[color]}
          />
        );
      case 'middle':
        return (
          <TWAssets.hair.middle
            width={scale(size)}
            height={scale(size)}
            style={styles.pos}
            fill={AppColors.avatar[color]}
          />
        );

      default:
        return null;
    }
  }, [size, hair, color]);

  return (
    <View
      style={{
        width: scale(size),
        height: scale(size),
        borderRadius: scale(size * 0.5),
        zIndex: 2,
      }}
    >
      {renderBgUI}
      {renderSkinUI}
      {beard && (
        <TWAssets.beard
          width={scale(size)}
          height={scale(size)}
          style={styles.pos}
          fill={AppColors.avatar[color]}
        />
      )}
      {glass && (
        <TWAssets.glass
          width={scale(size)}
          height={scale(size)}
          style={styles.pos}
        />
      )}
      {hair && renderHairUI}
    </View>
  );
};

export default TWAvatar;
