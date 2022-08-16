import moment, { Moment } from 'moment';
import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import {
  TWButton,
  TWCalendar,
  TWLabel,
  TWScreen,
  TWWrapper,
} from '~components';
import { AppColors } from '~constants/colors';
import useTwone from '~recoil/twone';
import { TimeSlotType } from '~types';
import { MainNavProps } from '~types/navigation';
import { scale } from '~utils/dimension';

import { dateStyles } from './styles';

export const TIME_SLOTS = [
  {
    id: 'time-slot-01',
    label: 'Early Morning',
    noon: 'am',
    value: ['12:00', '4:59'],
  },
  {
    id: 'time-slot-02',
    label: 'Morning',
    noon: 'am',
    value: ['5:00', '11:59'],
  },
  {
    id: 'time-slot-03',
    label: 'Afternoon',
    noon: 'pm',
    value: ['12:00', '5:59'],
  },
  {
    id: 'time-slot-04',
    label: 'Evening',
    noon: 'pm',
    value: ['6:00', '11:59'],
  },
  {
    id: 'time-slot-05',
    label: 'All Day',
    noon: 'all',
    value: [0, 0],
  },
] as TimeSlotType[];

type Props = {
  navigation: MainNavProps;
};

const SelectDateTimeScreen = ({ navigation }: Props) => {
  const { twoneState, setTwone } = useTwone();

  const [curDate, setCurDate] = useState(moment());
  const [curTime, setCurTime] = useState<TimeSlotType>();

  const onConfirm = () => {
    // TODO: stuff for save date/time
    setTwone({
      ...twoneState,
      date: curDate.toDate(),
      time: curTime,
    });
    navigation.pop();
  };

  const onChangedDate = useCallback((date: Moment) => {
    // TODO: selecting date
    setCurDate(date);
  }, []);

  const onSelectTime = useCallback((time: TimeSlotType) => {
    // TODO: selecting time
    setCurTime(time);
  }, []);

  return (
    <TWScreen
      title="When we met"
      isModal
      isHeadBorder
      enableScroll
      renderBottom={
        <TWButton
          title="Done"
          onClick={onConfirm}
          size="md"
          parentStyle={{ margin: scale(16) }}
          disabled={curDate && curTime ? false : true}
        />
      }
    >
      <TWLabel
        weight="medium"
        size={14}
        margin={{ bottom: 8 }}
        lineHeight={24}
        isUppercase
      >
        Select the date
      </TWLabel>
      <TWWrapper minHeight={scale(132)} padding={12}>
        <TWCalendar onChanged={onChangedDate} />
      </TWWrapper>

      <TWLabel
        weight="medium"
        size={14}
        margin={{ bottom: 8 }}
        lineHeight={24}
        isUppercase
      >
        Select the time
      </TWLabel>
      <View>
        {TIME_SLOTS.map(({ id, value, label, noon }) => (
          <TouchableOpacity
            key={id}
            onPress={() => onSelectTime({ label, value, noon, id })}
            style={[
              dateStyles.timeItem,
              curTime?.id === id && dateStyles.timeActive,
            ]}
          >
            <TWLabel
              weight="semiBold"
              size={14}
              color={curTime?.id === id ? AppColors.white : AppColors.black}
            >
              {noon === 'all'
                ? `${label}`
                : `${label} ${value[0]}${noon} - ${value[1]}${noon}`}
            </TWLabel>
          </TouchableOpacity>
        ))}
      </View>
    </TWScreen>
  );
};

export default SelectDateTimeScreen;
