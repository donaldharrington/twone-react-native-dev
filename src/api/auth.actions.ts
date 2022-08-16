/** Notes: Lifecycle for user info is typically:
 *  - Launch app
 *  - Grab token from secure storage and store into global state (recoil)
 *  - Make authenticated requests with your token
 *  - Grab the user id, name, etc. from response
 *  - When received, store in global state again. Most of this data should not be persisted.
 * - Refresh token as needed and replace in secure storage
 * - Repeat
 * */

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItemFromLocalStorage = async (
  key: string,
): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    return null;
  }
};

export const setItemToLocalStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {}
};

export const removeItemFromLocalStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {}
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    throw error;
  }
};
