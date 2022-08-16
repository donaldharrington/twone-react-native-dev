import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const ratio = width / guidelineBaseWidth;
const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const hasNotch = DeviceInfo.hasNotch();
const iconSize = {
  width: scale(24),
  height: scale(24),
};

export {
  ratio,
  scale,
  verticalScale,
  moderateScale,
  width as sWidth,
  height as sHeight,
  iconSize,
  hasNotch,
};
