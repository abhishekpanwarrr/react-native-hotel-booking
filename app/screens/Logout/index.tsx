import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({navigation}: any) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      return navigation.navigate('Home');
    } catch (e) {
      Alert.alert('Error in logout');
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          marginVertical: 20,
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: COLORS.yellow,
            height: 40,
            // alignItems:"center",
            paddingLeft: 30,
            borderRadius: 30,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.darkBlue,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Logout;

const styles = StyleSheet.create({});
