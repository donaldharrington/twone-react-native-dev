import { Platform } from 'react-native';

export const AppFonts = {
  black: Platform.select({ ios: 'Inter-Black', android: 'Inter Black' }),
  bold: Platform.select({ ios: 'Inter-Bold', android: 'Inter Bold' }),
  extraBold: Platform.select({
    ios: 'Inter-ExtraBold',
    android: 'Inter ExtraBold',
  }),
  extraLight: Platform.select({
    ios: 'Inter-ExtraLight',
    android: 'Inter ExtraLight',
  }),
  light: Platform.select({ ios: 'Inter-Light', android: 'Inter Light' }),
  medium: Platform.select({ ios: 'Inter-Medium', android: 'Inter Medium' }),
  regular: Platform.select({ ios: 'Inter-Regular', android: 'Inter Regular' }),
  semiBold: Platform.select({
    ios: 'Inter-SemiBold',
    android: 'Inter SemiBold',
  }),
  thin: Platform.select({ ios: 'Inter-Thin', android: 'Inter Thin' }),
} as { [key: string]: string };
