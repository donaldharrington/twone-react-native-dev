import { useRecoilState } from 'recoil';

import { setItemToLocalStorage } from '~api/auth.actions';
import { TwoneType } from '~types';

import { historyAtom } from './atom';

export const useHistory = () => {
  const [historyState, setHistoryState] = useRecoilState(historyAtom);

  async function addToHistory(elem: TwoneType) {
    setHistoryState(state => [elem, ...state]);
    try {
      await setItemToLocalStorage(
        '@twone_history',
        JSON.stringify([elem, ...historyState]),
      );
    } catch (error) {}
  }

  return {
    historyState,
    addToHistory,
  };
};
