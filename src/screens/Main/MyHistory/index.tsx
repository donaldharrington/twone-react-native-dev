import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { TWLabel, TWScreen, TWWrapper } from '~components';
import useHistory from '~recoil/history';
import { TwoneType } from '~types';
import { MainNavProps } from '~types/navigation';
import { verticalScale } from '~utils/dimension';

import { HistoryItem } from './Item';

type Props = {
  navigation: MainNavProps;
};

const MyHistoryScreen = ({ navigation }: Props) => {
  const { historyState } = useHistory();
  const [groupsByDate, setGroupsByDate] = useState<TwoneType[][]>([]);

  const groupByDate = () => {
    const groups = [] as TwoneType[][];

    historyState.forEach(elem => {
      const title = moment(elem.created_at).format('YYYY-MM-DD');
      if (groups.length === 0) {
        groups.push([elem]);
      } else {
        const prevTitle = moment(
          groups[groups.length - 1][0].created_at,
        ).format('YYYY-MM-DD');

        if (prevTitle === title) {
          groups[groups.length - 1].push(elem);
        } else {
          groups.push([elem]);
        }
      }
    });

    setGroupsByDate(groups);
  };

  useEffect(() => {
    groupByDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyState]);

  return (
    <TWScreen title="My History" enableScroll>
      {groupsByDate.map((group: TwoneType[], index: number) => (
        <React.Fragment key={index}>
          <TWLabel size={14} margin={{ bottom: 8 }} isUppercase>
            {moment(group[0].created_at).format('MMMM DD, YYYY')}
          </TWLabel>
          <TWWrapper
            padding={{ top: verticalScale(12), bottom: verticalScale(12) }}
          >
            {group.map((twone: TwoneType, index1: number) => (
              <HistoryItem
                navigation={navigation}
                key={index1}
                twone={twone}
                hasBorder={index1 !== group.length - 1}
              />
            ))}
          </TWWrapper>
        </React.Fragment>
      ))}
    </TWScreen>
  );
};

export default MyHistoryScreen;
