import { GeoCoordinates } from 'react-native-geolocation-service';
import { useRecoilState } from 'recoil';

import { TimeSlotType, TwoneType } from '~types';
import { Twone } from '~types/api/response.types';

import { twoneAtom } from './atom';

export const useTwone = () => {
  const [twoneState, setTwoneState] = useRecoilState(twoneAtom);

  function setTwone(twone: TwoneType) {
    setTwoneState(state => ({
      ...state,
      ...twone,
    }));
  }

  function clearTwone() {
    setTwoneState({});
  }

  function setTwoneDate(date: Date) {
    setTwoneState(state => ({
      ...state,
      date,
    }));
  }

  function setTwoneTime(time: TimeSlotType) {
    setTwoneState(state => ({
      ...state,
      time,
    }));
  }

  function setTwoneLocation(location: GeoCoordinates) {
    setTwoneState(state => ({
      ...state,
      location,
    }));
  }

  function setTwoneAddress(address: string, address1: string) {
    setTwoneState(state => ({
      ...state,
      address,
      address1,
    }));
  }

  function setTwoneLabel(label: string) {
    setTwoneState(state => ({
      ...state,
      label,
    }));
  }

  function setTwonesResult(twones: Twone[]) {
    setTwoneState(state => ({
      ...state,
      twones,
    }));
  }

  return {
    twoneState,
    setTwone,
    setTwoneDate,
    setTwoneTime,
    setTwoneLocation,
    setTwoneAddress,
    setTwoneLabel,
    setTwonesResult,
    clearTwone,
  };
};
