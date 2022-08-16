import { debounce } from 'lodash';
import React, { useState, useCallback } from 'react';
import { View } from 'react-native';

import { TWLabel, TWScreen } from '~components';
import { AppColors } from '~constants/colors';
import { getSearchAddress } from '~helpers/mapbox.helpers';
import { Address } from '~types';
import { MainNavProps, MainRouteProps } from '~types/navigation';

import AddressItem from './AddressItem';
import SearchBox from './SearchBox';
import { searchStyles } from './styles';

type Props = {
  navigation: MainNavProps;
  route: MainRouteProps;
};

const SearchAddressScreen = ({ route, navigation }: Props) => {
  const { isTwoned } = route.params;
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [apiCallFinished, setApiCallFinished] = useState(false);
  const [search, setSearch] = useState('');

  const searchAddress = async (keyword: string) => {
    try {
      setSearch(keyword);
      setApiCallFinished(false);
      setAddresses(await getSearchAddress(keyword));
    } catch (error) {
    } finally {
      setApiCallFinished(true);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearchAddress = useCallback(
    debounce<(search: string) => Promise<void>>(searchAddress, 500),
    [],
  );

  const selectedAddress = (address: Address) => {
    navigation.push('SelectLocation', {
      location: address,
      isTwoned,
    });
  };

  return (
    <TWScreen
      bgColor={AppColors.third}
      hideNav
      enableScroll
      isFull
      noPadding
      renderNav={
        <SearchBox
          onChange={debouncedSearchAddress}
          onClear={() => {
            setAddresses([]);
            setSearch('');
          }}
          isFullScreen
          onCancel={() => navigation.pop()}
        />
      }
    >
      {addresses.map(address => (
        <AddressItem
          key={address.id}
          address={address.text}
          subLine={address.place_name}
          distance={8.5}
          onPress={() => selectedAddress(address)}
        />
      ))}

      {addresses.length === 0 && apiCallFinished && search.length > 0 && (
        <View style={searchStyles.noResultView}>
          <TWLabel
            size={16}
            lineHeight={24}
            weight="medium"
            color={AppColors.gray}
          >
            No results found
          </TWLabel>
        </View>
      )}

      {addresses.length === 0 && !apiCallFinished && search.length > 0 && (
        <View style={searchStyles.noResultView}>
          <TWLabel
            size={16}
            lineHeight={24}
            weight="medium"
            color={AppColors.gray}
          >
            Searching...
          </TWLabel>
        </View>
      )}

      {addresses.length === 0 && !apiCallFinished && search.length === 0 && (
        <View style={searchStyles.noResultView}>
          <TWLabel
            size={16}
            lineHeight={24}
            weight="medium"
            color={AppColors.gray}
          >
            Where did you meet?
          </TWLabel>
        </View>
      )}
    </TWScreen>
  );
};

export default SearchAddressScreen;
