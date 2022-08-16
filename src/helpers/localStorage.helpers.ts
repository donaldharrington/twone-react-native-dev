import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserId = async (value: string) => {
  try {
    await AsyncStorage.setItem('@user_id', value);
  } catch (e) {}
};

export const storeDataObject = async (label: string, value: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(label, jsonValue);
  } catch (e) {}
};
