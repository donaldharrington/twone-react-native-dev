import { StyleSheet } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale } from '~utils/dimension';

export const compStyles = StyleSheet.create({
  navCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: scale(48),
    paddingTop: scale(8),
    paddingHorizontal: scale(8),
  },
  btn: {
    backgroundColor: AppColors.white,
    height: scale(48),
    borderRadius: scale(24),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
  },
  backBtn: {
    backgroundColor: AppColors.white,
    width: scale(48),
  },
  nextBtn: {
    paddingHorizontal: scale(12),
    backgroundColor: AppColors.primary,
  },
  gradiWrap: {
    padding: scale(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scale(8),
  },
  optItem: {
    backgroundColor: AppColors.white,
    overflow: 'hidden',
  },
  optItemActive: {
    borderColor: 'purple',
  },
  optWrap: {
    flexShrink: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  optItemAddon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  colorPanel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderBottomWidth: scale(2),
    borderBottomColor: AppColors.border,
    paddingVertical: scale(6),
  },
  colorItemWrap: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(26),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  colorItem: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    borderWidth: scale(2),
    borderColor: AppColors.white,
  },
});
