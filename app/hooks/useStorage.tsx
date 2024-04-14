import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUserInLocalStorage = async (data: any) => {
  try {
    await AsyncStorage.setItem('userInfo', JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error registering user:', error);
    return false;
  }
};

const getUserFromLocalStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error registering user:', e);
    return false;
  }
};

export {storeUserInLocalStorage, getUserFromLocalStorage};
