import { useToast } from 'react-native-toast-notifications';

import { AppColors } from '~constants/colors';

export const useUtils = () => {
  const toast = useToast();

  function showToast(
    msg: string,
    type?: 'normal' | 'success' | 'danger' | 'warning',
  ) {
    toast.show(msg, {
      type: type || 'warning',
      placement: 'top',
      duration: 3000,
      textStyle: { color: AppColors.error, marginLeft: 12 },
    });
  }

  return {
    showToast,
  };
};
