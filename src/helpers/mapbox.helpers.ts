import { MAPBOX_ACCESS_KEY } from '@env';

import { Address } from '~types';

export const getSearchAddress = async (address: string): Promise<Address[]> => {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address,
    )}.json?access_token=${MAPBOX_ACCESS_KEY}&country=us`;
    const response = await fetch(url);
    const result: { [key: string]: unknown } = await response.json();

    const features = result.features as { [key: string]: unknown }[];
    const addresses = features.map(feature => {
      const addressObj: Address = {
        id: feature.id as string,
        latitude: (feature.center as number[])[1],
        longitude: (feature.center as number[])[0],
        text: feature.text as string,
        place_name: feature.place_name as string,
      };

      return addressObj;
    });

    return await Promise.resolve(addresses);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const geocodingAddress = async (
  latitude: number,
  longitude: number,
): Promise<Address | undefined> => {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=address,place,region&access_token=${MAPBOX_ACCESS_KEY}`;
    const response = await fetch(url);
    const result: { [key: string]: unknown } = await response.json();

    const features = result.features as { [key: string]: unknown }[];
    if (features.length > 0) {
      const addressObj: Address = {
        id: features[0].id as string,
        latitude: (features[0].center as number[])[1],
        longitude: (features[0].center as number[])[0],
        text: features[0].text as string,
        place_name: features[0].place_name as string,
      };

      return await Promise.resolve(addressObj);
    } else {
      return await Promise.resolve(undefined);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
