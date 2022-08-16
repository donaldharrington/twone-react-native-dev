import moment, { Moment } from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AppColors } from '~constants/colors';
import { scale } from '~utils/dimension';

import TWLabel from './atoms/TWLabel';
import TWIcons from './TWIcons';

type DirectionType = 'keep' | 'increase' | 'decrease';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const styles = StyleSheet.create({
  horiz: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  daysWrap: {},
  date: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  dateItem: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    overflow: 'hidden',
    backgroundColor: AppColors.clear,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: AppColors.primary,
  },
});

type Props = {
  onChanged?: (date: Moment) => void;
};

const TWCalendar = ({ onChanged }: Props) => {
  const today = moment();

  const [startOfWeek, setStartOfWeek] = useState(moment().startOf('isoWeek'));
  const [endOfWeek, setEndOfWeek] = useState(moment().endOf('isoWeek'));
  const [curDays, setCurDays] = useState<Date[]>();
  const [monthYear, setMonthYear] = useState(moment().format('MMMM YYYY'));
  const [selectedDate, setSelectedDate] = useState(today.toDate());

  const calculateWeek = (direction: DirectionType) => {
    if (direction === 'keep') return;
    if (endOfWeek >= today && direction === 'increase') {
      return;
    }

    if (direction === 'increase') {
      setStartOfWeek(endOfWeek.clone().add(1, 'd'));
      setEndOfWeek(endOfWeek.clone().add(7, 'd'));
    } else if (direction === 'decrease') {
      setStartOfWeek(startOfWeek.clone().add(-7, 'd'));
      setEndOfWeek(startOfWeek.clone().add(-1, 'd'));
    }
  };

  const generateWeekDays = () => {
    const days = [];
    let day = startOfWeek;

    while (day <= endOfWeek) {
      days.push(day.toDate());
      day = day.clone().add(1, 'd');
    }
    setCurDays(days);
    setMonthYear(moment(days[3]).format('MMMM YYYY'));
  };

  const onSelectDate = (date: Date) => {
    setSelectedDate(date);
    if (onChanged) {
      onChanged(moment(date));
    }
  };

  useEffect(() => {
    generateWeekDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startOfWeek]);

  return (
    <View>
      {curDays && curDays.length > 0 ? (
        <Fragment>
          <View style={styles.horiz}>
            <TWLabel
              size={20}
              weight="semiBold"
              margin={{ left: scale(8), bottom: 12 }}
            >
              {monthYear}
            </TWLabel>
            <View style={styles.horiz}>
              <TouchableOpacity
                onPress={() => calculateWeek('decrease')}
                style={{ marginRight: scale(8) }}
              >
                <TWIcons.chevronLeft width={scale(24)} height={scale(24)} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => calculateWeek('increase')}>
                <TWIcons.chevronRight width={scale(24)} height={scale(24)} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.horiz, styles.daysWrap]}>
            {curDays?.map((d, index) => (
              <View style={styles.date} key={index}>
                <TWLabel
                  key={d.getDate()}
                  isUppercase
                  weight="medium"
                  size={12}
                  align="center"
                  color={AppColors.primary}
                  margin={{ bottom: 22 }}
                >
                  {DAYS[d.getDay()]}
                </TWLabel>
                <TouchableOpacity
                  style={[
                    styles.dateItem,
                    selectedDate.getDate() === d.getDate() &&
                      selectedDate.getMonth() === d.getMonth() &&
                      styles.selected,
                  ]}
                  disabled={d > today.toDate()}
                  onPress={() => onSelectDate(d)}
                >
                  <TWLabel
                    key={d.toISOString()}
                    size={20}
                    weight="regular"
                    align="center"
                    color={
                      selectedDate.getDate() === d.getDate()
                        ? AppColors.white
                        : d < today.toDate()
                        ? AppColors.black
                        : AppColors.bgGray
                    }
                  >
                    {d.getDate()}
                  </TWLabel>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Fragment>
      ) : (
        <View />
      )}
    </View>
  );
};

export default TWCalendar;
