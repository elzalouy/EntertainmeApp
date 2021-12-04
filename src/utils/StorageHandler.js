import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async (item) => {
  const Item = await AsyncStorage.getItem(item);
  return Item;
};
export const setItem = async (item) => {
  const token = await AsyncStorage.setItem(item.key, item.value);
  return token;
};
export const setItems = async (items) => {
  await AsyncStorage.multiSet(items);
};
export const removeItem = async (item) => {
  return await AsyncStorage.removeItem(item);
};
