import React from 'react';
import { StyleProp } from 'react-native';
import FastImage, { ResizeMode, ImageStyle } from 'react-native-fast-image';

import { scale } from '~utils/dimension';

type Props = {
  image: string | undefined;
  width?: number;
  height?: number;
  resizeMode?: ResizeMode;
  styles?: StyleProp<ImageStyle>;
};

const TWImage = ({
  image,
  width = 48,
  height = 48,
  styles,
  resizeMode = FastImage.resizeMode.contain,
}: Props) => {
  const imageSource = typeof image === 'string' ? { uri: image } : image;

  return (
    <FastImage
      source={imageSource}
      style={[{ width: scale(width), height: scale(height) }, styles]}
      resizeMode={resizeMode}
    />
  );
};

export default TWImage;
