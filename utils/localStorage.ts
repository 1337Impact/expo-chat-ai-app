import AsyncStorage from "@react-native-async-storage/async-storage";

interface Message {
  text: string;
  isRes: boolean;
}

const storeData = async (key: string, value: Message[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log("Error, storeData: ", e);
  } 
};

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Error, getData: ", e);
  }
};

export { storeData, getData };
